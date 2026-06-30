export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

// ─── Image validator — blocks logos, icons, tracking pixels ─────────────────
function isValidDisasterImage(src) {
  if (!src || !src.startsWith('http')) return false;
  const bad = [
    'google.com', 'gstatic.com', 'googlelogo', 'google-logo',
    'logo', 'icon', 'favicon', 'avatar', 'sprite', 'placeholder',
    'blank.', 'pixel.', 'tracking', 'badge', 'subscribe',
    'newsletter', 'profile_image', 'thumb_up', 'emoji',
    '1x1', '2x2', 'spacer', 'noimage', 'default-image',
  ];
  const lower = src.toLowerCase();
  if (bad.some(b => lower.includes(b))) return false;
  return true;
}

function buildArticle(headline, url, imageUrl, source) {
  if (!headline || !url) return null;
  if (!url.startsWith('http')) url = 'https:' + url;
  const cleanImage = isValidDisasterImage(imageUrl) ? imageUrl : null;
  return {
    headline: headline.trim().slice(0, 200),
    url,
    mediaFeeds: cleanImage ? [{ src: cleanImage, alt: headline }] : [],
    source,
  };
}

function dedup(articles) {
  const seen = new Set();
  return articles.filter(a => {
    if (!a.url || seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

// ─── Query ladder: most specific → broadest ──────────────────────────────────
function buildQueryLadder(city, country, region, magnitude) {
  const queries = [];
  if (city && country) queries.push(`${city} ${country} earthquake`);
  if (region && region !== city && region !== country) queries.push(`${region} earthquake`);
  if (city) queries.push(`${city} earthquake`);
  if (country) queries.push(`${country} earthquake`);
  if (magnitude && country) queries.push(`magnitude ${magnitude} earthquake ${country}`);
  return [...new Set(queries.filter(Boolean))];
}

// ─── Source 1: GDELT DOC API — global news index, updated within minutes,
//     covers virtually every news outlet worldwide, pure JSON, very fast ─────
async function scrapeGDELT(query, timespan = '3d') {
  const results = [];
  try {
    const api = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(query)}&mode=artlist&maxrecords=12&timespan=${timespan}&sort=hybridrel&format=json`;
    const res = await withTimeout(fetch(api, { headers: { Accept: 'application/json' } }), 6000);
    if (!res.ok) return results;
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { return results; }
    for (const item of (data?.articles || [])) {
      const art = buildArticle(item.title, item.url, item.socialimage, item.domain || 'News');
      if (art) results.push(art);
    }
  } catch (e) {
    console.error('GDELT error:', e.message);
  }
  return results;
}

// ─── Source 2: ReliefWeb API — UN disaster portal, global, fast JSON ─────────
async function scrapeReliefWeb(query) {
  const results = [];
  try {
    const api = `https://api.reliefweb.int/v1/reports?appname=eq-monitor&query[value]=${encodeURIComponent(query)}&fields[include][]=title&fields[include][]=url&fields[include][]=file&fields[include][]=date&limit=6&sort[]=date:desc`;
    const res = await withTimeout(fetch(api, { headers: { Accept: 'application/json' } }), 6000);
    if (!res.ok) return results;
    const data = await res.json();
    for (const item of (data?.data || [])) {
      const f = item.fields || {};
      const img = f.file?.[0]?.preview?.url || null;
      const art = buildArticle(f.title, f.url || `https://reliefweb.int/node/${item.id}`, img, 'ReliefWeb (UN)');
      if (art) results.push(art);
    }
  } catch (e) {
    console.error('ReliefWeb error:', e.message);
  }
  return results;
}

// ─── Source 3: GDACS — UN-backed disaster alert system, fast JSON ────────────
async function scrapeGDACS(query) {
  const results = [];
  try {
    const api = `https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH?eventtype=EQ&fromDate=2024-01-01&toDate=2099-01-01&alertlevel=Green;Orange;Red&limit=10&keyword=${encodeURIComponent(query)}`;
    const res = await withTimeout(fetch(api, { headers: { Accept: 'application/json' } }), 6000);
    if (!res.ok) return results;
    const data = await res.json();
    const events = data?.features || data?.events || [];
    for (const ev of events.slice(0, 4)) {
      const p = ev.properties || ev;
      const title = p.name || p.eventname || p.description || '';
      const url = p.url?.report || p.link || `https://www.gdacs.org/Alerts/default.aspx?eventid=${p.eventid}&eventtype=EQ`;
      if (title && url) results.push(buildArticle(title, url, null, 'GDACS (UN)'));
    }
  } catch (e) {
    console.error('GDACS error:', e.message);
  }
  return results;
}

// ─── Relevance scoring: must be about THIS earthquake, not earthquakes in general ─
function scoreArticle(article, city, country, region, magnitude) {
  const title = (article.headline || '').toLowerCase();

  const seismic = ['earthquake', 'quake', 'tremor', 'seismic', 'tsunami', 'magnitude', 'aftershock', 'shaking', 'richter'];
  if (!seismic.some(w => title.includes(w))) return -1;

  const norm = s => (s || '').toLowerCase().replace(/[^a-z\s]/g, '').trim();
  const cityWords = norm(city).split(/\s+/).filter(w => w.length > 2);
  const countryWords = norm(country).split(/\s+/).filter(w => w.length > 2);
  const regionWords = norm(region).split(/\s+/).filter(w => w.length > 2);

  let score = 0;
  let locationMatch = false;

  if (cityWords.some(w => title.includes(w))) { score += 5; locationMatch = true; }
  if (countryWords.some(w => title.includes(w))) { score += 3; locationMatch = true; }
  if (regionWords.some(w => title.includes(w))) { score += 2; locationMatch = true; }
  if (magnitude && title.includes(String(parseFloat(magnitude)))) score += 1;
  if (article.mediaFeeds?.length > 0) score += 1;

  // Require at least some location match so we don't show unrelated quakes
  if (!locationMatch) return -1;

  return score;
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = (searchParams.get('city') || '').trim();
  const country = (searchParams.get('country') || '').trim();
  const region = (searchParams.get('region') || '').trim();
  const magnitude = (searchParams.get('magnitude') || '').trim();

  if (!city && !country) {
    return NextResponse.json({ success: false, error: 'No location provided' }, { status: 400 });
  }

  const queries = buildQueryLadder(city, country, region, magnitude);
  const primaryQuery = queries[0] || `${city || country} earthquake`;

  try {
    // Run everything in parallel — no browser, no sequential page navigation.
    const [gdeltA, gdeltB, reliefWeb, gdacs] = await Promise.allSettled([
      scrapeGDELT(primaryQuery, '3d'),
      queries[1] ? scrapeGDELT(queries[1], '7d') : Promise.resolve([]),
      scrapeReliefWeb(primaryQuery),
      scrapeGDACS(primaryQuery),
    ]);

    const allArticles = [
      ...(gdeltA.status === 'fulfilled' ? gdeltA.value : []),
      ...(gdeltB.status === 'fulfilled' ? gdeltB.value : []),
      ...(reliefWeb.status === 'fulfilled' ? reliefWeb.value : []),
      ...(gdacs.status === 'fulfilled' ? gdacs.value : []),
    ].filter(Boolean);

    let scored = allArticles
      .map(a => ({ article: a, score: scoreArticle(a, city, country, region, magnitude) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);

    // Widen fallback only if strict matching found nothing — broader GDELT search
    // on country alone over a longer timespan, still requiring seismic keywords.
    if (scored.length === 0 && country) {
      const broad = await scrapeGDELT(`${country} earthquake`, '14d');
      scored = broad
        .map(a => ({ article: a, score: scoreArticle(a, city, country, region, magnitude) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score);
    }

    const unique = dedup(scored.map(({ article }) => article));

    const sorted = [
      ...unique.filter(a => a.mediaFeeds?.length > 0),
      ...unique.filter(a => !a.mediaFeeds?.length),
    ].slice(0, 12);

    return NextResponse.json({ success: true, data: sorted });
  } catch (err) {
    console.error('Scraper fatal:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Activity, Globe, Compass, ShieldAlert,
  Newspaper, ExternalLink,
} from "lucide-react";
import Link from "next/link";

type EarthquakeDetails = {
  id: string;
  place: string;
  magnitude: number;
  time: number;
  lat: number;
  lon: number;
  depth: number;
  city: string;
  country: string;
  region: string;
  tsunami?: number;
  felt?: number;
  alert?: string | null;
  significance?: number;
};

type NewsArticle = {
  title: string;
  description: string;
  url: string;
  imageUrl: string | null;
  source: string;
};

function getMagColor(mag: number) {
  if (mag >= 7) return "#ff2200";
  if (mag >= 6) return "#ff6600";
  if (mag >= 5) return "#ffaa00";
  if (mag >= 4) return "#ffdd00";
  return "#88cc44";
}

function getAlertColor(alert: string | null) {
  if (alert === "red")    return { bg: "bg-red-500/20",    border: "border-red-500/40",    text: "text-red-400",    label: "RED — Major Impact" };
  if (alert === "orange") return { bg: "bg-orange-500/20", border: "border-orange-500/40", text: "text-orange-400", label: "ORANGE — Significant Impact" };
  if (alert === "yellow") return { bg: "bg-yellow-500/20", border: "border-yellow-500/40", text: "text-yellow-400", label: "YELLOW — Minor Impact" };
  if (alert === "green")  return { bg: "bg-green-500/20",  border: "border-green-500/40",  text: "text-green-400",  label: "GREEN — Minimal Impact" };
  return null;
}

function parseUSGSPlace(raw: string): { city: string; country: string; region: string } {
  if (!raw) return { city: "", country: "", region: "" };
  const stripped = raw
    .replace(/^\d+\s*km\s+[A-Z]+\s+of\s+/i, "")
    .replace(/^off the coast of\s+/i, "")
    .replace(/^near the coast of\s+/i, "")
    .replace(/^near\s+/i, "")
    .trim();
  const parts = stripped.split(",").map(p => p.trim()).filter(Boolean);
  const city    = parts[0] || "";
  const country = parts[parts.length - 1] || "";
  const region  = parts.length > 1 ? parts.slice(0, -1).join(", ") : city;
  return { city, country, region };
}

export default function EarthquakeDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [eq, setEq]                   = useState<EarthquakeDetails | null>(null);
  const [loading, setLoading]         = useState(true);
  const [news, setNews]               = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [searchLabel, setSearchLabel] = useState("");

  useEffect(() => {
    const rawId = params?.id;
    const id = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : "";
    if (!id) { setLoading(false); return; }

    const fetchDetail = async () => {
      try {
        const res = await fetch(
          `https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/${id}.geojson`
        );
        if (!res.ok) throw new Error("Failed to load earthquake data.");

        const data  = await res.json();
        const props = data?.properties || {};
        const geom  = data?.geometry?.coordinates || [0, 0, 0];
        const { city, country, region } = parseUSGSPlace(props.place || "");

        const eqData: EarthquakeDetails = {
          id:           data.id,
          place:        props.place || "Unknown Location",
          magnitude:    props.mag ?? 0,
          time:         props.time,
          lon:          geom[0] ?? 0,
          lat:          geom[1] ?? 0,
          depth:        geom[2] ?? 0,
          city:         city    || "Unknown",
          country:      country || "",
          region:       region  || city || "Unknown",
          tsunami:      props.tsunami === 1 || props.tsunami === true ? 1 : 0,
          felt:         props.felt  ?? 0,
          alert:        props.alert ?? null,
          significance: props.sig ?? 0,
        };

        setEq(eqData);
        setLoading(false);

        setNewsLoading(true);
        setSearchLabel(eqData.region || eqData.country || eqData.city);

        try {
          const eventDate = new Date(eqData.time);
          const monthYear = eventDate.toLocaleString("en-US", { month: "long", year: "numeric" });

          const qs = new URLSearchParams({
            city:      eqData.city,
            country:   eqData.country,
            region:    eqData.region,
            magnitude: String(eqData.magnitude),
            monthYear,
          });

          const newsRes  = await fetch(`/api/scrape?${qs}`);
          const newsData = await newsRes.json();

          if (newsData.success && newsData.data?.length > 0) {
            const mapped: NewsArticle[] = newsData.data.map((item: any) => ({
              title:       item.headline || "Earthquake Update",
              description: item.mediaFeeds?.[0]?.alt || "",
              url:         item.url || "#",
              imageUrl:    item.mediaFeeds?.[0]?.src || null,
              source:      item.source || "News",
            }));
            setNews(mapped);
          } else {
            setNews([]);
          }
        } catch (e) {
          console.error("News fetch error:", e);
          setNews([]);
        } finally {
          setNewsLoading(false);
        }

      } catch (err) {
        console.error("Detail fetch error:", err);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060610] text-white flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-orange-400/60 text-xs tracking-widest uppercase text-center animate-pulse">Decrypting Event Waveforms...</p>
      </div>
    );
  }

  if (!eq) {
    return (
      <div className="min-h-screen bg-[#060610] text-white flex flex-col items-center justify-center gap-4 px-4 text-center">
        <ShieldAlert className="text-red-500 w-12 h-12" />
        <p className="text-red-400 font-bold text-sm sm:text-base">EVENT CORRUPTION: SEISMIC ID NOT FOUND</p>
        <Link href="/" className="text-xs text-orange-400 underline tracking-widest uppercase">Return to Main Frame</Link>
      </div>
    );
  }

  const magColor       = getMagColor(eq.magnitude);
  const alertStyle     = getAlertColor(eq.alert ?? null);
  const newsWithImages = news.filter(a => a.imageUrl);
  const newsTextOnly   = news.filter(a => !a.imageUrl);

  return (
    <div className="min-h-screen text-white pb-16 antialiased bg-[#060610]">
      <nav className="sticky top-0 z-50 flex items-center px-4 sm:px-6 h-14 bg-[#060610]/80 backdrop-blur-md border-b border-orange-500/15">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-bold text-orange-400/80 hover:text-orange-300 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft size={14} /> Back <span className="hidden xs:inline">to Terminal Matrix</span>
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-4 sm:space-y-6">

        {/* ── HEADER ── */}
        <div className="border border-orange-500/20 rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-white/[0.02] to-transparent">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold bg-orange-500/10 border border-orange-500/30 text-orange-400 tracking-wider uppercase truncate max-w-[180px] sm:max-w-none">
                  ID: {eq.id}
                </span>
                {eq.tsunami === 1 && (
                  <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold bg-red-500/20 border border-red-500/40 text-red-400 tracking-wider uppercase animate-pulse">
                    ⚠️ Tsunami Risk
                  </span>
                )}
                {alertStyle && (
                  <span className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold ${alertStyle.bg} border ${alertStyle.border} ${alertStyle.text} tracking-wider uppercase`}>
                    {alertStyle.label}
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-4xl font-black text-white tracking-tight break-words leading-tight">{eq.place}</h1>
              <p className="text-orange-400/40 text-[10px] sm:text-xs mt-1.5 tracking-widest leading-relaxed">
                DETECTION TIMELOCK: {eq.time ? new Date(eq.time).toUTCString() : "UNKNOWN TIME"}
              </p>
            </div>
            <div className="flex items-center gap-4 self-start md:self-auto bg-white/5 p-3 sm:p-4 rounded-xl border border-white/5 w-full md:w-auto justify-between md:justify-start shrink-0">
              <div className="text-left md:text-right">
                <div className="text-[9px] sm:text-[10px] text-orange-400/40 tracking-widest font-bold uppercase">RICHTER SCALE</div>
                <div className="text-xs sm:text-sm font-semibold text-white/90">Magnitude</div>
              </div>
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-center min-w-[75px] sm:min-w-[90px]"
                style={{ backgroundColor: `${magColor}20`, color: magColor, border: `1px solid ${magColor}50` }}
              >
                M{eq.magnitude.toFixed(1)}
              </div>
            </div>
          </div>
        </div>

        {/* ── TELEMETRY GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs text-orange-300/40 tracking-widest font-medium uppercase">Epicenter Region</span>
              <Globe size={16} className="text-orange-400/60 shrink-0" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs text-orange-400/40">Target City / Zone</div>
              <div className="text-base sm:text-lg font-bold text-orange-300 truncate">{eq.city}</div>
              {eq.country && eq.country !== eq.city && (
                <div className="text-[10px] sm:text-xs text-orange-400/40 mt-0.5 truncate">{eq.country}</div>
              )}
            </div>
          </div>

          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs text-orange-300/40 tracking-widest font-medium uppercase">Coordinates</span>
              <Compass size={16} className="text-orange-400/60 shrink-0" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] text-orange-400/40 tracking-wider">LATITUDE</div>
                <div className="text-sm sm:text-base font-mono font-bold text-white truncate">{eq.lat.toFixed(4)}°</div>
              </div>
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] text-orange-400/40 tracking-wider">LONGITUDE</div>
                <div className="text-sm sm:text-base font-mono font-bold text-white truncate">{eq.lon.toFixed(4)}°</div>
              </div>
            </div>
          </div>

          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4 sm:col-span-2 md:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs text-orange-300/40 tracking-widest font-medium uppercase">Hypocenter Depth</span>
              <Activity size={16} className="text-orange-400/60 shrink-0" />
            </div>
            <div>
              <div className="text-[9px] sm:text-[10px] text-orange-400/40 tracking-wider">CRUST PENETRATION</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-orange-400">
                {eq.depth.toFixed(1)} <span className="text-xs font-normal">KM</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-3 sm:p-4">
            <div className="text-[9px] sm:text-[10px] text-orange-400/40 tracking-widest uppercase mb-1 truncate">Felt Reports</div>
            <div className="text-lg sm:text-xl font-black font-mono text-white">{eq.felt?.toLocaleString() ?? "0"}</div>
            <div className="text-[9px] sm:text-[10px] text-orange-400/30 mt-0.5 line-clamp-1">reported shaking</div>
          </div>
          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-3 sm:p-4">
            <div className="text-[9px] sm:text-[10px] text-orange-400/40 tracking-widest uppercase mb-1 truncate">Significance</div>
            <div className="text-lg sm:text-xl font-black font-mono text-white">{eq.significance ?? "—"}</div>
            <div className="text-[9px] sm:text-[10px] text-orange-400/30 mt-0.5 line-clamp-1">USGS impact index</div>
          </div>
          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-3 sm:p-4 col-span-2 md:col-span-1">
            <div className="text-[9px] sm:text-[10px] text-orange-400/40 tracking-widest uppercase mb-1 truncate">Tsunami Risk</div>
            <div className={`text-lg sm:text-xl font-black font-mono ${eq.tsunami === 1 ? "text-red-400" : "text-green-400"}`}>
              {eq.tsunami === 1 ? "ACTIVE" : "NONE"}
            </div>
            <div className="text-[9px] sm:text-[10px] text-orange-400/30 mt-0.5 line-clamp-1">advisory status</div>
          </div>
        </div>

        {/* ── NEWS SECTION ── */}
        <div className="border border-orange-500/15 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 sm:px-5 sm:py-4 bg-orange-500/[0.04] border-b border-orange-500/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Newspaper size={14} className="text-orange-400/60 shrink-0" />
              <span className="text-xs text-orange-300/80 font-bold tracking-widest uppercase truncate">Live News Feed</span>
              <span className="text-[10px] text-orange-400/30 font-mono hidden md:inline truncate">[{searchLabel}]</span>
            </div>
            <span className="text-[10px] text-orange-400/40 font-mono shrink-0">{news.length} articles</span>
          </div>

          {newsLoading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 px-4">
              <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-orange-400/50 text-xs tracking-widest uppercase text-center">Scanning Global Sources...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 px-4 text-center">
              <Newspaper size={28} className="text-orange-500/20 mb-1" />
              <p className="text-orange-400/40 text-xs tracking-widest uppercase max-w-sm">
                No news found for <span className="text-orange-400/60 break-words">{searchLabel}</span>
              </p>
            </div>
          ) : (
            <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
              {newsWithImages.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {newsWithImages.slice(0, 6).map((article, i) => (
                    <a
                      key={article.url}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative rounded-xl overflow-hidden border border-white/5 hover:border-orange-500/40 transition-all duration-300 bg-[#0a0a14] flex flex-col ${i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}
                    >
                      <div className="relative overflow-hidden w-full h-36 sm:h-40 md:h-44">
                        <img
                          src={article.imageUrl!}
                          alt={article.title}
                          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/40 to-transparent" />
                        <div className="absolute top-2.5 left-2.5 max-w-[85%]">
                          <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold bg-orange-500/80 text-white tracking-wider uppercase block truncate">
                            {article.source}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4 flex flex-col gap-1.5 flex-1 justify-between">
                        <div className="space-y-1">
                          <h3 className="text-xs font-bold text-white leading-snug group-hover:text-orange-300 transition-colors line-clamp-3">
                            {article.title}
                          </h3>
                          {article.description && (
                            <p className="text-[10px] text-orange-400/40 leading-relaxed line-clamp-2">{article.description}</p>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-2">
                          <div className="flex items-center gap-1 text-[9px] text-orange-400/50 group-hover:text-orange-300 transition-colors">
                            Read full story <ExternalLink size={9} />
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {newsTextOnly.length > 0 && (
                <div className="space-y-2">
                  {newsTextOnly.slice(0, 8).map(article => (
                    <a
                      key={article.url}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 p-3 sm:p-4 rounded-xl border border-white/5 hover:border-orange-500/30 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-200"
                    >
                      <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                        <Newspaper size={13} className="text-orange-400/60" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <span className="text-[9px] sm:text-[10px] font-bold text-orange-400/70 block truncate">{article.source}</span>
                        <h4 className="text-xs font-semibold text-white/90 group-hover:text-orange-300 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h4>
                        {article.description && (
                          <p className="text-[10px] text-orange-400/40 leading-relaxed line-clamp-1">{article.description}</p>
                        )}
                      </div>
                      <ExternalLink size={12} className="text-white/20 group-hover:text-orange-400/60 transition-colors self-center shrink-0 ml-1" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
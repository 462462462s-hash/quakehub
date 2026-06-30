import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seismic Intelligence — Live Earthquake Monitor",
  description: "Real-time global earthquake monitoring powered by USGS data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Crucial Leaflet asset required to calculate map tiles and marker layout vectors on mobile devices */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body style={{ background: "#060610", color: "white", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
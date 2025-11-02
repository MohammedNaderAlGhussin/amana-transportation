// app/components/BusMap.tsx
"use client";

import dynamic from "next/dynamic";
import data from "../data/amanaTransportData.json";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

interface BusMapProps {
  selectedRouteNumber: string; // e.g. "B101"
}

export default function BusMap({ selectedRouteNumber }: BusMapProps) {
  // find route by route_number (your JSON uses route_number field)
  const route = data.bus_lines.find(
    (r) =>
      r.route_info &&
      (r.route_number === selectedRouteNumber || r.name === selectedRouteNumber)
  );

  // If no route found show fallback
  if (!route) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-100 text-gray-700">
        Route not found
      </div>
    );
  }

  // If maintenance, show message (no map)
  if (route.status && route.status.toLowerCase() === "maintenance") {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-100 text-gray-700 font-semibold">
        Route {route.route_number ?? route.name} is currently under maintenance.
      </div>
    );
  }

  // Otherwise render the client-only Leaflet map
  return <LeafletMap route={route} />;
}

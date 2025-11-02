// app/components/LeafletMap.tsx
"use client";

import React, { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// small inline icons (you can replace URLs with your assets)
const busIconUrl = "https://cdn-icons-png.flaticon.com/512/61/61205.png";
const stopIconUrl = "https://cdn-icons-png.flaticon.com/512/854/854929.png";

// create icons (done client-side)
const busIcon = new L.Icon({
  iconUrl: busIconUrl,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const stopIcon = new L.Icon({
  iconUrl: stopIconUrl,
  iconSize: [26, 26],
  iconAnchor: [13, 26],
});

type BusStop = {
  id: number | string;
  name: string;
  latitude: number;
  longitude: number;
  estimated_arrival?: string;
  is_next_stop?: boolean;
};

type Route = {
  id?: number | string;
  name?: string;
  route_number?: string;
  current_location: { latitude: number; longitude: number; address?: string };
  status?: string;
  passengers?: {
    current?: number;
    capacity?: number;
    utilization_percentage?: number;
  };
  vehicle_info?: { license_plate?: string; model?: string };
  bus_stops: BusStop[];
};

export default function LeafletMap({ route }: { route: Route }) {
  // map center from route.current_location
  const center: [number, number] = [
    route.current_location.latitude,
    route.current_location.longitude,
  ];

  // positions for stops (in correct order)
  const stopPositions: [number, number][] = useMemo(
    () =>
      (route.bus_stops || []).map(
        (s) => [s.latitude, s.longitude] as [number, number]
      ),
    [route.bus_stops]
  );

  return (
    <div className="h-96 w-full">
      <MapContainer
        center={center}
        zoom={12}
        className="h-full w-full rounded-md shadow-md"
      >
        {/* Basic OSM tiles */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Stop markers */}
        {route.bus_stops.map((stop) => (
          <Marker
            key={stop.id ?? `${stop.latitude}-${stop.longitude}`}
            position={[stop.latitude, stop.longitude]}
            icon={stopIcon}
          >
            <Popup>
              <div className="text-sm">
                <strong>{stop.name}</strong>
                <div>ETA: {stop.estimated_arrival ?? "N/A"}</div>
                {stop.is_next_stop && (
                  <div className="text-orange-600 font-semibold">Next Stop</div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Bus current location */}
        <Marker
          position={[
            route.current_location.latitude,
            route.current_location.longitude,
          ]}
          icon={busIcon}
        >
          <Popup>
            <div className="text-sm">
              <strong>{route.route_number ?? route.name}</strong>
              <div>{route.vehicle_info?.license_plate ?? ""}</div>
              <div>
                Utilization: {route.passengers?.utilization_percentage ?? "N/A"}
                %
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Route polyline connecting stops */}
        {stopPositions.length > 1 && (
          <Polyline positions={stopPositions} color="#2563EB" />
        )}
      </MapContainer>
    </div>
  );
}

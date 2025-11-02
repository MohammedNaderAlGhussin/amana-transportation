// app/components/RouteSelector.tsx
"use client";
import data from "../data/amanaTransportData.json";

interface RouteSelectorProps {
  selectedRouteNumber: string;
  onSelect: (routeNumber: string) => void;
}

export default function RouteSelector({
  selectedRouteNumber,
  onSelect,
}: RouteSelectorProps) {
  const routes = data.bus_lines.map((r) => ({
    label: r.route_number ?? r.name ?? `Route ${r.id ?? ""}`,
    raw: r.route_number ?? r.name ?? r.id?.toString() ?? "",
  }));

  return (
    <div className="flex flex-wrap md:flex-nowrap md:overflow-x-auto gap-2 px-4 py-3 bg-white ">
      {routes.map((r) => (
        <button
          key={r.raw}
          onClick={() => onSelect(r.raw)}
          className={`px-4 py-2 rounded-xl font-medium  min-w-[60px] md:min-w-[80px] ${
            selectedRouteNumber === r.raw
              ? "bg-primary-bg text-white"
              : "bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
          } transition`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}

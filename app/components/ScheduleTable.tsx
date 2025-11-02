// app/components/ScheduleTable.tsx
"use client";
import data from "../data/amanaTransportData.json";

interface ScheduleTableProps {
  selectedRouteNumber: string;
}

export default function ScheduleTable({
  selectedRouteNumber,
}: ScheduleTableProps) {
  const route = data.bus_lines.find(
    (r) => (r.route_number ?? r.name) === selectedRouteNumber
  );

  if (!route) {
    return (
      <div className="p-6 bg-white text-center text-gray-700 font-semibold">
        Route not found
      </div>
    );
  }

  if (route.status && route.status.toLowerCase() === "maintenance") {
    return (
      <div className="p-6 bg-gray-100 text-center text-gray-700 font-semibold">
        No schedule available — route under maintenance.
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-md p-2 overflow-x-auto">
      <table className="min-w-[500px] w-full text-left text-sm">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-2 px-4 whitespace-nowrap">Bus Stop</th>
            <th className="py-2 px-4 whitespace-nowrap">Estimated Arrival</th>
          </tr>
        </thead>
        <tbody>
          {(route.bus_stops || []).map((stop) => (
            <tr
              key={stop.id ?? `${stop.latitude}-${stop.longitude}`}
              className={`border-t ${
                stop.is_next_stop
                  ? "bg-orange-200 font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
              <td className="py-2 px-4 whitespace-nowrap">{stop.name}</td>
              <td className="py-2 px-4 whitespace-nowrap">
                {stop.estimated_arrival ?? "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

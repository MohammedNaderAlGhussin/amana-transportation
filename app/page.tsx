"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SectionTitle from "./components/SectionTitle";
import RouteSelector from "./components/RouteSelector";
import BusMap from "./components/BusMap";
import ScheduleTable from "./components/ScheduleTable";
import Footer from "./components/Footer";

export default function Page() {
  const [selectedRoute, setSelectedRoute] = useState("B101");

  return (
    <main className="min-h-screen flex flex-col container mx-auto bg-gray-50">
      <Navbar />
      <Header />

      <section className="mt-6">
        <SectionTitle title="Active Bus Map" />
        <RouteSelector
          selectedRouteNumber={selectedRoute}
          onSelect={setSelectedRoute}
        />
        <BusMap selectedRouteNumber={selectedRoute} />
      </section>

      <section className="mt-10">
        <SectionTitle title="Bus Schedule" />
        <RouteSelector
          selectedRouteNumber={selectedRoute}
          onSelect={setSelectedRoute}
        />
        <ScheduleTable selectedRouteNumber={selectedRoute} />
      </section>

      <Footer />
    </main>
  );
}

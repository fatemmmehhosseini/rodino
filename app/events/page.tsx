import EventsHeader from "@/components/events/EventsHeader";
import EventCategories from "@/components/events/EventCategories";
import EventFilters from "@/components/events/EventFilters";
import EventGrid from "@/components/events/EventGrid";
import { Suspense } from "react";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#F8F7FC]">

      <Suspense fallback={null}>
        <EventsHeader />
      </Suspense>

      <Suspense fallback={null}>
      <EventCategories />
      </Suspense>

      <Suspense fallback={null}>
        <EventFilters />
      </Suspense>

      <Suspense fallback={null}>
        <EventGrid />
       </Suspense>

    </main>
  );
}
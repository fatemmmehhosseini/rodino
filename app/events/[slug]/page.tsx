import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { events } from "@/data/events";
import { showtimes } from "@/data/showtimes";
import { venues } from "@/data/venues";
import { providers } from "@/data/providers";
import { seatSections } from "@/data/seatMaps";

import EventHero from "@/components/events/detail/EventHero";
import EventShowtimes from "@/components/events/detail/EventShowtimes";
import EventVenue from "@/components/events/detail/EventVenue";
import EventTicketSections from "@/components/events/detail/EventTicketSections";
import EventInfo from "@/components/events/detail/EventInfo";
import EventAbout from "@/components/events/detail/EventAbout";
import EventProvider from "@/components/events/detail/EventProvider";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function EventDetailContent({ params }: Props) {
  const { slug } = await params;

  const event = events.find(
    (item) => item.slug === slug
  );

  if (!event) {
    notFound();
  }

  const eventShowtimes = showtimes
    .filter((showtime) => showtime.eventId === event.id)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() -
        new Date(b.startDate).getTime()
    );

  const firstShowtime = eventShowtimes[0];

  const venue = firstShowtime
    ? venues.find(
        (item) => item.id === firstShowtime.venueId
      )
    : event.venueId
      ? venues.find(
          (item) => item.id === event.venueId
        )
      : undefined;

  const provider = providers.find(
    (item) => item.id === event.providerId
  );

  const eventSeatSections =
    !event.isFree && venue
      ? seatSections.filter(
          (section) => section.venueId === venue.id
        )
      : [];

  return (
    <main className="bg-[#F8F7FC] pb-20 pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[#77728A]">
          <Link
            href="/events"
            className="transition-colors hover:text-[#4C1D95]"
          >
            رویدادها
          </Link>

          <span>/</span>

          <span className="truncate text-[#4C1D95]">
            {event.title}
          </span>
        </div>

        <EventHero
          event={event}
          firstShowtime={firstShowtime}
          venue={venue}
        />

        {/* Showtimes */}
        {event.eventCatagory !== "TRAVEL" && (
          <EventShowtimes
            event={event}
            showtimes={eventShowtimes}
          />
        )}

        {/* Venue */}
        {event.eventCatagory !== "TRAVEL" && (
          <EventVenue venue={venue} />
        )}

        {/* Ticket Sections */}
        {!event.isFree &&
          event.eventCatagory !== "TRAVEL" &&
          eventSeatSections.length > 0 && (
            <EventTicketSections
              sections={eventSeatSections}
            />
          )}

        <EventInfo
          eventId={event.id}
          category={event.eventCatagory}
        />

        <EventAbout
          description={event.description}
        />

        <EventProvider
          provider={provider}
        />

      </div>
    </main>
  );
}

export default function EventDetailPage({
  params,
}: Props) {
  return (
    <Suspense fallback={null}>
      <EventDetailContent params={params} />
    </Suspense>
  );
}
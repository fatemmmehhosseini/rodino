import { Suspense } from "react";
import { notFound } from "next/navigation";

import { events } from "@/data/events";
import { showtimes } from "@/data/showtimes";
import { venues } from "@/data/venues";
import { seatSections } from "@/data/seatMaps";

import SeatBooking from "@/components/events/seats/SeatBooking";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    showtimeId?: string;
  }>;
};

async function SeatsPageContent({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { showtimeId } = await searchParams;

  const event = events.find(
    (item) => item.slug === slug
  );

  if (!event) {
    notFound();
  }

  const parsedShowtimeId = Number(showtimeId);

  const showtime = showtimes.find(
    (item) =>
      item.id === parsedShowtimeId &&
      item.eventId === event.id
  );

  if (!showtime) {
    notFound();
  }

  const venue = venues.find(
    (item) => item.id === showtime.venueId
  );

  if (!venue) {
    notFound();
  }

  const sections = seatSections.filter(
    (section) => section.venueId === venue.id
  );

  return (
    <SeatBooking
      key={`${event.id}-${showtime.id}`}
      event={event}
      showtime={showtime}
      venue={venue}
      sections={sections}
    />
  );
}

export default function SeatsPage(props: Props) {
  return (
    <Suspense fallback={null}>
      <SeatsPageContent {...props} />
    </Suspense>
  );
}
"use client";

import { useSearchParams } from "next/navigation";

import { events } from "@/data/events";
import { showtimes } from "@/data/showtimes";
import { venues } from "@/data/venues";
import EventCard from "@/components/home/EventCard";

const categoryLabels: Record<string, string> = {
  MUSIC: "موسیقی",
  SPORTS: "ورزشی",
  THEATER: "تئاتر",
  TECHNOLOGY: "فناوری",
  TRAVEL: "سفر و گردشگری",
};

function getFirstShowtime(eventId: number) {
  return showtimes
    .filter((showtime) => showtime.eventId === eventId)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() -
        new Date(b.startDate).getTime()
    )[0];
}

function getEventVenue(eventId: number) {
  const showtime = getFirstShowtime(eventId);

  if (showtime) {
    return venues.find(
      (venue) => venue.id === showtime.venueId
    );
  }

  const event = events.find(
    (event) => event.id === eventId
  );

  if (event?.venueId) {
    return venues.find(
      (venue) => venue.id === event.venueId
    );
  }

  return undefined;
}

function getPersianMonth(dateString: string) {
  const date = new Date(dateString);

  const parts = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
    calendar: "persian",
    month: "numeric",
  }).formatToParts(date);

  const monthPart = parts.find(
    (part) => part.type === "month"
  );

  return monthPart ? Number(monthPart.value) : 0;
}

export default function EventGrid() {
  const searchParams = useSearchParams();

  const rawSearch =
  searchParams.get("search")?.trim().toLowerCase() ?? "";

  const search =
    rawSearch.length >= 3 ? rawSearch : "";
    
  const category =
    searchParams.get("category") ?? "";

  const city =
    searchParams.get("city") ?? "";

  const date =
    searchParams.get("date") ?? "";

  const mode =
    searchParams.get("mode") ?? "";

  const price =
    searchParams.get("price") ?? "";

  const sort =
    searchParams.get("sort") ?? "";

  const filteredEvents = events.filter((event) => {
    
    if (
      category &&
      event.eventCatagory !== category
    ) {
      return false;
    }

    if (search) {
      const searchableText = [
        event.title,
        event.description,
        event.eventCatagory,
        categoryLabels[event.eventCatagory],
        event.eventSubCatagory,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(search)) {
        return false;
      }
    }

    
    if (city) {
      const venue = getEventVenue(event.id);

      if (venue?.city !== city) {
        return false;
      }
    }

    
    if (
      mode &&
      event.eventMode !== mode
    ) {
      return false;
    }

    
    if (date) {
      const showtime = getFirstShowtime(event.id);

      if (!showtime) {
        return false;
      }

      const persianMonth = getPersianMonth(
        showtime.startDate
      );

      
      if (
        date === "aban" &&
        persianMonth !== 8
      ) {
        return false;
      }

      
      if (
        date === "azar" &&
        persianMonth !== 9
      ) {
        return false;
      }
    }

    
    if (price === "free") {
      if (!event.isFree) {
        return false;
      }
    }

    
    if (price === "paid") {
      if (event.isFree) {
        return false;
      }
    }

    
    if (price === "under-1") {
      if (
        event.isFree ||
        (event.price ?? 0) >= 10_000_000
      ) {
        return false;
      }
    }

    
    if (price === "1-2") {
      const eventPrice = event.price ?? 0;

      if (
        event.isFree ||
        eventPrice < 10_000_000 ||
        eventPrice > 20_000_000
      ) {
        return false;
      }
    }

    
    if (price === "over-2") {
      if (
        event.isFree ||
        (event.price ?? 0) <= 20_000_000
      ) {
        return false;
      }
    }

    return true;
  });

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => {

       if (sort === "popular") {
        return Number(b.isPopular) - Number(a.isPopular);
      }
      
      if (sort === "cheapest") {
        return (
          (a.price ?? 0) -
          (b.price ?? 0)
        );
      }

      
      if (sort === "date") {
        const aShowtime = getFirstShowtime(a.id);
        const bShowtime = getFirstShowtime(b.id);

        const aTime = aShowtime
          ? new Date(
              aShowtime.startDate
            ).getTime()
          : Infinity;

        const bTime = bShowtime
          ? new Date(
              bShowtime.startDate
            ).getTime()
          : Infinity;

        return aTime - bTime;
      }

      return 0;
    }
  );

  if (!sortedEvents.length) {
    return (
      <section className="bg-[#F8F7FC] pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl border border-[#E8E3F0] bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-bold text-[#18151F]">
              رویدادی پیدا نشد
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#77728A]">
              {search
                ? "برای عبارت جستجو شده رویدادی پیدا نکردیم."
                : "با فیلترهای انتخاب‌شده رویدادی برای نمایش وجود ندارد."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F8F7FC] pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
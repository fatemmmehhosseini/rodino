"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, CalendarDays } from "lucide-react";

import type { Event } from "@/types/event";
import { showtimes } from "@/data/showtimes";
import { venues } from "@/data/venues";
import { seatSections } from "@/data/seatMaps";

type Props = {
  event: Event;
};

const categoryLabels: Record<string, string> = {
  MUSIC: "موسیقی",
  SPORTS: "ورزشی",
  THEATER: "تئاتر",
  TECHNOLOGY: "فناوری",
  TRAVEL: "سفر و گردشگری",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function formatPrice(price?: number) {
  if (!price) return "رایگان";

  return `${price.toLocaleString("fa-IR")} تومان`;
}

export default function EventCard({ event }: Props) {
  const categoryLabel =
    categoryLabels[event.eventCatagory] ?? "رویداد";

  const eventShowtimes = showtimes
    .filter((showtime) => showtime.eventId === event.id)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() -
        new Date(b.startDate).getTime()
    );

  const firstShowtime = eventShowtimes[0];

  const venue = firstShowtime
    ? venues.find((venue) => venue.id === firstShowtime.venueId)
    : event.venueId
      ? venues.find((venue) => venue.id === event.venueId)
      : undefined;

 
  const minTicketPrice =
    event.eventCatagory !== "TRAVEL" && event.venueId
      ? Math.min(
          ...seatSections
            .filter(
              (section) => section.venueId === event.venueId
            )
            .map((section) => section.price)
        )
      : undefined;

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[#ECE9F2] bg-white shadow-[0_8px_30px_rgba(24,21,31,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(76,29,149,0.12)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={event.poster || "/images/events/concert.jpg"}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 55vw, 280px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Category */}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#4C1D95] shadow-sm backdrop-blur-sm">
          {categoryLabel}
        </span>

        {/* Favorite */}
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#6B6675] shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-pink-500"
        >
          <Heart size={17} strokeWidth={1.8} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="line-clamp-2 min-h-[48px] text-[16px] font-bold leading-7 text-[#18151F] transition-colors duration-300 group-hover:text-[#4C1D95]">
          {event.title}
        </h3>

        {/* Subcategory */}
        {event.eventSubCatagory && (
          <p className="mt-1 text-xs font-medium text-[#8A8495]">
            {event.eventSubCatagory}
          </p>
        )}

        {/* Date */}
        {firstShowtime && (
          <div className="mt-4 flex items-center gap-2 text-[13px] text-[#6B6675]">
            <CalendarDays
              size={16}
              strokeWidth={1.8}
              className="shrink-0 text-[#7C3AED]"
            />

            <span>{formatDate(firstShowtime.startDate)}</span>
          </div>
        )}

        {/* Location */}
        <div className="mt-2 flex items-center gap-2 text-[13px] text-[#6B6675]">
          <MapPin
            size={16}
            strokeWidth={1.8}
            className="shrink-0 text-[#7C3AED]"
          />

          <span className="truncate">
            {event.eventMode === "online"
              ? "آنلاین"
              : venue?.name ||
                event.eventVenues ||
                "محل برگزاری مشخص نشده"}
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center justify-between border-t border-[#F0EDF5] pt-3">
          <span className="text-xs text-[#8A8495]">
            {event.eventMode === "online"
              ? "رویداد آنلاین"
              : "رویداد حضوری"}
          </span>

          <span className="text-sm font-extrabold text-[#4C1D95]">
            {event.isFree
              ? "رایگان"
              : minTicketPrice !== undefined
                ? `از ${minTicketPrice.toLocaleString("fa-IR")} تومان`
                : formatPrice(event.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
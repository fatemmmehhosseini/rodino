import Link from "next/link";
import { CalendarDays, Clock3 } from "lucide-react";

import type { Event, Showtime } from "@/types/event";

type Props = {
  event: Event;
  showtimes: Showtime[];
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    calendar: "persian",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

function formatTime(dateString: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export default function EventShowtimes({
  event,
  showtimes,
}: Props) {
  if (showtimes.length === 0) return null;

  return (
    <section className="mt-6 rounded-[28px] border border-[#E8E3F0] bg-white p-6 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-[#18151F]">
          سانس‌های برگزاری
        </h2>

        <p className="mt-2 text-sm text-[#77728A]">
          تاریخ و ساعت موردنظر خود را برای رزرو انتخاب کنید.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {showtimes.map((showtime, index) => (
          <Link
            key={showtime.id}
            href={
            event.eventCatagory === "TRAVEL"
              ? `/events/${event.slug}/checkout`
              : `/events/${event.slug}/seats?showtimeId=${showtime.id}`
          }
            className={`rounded-2xl border p-4 text-right transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CBB5EA] hover:bg-[#FAF8FF] ${
              index === 0
                ? "border-[#D8C7F2] bg-[#F8F4FF]"
                : "border-[#E8E3F0] bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-[#8A8495]">
                سانس {index + 1}
              </span>

              {index === 0 && (
                <span className="rounded-full bg-[#EDE3FF] px-2.5 py-1 text-[10px] font-bold text-[#4C1D95]">
                  نزدیک‌ترین
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#302B3A]">
              <CalendarDays
                size={16}
                className="text-[#7C3AED]"
              />
              {formatDate(showtime.startDate)}
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm font-bold text-[#302B3A]">
              <Clock3
                size={16}
                className="text-[#7C3AED]"
              />
              {formatTime(showtime.startDate)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
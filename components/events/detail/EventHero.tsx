import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Ticket,
  WalletCards,
} from "lucide-react";

import type { Event, Showtime, Venue } from "@/types/event";

type Props = {
  event: Event;
  firstShowtime?: Showtime;
  venue?: Venue;
};

const categoryLabels: Record<string, string> = {
  MUSIC: "موسیقی",
  SPORTS: "ورزشی",
  THEATER: "تئاتر",
  TECHNOLOGY: "فناوری",
  TRAVEL: "سفر و گردشگری",
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

function formatPrice(price?: number) {
  if (!price) return "رایگان";

  const tomanPrice = price / 10;

  return `${tomanPrice.toLocaleString("fa-IR")} تومان`;
}

export default function EventHero({
  event,
  firstShowtime,
  venue,
}: Props) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-[#E8E3F0] bg-white shadow-[0_12px_40px_rgba(24,21,31,0.06)]">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        {/* Poster */}
        <div className="relative min-h-[360px] bg-[#EEEAF5] sm:min-h-[480px] lg:min-h-[580px]">
          <Image
            src={event.poster || "/images/events/concert.jpg"}
            alt={event.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          <span className="absolute right-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-extrabold text-[#4C1D95] shadow-lg">
            {categoryLabels[event.eventCatagory] ?? "رویداد"}
          </span>

          {event.isPopular && (
            <span className="absolute bottom-5 right-5 rounded-full bg-[#3B1678] px-4 py-2 text-xs font-bold text-white shadow-lg">
              رویداد محبوب
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {event.eventSubCatagory && (
                <span className="rounded-full bg-[#F3EDFF] px-3 py-1.5 text-xs font-bold text-[#4C1D95]">
                  {event.eventSubCatagory}
                </span>
              )}

              {event.eventStatus && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 size={14} />
                  {event.eventStatus}
                </span>
              )}
            </div>

            <h1 className="text-xl font-extrabold leading-10 text-[#18151F] max-sm:text-center sm:text-3xl lg:text-4xl">
              {event.title}
            </h1>

            {event.description && (
              <p className="mt-5 text-sm leading-8 text-[#6B6675] max-sm:text-center sm:text-base">
                {event.description}
              </p>
            )}
          </div>

          {/* Quick info */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#F8F7FC] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8A8495]">
                <CalendarDays
                  size={17}
                  className="text-[#7C3AED]"
                />
                تاریخ اولین اجرا
              </div>

              <p className="mt-2 text-sm font-bold text-[#302B3A]">
                {firstShowtime
                  ? formatDate(firstShowtime.startDate)
                  : "تاریخ مشخص نشده"}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F7FC] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8A8495]">
                <Clock3
                  size={17}
                  className="text-[#7C3AED]"
                />
                ساعت
              </div>

              <p className="mt-2 text-sm font-bold text-[#302B3A]">
                {firstShowtime
                  ? formatTime(firstShowtime.startDate)
                  : "مشخص نشده"}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F7FC] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8A8495]">
                <MapPin
                  size={17}
                  className="text-[#7C3AED]"
                />
                {event.eventCatagory === "TRAVEL"
                ? "مبدأ حرکت"
                : "محل برگزاری"}
              </div>

              <p className="mt-2 text-sm font-bold text-[#302B3A]">
                {venue?.name ??
                  event.eventVenues ??
                  "مشخص نشده"}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F7FC] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8A8495]">
                <WalletCards
                  size={17}
                  className="text-[#7C3AED]"
                />
                قیمت
              </div>

              <p className="mt-2 text-sm font-extrabold text-[#4C1D95]">
                {event.isFree
                  ? "رایگان"
                  : formatPrice(event.price)}
              </p>
            </div>
          </div>

          {/* Booking */}
          <div className="mt-auto pt-8">
            <div className="mb-4 flex items-center justify-between gap-4 border-t border-[#F0EDF5] pt-5">
              <div>
                <p className="text-xs text-[#8A8495]">
                  شروع قیمت بلیت
                </p>

                <p className="mt-1 text-xl font-extrabold text-[#4C1D95]">
                  {event.isFree
                    ? "رایگان"
                    : formatPrice(event.price)}
                </p>
              </div>

              <span className="rounded-xl bg-[#F3EDFF] px-3 py-2 text-xs font-bold text-[#4C1D95]">
                {event.eventMode === "online"
                  ? "آنلاین"
                  : "حضوری"}
              </span>
            </div>

            {firstShowtime ? (
              <Link
                 href={
                event.eventCatagory === "TRAVEL"
                  ? `/events/${event.slug}/checkout`
                  : `/events/${event.slug}/seats?showtimeId=${firstShowtime.id}`
              }
                className="btn flex w-full items-center justify-center gap-2 shadow-[0_12px_25px_rgba(59,22,120,0.2)]"
              >
                <Ticket size={19} />
                رزرو بلیت
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-[#E8E3F0] px-6 py-4 text-sm font-extrabold text-[#9992A5]"
              >
                سانس در دسترس نیست
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
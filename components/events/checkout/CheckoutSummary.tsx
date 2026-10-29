import {
  Armchair,
  CalendarDays,
  MapPin,
  Ticket,
} from "lucide-react";

import type {
  Event,
  Seat,
  Showtime,
  Venue,
} from "@/types/event";

type Props = {
  event: Event;
  showtime: Showtime;
  venue: Venue;
  selectedSeatObjects: Seat[];
  totalPrice: number;
  isTravelEvent: boolean;
};

export default function CheckoutSummary({
  event,
  showtime,
  venue,
  selectedSeatObjects,
  totalPrice,
  isTravelEvent,
}: Props) {
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("fa-IR", {
      calendar: "persian",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  const formatTime = (date: string) =>
    new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

  return (
    <aside className="lg:sticky lg:top-8 lg:self-start">
      <div className="rounded-[28px] border border-[#E8E3F0] bg-white p-6 shadow-[0_10px_35px_rgba(24,21,31,0.05)]">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0E9FF] text-[#4C1D95]">
            <Ticket size={21} />
          </div>

          <div>
            <h2 className="font-extrabold text-[#27124B]">
              خلاصه رزرو
            </h2>

            <p className="mt-1 text-xs text-[#9992A5]">
              اطلاعات انتخاب‌شده
            </p>
          </div>
        </div>

        <div className="mb-5 rounded-2xl bg-[#F8F7FC] p-4">
          <p className="mb-2 text-[11px] text-[#9992A5]">
            رویداد
          </p>

          <p className="text-sm font-bold leading-6 text-[#302B3A]">
            {event.title}
          </p>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#EEEAF4] p-3">
            <div className="mb-2 flex items-center gap-1.5 text-[#6D28D9]">
              <CalendarDays size={14} />

              <span className="text-[10px] text-[#9992A5]">
                تاریخ
              </span>
            </div>

            <p className="text-xs font-bold leading-5 text-[#302B3A]">
              {formatDate(showtime.startDate)}
            </p>
          </div>

          <div className="rounded-2xl border border-[#EEEAF4] p-3">
            <p className="mb-2 text-[10px] text-[#9992A5]">
              ساعت
            </p>

            <p className="text-xs font-bold text-[#302B3A]">
              {formatTime(showtime.startDate)}
            </p>
          </div>
        </div>

        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-[#EEEAF4] p-4">
          <MapPin
            size={17}
            className="mt-0.5 shrink-0 text-[#6D28D9]"
          />

          <div>
            <p className="text-[10px] text-[#9992A5]">
              محل برگزاری
            </p>

            <p className="mt-1 text-xs font-bold leading-5 text-[#302B3A]">
              {venue.name}
            </p>
          </div>
        </div>

        {!isTravelEvent && (
          <div className="mb-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-bold text-[#302B3A]">
                صندلی‌ها
              </p>

              <span className="rounded-full bg-[#F3EDFF] px-2.5 py-1 text-[10px] font-bold text-[#4C1D95]">
                {selectedSeatObjects.length} صندلی
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedSeatObjects.map((seat) => (
                <div
                  key={seat.id}
                  className="flex items-center gap-1.5 rounded-xl bg-[#27124B] px-3 py-2 text-[10px] font-bold text-white"
                >
                  <Armchair size={12} />

                  <span dir="ltr">
                    {seat.sectionId} / {seat.row}-
                    {seat.number}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-[#EEEAF4] pt-5">
          <div className="flex items-end justify-between gap-4">
            <span className="text-sm font-semibold text-[#77728A]">
              مبلغ کل
            </span>

            <div className="text-left">
              <strong className="block text-2xl font-black text-[#4C1D95]">
                {totalPrice.toLocaleString("fa-IR")}
              </strong>

              <span className="text-[11px] text-[#9992A5]">
                تومان
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
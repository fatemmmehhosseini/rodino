"use client";

import {
  Armchair,
  ChevronRight,
  MapPin,
  Minus,
  Ticket,
} from "lucide-react";

import type {
  Event,
  Seat,
  SeatSection,
  Showtime,
  Venue,
} from "@/types/event";

type Props = {
  event: Event;
  showtime: Showtime;
  venue: Venue;
  sections: SeatSection[];
  selectedSeats: string[];
  selectedSeatObjects: Seat[];
  totalPrice: number;
  isFreeEvent: boolean;
  onToggleSeat: (seatId: string) => void;
  onContinue: () => void;
};

export default function SeatSummary({
  event,
  showtime,
  venue,
  sections,
  selectedSeats,
  selectedSeatObjects,
  totalPrice,
  isFreeEvent,
  onToggleSeat,
  onContinue,
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
    <aside className="lg:sticky lg:top-28">
      <div className="rounded-[28px] border border-[#E8E3F0] bg-white p-6 shadow-[0_10px_35px_rgba(24,21,31,0.05)]">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0E9FF] text-[#4C1D95]">
            <Ticket size={21} />
          </div>

          <div>
            <h2 className="font-extrabold text-[#27124B]">
              خلاصه رزرو
            </h2>

            <p className="mt-1 text-xs text-[#9992A5]">
              اطلاعات انتخاب شما
            </p>
          </div>
        </div>

        {/* Event */}
        <div className="mb-5 rounded-2xl bg-[#F8F7FC] p-4">
          <p className="mb-2 text-[11px] text-[#9992A5]">
            رویداد
          </p>

          <p className="text-sm font-bold leading-6 text-[#302B3A]">
            {event.title}
          </p>
        </div>

        {/* Date / Time */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#EEEAF4] p-3">
            <p className="mb-1 text-[10px] text-[#9992A5]">
              تاریخ
            </p>

            <p className="text-xs font-bold leading-5 text-[#302B3A]">
              {formatDate(showtime.startDate)}
            </p>
          </div>

          <div className="rounded-2xl border border-[#EEEAF4] p-3">
            <p className="mb-1 text-[10px] text-[#9992A5]">
              ساعت
            </p>

            <p className="text-xs font-bold text-[#302B3A]">
              {formatTime(showtime.startDate)}
            </p>
          </div>
        </div>

        {/* Venue */}
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

        {/* Free Event */}
        {isFreeEvent ? (
          <div className="border-t border-[#EEEAF4] pt-5">
            <div className="rounded-2xl bg-[#F8F7FC] px-4 py-5 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0E9FF] text-[#4C1D95]">
                <Ticket size={20} />
              </div>

              <p className="mt-3 text-sm font-extrabold text-[#27124B]">
                ورود رایگان
              </p>

              <p className="mt-1 text-xs leading-5 text-[#9992A5]">
                این رویداد رایگان است و نیازی به پرداخت هزینه ندارد.
              </p>
            </div>

            <button
              type="button"
              onClick={onContinue}
              className="btn mt-5 flex w-full items-center justify-center gap-2 shadow-[0_10px_25px_rgba(59,22,120,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(59,22,120,0.25)]"
            >
              ثبت رزرو رایگان

              <ChevronRight
                size={18}
                className="rotate-180"
              />
            </button>
          </div>
        ) : (
          <>
            {/* Selected Seats */}
            <div className="mb-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-[#302B3A]">
                  صندلی‌های انتخاب‌شده
                </p>

                <span className="rounded-full bg-[#F3EDFF] px-2.5 py-1 text-[10px] font-bold text-[#4C1D95]">
                  {selectedSeats.length} صندلی
                </span>
              </div>

              {selectedSeatObjects.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSeatObjects.map((seat) => {
                    const section = sections.find(
                      (item) => item.id === seat.sectionId
                    );

                    return (
                      <button
                        key={seat.id}
                        type="button"
                        onClick={() => onToggleSeat(seat.id)}
                        className="group flex items-center gap-1.5 rounded-xl bg-[#27124B] px-3 py-2 text-[10px] font-bold text-white"
                      >
                        <span dir="ltr">
                          {section?.name} / {seat.row}-
                          {seat.number}
                        </span>

                        <Minus
                          size={11}
                          className="opacity-60 transition-opacity group-hover:opacity-100"
                        />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[#DCD7E6] px-4 py-5 text-center">
                  <Armchair
                    size={22}
                    className="mx-auto mb-2 text-[#B2AABA]"
                  />

                  <p className="text-xs text-[#9992A5]">
                    هنوز صندلی‌ای انتخاب نکرده‌اید.
                  </p>
                </div>
              )}
            </div>

            {/* Total Price */}
            <div className="border-t border-[#EEEAF4] pt-5">
              <div className="mb-5 flex items-end justify-between gap-4">
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

              <button
                type="button"
                disabled={selectedSeats.length === 0}
                onClick={onContinue}
                className="btn flex w-full items-center justify-center gap-2  shadow-[0_10px_25px_rgba(59,22,120,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(59,22,120,0.25)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none"
              >
                ادامه رزرو

                <ChevronRight
                  size={18}
                  className="rotate-180"
                />
              </button>

              <p className="mt-3 text-center text-[10px] leading-5 text-[#AAA3B2]">
                با ادامه، صندلی‌های انتخاب‌شده برای رزرو شما ثبت می‌شوند.
              </p>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
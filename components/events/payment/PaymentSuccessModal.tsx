"use client";

import {
  Armchair,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  X,
} from "lucide-react";

import type {
  Event,
  Seat,
  Showtime,
  Venue,
} from "@/types/event";

type Props = {
  event: Event;
  showtime?: Showtime;
  venue?: Venue;
  selectedSeatObjects: Seat[];
  totalPrice: number;
  trackingCode: string;
  isTravelEvent: boolean;
  onClose: () => void;
  onBackToEvents: () => void;
};

export default function PaymentSuccessModal({
  event,
  showtime,
  venue,
  selectedSeatObjects,
  totalPrice,
  trackingCode,
  isTravelEvent,
  onClose,
  onBackToEvents,
}: Props) {
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("fa-IR", {
      calendar: "persian",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B102B]/50 px-4 py-5 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-[28px] bg-white p-5 shadow-[0_25px_70px_rgba(24,21,31,0.2)] sm:p-6">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F7FC] text-[#77728A] transition hover:bg-[#EEEAF4]"
        >
          <X size={16} />
        </button>

        {/* Success */}
        <div className="mb-5 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF8F0] text-[#26945A]">
            <CheckCircle2 size={30} />
          </div>

          <h2 className="text-xl font-black text-[#27124B]">
            پرداخت با موفقیت انجام شد
          </h2>

          <p className="mt-1 text-xs text-[#9992A5]">
            رزرو شما با موفقیت ثبت شد.
          </p>
        </div>

        {/* Event */}
        <div className="mb-4 rounded-2xl bg-[#F8F7FC] px-4 py-3">
          <p className="mb-1 text-[10px] text-[#9992A5]">
            رویداد
          </p>

          <p className="text-sm font-bold leading-5 text-[#302B3A]">
            {event.title}
          </p>
        </div>

        {/* Date / Time / Venue */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          {showtime && (
            <>
              <div className="rounded-2xl border border-[#EEEAF4] px-3 py-3">
                <div className="mb-1.5 flex items-center gap-1.5 text-[#6D28D9]">
                  <CalendarDays size={14} />

                  <span className="text-[10px] text-[#9992A5]">
                    تاریخ
                  </span>
                </div>

                <p className="text-[11px] font-bold text-[#302B3A]">
                  {formatDate(showtime.startDate)}
                </p>
              </div>

              <div className="rounded-2xl border border-[#EEEAF4] px-3 py-3">
                <div className="mb-1.5 flex items-center gap-1.5 text-[#6D28D9]">
                  <Clock3 size={14} />

                  <span className="text-[10px] text-[#9992A5]">
                    ساعت
                  </span>
                </div>

                <p className="text-[11px] font-bold text-[#302B3A]">
                  {formatTime(showtime.startDate)}
                </p>
              </div>
            </>
          )}
        </div>

        {venue && (
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-[#EEEAF4] px-4 py-3">
            <MapPin
              size={16}
              className="shrink-0 text-[#6D28D9]"
            />

            <div className="min-w-0">
            <p className="text-[10px] text-[#9992A5]">
                {isTravelEvent ? "مبدأ حرکت" : "محل برگزاری"}
            </p>

            <p className="mt-0.5 truncate text-xs font-bold text-[#302B3A]">
                {venue.name}
            </p>
            </div>
          </div>
        )}

        {/* Seats */}
        {selectedSeatObjects.length > 0 && (
          <div className="mb-4 rounded-2xl border border-[#EEEAF4] px-4 py-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold text-[#302B3A]">
                صندلی‌ها
              </p>

              <span className="rounded-full bg-[#F3EDFF] px-2 py-1 text-[10px] font-bold text-[#4C1D95]">
                {selectedSeatObjects.length} صندلی
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedSeatObjects.map((seat) => (
                <div
                  key={seat.id}
                  className="flex items-center gap-1 rounded-lg bg-[#27124B] px-2.5 py-1.5 text-[9px] font-bold text-white"
                >
                  <Armchair size={11} />

                  <span dir="ltr">
                    {seat.row}-{seat.number}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price + Tracking */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#F8F7FC] px-4 py-3">
            <p className="mb-1 text-[10px] text-[#9992A5]">
              مبلغ پرداختی
            </p>

            <strong className="text-sm font-black text-[#4C1D95]">
              {totalPrice.toLocaleString("fa-IR")}
            </strong>

            <span className="mr-1 text-[9px] text-[#9992A5]">
              تومان
            </span>
          </div>

          <div className="rounded-2xl bg-[#F8F7FC] px-4 py-3">
            <p className="mb-1 text-[10px] text-[#9992A5]">
              شماره پیگیری
            </p>

            <strong
              dir="ltr"
              className="text-sm font-black tracking-wider text-[#302B3A]"
            >
              {trackingCode}
            </strong>
          </div>
        </div>

        {/* Action */}
        <button
          type="button"
          onClick={onBackToEvents}
          className="btn w-full"
        >
          بازگشت به رویدادها
        </button>
      </div>
    </div>
  );
}
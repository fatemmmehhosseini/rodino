"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CirclePlus,
  Pencil,
  Ticket,
  X,
} from "lucide-react";
import { useState } from "react";

import type { Event } from "@/types/event";
import { deleteHostEvent } from "@/store/eventStore";

interface HostEventsProps {
  hostEvents: Event[];
}

const categoryLabels: Record<string, string> = {
  MUSIC: "کنسرت",
  SPORTS: "ورزشی",
  THEATER: "تئاتر",
  TECHNOLOGY: "فناوری",
  TRAVEL: "سفر و گردشگری",
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

const formatPrice = (price?: number) => {
  if (!price) return "رایگان";

  return `${new Intl.NumberFormat("fa-IR").format(price)} تومان`;
};

const getStatusLabel = (event: Event) => {
  if (event.status === "published") return "منتشر شده";
  if (event.status === "draft") return "پیش‌نویس";
  if (event.status === "pending") return "در انتظار بررسی";

  return event.status || "نامشخص";
};

const isValidImageSrc = (src?: string) => {
  if (!src) return false;

  if (src.startsWith("/")) {
    return true;
  }

  if (src.startsWith("data:image/")) {
    return true;
  }

  try {
    const url = new URL(src);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
};

export default function HostEvents({
  hostEvents,
}: HostEventsProps) {
  const [deleteEventId, setDeleteEventId] = useState<number | null>(
    null
  );

  const handleDelete = (eventId: number) => {
    deleteHostEvent(eventId);
    setDeleteEventId(null);
  };

  return (
    <section className="rounded-3xl border border-[#E8E3F0] bg-white p-5 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-black text-[#292532]">
            رویدادهای من
          </h2>

          <p className="mt-1 text-sm text-[#77728A]">
            مدیریت و ویرایش رویدادهای ثبت‌شده
          </p>
        </div>

        <span className="w-fit rounded-full bg-[#F3EDFF] px-3 py-1.5 text-xs font-bold text-[#5B21B6]">
          {hostEvents.length.toLocaleString("fa-IR")} رویداد
        </span>
      </div>

      {hostEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#DCD6E8] bg-[#FAF9FC] px-5 py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3EDFF] text-[#6D28D9]">
            <CalendarDays size={25} />
          </div>

          <h3 className="text-base font-black text-[#403B4A]">
            هنوز رویدادی ثبت نکرده‌اید
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-[#77728A]">
            اولین رویداد خود را ثبت کنید تا مدیریت آن را از این بخش
            انجام دهید.
          </p>

          <Link
            href="/host/events/new"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#4C1D95] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#3D1779]"
          >
            <CirclePlus size={17} />
            ثبت اولین رویداد
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {hostEvents.map((event) => (
            <div
              key={event.id}
              className="group relative flex flex-col rounded-2xl border border-[#ECE8F2] bg-white transition-all duration-200 hover:border-[#D8C7F2] hover:shadow-[0_8px_25px_rgba(24,21,31,0.06)] md:flex-row"
            >
              <div className="absolute left-3 top-3 z-30">
                <button
                  type="button"
                  onClick={() =>
                    setDeleteEventId((current) =>
                      current === event.id ? null : event.id
                    )
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#918B9F] shadow-sm transition hover:bg-red-50 hover:text-red-500"
                  aria-label="حذف رویداد"
                >
                  <X size={16} />
                </button>

                {deleteEventId === event.id && (
                  <div className="absolute left-0 top-10 w-64 rounded-2xl border border-[#E8E3F0] bg-white p-4 shadow-[0_10px_35px_rgba(24,21,31,0.14)]">
                    <p className="text-sm font-bold text-[#292532]">
                      حذف این رویداد؟
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#77728A]">
                      با حذف این رویداد، اطلاعات آن از پنل میزبان حذف می‌شود.
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDeleteEventId(null)}
                        className="flex-1 rounded-xl border border-[#E2D8F0] px-3 py-2 text-xs font-bold text-[#77728A] transition hover:bg-[#F8F7FC]"
                      >
                        انصراف
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(event.id)}
                        className="flex-1 rounded-xl bg-red-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-600"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href={`/events/${event.slug}`}
                className="flex min-w-0 flex-1 flex-col md:flex-row"
              >
                <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-t-2xl bg-[#EEEAF4] md:aspect-auto md:h-[150px] md:w-[220px] md:rounded-r-2xl md:rounded-tl-none md:rounded-bl-none">
                  {isValidImageSrc(event.poster) ? (
                    <Image
                      src={event.poster!}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 220px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[#918B9F]">
                      بدون تصویر
                    </div>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between p-4 sm:p-5">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-lg bg-[#F3EDFF] px-2.5 py-1 text-[11px] font-bold text-[#5B21B6]">
                        {categoryLabels[event.eventCatagory] ??
                          event.eventCatagory}
                      </span>

                      <span className="rounded-lg bg-[#F8F7FC] px-2.5 py-1 text-[11px] font-bold text-[#77728A]">
                        {getStatusLabel(event)}
                      </span>
                    </div>

                    <h3 className="line-clamp-2 text-base font-black text-[#292532]">
                      {event.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#77728A]">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {formatDate(event.salesStartAt)}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Ticket size={14} />
                        {formatPrice(event.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="flex items-center justify-between gap-3 border-t border-[#F0EDF5] p-4 sm:p-5 md:border-t-0 md:border-r md:border-[#F0EDF5]">
                <span className="text-xs text-[#918B9F]">
                  شناسه رویداد: {event.id.toLocaleString("fa-IR")}
                </span>

                <Link
                  href={`/host/events/${event.id}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2D8F0] px-3.5 py-2 text-xs font-bold text-[#5B21B6] transition hover:border-[#CDB5EA] hover:bg-[#F8F4FF]"
                >
                  <Pencil size={14} />
                  ویرایش
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
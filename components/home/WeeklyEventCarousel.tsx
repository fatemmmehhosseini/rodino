"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight, ChevronLeft } from "lucide-react";

import type { Event } from "@/types/event";
import { showtimes } from "@/data/showtimes";

type Props = {
  events: Event[];
};

const categoryLabels: Record<string, string> = {
  MUSIC: "موسیقی",
  SPORTS: "ورزشی",
  THEATER: "تئاتر",
  TECHNOLOGY: "فناوری",
  TRAVEL: "سفر و گردشگری",
};

function formatPrice(price?: number) {
  if (!price) return "رایگان";

  return `${price.toLocaleString("fa-IR")} ریال`;
}

function getFirstShowtime(eventId: number) {
  return showtimes
    .filter((showtime) => showtime.eventId === eventId)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() -
        new Date(b.startDate).getTime()
    )[0];
}

export default function WeeklyEventCarousel({
  events = [],
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "center",
    dragFree: false,
    loop: true,
    slidesToScroll: 1,
    duration: 45,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (!events.length) return null;

  return (
    <div className="relative">
      <div
        ref={emblaRef}
        className="overflow-hidden py-8"
      >
        <div className="-me-5 flex items-center">
          {events.map((event, index) => {
            const showtime = getFirstShowtime(event.id);
            const isActive = index === selectedIndex;

            return (
              <div
                key={event.id}
                className="
                  min-w-0
                  shrink-0
                  grow-0
                  basis-[72%]
                  pe-5
                  sm:basis-[48%]
                  md:basis-[36%]
                  lg:basis-[28%]
                "
              >
                <Link
                  href={`/events/${event.slug}`}
                  aria-label={`مشاهده ${event.title}`}
                  className={`
                    group
                    relative
                    block
                    overflow-hidden
                    rounded-[24px]
                    transition-all
                    duration-500
                    ease-out
                    ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-[0.82] opacity-65"
                    }
                  `}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#E8E5EE]">
                    <Image
                      src={
                        event.poster ||
                        "/images/events/concert.jpg"
                      }
                      alt={event.title}
                      fill
                      sizes="
                        (max-width: 640px) 72vw,
                        (max-width: 1024px) 48vw,
                        28vw
                      "
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                    />

                    {/* Bottom gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                      {/* Category */}
                      <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold backdrop-blur-md">
                        {categoryLabels[event.eventCatagory] ??
                          "رویداد"}
                      </span>

                      {/* Title */}
                      <h3 className="mt-2 line-clamp-2 text-lg font-extrabold leading-8 sm:text-xl">
                        {event.title}
                      </h3>

                      {/* Date + Price */}
                      <div className="mt-3 flex items-center justify-between gap-3">
                        {showtime ? (
                          <p className="text-xs text-white/75">
                            {new Intl.DateTimeFormat("fa-IR", {
                              month: "long",
                              day: "numeric",
                            }).format(
                              new Date(showtime.startDate)
                            )}
                          </p>
                        ) : (
                          <span />
                        )}

                        <span className="text-xs font-bold text-white">
                          {event.isFree
                            ? "رایگان"
                            : formatPrice(event.price)}
                        </span>
                      </div>
                    </div>

                    {/* Active card border */}
                    <div
                      className={`
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-[24px]
                        transition-all
                        duration-500
                        ${
                          isActive
                            ? "ring-1 ring-white/30"
                            : "ring-0"
                        }
                      `}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Previous */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="رویدادهای قبلی"
        className="
          absolute
          right-2
          xl:-right-15
          top-1/2
          hidden
          h-11
          w-11
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-border
          bg-background
          shadow-md
          transition
          hover:bg-surface
          md:flex
        "
      >
        <ChevronRight
          className="h-5 w-5"
          strokeWidth={1.75}
        />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={scrollNext}
        aria-label="رویدادهای بعدی"
        className="
          absolute
          left-2
           xl:-left-15
          top-1/2
          hidden
          h-11
          w-11
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-border
          bg-background
          shadow-md
          transition
          hover:bg-surface
          md:flex
        "
      >
        <ChevronLeft
          className="h-5 w-5"
          strokeWidth={1.75}
        />
      </button>
    </div>
  );
}
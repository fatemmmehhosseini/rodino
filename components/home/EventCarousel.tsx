"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight, ChevronLeft } from "lucide-react";

import EventCard from "./EventCard";
import type { Event } from "@/types/event";

type Props = {
  events: Event[];
};

export default function EventCarousel({ events = [] }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    loop: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const updateButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    updateButtons();

    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi]);

  if (!events.length) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden py-5" ref={emblaRef}>
        <div className="-me-5 flex ">
          {events.map((event) => (
            <div
              key={event.id}
              className="min-w-0 shrink-0 grow-0 basis-[77%] pe-5 sm:basis-[40%] md:basis-[30%] lg:basis-[20%]"
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>

      {/* Next / Previous */}
      <button
        type="button"
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev}
        aria-label="رویدادهای قبلی"
        className="absolute right-2 -bottom-13 xl:-right-15 xl:top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md transition hover:bg-surface disabled:pointer-events-none disabled:opacity-30 md:flex"
      >
        <ChevronRight
          className="h-5 w-5"
          strokeWidth={1.75}
        />
      </button>

      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScrollNext}
        aria-label="رویدادهای بعدی"
        className="absolute left-2 -bottom-13 xl:-left-15 xl:top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md transition hover:bg-surface disabled:pointer-events-none disabled:opacity-30 md:flex"
      >
        <ChevronLeft
          className="h-5 w-5"
          strokeWidth={1.75}
        />
      </button>
    </div>
  );
}
import Link from "next/link";

import { events } from "@/data/events";
import EventCarousel from "./EventCarousel";

export default function SuggestedEvents() {
  const popularEvents = events
    .filter((event) => event.isPopular)
    .slice(0, 10);

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
           

            <h2 className="mt-2 sm:text-3xl font-extrabold text-[#18151F]">
              رویدادهای محبوب
            </h2>

            <p className="hidden sm:block mt-2 text-sm text-[#6B6675]">
              رویدادهایی که بیشتر مورد توجه کاربران قرار گرفته‌اند.
            </p>
          </div>

          <Link
            href="/events?sort=popular"
            className="shrink-0 text-sm font-bold text-[#4C1D95] transition-colors duration-300 hover:text-[#7C3AED]"
          >
            مشاهده همه
          </Link>
        </div>

        {/* Events */}
        <EventCarousel events={popularEvents} />
      </div>
    </section>
  );
}
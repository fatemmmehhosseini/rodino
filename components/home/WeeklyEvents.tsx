import { events } from "@/data/events";
import WeeklyEventCarousel from "./WeeklyEventCarousel";

export default function WeeklyEvents() {
  const weeklyEvents = events.slice(0, 7);

  return (
    <section className="relative overflow-hidden bg-[#F8F7FC] py-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        {/* Main soft glow */}
        <div className="absolute -right-36 -top-36 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#7C3AED]/20 via-[#A855F7]/10 to-[#EC4899]/20 blur-3xl" />

        {/* Small decorative dots */}
        <div className="absolute right-20 top-24 h-3 w-3 rounded-full bg-[#7C3AED]/60" />

        <div className="absolute left-[10%]  top-30 h-4 w-4 rounded-full bg-[#EC4899]/50" />

        <div className="absolute bottom-20 left-24 h-2.5 w-2.5 rounded-full bg-[#A855F7]/50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-violet-100/80 px-5 py-2 text-sm font-bold text-violet-600">
            <span className="h-px w-7 bg-violet-400" />
            این هفته
            <span className="h-px w-7 bg-violet-400" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#18151F] sm:text-4xl lg:text-5xl">
            رویدادهای این هفته
          </h2>

          <p className="mt-5 text-sm leading-8 text-[#77728A] sm:text-base">
             رویدادهایی که این هفته می‌تونن برنامه‌ات رو جذاب‌تر کنن.
          </p>
        </div>

        <WeeklyEventCarousel events={weeklyEvents} />
      </div>
    </section>
  );
}
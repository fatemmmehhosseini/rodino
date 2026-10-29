import {Drama,Laptop,Music2,Plane,Trophy,ArrowUpLeft} from "lucide-react";
import { eventCategories } from "@/data/categories";
import Link from "next/link";

const categoryIcons = {
  MUSIC: Music2,
  SPORTS: Trophy,
  THEATER: Drama,
  TECHNOLOGY: Laptop,
  TRAVEL: Plane,
};

const categoryStyles = {
  MUSIC: {
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    hoverBg: "group-hover:bg-violet-600",
  },
  SPORTS: {
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    hoverBg: "group-hover:bg-emerald-600",
  },
  THEATER: {
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    hoverBg: "group-hover:bg-pink-600",
  },
  TECHNOLOGY: {
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    hoverBg: "group-hover:bg-indigo-600",
  },
  TRAVEL: {
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    hoverBg: "group-hover:bg-cyan-600",
  },
};

export default function EventCategories() {
  return (
    <section className="relative overflow-hidden bg-[#F8F7FC] py-24 sm:py-28">
      {/* Decorative background */}
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-violet-200/70 blur-xl" />

      <div className="absolute right-[8%] top-24 h-3 w-3 rotate-45 rounded-sm bg-violet-500" />

      <div className="absolute bottom-10 left-[8%] h-2 w-2 rounded-full bg-pink-400" />


      {/* Purple decorative line */}
      <div className="pointer-events-none absolute -bottom-2 -right-2 hidden h-44 w-64 sm:block">
        <svg
            viewBox="0 0 270 190"
            fill="none"
            className="h-full w-full"
            aria-hidden="true"
        >
            <path
            d="
                M258 18
                C244 38 226 55 202 60
                C177 65 157 54 160 39
                C163 25 184 22 193 34
                C204 49 193 69 174 84
                C153 100 129 106 116 120
                
                
                
            "
            stroke="#A78BFA"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
        </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}

        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-violet-100/80 px-5 py-2 text-sm font-bold text-violet-600">
            <span className="h-px w-7 bg-violet-400" />
            دسته‌بندی‌ها
            <span className="h-px w-7 bg-violet-400" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#18151F] sm:text-4xl lg:text-5xl">
            رویدادت رو پیدا کن
          </h2>

          <p className="mt-5 text-sm leading-8 text-[#77728A] sm:text-base">
            برای هر سلیقه‌ای، یک تجربه‌ی تازه منتظرته.
          </p>
        </div>

        {/* Categories */}

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 justify-items-center gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:flex lg:items-center lg:justify-center lg:gap-8">
          {eventCategories.map((category) => {
            const Icon =
              categoryIcons[
                category.id as keyof typeof categoryIcons
              ];

            const styles =
              categoryStyles[
                category.id as keyof typeof categoryStyles
              ];

            return (
              <Link
                key={category.id}
                href={`/events?category=${category.id}`}
                className="group relative flex aspect-square w-[145px] flex-col items-center justify-center rounded-full border border-white bg-white/90 p-5 text-center shadow-[0_10px_35px_rgba(76,29,149,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_18px_45px_rgba(76,29,149,0.15)] sm:w-[165px] lg:w-[175px]"
              >
                {/* Decorative ring */}

                <span className="absolute inset-2 rounded-full border border-violet-100/70 transition-all duration-500 group-hover:inset-1 group-hover:border-violet-200" />

                {/* Icon */}

                <span
                  className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full ${styles.iconBg} transition-all duration-500 ${styles.hoverBg} sm:h-16 sm:w-16`}
                >
                  <Icon
                    size={27}
                    strokeWidth={1.8}
                    className={`${styles.iconColor} transition-colors duration-500 group-hover:text-white`}
                  />
                </span>

                {/* Title */}

                <span className="relative z-10 mt-4 text-sm font-bold text-[#18151F] sm:text-base">
                  {category.title}
                </span>

                

                {/* Small decorative dot */}

                <span className="absolute right-8 top-7 h-1.5 w-1.5 rounded-full bg-violet-200 transition-all duration-500 group-hover:scale-150" />
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}

        <div className="mt-14 flex justify-center">
          <Link
            href="/events"
            className=" group inline-flex items-center gap-3 rounded-full bg-violet-100 px-6 py-3 text-sm font-bold transition-all duration-300 hover:bg-violet-200"
          >
            

            مشاهده همه رویدادها
            <ArrowUpLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
"use client";

import { Search } from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";

export default function EventsHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
  searchParams.get("search") ?? ""
);

  const handleSearch = (value: string) => {
    setSearch(value);

    const query = value.trim();

    if (query.length === 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");

      const queryString = params.toString();

      router.replace(
        queryString ? `${pathname}?${queryString}` : pathname,
        {
          scroll: false,
        }
      );

      return;
    }

    if (query.length < 3) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    params.set("search", query);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#F8F7FC] pt-28 pb-8 sm:pt-32 sm:pb-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="absolute -left-24 top-32 h-56 w-56 rounded-full bg-pink-200/20 blur-3xl" />

        <div className="absolute right-[12%] top-24 h-2.5 w-2.5 rounded-full bg-violet-400/50" />
        <div className="absolute bottom-16 left-[18%] h-3 w-3 rounded-full bg-pink-400/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-violet-100/80 px-5 py-2 text-sm font-bold text-violet-600">
            <span className="h-px w-7 bg-violet-400" />
            رودینو
            <span className="h-px w-7 bg-violet-400" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#18151F] sm:text-4xl lg:text-5xl">
            همه رویدادها
          </h1>

          <p className="mt-5 text-sm leading-8 text-[#77728A] sm:text-base">
            رویداد موردعلاقه‌ات رو پیدا کن و تجربه بعدیت رو بساز.
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-3xl">
          <div className="group flex h-16 items-center gap-3 rounded-2xl border border-[#E8E3F0] bg-white px-5 shadow-[0_12px_35px_rgba(76,29,149,0.06)] transition-all duration-300 focus-within:border-violet-300 focus-within:shadow-[0_15px_40px_rgba(76,29,149,0.10)]">
            <Search
              size={22}
              strokeWidth={1.8}
              className="shrink-0 text-[#8A8495] transition-colors duration-300 group-focus-within:text-[#7C3AED]"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="دنبال چه رویدادی می‌گردی؟"
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#18151F] outline-none placeholder:text-[#A09AA9] sm:text-base"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  { title: "همه", value: "" },
  { title: "موسیقی", value: "MUSIC" },
  { title: "ورزشی", value: "SPORTS" },
  { title: "تئاتر", value: "THEATER" },
  { title: "فناوری", value: "TECHNOLOGY" },
  { title: "سفر و گردشگری", value: "TRAVEL" },
];

export default function EventCategories() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory =
    searchParams.get("category") ?? "";

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    const queryString = params.toString();

    router.replace(
      queryString
        ? `${pathname}?${queryString}`
        : pathname,
      {
        scroll: false,
      }
    );
  };

  return (
    <section className="bg-[#F8F7FC] pb-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#18151F]">
            دسته‌بندی‌ها
          </h2>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => {
            const isActive =
              activeCategory === category.value;

            return (
              <button
                key={category.title}
                type="button"
                onClick={() =>
                  handleCategoryChange(category.value)
                }
                className={`
                  shrink-0 rounded-full px-5 py-2.5 text-sm font-bold
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-[#3B1678] text-white shadow-[0_8px_20px_rgba(59,22,120,0.22)]"
                      : "border border-[#E8E3F0] bg-white text-[#6B6675] hover:border-violet-200 hover:bg-violet-50 hover:text-[#4C1D95]"
                  }
                `}
              >
                {category.title}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  CalendarDays,
  MapPin,
  Monitor,
  RotateCcw,
  Check,
  WalletCards,
} from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const sortOptions = [
  {
    value: "",
    label: "مرتبط‌ترین",
  },
  {
    value: "popular",
    label: "محبوب‌ترین",
  },
  {
    value: "date",
    label: "نزدیک‌ترین تاریخ",
  },
  {
    value: "cheapest",
    label: "ارزان‌ترین",
  },
];

const cityOptions = [
  {
    value: "",
    label: "همه شهرها",
  },
  {
    value: "مشهد",
    label: "مشهد",
  },
  {
    value: "تهران",
    label: "تهران",
  },
  {
    value: "اصفهان",
    label: "اصفهان",
  },
];

const dateOptions = [
  {
    value: "",
    label: "همه تاریخ‌ها",
  },
  {
    value: "aban",
    label: "آبان",
  },
  {
    value: "azar",
    label: "آذر",
  },
];

const modeOptions = [
  {
    value: "",
    label: "همه رویدادها",
  },
  {
    value: "in-person",
    label: "حضوری",
  },
  {
    value: "online",
    label: "آنلاین",
  },
];

const priceOptions = [
  {
    value: "",
    label: "همه قیمت‌ها",
  },
  {
    value: "free",
    label: "رایگان",
  },
  {
    value: "paid",
    label: "پولی",
  },
  {
    value: "under-1",
    label: "کمتر از 1 میلیون",
  },
  {
    value: "1-2",
    label: "1 تا 2 میلیون",
  },
  {
    value: "over-2",
    label: "بیشتر از 2 میلیون",
  },
];

type FilterOption = {
  value: string;
  label: string;
};

type FilterDropdownProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
};

function FilterDropdown({
  label,
  icon,
  value,
  options,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedOption =
    options.find((option) => option.value === value) ??
    options[0];

  return (
    <div className="relative">
      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[#403B4A]">
        {icon}
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between rounded-xl border bg-[#FAF9FC] px-3 py-2.5 text-sm transition-all duration-200 ${
          open
            ? "border-[#CBB5EA] bg-white text-[#4C1D95]"
            : "border-[#E8E3F0] text-[#77728A] hover:border-[#D8C7F2]"
        }`}
      >
        <span
          className={
            value ? "font-bold text-[#4C1D95]" : ""
          }
        >
          {selectedOption.label}
        </span>

        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-40 w-full overflow-hidden rounded-2xl border border-[#E8E3F0] bg-white p-1.5 shadow-[0_15px_40px_rgba(24,21,31,0.12)]">
          {options.map((option) => {
            const isActive = value === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-right text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-[#F3EDFF] font-bold text-[#4C1D95]"
                    : "text-[#5F596B] hover:bg-[#F8F7FC] hover:text-[#4C1D95]"
                }`}
              >
                <span>{option.label}</span>

                {isActive && (
                  <Check
                    size={15}
                    strokeWidth={2.2}
                    className="text-[#7C3AED]"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function EventFilters() {
  const [showFilters, setShowFilters] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "";
  const currentCity = searchParams.get("city") ?? "";
  const currentDate = searchParams.get("date") ?? "";
  const currentMode = searchParams.get("mode") ?? "";
  const currentPrice = searchParams.get("price") ?? "";

  const selectedSort =
    sortOptions.find(
      (option) => option.value === currentSort
    ) ?? sortOptions[0];

  const updateParam = (
    key: string,
    value: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
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

  const clearFilters = () => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.delete("city");
    params.delete("date");
    params.delete("mode");
    params.delete("price");

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
    <section className="bg-[#F8F7FC] pb-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex  gap-3 items-center justify-between">
          
          <button
            type="button"
            onClick={() =>
              setShowFilters((prev) => !prev)
            }
            className={`inline-flex w-fit items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
              showFilters
                ? "border-[#D8C7F2] bg-[#F3EDFF] text-[#4C1D95]"
                : "border-[#E8E3F0] bg-white text-[#5F596B] hover:border-[#D8C7F2] hover:bg-[#F8F4FF] hover:text-[#4C1D95]"
            }`}
          >
            <SlidersHorizontal
              size={17}
              strokeWidth={1.8}
            />

            <span>فیلترها</span>

            <ChevronDown
              size={16}
              strokeWidth={1.8}
              className={`transition-transform duration-300 ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          <div className="flex items-center gap-3">
            
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setShowSortMenu((prev) => !prev)
                }
                aria-expanded={showSortMenu}
                className={`inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                  showSortMenu
                    ? "border-[#D8C7F2] text-[#4C1D95]"
                    : "border-[#E8E3F0] text-[#5F596B] hover:border-[#D8C7F2] hover:text-[#4C1D95]"
                }`}
              >
                <span>{selectedSort.label}</span>

                <ChevronDown
                  size={16}
                  strokeWidth={1.8}
                  className={`transition-transform duration-300 ${
                    showSortMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showSortMenu && (
                <div className="absolute left-0 top-[calc(100%+8px)] z-30 min-w-[180px] overflow-hidden rounded-2xl border border-[#E8E3F0] bg-white p-1.5 shadow-[0_15px_40px_rgba(24,21,31,0.12)]">
                  {sortOptions.map((option) => {
                    const isActive =
                      currentSort === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          updateParam(
                            "sort",
                            option.value
                          );
                          setShowSortMenu(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-right text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? "bg-[#F3EDFF] font-bold text-[#4C1D95]"
                            : "text-[#5F596B] hover:bg-[#F8F7FC] hover:text-[#4C1D95]"
                        }`}
                      >
                        <span>{option.label}</span>

                        {isActive && (
                          <Check
                            size={15}
                            strokeWidth={2.2}
                            className="text-[#7C3AED]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* پنل فیلترها */}
        {showFilters && (
          <div className="mt-4 rounded-3xl border border-[#E8E3F0] bg-white p-5 shadow-[0_8px_30px_rgba(24,21,31,0.05)]">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <FilterDropdown
                label="شهر"
                icon={
                  <MapPin
                    size={16}
                    className="text-[#7C3AED]"
                  />
                }
                value={currentCity}
                options={cityOptions}
                onChange={(value) =>
                  updateParam("city", value)
                }
              />

              <FilterDropdown
                label="تاریخ اجرا"
                icon={
                  <CalendarDays
                    size={16}
                    className="text-[#7C3AED]"
                  />
                }
                value={currentDate}
                options={dateOptions}
                onChange={(value) =>
                  updateParam("date", value)
                }
              />

              <FilterDropdown
                label="نوع رویداد"
                icon={
                  <Monitor
                    size={16}
                    className="text-[#7C3AED]"
                  />
                }
                value={currentMode}
                options={modeOptions}
                onChange={(value) =>
                  updateParam("mode", value)
                }
              />

              <FilterDropdown
                label="قیمت"
                icon={
                  <WalletCards
                    size={16}
                    className="text-[#7C3AED]"
                  />
                }
                value={currentPrice}
                options={priceOptions}
                onChange={(value) =>
                  updateParam("price", value)
                }
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#F0EDF5] pt-4">
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#77728A] transition-colors hover:text-[#4C1D95]"
              >
                <RotateCcw
                  size={16}
                  strokeWidth={1.8}
                />
                پاک کردن فیلترها
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowFilters(false)
                }
                className="rounded-xl bg-[#3B1678] px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#4C1D95] hover:shadow-[0_8px_20px_rgba(59,22,120,0.2)]"
              >
                اعمال فیلتر
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

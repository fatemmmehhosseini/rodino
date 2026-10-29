import { Ticket } from "lucide-react";

import type { SeatSection } from "@/types/event";

type Props = {
  sections: SeatSection[];
};

export default function EventTicketSections({
  sections,
}: Props) {
  if (sections.length === 0) return null;

  const totalSeats = sections.reduce(
    (total, section) =>
      total + section.rows * section.seatsPerRow,
    0
  );

  return (
    <section className="mt-6 rounded-[28px] border border-[#E8E3F0] bg-white p-6 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-[#18151F]">
            انواع بلیت
          </h2>

          <p className="mt-2 text-sm text-[#77728A]">
            بخش‌های مختلف سالن و قیمت هر بخش
          </p>
        </div>

        {totalSeats > 0 && (
          <span className="text-xs font-bold text-[#8A8495]">
            ظرفیت صندلی‌ها:{" "}
            {totalSeats.toLocaleString("fa-IR")} صندلی
          </span>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => {
          const sectionSeats =
            section.rows * section.seatsPerRow;

          return (
            <div
              key={section.id}
              className="rounded-2xl border border-[#E8E3F0] bg-[#FAF9FC] p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-extrabold text-[#302B3A]">
                  بخش {section.name}
                </h3>

                <Ticket
                  size={18}
                  className="text-[#7C3AED]"
                />
              </div>

              <p className="mt-4 text-lg font-extrabold text-[#4C1D95]">
                {section.price.toLocaleString("fa-IR")} تومان
              </p>

              <div className="mt-4 space-y-2 text-xs text-[#77728A]">
                <p>
                  {section.rows.toLocaleString("fa-IR")} ردیف
                </p>

                <p>
                  {section.seatsPerRow.toLocaleString("fa-IR")}{" "}
                  صندلی در هر ردیف
                </p>

                <p>
                  ظرفیت:{" "}
                  {sectionSeats.toLocaleString("fa-IR")} صندلی
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
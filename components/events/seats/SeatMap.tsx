"use client";

import {Check,} from "lucide-react";
import type {Event,Seat,SeatSection} from "@/types/event";
import { seats } from "@/data/seats";

type Props = {
  event: Event;
  sections: SeatSection[];
  activeSection?: SeatSection;
  activeSectionId?: number;
  selectedSeats: string[];
  selectedSeatObjects: Seat[];
  isFreeEvent: boolean;
  onSectionChange: (sectionId: number) => void;
  onToggleSeat: (seatId: string) => void;
  onClearSeats: () => void;
};

export default function SeatMap({
  sections,
  activeSection,
  activeSectionId,
  selectedSeats,
  selectedSeatObjects,
  onSectionChange,
  onToggleSeat,
  onClearSeats,
}: Props) {
  const activeSectionIndex = activeSection
    ? sections.findIndex(
        (section) => section.id === activeSection.id
      )
    : -1;

  const activeSectionStartRow =
    activeSectionIndex >= 0
      ? sections
          .slice(0, activeSectionIndex)
          .reduce(
            (total, section) => total + section.rows,
            0
          ) + 1
      : 1;

  const sectionSeats = activeSection
    ? seats.filter(
        (seat) => seat.sectionId === activeSection.id
      )
    : [];

  const getSeat = (
    row: number,
    number: number
  ) => {
    return sectionSeats.find(
      (seat) =>
        seat.row === row &&
        seat.number === number
    );
  };

  return (
    <section className="min-w-0 rounded-[28px] border border-[#E8E3F0] bg-white p-5 shadow-[0_10px_35px_rgba(24,21,31,0.05)] sm:p-7 lg:p-8">
      {/* Section Selector */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-[#27124B]">
              انتخاب بخش
            </h2>

            <p className="mt-1 text-xs text-[#8A8495]">
              قیمت هر بخش متفاوت است.
            </p>
          </div>

          {selectedSeats.length > 0 && (
            <button
              type="button"
              onClick={onClearSeats}
              className="text-xs font-bold text-[#8E4368] transition-colors hover:text-[#4C1D95]"
            >
              پاک کردن انتخاب‌ها
            </button>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {sections.map((section) => {
            const isActive =
              section.id === activeSectionId;

            const selectedCount =
              selectedSeatObjects.filter(
                (seat) =>
                  seat.sectionId === section.id
              ).length;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() =>
                  onSectionChange(section.id)
                }
                className={[
                  "rounded-2xl border p-4 text-right transition-all",
                  isActive
                    ? "border-[#4C1D95] bg-[#F5F0FF] shadow-[0_6px_20px_rgba(76,29,149,0.08)]"
                    : "border-[#E8E3F0] bg-white hover:border-[#B7A7D6] hover:bg-[#FCFAFF]",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={[
                      "flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black",
                      isActive
                        ? "bg-[#4C1D95] text-white"
                        : "bg-[#F3EFF8] text-[#6B6675]",
                    ].join(" ")}
                  >
                    {section.name}
                  </span>

                  {selectedCount > 0 && (
                    <span className="rounded-full bg-[#27124B] px-2 py-1 text-[10px] font-bold text-white">
                      {selectedCount} انتخاب
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm font-extrabold text-[#302B3A]">
                  {section.price.toLocaleString("fa-IR")}

                  <span className="mr-1 text-xs font-medium text-[#8A8495]">
                    تومان
                  </span>
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl bg-[#F8F7FC] px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-[#77728A]">
          <span className="h-4 w-4 rounded-md border border-[#D9D4E3] bg-white" />
          آزاد
        </div>

        <div className="flex items-center gap-2 text-xs text-[#77728A]">
          <span className="h-4 w-4 rounded-md bg-[#27124B]" />
          انتخاب‌شده
        </div>

        <div className="flex items-center gap-2 text-xs text-[#77728A]">
          <span className="h-4 w-4 rounded-md bg-[#D9D5DE]" />
          رزروشده
        </div>
      </div>

      {/* Stage */}
       <div className="mb-12 px-3 sm:px-10">
       <div className="mx-auto max-w-xl">
        <div className="relative flex items-center justify-center gap-4">
        
        <div className="flex h-20 w-8 flex-col items-center justify-end">
            <div className="h-14 w-1 rounded-full bg-gradient-to-b from-[#8E4368] to-[#27124B]" />
            <div className="h-2 w-8 rounded-full bg-[#27124B]" />
        </div>

        
        <div className="relative flex-1">
            <div className="h-14 rounded-t-[50%] rounded-b-[18px] bg-gradient-to-r from-[#27124B] via-[#5C2B72] to-[#8E4368] shadow-[0_12px_30px_rgba(39,18,75,0.18)]">
            <div className="flex h-full items-center justify-center">
                <span className="text-xs font-extrabold text-white sm:text-sm">
                صحنه / جایگاه
                </span>
            </div>
            </div>

            <div className="absolute inset-x-8 bottom-0 h-px bg-white/30" />
        </div>

        
        <div className="flex h-20 w-8 flex-col items-center justify-end">
            <div className="h-14 w-1 rounded-full bg-gradient-to-b from-[#8E4368] to-[#27124B]" />
            <div className="h-2 w-8 rounded-full bg-[#27124B]" />
        </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-[#AAA3B2]">
        نمای صندلی‌ها از دید تماشاگر
        </p>
    </div>
    </div>

      {/* Seats */}
      {activeSection && (
        <div className="overflow-x-auto pb-3">
          <div className="mx-auto min-w-[520px]">
            <div className="mb-5 flex items-center justify-between px-3">
              <div>
                <p className="text-sm font-bold text-[#27124B]">
                  بخش {activeSection.name}
                </p>

                <p className="mt-1 text-xs text-[#9992A5]">
                  {activeSection.rows} ردیف ×{" "}
                  {activeSection.seatsPerRow} صندلی
                </p>
              </div>

              <span className="rounded-full bg-[#F3EDFF] px-3 py-1.5 text-xs font-bold text-[#4C1D95]">
                {activeSection.price.toLocaleString(
                  "fa-IR"
                )}{" "}
                تومان
              </span>
            </div>

            <div className="space-y-3">
              {Array.from(
                { length: activeSection.rows },
                (_, rowIndex) => {
                  const rowNumber =
                    activeSectionStartRow + rowIndex;

                  return (
                    <div
                      key={rowNumber}
                      className="flex items-center justify-center gap-2"
                    >
                      {/* Row Number */}
                      <span className="flex h-9 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F8F7FC] text-[11px] font-bold text-[#9992A5]">
                        {rowNumber}
                      </span>

                      {/* Seats */}
                      <div className="flex gap-1.5 sm:gap-2">
                        {Array.from(
                          {
                            length:
                              activeSection.seatsPerRow,
                          },
                          (_, seatIndex) => {
                            const seatNumber =
                              seatIndex + 1;

                            const seat = getSeat(
                              rowNumber,
                              seatNumber
                            );

                            if (!seat) {
                              return null;
                            }

                            const isSelected =
                              selectedSeats.includes(
                                seat.id
                              );

                            return (
                              <button
                                key={seat.id}
                                type="button"
                                onClick={() =>
                                  onToggleSeat(seat.id)
                                }
                                aria-label={`ردیف ${rowNumber} صندلی ${seatNumber}`}
                                aria-pressed={isSelected}
                                className={[
                                  "group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-[10px] font-bold transition-all duration-200 sm:h-10 sm:w-10",
                                  isSelected
                                    ? "border-[#27124B] bg-[#27124B] text-white shadow-[0_5px_14px_rgba(39,18,75,0.25)]"
                                    : "border-[#DCD7E6] bg-white text-[#77728A] hover:-translate-y-0.5 hover:border-[#6D28D9] hover:bg-[#F7F3FF] hover:text-[#4C1D95]",
                                ].join(" ")}
                              >
                                {isSelected ? (
                                  <Check size={15} />
                                ) : (
                                  seatNumber
                                )}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
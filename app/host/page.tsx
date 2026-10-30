"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ChevronLeft, CirclePlus } from "lucide-react";

import { getHostEvents,subscribeToHostEvents } from "@/store/eventStore";
import type { Event } from "@/types/event";
import HostInfo from "@/components/host/HostInfo";
import HostEvents from "@/components/host/HostEvents";

const EMPTY_EVENTS: Event[] = [];

export default function HostPage() {



 const hostEvents = useSyncExternalStore(
  subscribeToHostEvents,
  getHostEvents,
  () => EMPTY_EVENTS
);

  const activeEvents = hostEvents.filter(
  (event) =>
    event.status === "published" &&
    new Date(event.salesEndAt) >= new Date()
);
  const completedEvents = hostEvents.filter(
    (event) => new Date(event.salesEndAt) < new Date()
  );

  return (
    <main className="min-h-screen bg-[#F8F7FC] pt-28 pb-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#77728A]">
              <span>رودینو</span>
              <ChevronLeft size={15} />
              <span>پنل میزبان</span>
            </div>

            <h1 className="text-2xl font-black text-[#292532] sm:text-3xl">
              پنل میزبان
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#77728A]">
              مدیریت رویدادها و اطلاعات برگزارکننده
            </p>
          </div>

          <Link
            href="/host/events/new"
            className="btn inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#4C1D95]/15"
          >
            <CirclePlus size={18} />
            ثبت رویداد جدید
          </Link>
        </div>

        <HostInfo
          hostEvents={hostEvents}
          activeEvents={activeEvents}
          completedEvents={completedEvents}
        />

        <HostEvents hostEvents={hostEvents} />
      </div>
    </main>
  );
}
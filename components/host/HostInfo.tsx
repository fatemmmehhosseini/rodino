"use client";

import {
  CalendarDays,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  ShieldCheck,
  Ticket,
  UserRound,
} from "lucide-react";

import { providers } from "@/data/providers";
import type { Event } from "@/types/event";

interface HostInfoProps {
  hostEvents: Event[];
  activeEvents: Event[];
  completedEvents: Event[];
}

export default function HostInfo({
  hostEvents,
  activeEvents,
  completedEvents,
}: HostInfoProps) {
  const provider = providers.find(
    (item) => item.id === 1
  );

  if (!provider) {
    return null;
  }

  return (
    <>
      {/* Provider information */}
      <section className="mb-6 rounded-3xl border border-[#E8E3F0] bg-white p-5 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F3EDFF] text-[#5B21B6]">
              <UserRound
                size={25}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-black text-[#292532]">
                  {provider.brandName}
                </h2>

                {provider.isActive && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF3] px-2.5 py-1 text-xs font-bold text-[#16803C]">
                    <CheckCircle2 size={13} />
                    {provider.status}
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-[#77728A]">
                {provider.description}
              </p>
            </div>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#F8F7FC] px-3 py-2 text-xs font-bold text-[#625C70]">
            <ShieldCheck
              size={15}
              className="text-[#7C3AED]"
            />
            {provider.userType === "legal"
              ? "شخص حقوقی"
              : "شخص حقیقی"}
          </div>
        </div>

        {/* Basic information */}
        <div className="grid gap-3 border-t border-[#F0EDF5] pt-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#FAF9FC] p-4">
            <p className="mb-1 text-xs font-medium text-[#918B9F]">
              نام برند
            </p>

            <p className="text-sm font-bold text-[#403B4A]">
              {provider.brandName}
            </p>
          </div>

          <div className="rounded-2xl bg-[#FAF9FC] p-4">
            <p className="mb-1 text-xs font-medium text-[#918B9F]">
              نام حقوقی
            </p>

            <p className="text-sm font-bold text-[#403B4A]">
              {provider.legalName}
            </p>
          </div>

          <div className="rounded-2xl bg-[#FAF9FC] p-4">
            <p className="mb-1 text-xs font-medium text-[#918B9F]">
              شماره تماس
            </p>

            <a
              href={`tel:${provider.phone}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#403B4A] transition hover:text-[#5B21B6]"
            >
              <Phone
                size={15}
                className="text-[#7C3AED]"
              />
              {provider.phone}
            </a>
          </div>

          <div className="rounded-2xl bg-[#FAF9FC] p-4">
            <p className="mb-1 text-xs font-medium text-[#918B9F]">
              ایمیل
            </p>

            <a
              href={`mailto:${provider.email}`}
              className="inline-flex items-center gap-2 break-all text-sm font-bold text-[#403B4A] transition hover:text-[#5B21B6]"
            >
              <Mail
                size={15}
                className="shrink-0 text-[#7C3AED]"
              />
              {provider.email}
            </a>
          </div>

          <div className="rounded-2xl bg-[#FAF9FC] p-4 sm:col-span-2">
            <p className="mb-1 text-xs font-medium text-[#918B9F]">
              وب‌سایت
            </p>

            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 break-all text-sm font-bold text-[#403B4A] transition hover:text-[#5B21B6]"
            >
              <Globe
                size={15}
                className="shrink-0 text-[#7C3AED]"
              />
              {provider.website}
            </a>
          </div>
        </div>

        {/* Verification */}
        {provider.licenseVerified && (
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[#D1FAE5] bg-[#F0FDF4] px-4 py-3">
            <ShieldCheck
              size={18}
              className="shrink-0 text-[#16803C]"
            />

            <div>
              <p className="text-sm font-bold text-[#166534]">
                مجوز برگزارکننده تأیید شده است
              </p>

              <p className="mt-0.5 text-xs text-[#4D7C5A]">
                اطلاعات هویتی و مجوز فعالیت برگزارکننده بررسی شده است.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Statistics */}
      <section className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-[#E8E3F0] bg-white p-5 shadow-[0_8px_30px_rgba(24,21,31,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3EDFF] text-[#6D28D9]">
              <CalendarDays size={20} />
            </div>

            <span className="text-xs font-medium text-[#918B9F]">
              مجموع
            </span>
          </div>

          <p className="text-2xl font-black text-[#292532]">
            {hostEvents.length.toLocaleString("fa-IR")}
          </p>

          <p className="mt-1 text-sm text-[#77728A]">
            رویداد
          </p>
        </div>

        <div className="rounded-3xl border border-[#E8E3F0] bg-white p-5 shadow-[0_8px_30px_rgba(24,21,31,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#16803C]">
              <CheckCircle2 size={20} />
            </div>

            <span className="text-xs font-medium text-[#918B9F]">
              فعال
            </span>
          </div>

          <p className="text-2xl font-black text-[#292532]">
            {activeEvents.length.toLocaleString("fa-IR")}
          </p>

          <p className="mt-1 text-sm text-[#77728A]">
            رویداد فعال
          </p>
        </div>

        <div className="rounded-3xl border border-[#E8E3F0] bg-white p-5 shadow-[0_8px_30px_rgba(24,21,31,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF7ED] text-[#C2410C]">
              <Ticket size={20} />
            </div>

            <span className="text-xs font-medium text-[#918B9F]">
              پایان‌یافته
            </span>
          </div>

          <p className="text-2xl font-black text-[#292532]">
            {completedEvents.length.toLocaleString("fa-IR")}
          </p>

          <p className="mt-1 text-sm text-[#77728A]">
            رویداد پایان‌یافته
          </p>
        </div>
      </section>
    </>
  );
}
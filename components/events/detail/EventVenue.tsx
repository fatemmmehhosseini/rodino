import { MapPin, Users } from "lucide-react";

import type { Venue } from "@/types/event";

type Props = {
  venue?: Venue;
};

export default function EventVenue({ venue }: Props) {
  if (!venue) return null;

  return (
    <section className="mt-6 rounded-[28px] border border-[#E8E3F0] bg-white p-6 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-[#18151F]">
          محل برگزاری
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl bg-[#F8F7FC] p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8A8495]">
            <MapPin
              size={17}
              className="text-[#7C3AED]"
            />
            نام محل
          </div>

          <p className="mt-3 font-bold text-[#302B3A]">
            {venue.name}
          </p>

          <p className="mt-2 text-sm text-[#77728A]">
            {venue.address}
          </p>
        </div>

        <div className="rounded-2xl bg-[#F8F7FC] p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8A8495]">
            <Users
              size={17}
              className="text-[#7C3AED]"
            />
            ظرفیت سالن
          </div>

          <p className="mt-3 font-bold text-[#302B3A]">
            {venue.capacity.toLocaleString("fa-IR")} نفر
          </p>

          <p className="mt-2 text-sm text-[#77728A]">
            {venue.city}
          </p>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type {Event,Seat,SeatSection,Showtime,Venue,} from "@/types/event";

import { seats } from "@/data/seats";
import { useReservationStore } from "@/store/reservationStore";

import SeatMap from "@/components/events/seats/SeatMap";
import SeatSummary from "@/components/events/seats/SeatSummary";
import PaymentSuccessModal from "../payment/PaymentSuccessModal";

type Props = {
  event: Event;
  showtime: Showtime;
  venue: Venue;
  sections: SeatSection[];
};

export default function SeatBooking({
  event,
  showtime,
  venue,
  sections,
}: Props) {
  const router = useRouter();

  const setReservation = useReservationStore(
    (state) => state.setReservation
  );

  const isFreeEvent = event.isFree;

  const paidSections = useMemo(
    () =>
      isFreeEvent
        ? []
        : sections.filter((section) => section.price > 0),
    [isFreeEvent, sections]
  );

  const [selectedSeats, setSelectedSeats] = useState<string[]>(
    []
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<
    number | undefined
  >(paidSections[0]?.id);

  const activeSection = paidSections.find(
    (section) => section.id === activeSectionId
  );

  const selectedSeatObjects = useMemo(() => {
    if (isFreeEvent) {
      return [];
    }

    return selectedSeats
      .map((seatId) =>
        seats.find((seat) => seat.id === seatId)
      )
      .filter((seat): seat is Seat => Boolean(seat));
  }, [isFreeEvent, selectedSeats]);

  const totalPrice = useMemo(() => {
    if (isFreeEvent) {
      return 0;
    }

    return selectedSeatObjects.reduce(
      (total, seat) => {
        const section = paidSections.find(
          (item) => item.id === seat.sectionId
        );

        if (!section) {
          return total;
        }

        return total + section.price;
      },
      0
    );
  }, [
    isFreeEvent,
    selectedSeatObjects,
    paidSections,
  ]);

  const toggleSeat = (seatId: string) => {
    if (isFreeEvent) {
      return;
    }

    setSelectedSeats((current) =>
      current.includes(seatId)
        ? current.filter((id) => id !== seatId)
        : [...current, seatId]
    );
  };

  const clearSeats = () => {
    setSelectedSeats([]);
  };

  const handleSectionChange = (sectionId: number) => {
    setActiveSectionId(sectionId);
  };

  const handleContinue = () => {
    if (!isFreeEvent && selectedSeats.length === 0) {
      return;
    }

    if (isFreeEvent) {
       setShowSuccessModal(true);
      return;
    }

    setReservation({
      eventId: event.id,
      showtimeId: showtime.id,
      venueId: venue.id,
      selectedSeatIds: selectedSeats,
      totalPrice,
    });

    router.push(
      `/events/${event.slug}/checkout`
    );
  };

  return (
    <main className="min-h-screen bg-[#F8F7FC] pb-24 pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#F0E9FF] px-4 py-2 text-xs font-bold text-[#4C1D95]">
            رزرو بلیت
          </div>

          <h1 className="text-2xl font-black text-[#18151F] sm:text-3xl lg:text-4xl">
            انتخاب صندلی
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#77728A] sm:text-base">
            صندلی موردنظر خود را انتخاب کنید و سپس به مرحله بعد بروید.
          </p>
        </div>

       {/* Event information */}
        <section className="mb-8 rounded-[28px] border border-[#E8E3F0] bg-white p-5 shadow-[0_10px_35px_rgba(24,21,31,0.05)] sm:p-6">
        <div className="flex flex-col gap-5">
            <div>
            <h2 className="text-lg font-extrabold text-[#27124B] sm:text-xl">
                {event.title}
            </h2>

            <p className="mt-1 text-sm text-[#8A8495]">
                اطلاعات سانس انتخاب‌شده
            </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
            {/* Date */}
            <div className="rounded-2xl bg-[#F8F7FC] p-4">
                <p className="text-xs text-[#9992A5]">
                تاریخ
                </p>

                <p className="mt-1 text-sm font-bold text-[#302B3A]">
                {new Intl.DateTimeFormat("fa-IR", {
                    calendar: "persian",
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                }).format(new Date(showtime.startDate))}
                </p>
            </div>

            {/* Time */}
            <div className="rounded-2xl bg-[#F8F7FC] p-4">
                <p className="text-xs text-[#9992A5]">
                ساعت
                </p>

                <p className="mt-1 text-sm font-bold text-[#302B3A]">
                {new Intl.DateTimeFormat("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                }).format(new Date(showtime.startDate))}
                </p>
            </div>

            {/* Venue */}
            <div className="rounded-2xl bg-[#F8F7FC] p-4">
                <p className="text-xs text-[#9992A5]">
                محل برگزاری
                </p>

                <p className="mt-1 text-sm font-bold text-[#302B3A]">
                {venue.name}
                </p>
            </div>
            </div>
        </div>
        </section>

        {/* Main */}
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_350px]">
          <SeatMap
            event={event}
            sections={paidSections}
            activeSection={activeSection}
            activeSectionId={activeSectionId}
            selectedSeats={selectedSeats}
            selectedSeatObjects={selectedSeatObjects}
            isFreeEvent={isFreeEvent}
            onSectionChange={handleSectionChange}
            onToggleSeat={toggleSeat}
            onClearSeats={clearSeats}
          />

          <SeatSummary
            event={event}
            showtime={showtime}
            venue={venue}
            sections={paidSections}
            selectedSeats={selectedSeats}
            selectedSeatObjects={selectedSeatObjects}
            totalPrice={totalPrice}
            isFreeEvent={isFreeEvent}
            onToggleSeat={toggleSeat}
            onContinue={handleContinue}
          />
        </div>
      </div>
      {showSuccessModal && (
      <PaymentSuccessModal
        event={event}
        showtime={showtime}
        venue={venue}
        selectedSeatObjects={[]}
        totalPrice={0}
        trackingCode="—"
        isTravelEvent={false}
        onClose={() => setShowSuccessModal(false)}
        onBackToEvents={() => router.push("/events")}
      />
    )}
    </main>
  );
}
"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";


import { events } from "@/data/events";
import { showtimes } from "@/data/showtimes";
import { venues } from "@/data/venues";
import { seats } from "@/data/seats";

import { useReservationStore } from "@/store/reservationStore";
import PaymentSuccessModal from "./PaymentSuccessModal";
import PaymentFailedModal from "./PaymentFailedModal";

export default function PaymentPageContent() {
  const router = useRouter();
  const params = useParams();

  const slug = String(params.slug);

  const {
    showtimeId,
    venueId,
    selectedSeatIds,
    totalPrice: reservationTotalPrice,
  } = useReservationStore();

  const [paymentResult, setPaymentResult] = useState<
    "success" | "failed" | null
  >(null);

  const [trackingCode, setTrackingCode] = useState("");

  const event = events.find(
    (item) => item.slug === slug
  );

  const isTravelEvent =
    event?.eventCatagory === "TRAVEL";

  const totalPrice = isTravelEvent
    ? event?.price
      ? event.price / 10
      : 0
    : reservationTotalPrice;

  const showtime = isTravelEvent
    ? event
      ? showtimes.find(
          (item) => item.eventId === event.id
        )
      : undefined
    : showtimes.find(
        (item) => item.id === showtimeId
      );

  const venue = isTravelEvent
    ? showtime
      ? venues.find(
          (item) => item.id === showtime.venueId
        )
      : undefined
    : venues.find(
        (item) => item.id === venueId
      );

  const selectedSeatObjects = useMemo(() => {
    if (isTravelEvent) {
        return [];
    }

    return selectedSeatIds
        .map((seatId) =>
        seats.find((seat) => seat.id === seatId)
        )
        .filter(
        (seat): seat is NonNullable<typeof seat> =>
            Boolean(seat)
        );
    }, [isTravelEvent, selectedSeatIds]);



  const handleSuccess = () => {
    const code = String(
      Math.floor(100000 + Math.random() * 900000)
    );

    setTrackingCode(code);
    setPaymentResult("success");
  };

  const handleFailure = () => {
    setPaymentResult("failed");
  };

  const handleClose = () => {
    setPaymentResult(null);
  };

  const handleBackToEvents = () => {
    router.push("/events");
  };

  if (!event) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FBFAFD] px-4 pb-10 pt-25 sm:px-6 lg:px-10">
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
        <div className="w-full rounded-[28px] border border-[#E8E3F0] bg-white p-6 shadow-[0_10px_35px_rgba(24,21,31,0.05)] sm:p-8">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-bold text-[#8E4368]">
              پرداخت
            </p>

            <h1 className="text-2xl font-black text-[#27124B] sm:text-3xl">
              پرداخت هزینه رزرو
            </h1>
          </div>

          <div className="mb-8 rounded-2xl bg-[#F8F7FC] p-5 text-center">
            <p className="mb-2 text-xs text-[#9992A5]">
              مبلغ قابل پرداخت
            </p>

            <strong className="text-3xl font-black text-[#4C1D95]">
              {totalPrice.toLocaleString("fa-IR")}
            </strong>

            <span className="mr-2 text-xs text-[#9992A5]">
              تومان
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleSuccess}
              className="btn"
            >
              پرداخت موفق
            </button>

            <button
              type="button"
              onClick={handleFailure}
              className="rounded-2xl border border-[#E4DFEA] bg-white px-5 py-4 text-sm font-bold text-[#6F687A] transition hover:bg-[#F8F7FC]"
            >
              پرداخت ناموفق
            </button>
          </div>
        </div>
      </div>

     {paymentResult === "success" && (
        <PaymentSuccessModal
            event={event}
            showtime={showtime}
            venue={venue}
            selectedSeatObjects={selectedSeatObjects}
            totalPrice={totalPrice}
            trackingCode={trackingCode}
            isTravelEvent={isTravelEvent}
            onClose={handleClose}
            onBackToEvents={handleBackToEvents}
        />
        )}

        {paymentResult === "failed" && (
        <PaymentFailedModal
            onClose={handleClose}
            onBackToEvents={handleBackToEvents}
        />
        )}
    </main>
  );
}
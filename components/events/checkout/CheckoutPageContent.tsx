"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { events } from "@/data/events";
import { showtimes } from "@/data/showtimes";
import { venues } from "@/data/venues";
import { seats } from "@/data/seats";

import type { Seat } from "@/types/event";

import { useReservationStore } from "@/store/reservationStore";

import CheckoutForm from "@/components/events/checkout/CheckoutForm";
import CheckoutSummary from "@/components/events/checkout/CheckoutSummary";

export default function CheckoutPageContent() {
  const router = useRouter();
  const params = useParams();

  const slug = String(params.slug);

  const {
    eventId,
    showtimeId,
    venueId,
    selectedSeatIds,
    totalPrice: reservationTotalPrice,
  } = useReservationStore();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const eventFromSlug = events.find(
    (item) => item.slug === slug
  );

  const isTravelEvent =
    eventFromSlug?.eventCatagory === "TRAVEL";

  const event = isTravelEvent
    ? eventFromSlug
    : events.find((item) => item.id === eventId);

  const resolvedTotalPrice = isTravelEvent
    ? eventFromSlug?.price
      ? eventFromSlug.price / 10
      : 0
    : reservationTotalPrice;

  const showtime = showtimes.find(
    (item) => item.id === showtimeId
  );

  const venue = venues.find(
    (item) => item.id === venueId
  );

  const resolvedShowtime = isTravelEvent
    ? eventFromSlug
      ? showtimes.find(
          (item) => item.eventId === eventFromSlug.id
        )
      : undefined
    : showtime;

  const resolvedVenue = isTravelEvent
    ? resolvedShowtime
      ? venues.find(
          (item) => item.id === resolvedShowtime.venueId
        )
      : undefined
    : venue;

  const selectedSeatObjects = useMemo(() => {
    if (isTravelEvent) {
      return [];
    }

    return selectedSeatIds
      .map((seatId) =>
        seats.find((seat) => seat.id === seatId)
      )
      .filter(
        (seat): seat is Seat => Boolean(seat)
      );
  }, [isTravelEvent, selectedSeatIds]);

  useEffect(() => {
    if (isTravelEvent) {
      return;
    }

    if (!eventId || !showtimeId || !venueId) {
      router.replace(
        `/events/${slug}/seats`
      );
    }
  }, [
    eventId,
    showtimeId,
    venueId,
    router,
    slug,
    isTravelEvent,
  ]);

  if (
    !event ||
    !resolvedShowtime ||
    !resolvedVenue
  ) {
    return null;
  }

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    let isValid = true;

    setFullNameError("");
    setPhoneError("");

    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();

    if (trimmedName.length < 3) {
      setFullNameError(
        "لطفاً نام و نام خانوادگی را وارد کنید."
      );

      isValid = false;
    }

    const phoneRegex = /^09\d{9}$/;

    if (!phoneRegex.test(trimmedPhone)) {
      setPhoneError(
        "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود."
      );

      isValid = false;
    }

    if (!isValid) {
      return;
    }

    router.push(
  `/events/${event.slug}/payment`
);
  };

  const isFormValid =
  fullName.trim().length >= 3 &&
  /^09\d{9}$/.test(phone.trim());

  return (
    <main className="min-h-screen bg-[#FBFAFD] px-4 pb-10 pt-25 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <button
            type="button"
            onClick={handleBack}
            className="mb-5 flex items-center gap-2 text-sm font-bold text-[#77728A] transition-colors hover:text-[#4C1D95]"
          >
            <ArrowRight size={18} />

            {isTravelEvent
              ? "بازگشت به اطلاعات سفر"
              : "بازگشت به انتخاب صندلی"}
          </button>

          <div>
            <p className="mb-2 text-xs font-bold text-[#8E4368]">
              مرحله دوم رزرو
            </p>

            <h1 className="text-2xl font-black text-[#27124B] sm:text-3xl">
              تکمیل رزرو
            </h1>

            <p className="mt-2 text-sm text-[#9992A5]">
              اطلاعات خود را وارد کنید تا رزرو شما تکمیل شود.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <CheckoutForm
            fullName={fullName}
            phone={phone}
            onFullNameChange={(value) => {
              setFullName(value);

              if (fullNameError) {
                setFullNameError("");
              }
            }}
            onPhoneChange={(value) => {
              setPhone(value);

              if (phoneError) {
                setPhoneError("");
              }
            }}
            fullNameError={fullNameError}
            phoneError={phoneError}
            onContinue={handleContinue}
            disabled={!isFormValid}
          />

          <CheckoutSummary
            event={event}
            showtime={resolvedShowtime}
            venue={resolvedVenue}
            selectedSeatObjects={selectedSeatObjects}
            totalPrice={resolvedTotalPrice}
            isTravelEvent={isTravelEvent}
          />
        </div>
      </div>
    </main>
  );
}
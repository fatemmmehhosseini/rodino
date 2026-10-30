"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Save, ArrowRight } from "lucide-react";

import type { Event } from "@/types/event";
import { addHostEvent } from "@/store/eventStore";
import {
  validateEventForm,
  type EventValidationErrors,
} from "@/utils/eventValidation";

import EventBasicForm from "@/components/host/EventBasicForm";
import EventCategoryForm from "@/components/host/EventCategoryForm";

export type Category =
  | "MUSIC"
  | "SPORTS"
  | "THEATER"
  | "TECHNOLOGY"
  | "TRAVEL";

export type FormState = {
  title: string;
  description: string;

  eventMode: "online" | "in-person";
  category: Category;
  subCategory: string;

  salesStartAt: string;
  salesEndAt: string;

  cityId: string;
  eventVenues: string;
  venueId: string;

  isFree: boolean;
  price: string;

  poster: string;

  artistName: string;
  musicGenre: string;
  durationMinutes: string;
  musicHasInterval: boolean;
  musicStageType: string;
  ageRestriction: string;

  sportType: string;
  matchType: string;
  homeTeam: string;
  awayTeam: string;
  leagueName: string;
  ageGroup: string;
  genderCategory: string;
  varEnabled: boolean;
  matchImportance: string;
  standingArea: boolean;

  playTitle: string;
  director: string;
  actCount: string;
  theaterHasInterval: boolean;
  theaterDurationMinutes: string;
  ageSuitability: string;
  theaterStageType: string;

  techEventType: string;
  techStack: string;
  tracks: string;
  prizePool: string;
  requiresLaptop: boolean;
  demoDay: boolean;
  apiProvided: boolean;

  tourType: string;
  destination: string;
  origin: string;
  transportation: string;
  durationDays: string;
  accommodation: string;
  localGuide: boolean;
  includesInsurance: boolean;
};

const initialForm: FormState = {
  title: "",
  description: "",

  eventMode: "in-person",
  category: "MUSIC",
  subCategory: "",

  salesStartAt: "",
  salesEndAt: "",

  cityId: "",
  eventVenues: "",
  venueId: "",

  isFree: false,
  price: "",

  poster: "",

  artistName: "",
  musicGenre: "",
  durationMinutes: "",
  musicHasInterval: false,
  musicStageType: "",
  ageRestriction: "",

  sportType: "",
  matchType: "",
  homeTeam: "",
  awayTeam: "",
  leagueName: "",
  ageGroup: "",
  genderCategory: "",
  varEnabled: false,
  matchImportance: "",
  standingArea: false,

  playTitle: "",
  director: "",
  actCount: "",
  theaterHasInterval: false,
  theaterDurationMinutes: "",
  ageSuitability: "",
  theaterStageType: "",

  techEventType: "",
  techStack: "",
  tracks: "",
  prizePool: "",
  requiresLaptop: false,
  demoDay: false,
  apiProvided: false,

  tourType: "",
  destination: "",
  origin: "",
  transportation: "",
  durationDays: "",
  accommodation: "",
  localGuide: false,
  includesInsurance: false,
};

const categoryLabels: Record<Category, string> = {
  MUSIC: "کنسرت",
  SPORTS: "ورزشی",
  THEATER: "تئاتر",
  TECHNOLOGY: "فناوری",
  TRAVEL: "سفر و گردشگری",
};

export default function NewHostEventPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<EventValidationErrors>({});

 
  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setErrors((current) => {
      if (!current[key as keyof EventValidationErrors]) {
        return current;
      }

      const updatedErrors = { ...current };
      delete updatedErrors[key as keyof EventValidationErrors];

      return updatedErrors;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateEventForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const eventId = Date.now();

    const newEvent: Event = {
      id: eventId,
      providerId: 1,

      eventMode: form.eventMode,

      isFree: form.isFree,
      isPopular: false,

      eventCatagory: form.category,
      eventSubCatagory: form.subCategory,

      title: form.title,
      description: form.description,

      slug: form.title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-"),

      salesStartAt: form.salesStartAt,
      salesEndAt: form.salesEndAt,

      cityId: Number(form.cityId),

      eventVenues: form.eventVenues,
      venueId: Number(form.venueId),

      curencyId: "تومان",

      price: form.isFree ? 0 : Number(form.price),

      poster:
        form.poster || "/images/events/concert.jpg",

      status: "published",
      eventStatus: "قابل فروش",
    };
  
/*
 * Only the Event is persisted.
 *
 * MetaEvent fields are only used to build the form
 * and are not persisted yet.
 */

    addHostEvent(newEvent);

    setForm({ ...initialForm });
    setErrors({});
    router.push("/host");
  };

  return (
    <main className="min-h-screen bg-[#F8F7FC] pt-28 pb-12">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#77728A]">
            <Link
              href="/host"
              className="transition hover:text-[#5B21B6]"
            >
              پنل میزبان
            </Link>

            <ChevronLeft size={15} />

            <span>ثبت رویداد</span>
          </div>

          <h1 className="text-2xl font-black text-[#292532] sm:text-3xl">
            ثبت رویداد جدید
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#77728A]">
            اطلاعات رویداد را مطابق ساختار رودینو وارد کنید.
          </p>
        </div>

        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <EventBasicForm
            form={form}
            updateField={updateField}
            categoryLabels={categoryLabels}
            errors={errors}
          />

          <EventCategoryForm
            form={form}
            updateField={updateField}
          />

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/host"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E2D8F0] bg-white px-5 py-3 text-sm font-bold text-[#625C70] transition hover:bg-[#F8F4FF]"
            >
              <ArrowRight size={17} />
              انصراف
            </Link>

            <button
              type="submit"
              className="btn inline-flex items-center justify-center gap-2"
            >
              <Save size={17} />
              ثبت رویداد
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
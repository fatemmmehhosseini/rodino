"use client";

import {
  FormEvent,
  Suspense,
  use,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Save,
} from "lucide-react";

import type { Event } from "@/types/event";
import {
  getHostEvents,
  subscribeToHostEvents,
  updateHostEvent,
} from "@/store/eventStore";

import {
  validateEventForm,
  type EventValidationErrors,
} from "@/utils/eventValidation";

import EventBasicForm from "@/components/host/EventBasicForm";
import EventCategoryForm from "@/components/host/EventCategoryForm";

import type {
  Category,
  FormState,
} from "../../new/page";

const categoryLabels: Record<Category, string> = {
  MUSIC: "کنسرت",
  SPORTS: "ورزشی",
  THEATER: "تئاتر",
  TECHNOLOGY: "فناوری",
  TRAVEL: "سفر و گردشگری",
};

const EMPTY_EVENTS: Event[] = [];

const emptyForm: FormState = {
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

function eventToForm(event: Event): FormState {
  return {
    ...emptyForm,
    title: event.title,
    description: event.description ?? "",
    eventMode: event.eventMode,
    category: event.eventCatagory as Category,
    subCategory: event.eventSubCatagory ?? "",
    salesStartAt: event.salesStartAt,
    salesEndAt: event.salesEndAt,
    cityId: event.cityId?.toString() ?? "",
    eventVenues: event.eventVenues ?? "",
    venueId: event.venueId?.toString() ?? "",
    isFree: event.isFree,
    price: event.price?.toString() ?? "",
    poster: event.poster ?? "",
  };
}

type EditEventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function EditEventContent({
  params,
}: EditEventPageProps) {
  const router = useRouter();

  const { id } = use(params);

  const eventId = Number(id);

  const hostEvents = useSyncExternalStore(
    subscribeToHostEvents,
    getHostEvents,
    () => EMPTY_EVENTS
  );

  const currentEvent =
    Number.isFinite(eventId)
      ? hostEvents.find(
          (event) => event.id === eventId
        )
      : undefined;

  const eventNotFound =
    !Number.isFinite(eventId) ||
    !currentEvent;

  const [form, setForm] =
    useState<FormState | null>(() => {
      if (!currentEvent) {
        return null;
      }

      return eventToForm(currentEvent);
    });

  const [loadedEventId, setLoadedEventId] =
    useState<number | null>(
      currentEvent?.id ?? null
    );

  const [errors, setErrors] =
    useState<EventValidationErrors>({});

  const [isSaving, setIsSaving] =
    useState(false);

  if (
    currentEvent &&
    loadedEventId !== currentEvent.id
  ) {
    setForm(eventToForm(currentEvent));
    setLoadedEventId(currentEvent.id);
    setErrors({});
  }

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        [key]: value,
      };
    });

    setErrors((current) => {
      if (!current[key as keyof EventValidationErrors]) {
        return current;
      }

      const updatedErrors = { ...current };

      delete updatedErrors[
        key as keyof EventValidationErrors
      ];

      return updatedErrors;
    });
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form || !currentEvent) {
      return;
    }

    const validationErrors =
      validateEventForm(form);

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSaving(true);

    const updatedEvent: Event = {
      ...currentEvent,
      eventMode: form.eventMode,
      isFree: form.isFree,
      eventCatagory: form.category,
      eventSubCatagory:
        form.subCategory,
      title: form.title,
      description:
        form.description,
      slug: form.title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-"),
      salesStartAt:
        form.salesStartAt,
      salesEndAt:
        form.salesEndAt,
      cityId:
        Number(form.cityId),
      eventVenues:
        form.eventVenues,
      venueId:
        Number(form.venueId),
      curencyId: "تومان",
      price: form.isFree
        ? 0
        : Number(form.price),
      poster:
        form.poster ||
        "/images/events/concert.jpg",
    };

    updateHostEvent(
      eventId,
      updatedEvent
    );

    router.push("/host");
  };

  if (eventNotFound) {
    return (
      <main className="min-h-screen bg-[#F8F7FC] pt-28 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#E8E3F0] bg-white p-8 text-center">
            <h1 className="text-xl font-black text-[#292532]">
              رویداد پیدا نشد
            </h1>

            <p className="mt-2 text-sm text-[#77728A]">
              رویدادی با این شناسه وجود ندارد.
            </p>

            <Link
              href="/host"
              className="btn mt-6 inline-flex items-center gap-2"
            >
              <ArrowRight size={17} />
              بازگشت به پنل میزبان
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!form) {
    return (
      <main className="min-h-screen bg-[#F8F7FC] pt-28 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#E8E3F0] bg-white p-8 text-center text-sm text-[#77728A]">
            در حال دریافت اطلاعات رویداد...
          </div>
        </div>
      </main>
    );
  }

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

            <ArrowRight size={15} />

            <span>ویرایش رویداد</span>
          </div>

          <h1 className="text-2xl font-black text-[#292532] sm:text-3xl">
            ویرایش رویداد
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#77728A]">
            اطلاعات رویداد را ویرایش و تغییرات را ذخیره کنید.
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
              disabled={isSaving}
              className="btn inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />

              {isSaving
                ? "در حال ذخیره..."
                : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function EditHostEventPage(
  props: EditEventPageProps
) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F8F7FC] pt-28 pb-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-[#E8E3F0] bg-white p-8 text-center text-sm text-[#77728A]">
              در حال دریافت اطلاعات رویداد...
            </div>
          </div>
        </main>
      }
    >
      <EditEventContent {...props} />
    </Suspense>
  );
}
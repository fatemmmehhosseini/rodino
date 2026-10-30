"use client";

import type { Category, FormState } from "@/app/host/events/new/page";
import type { EventValidationErrors } from "@/utils/eventValidation";
import Image from "next/image";

const inputClass =
  "w-full rounded-xl border border-[#E5E0EC] bg-white px-4 py-3 text-sm text-[#292532] outline-none transition placeholder:text-[#A19BAA] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10";

const labelClass =
  "mb-2 block text-sm font-bold text-[#403B4A]";

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 border-b border-[#F0EDF5] pb-4">
      <h2 className="text-lg font-black text-[#292532]">
        {children}
      </h2>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>

      {children}

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E5E0EC] bg-[#FAF9FC] px-4 py-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-[#5B21B6]"
      />

      <span className="text-sm font-bold text-[#403B4A]">
        {label}
      </span>
    </label>
  );
}

type Props = {
  form: FormState;
  updateField: <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => void;
  categoryLabels: Record<Category, string>;
  errors: EventValidationErrors;
};

export default function EventBasicForm({
  form,
  updateField,
  categoryLabels,
  errors,
}: Props) {
  return (
    <>
      {/* Basic information */}
      <section className="rounded-3xl border border-[#E8E3F0] bg-white p-5 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-6">
        <SectionTitle>اطلاعات اصلی رویداد</SectionTitle>

        <div className="grid gap-5">
          <Field
            label="عنوان رویداد"
            error={errors.title}
          >
            <input
              required
              value={form.title}
              onChange={(event) =>
                updateField("title", event.target.value)
              }
              placeholder="مثلاً کنسرت شب‌های رودینو"
              className={inputClass}
            />
          </Field>

          <Field
            label="توضیحات"
            error={errors.description}
          >
            <textarea
              rows={4}
              value={form.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value
                )
              }
              placeholder="توضیحات مربوط به رویداد"
              className={inputClass}
            />
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="دسته‌بندی">
              <select
                value={form.category}
                onChange={(event) =>
                  updateField(
                    "category",
                    event.target.value as Category
                  )
                }
                className={inputClass}
              >
                {Object.entries(categoryLabels).map(
                  ([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  )
                )}
              </select>
            </Field>

            <Field
              label="زیر دسته"
              error={errors.subCategory}
            >
              <input
                value={form.subCategory}
                onChange={(event) =>
                  updateField(
                    "subCategory",
                    event.target.value
                  )
                }
                placeholder="زیر دسته رویداد"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="نوع برگزاری">
              <select
                value={form.eventMode}
                onChange={(event) =>
                  updateField(
                    "eventMode",
                    event.target.value as
                      | "online"
                      | "in-person"
                  )
                }
                className={inputClass}
              >
                <option value="in-person">
                  حضوری
                </option>

                <option value="online">
                  آنلاین
                </option>
              </select>
            </Field>

            <Field label="تصویر پوستر">
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-[#DCD6E8] bg-[#FAF9FC] px-4 py-5 text-sm font-bold text-[#77728A] transition hover:border-[#BFA4E8] hover:bg-[#F8F4FF]">
                  <span>
                    {form.poster
                      ? "تغییر تصویر"
                      : "انتخاب تصویر"}
                  </span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];

                      if (!file) {
                        return;
                      }

                      // Limit poster size to 2MB.
                      if (file.size > 2 * 1024 * 1024) {
                        alert(
                          "حجم تصویر نباید بیشتر از ۲ مگابایت باشد."
                        );

                        event.target.value = "";
                        return;
                      }

                      const reader = new FileReader();

                      reader.onload = () => {
                        if (
                          typeof reader.result !== "string"
                        ) {
                          return;
                        }

                        updateField(
                          "poster",
                          reader.result
                        );
                      };

                      reader.readAsDataURL(file);
                    }}
                  />
                </label>

                {form.poster && (
                  <div className="overflow-hidden rounded-2xl border border-[#E8E3F0] bg-[#F8F7FC]">
                    <Image
                      src={form.poster}
                      alt="پیش‌نمایش پوستر رویداد"
                      width={800}
                      height={450}
                      unoptimized
                      
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </Field>
          </div>
        </div>
      </section>

      {/* Sales */}
      <section className="rounded-3xl border border-[#E8E3F0] bg-white p-5 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-6">
        <SectionTitle>زمان و فروش</SectionTitle>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="شروع فروش"
            error={errors.salesStartAt}
          >
            <input
              required
              type="datetime-local"
              value={form.salesStartAt}
              onChange={(event) =>
                updateField(
                  "salesStartAt",
                  event.target.value
                )
              }
              className={inputClass}
            />
          </Field>

          <Field
            label="پایان فروش"
            error={errors.salesEndAt}
          >
            <input
              required
              type="datetime-local"
              value={form.salesEndAt}
              onChange={(event) =>
                updateField(
                  "salesEndAt",
                  event.target.value
                )
              }
              className={inputClass}
            />
          </Field>

          <Checkbox
            checked={form.isFree}
            onChange={(value) =>
              updateField("isFree", value)
            }
            label="این رویداد رایگان است"
          />

          {!form.isFree && (
            <Field
              label="قیمت"
              error={errors.price}
            >
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(event) =>
                  updateField(
                    "price",
                    event.target.value
                  )
                }
                placeholder="قیمت به تومان"
                className={inputClass}
              />
            </Field>
          )}
        </div>
      </section>

      {/* Location */}
      <section className="rounded-3xl border border-[#E8E3F0] bg-white p-5 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-6">
        <SectionTitle>مکان برگزاری</SectionTitle>

        <div className="grid gap-5 md:grid-cols-3">
          <Field
            label="شناسه شهر"
            error={errors.cityId}
          >
            <input
              type="number"
              value={form.cityId}
              onChange={(event) =>
                updateField(
                  "cityId",
                  event.target.value
                )
              }
              className={inputClass}
            />
          </Field>

          <Field
            label="محل برگزاری"
            error={errors.eventVenues}
          >
            <input
              value={form.eventVenues}
              onChange={(event) =>
                updateField(
                  "eventVenues",
                  event.target.value
                )
              }
              placeholder="نام سالن یا محل"
              className={inputClass}
            />
          </Field>

          <Field
            label="شناسه محل"
            error={errors.venueId}
          >
            <input
              type="number"
              value={form.venueId}
              onChange={(event) =>
                updateField(
                  "venueId",
                  event.target.value
                )
              }
              className={inputClass}
            />
          </Field>
        </div>
      </section>
    </>
  );
}
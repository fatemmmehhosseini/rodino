"use client";

import type { FormState } from "@/app/host/events/new/page";

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
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
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
        onChange={(event) =>
          onChange(event.target.checked)
        }
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
};

export default function EventCategoryForm({
  form,
  updateField,
}: Props) {
  return (
    <>
      {/* MUSIC */}
      {form.category === "MUSIC" && (
        <section className="rounded-3xl border border-[#E8E3F0] bg-white p-5 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-6">
          <SectionTitle>
            اطلاعات موسیقی
          </SectionTitle>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="نام هنرمند / گروه">
              <input
                value={form.artistName}
                onChange={(event) =>
                  updateField(
                    "artistName",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="سبک موسیقی">
              <input
                value={form.musicGenre}
                onChange={(event) =>
                  updateField(
                    "musicGenre",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="مدت زمان">
              <input
                type="number"
                value={form.durationMinutes}
                onChange={(event) =>
                  updateField(
                    "durationMinutes",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="نوع صحنه">
              <input
                value={form.musicStageType}
                onChange={(event) =>
                  updateField(
                    "musicStageType",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="محدودیت سنی">
              <input
                value={form.ageRestriction}
                onChange={(event) =>
                  updateField(
                    "ageRestriction",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Checkbox
              checked={form.musicHasInterval}
              onChange={(value) =>
                updateField(
                  "musicHasInterval",
                  value
                )
              }
              label="دارای زمان استراحت"
            />
          </div>
        </section>
      )}

      {/* SPORTS */}
      {form.category === "SPORTS" && (
        <section className="rounded-3xl border border-[#E8E3F0] bg-white p-5 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-6">
          <SectionTitle>
            اطلاعات ورزشی
          </SectionTitle>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="نوع ورزش">
              <input
                value={form.sportType}
                onChange={(event) =>
                  updateField(
                    "sportType",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="نوع مسابقه">
              <input
                value={form.matchType}
                onChange={(event) =>
                  updateField(
                    "matchType",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="تیم میزبان">
              <input
                value={form.homeTeam}
                onChange={(event) =>
                  updateField(
                    "homeTeam",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="تیم مهمان">
              <input
                value={form.awayTeam}
                onChange={(event) =>
                  updateField(
                    "awayTeam",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="نام لیگ">
              <input
                value={form.leagueName}
                onChange={(event) =>
                  updateField(
                    "leagueName",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="رده سنی">
              <input
                value={form.ageGroup}
                onChange={(event) =>
                  updateField(
                    "ageGroup",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="دسته جنسیتی">
              <input
                value={form.genderCategory}
                onChange={(event) =>
                  updateField(
                    "genderCategory",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="اهمیت مسابقه">
              <input
                value={form.matchImportance}
                onChange={(event) =>
                  updateField(
                    "matchImportance",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Checkbox
              checked={form.varEnabled}
              onChange={(value) =>
                updateField(
                  "varEnabled",
                  value
                )
              }
              label="VAR فعال است"
            />

            <Checkbox
              checked={form.standingArea}
              onChange={(value) =>
                updateField(
                  "standingArea",
                  value
                )
              }
              label="دارای جایگاه ایستاده"
            />
          </div>
        </section>
      )}

      {/* THEATER */}
      {form.category === "THEATER" && (
        <section className="rounded-3xl border border-[#E8E3F0] bg-white p-5 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-6">
          <SectionTitle>
            اطلاعات تئاتر
          </SectionTitle>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="نام نمایش">
              <input
                value={form.playTitle}
                onChange={(event) =>
                  updateField(
                    "playTitle",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="کارگردان">
              <input
                value={form.director}
                onChange={(event) =>
                  updateField(
                    "director",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="تعداد پرده">
              <input
                type="number"
                value={form.actCount}
                onChange={(event) =>
                  updateField(
                    "actCount",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="مدت زمان">
              <input
                type="number"
                value={form.theaterDurationMinutes}
                onChange={(event) =>
                  updateField(
                    "theaterDurationMinutes",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="مناسب برای">
              <input
                value={form.ageSuitability}
                onChange={(event) =>
                  updateField(
                    "ageSuitability",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="نوع صحنه">
              <input
                value={form.theaterStageType}
                onChange={(event) =>
                  updateField(
                    "theaterStageType",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Checkbox
              checked={form.theaterHasInterval}
              onChange={(value) =>
                updateField(
                  "theaterHasInterval",
                  value
                )
              }
              label="دارای زمان استراحت"
            />
          </div>
        </section>
      )}

      {/* TECHNOLOGY */}
      {form.category === "TECHNOLOGY" && (
        <section className="rounded-3xl border border-[#E8E3F0] bg-white p-5 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-6">
          <SectionTitle>
            اطلاعات فناوری
          </SectionTitle>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="نوع رویداد">
              <input
                value={form.techEventType}
                onChange={(event) =>
                  updateField(
                    "techEventType",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="فناوری‌ها">
              <input
                value={form.techStack}
                onChange={(event) =>
                  updateField(
                    "techStack",
                    event.target.value
                  )
                }
                placeholder="مثلاً AI, Machine Learning"
                className={inputClass}
              />
            </Field>

            <Field label="محورها">
              <input
                value={form.tracks}
                onChange={(event) =>
                  updateField(
                    "tracks",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="جایزه">
              <input
                value={form.prizePool}
                onChange={(event) =>
                  updateField(
                    "prizePool",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Checkbox
              checked={form.requiresLaptop}
              onChange={(value) =>
                updateField(
                  "requiresLaptop",
                  value
                )
              }
              label="نیاز به لپ‌تاپ دارد"
            />

            <Checkbox
              checked={form.demoDay}
              onChange={(value) =>
                updateField(
                  "demoDay",
                  value
                )
              }
              label="دارای Demo Day"
            />

            <Checkbox
              checked={form.apiProvided}
              onChange={(value) =>
                updateField(
                  "apiProvided",
                  value
                )
              }
              label="API ارائه می‌شود"
            />
          </div>
        </section>
      )}

      {/* TRAVEL */}
      {form.category === "TRAVEL" && (
        <section className="rounded-3xl border border-[#E8E3F0] bg-white p-5 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-6">
          <SectionTitle>
            اطلاعات سفر و گردشگری
          </SectionTitle>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="نوع تور">
              <input
                value={form.tourType}
                onChange={(event) =>
                  updateField(
                    "tourType",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="مقصد">
              <input
                value={form.destination}
                onChange={(event) =>
                  updateField(
                    "destination",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="مبدا">
              <input
                value={form.origin}
                onChange={(event) =>
                  updateField(
                    "origin",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="حمل‌ونقل">
              <input
                value={form.transportation}
                onChange={(event) =>
                  updateField(
                    "transportation",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="مدت سفر">
              <input
                type="number"
                value={form.durationDays}
                onChange={(event) =>
                  updateField(
                    "durationDays",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="اقامت">
              <input
                value={form.accommodation}
                onChange={(event) =>
                  updateField(
                    "accommodation",
                    event.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Checkbox
              checked={form.localGuide}
              onChange={(value) =>
                updateField(
                  "localGuide",
                  value
                )
              }
              label="دارای راهنمای محلی"
            />

            <Checkbox
              checked={form.includesInsurance}
              onChange={(value) =>
                updateField(
                  "includesInsurance",
                  value
                )
              }
              label="شامل بیمه است"
            />
          </div>
        </section>
      )}
    </>
  );
}
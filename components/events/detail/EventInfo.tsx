import { metaEvents } from "@/data/metaEvents";

type Props = {
  eventId: number;
  category: string;
};

type InfoItem = {
  label: string;
  value: string;
};

const labels: Record<string, string> = {
  "music.artistName": "هنرمند / گروه",
  "music.musicGenre": "سبک موسیقی",
  "music.durationMinutes": "مدت اجرا",
  "music.hasInterval": "زمان استراحت",
  "music.stageType": "نوع صحنه",
  "music.ageRestriction": "محدودیت سنی",

  "sportType": "نوع ورزش",
  "matchType": "نوع مسابقه",
  "homeTeam": "تیم میزبان",
  "awayTeam": "تیم مهمان",
  "leagueName": "نام لیگ",
  "ageGroup": "رده سنی",
  "genderCategory": "دسته‌بندی جنسیتی",
  "varEnabled": "VAR",
  "matchImportance": "اهمیت مسابقه",
  "standingArea": "جایگاه ایستاده",

  "theater.playTitle": "عنوان نمایش",
  "theater.director": "کارگردان",
  "theater.actCount": "تعداد پرده",
  "theater.hasInterval": "زمان استراحت",
  "theater.durationMinutes": "مدت اجرا",
  "theater.ageSuitability": "مناسب برای",
  "theater.stageType": "نوع صحنه",

  "tech.eventType": "نوع رویداد",
  "tech.techStack": "تکنولوژی‌ها",
  "tech.tracks": "مسیرها",
  "tech.prizePool": "مجموع جوایز",
  "tech.requiresLaptop": "نیاز به لپ‌تاپ",
  "tech.demoDay": "Demo Day",
  "tech.apiProvided": "API ارائه می‌شود",

  "tour.tourType": "نوع تور",
  "tour.destination": "مقصد",
  "tour.origin": "مبدا",
  "tour.transportation": "حمل‌ونقل",
  "tour.durationDays": "مدت سفر",
  "tour.accommodation": "اقامت",
  "tour.localGuide": "راهنمای محلی",
  "tour.includesInsurance": "بیمه",
};

const categoryKeys: Record<string, string[]> = {
  MUSIC: [
    "music.artistName",
    "music.musicGenre",
    "music.durationMinutes",
    "music.hasInterval",
    "music.stageType",
    "music.ageRestriction",
  ],

  SPORTS: [
    "sportType",
    "matchType",
    "homeTeam",
    "awayTeam",
    "leagueName",
    "ageGroup",
    "genderCategory",
    "varEnabled",
    "matchImportance",
    "standingArea",
  ],

  THEATER: [
    "theater.playTitle",
    "theater.director",
    "theater.actCount",
    "theater.hasInterval",
    "theater.durationMinutes",
    "theater.ageSuitability",
    "theater.stageType",
  ],

  TECHNOLOGY: [
    "tech.eventType",
    "tech.techStack",
    "tech.tracks",
    "tech.prizePool",
    "tech.requiresLaptop",
    "tech.demoDay",
    "tech.apiProvided",
  ],

  TRAVEL: [
    "tour.tourType",
    "tour.destination",
    "tour.origin",
    "tour.transportation",
    "tour.durationDays",
    "tour.accommodation",
    "tour.localGuide",
    "tour.includesInsurance",
  ],
};

function formatValue(key: string, value: string) {
  if (value === "true") return "دارد";
  if (value === "false") return "ندارد";

  if (key === "music.ageRestriction") {
    return `بالای ${value} سال`;
  }

  if (key === "music.durationMinutes") {
    return `${value} دقیقه`;
  }

  if (key === "theater.durationMinutes") {
    return `${value} دقیقه`;
  }

  if (key === "theater.actCount") {
    return `${value} پرده`;
  }

  if (key === "tour.durationDays") {
    return `${value} روز`;
  }

  if (key === "tech.techStack" || key === "tech.tracks") {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed.join("، ");
      }
    } catch {
      
    }
  }

  return value;
}

export default function EventInfo({
  eventId,
  category,
}: Props) {
  const keys = categoryKeys[category] ?? [];

  const items: InfoItem[] = keys
    .map((key) => {
      const meta = metaEvents.find(
        (item) =>
          item.eventId === eventId &&
          item.key === key
      );

      if (!meta) return null;

      return {
        label: labels[key] ?? key,
        value: formatValue(key, meta.value),
      };
    })
    .filter((item): item is InfoItem => item !== null);

  if (items.length === 0) return null;

  return (
    <section className="mt-6 rounded-[28px] border border-[#E8E3F0] bg-white p-6 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-[#18151F]">
          اطلاعات رویداد
        </h2>
      </div>

      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.label}>
            <span className="text-xs text-[#8A8495]">
              {item.label}
            </span>

            <p className="mt-1 text-sm font-bold text-[#302B3A]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
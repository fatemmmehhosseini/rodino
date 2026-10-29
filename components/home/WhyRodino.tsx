import {
  Ticket,
  ShieldCheck,
  Sparkles,
  CalendarDays,
} from "lucide-react";

const features = [
  {
    icon: Ticket,
    title: "رزرو سریع و آسان",
    description:
      "رویدادت رو پیدا کن، بلیتت رو انتخاب کن و به‌سادگی رزرو کن.",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: ShieldCheck,
    title: "پرداخت امن",
    description:
      "فرآیند خرید با امنیت بالا و خیال راحت انجام می‌شه.",
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    icon: CalendarDays,
    title: "تنوع رویدادها",
    description:
      "از کنسرت و تئاتر تا ورزش، فناوری و تجربه‌های سفر.",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: Sparkles,
    title: "تجربه‌های تازه",
    description:
      "رویدادهای جدید رو کشف کن و برای خودت تجربه‌ای متفاوت بساز.",
    color: "bg-fuchsia-100 text-fuchsia-600",
  },
];

export default function WhyRodino() {
  return (
    <section className="relative overflow-hidden bg-[#F8F7FC] py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        {/* Main glow */}
        <div className="absolute -right-48 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-200/40 via-fuchsia-100/30 to-transparent blur-3xl" />

        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-pink-200/20 blur-3xl" />

        {/* Decorative dots */}
        <div className="absolute right-[8%] top-24 h-3 w-3 rounded-full bg-violet-400/50" />

        <div className="absolute left-[12%] bottom-20 h-4 w-4 rounded-full bg-pink-400/40" />

        <div className="absolute right-[18%] bottom-12 h-2.5 w-2.5 rounded-full bg-fuchsia-400/40" />

        {/* Decorative ring */}
        <div className="absolute -right-16 top-10 h-40 w-40 rounded-full border border-violet-300/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Intro */}
          <div className="text-center lg:text-right">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-violet-100/80 px-5 py-2 text-sm font-bold text-violet-600">
              <span className="h-px w-7 bg-violet-400" />
              رودینو
              <span className="h-px w-7 bg-violet-400" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#18151F] sm:text-4xl lg:text-5xl">
              چرا رودینو؟
            </h2>

            <p className="mx-auto mt-6 max-w-lg text-sm leading-8 text-[#77728A] sm:text-base lg:mx-0">
              رودینو کمک می‌کنه رویدادهای موردعلاقه‌ات رو راحت‌تر پیدا کنی،
              انتخاب کنی و برای تجربه‌های جدید آماده بشی.
            </p>

            {/* Decorative line */}
            <div className="mx-auto mt-8 flex items-center justify-center gap-2 lg:mx-0 lg:justify-start">
              <span className="h-1.5 w-10 rounded-full bg-[#47238692]" />
              <span className="h-1.5 w-3 rounded-full bg-[#8f48ec8f]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#a23b80a6]" />
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#EAE6F1]
                    bg-white/80
                    p-6
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-violet-200
                    hover:bg-white
                    hover:shadow-[0_18px_40px_rgba(76,29,149,0.09)]
                  "
                >
                  {/* Card accent */}
                  <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-gradient-to-br from-violet-100/70 to-transparent transition-transform duration-500 group-hover:scale-125" />

                  <div
                    className={`relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} transition-all duration-300 group-hover:scale-105`}
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3 className="relative text-base font-bold text-[#18151F]">
                    {feature.title}
                  </h3>

                  <p className="relative mt-2 text-sm leading-7 text-[#77728A]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
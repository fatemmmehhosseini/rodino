import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    src: "/images/banners/technology.png",
    alt: "رویدادهای فناوری و هوش مصنوعی",
    eyebrow: "فناوری و نوآوری",
    href: "/events?category=TECHNOLOGY",
  },
  {
    src: "/images/banners/travel.png",
    alt: "سفر و ماجراجویی",
    eyebrow: "سفر و ماجراجویی",
    href: "/events?category=TRAVEL",
  },
];

export default function ExperienceBanner() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 -z-30 bg-[#100A1C]" />

      {/* Mesh gradient */}
      <div
        className="absolute inset-0 -z-20 opacity-90"
        style={{
          background: `
            radial-gradient(
              circle at 12% 20%,
              rgba(124,58,237,0.32) 0%,
              transparent 30%
            ),
            radial-gradient(
              circle at 88% 18%,
              rgba(6,182,212,0.25) 0%,
              transparent 28%
            ),
            radial-gradient(
              circle at 50% 100%,
              rgba(236,72,153,0.20) 0%,
              transparent 38%
            ),
            radial-gradient(
              circle at 50% 45%,
              rgba(76,29,149,0.14) 0%,
              transparent 45%
            )
          `,
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.075]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.7) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.7) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "55px 55px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute -right-32 top-[-180px] -z-10 h-[500px] w-[500px] rounded-full border border-white/[0.07] sm:h-[650px] sm:w-[650px]" />

      <div className="absolute -right-20 top-[-110px] -z-10 h-[360px] w-[360px] rounded-full border border-[#A78BFA]/10 sm:h-[480px] sm:w-[480px]" />

      <div className="absolute -bottom-48 -left-40 -z-10 h-[500px] w-[500px] rounded-full border border-[#22D3EE]/10" />

      {/* Lights */}
      <div className="absolute left-[8%] top-[20%] -z-10 h-2 w-2 rounded-full bg-[#A78BFA] shadow-[0_0_35px_12px_rgba(167,139,250,0.35)]" />

      <div className="absolute bottom-[18%] right-[18%] -z-10 h-1.5 w-1.5 rounded-full bg-[#67E8F9] shadow-[0_0_30px_10px_rgba(103,232,249,0.35)]" />

      {/* Diagonal lines */}
      <div className="absolute left-[-5%] top-[38%] -z-10 h-px w-[38%] rotate-[-18deg] bg-gradient-to-r from-transparent via-[#A78BFA]/20 to-transparent" />

      <div className="absolute bottom-[30%] right-[-5%] -z-10 h-px w-[35%] rotate-[18deg] bg-gradient-to-r from-transparent via-[#22D3EE]/20 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-12 lg:mb-14">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_12px_rgba(167,139,250,0.8)]" />

              <span className="text-sm font-bold text-[#C4B5FD]">
                تجربه‌هایی برای تو
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[42px]">
              بیشتر کشف کن
            </h2>
          </div>

          
        </div>

        {/* Banners */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
          {banners.map((banner, index) => (
            <Link
              key={banner.href}
              href={banner.href}
              aria-label={`مشاهده رویدادهای ${banner.eyebrow}`}
              className="group relative block cursor-pointer"
            >
              {/* Colored glow */}
              <div
                className={`absolute -inset-3 rounded-[34px] opacity-40 blur-2xl transition-all duration-700 group-hover:opacity-80 ${
                  index === 0
                    ? "bg-gradient-to-r from-[#4C1D95] via-[#7C3AED] to-[#06B6D4]"
                    : "bg-gradient-to-r from-[#06B6D4] via-[#7C3AED] to-[#EC4899]"
                }`}
              />

              {/* Glass frame */}
              <div className="relative rounded-[28px] border border-white/15 bg-white/[0.06] p-2 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/25 group-hover:bg-white/[0.09] sm:rounded-[32px] sm:p-2.5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[21px] sm:rounded-[24px]">
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.07]"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/20 px-3.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-xl sm:right-5 sm:top-5">
                    {banner.eyebrow}
                  </div>

                  
                  
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-white/10" />

          <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_12px_rgba(167,139,250,0.7)]" />

          <span className="h-px w-16 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </div>
    </section>
  );
}
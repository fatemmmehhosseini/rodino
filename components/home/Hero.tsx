
import Image from "next/image";
import Link from "next/link";
import EventSearch from "./EventSearch";

export default function Hero() {
  
 
  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[var(--hero-dark)] text-white">
      {/* 
          Background
       */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#0f0b1a_0%,#1b0c36_45%,#25104d_72%,#172b72_100%)]" />

        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#ec4899]/20 blur-[130px]" />

        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#4c1d95]/40 blur-[120px]" />

        <div className="absolute right-[25%] bottom-0 h-[300px] w-[300px] rounded-full bg-[#06b6d4]/10 blur-[120px]" />
      </div>

      {/* 
          Decorative circles
       */}

      <div className="pointer-events-none absolute -left-40 top-[260px] hidden h-[620px] w-[620px] rounded-full border border-[#ec4899]/20 lg:block" />

      <div className="pointer-events-none absolute left-[5%] top-[320px] hidden h-[450px] w-[450px] rounded-full border border-[#7c3aed]/20 lg:block" />


      {/* 
          Hero content
       */}

      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-[1440px] items-center px-5 pb-12 pt-[120px] sm:px-8 lg:px-14 xl:px-20">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-8">
          {/* 
              Text
           */}

          <div className="order-2 text-center lg:order-1 lg:text-right">
            <p className="mb-5 text-sm font-medium text-[#d8b4fe] sm:text-base">
              رویدادهای جذاب، لحظه‌های فراموش‌نشدنی
            </p>

            <h1 className="mx-auto max-w-[680px] text-4xl font-black leading-[1.25] tracking-tight sm:text-5xl md:text-6xl lg:mx-0 lg:text-[68px]">
              تجربه بعدی تو
              <span className="mt-2 block bg-gradient-to-r from-[#f02d8e] via-[#8920f3] to-[#247598] bg-clip-text text-transparent">
                همین جاست
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-[570px] text-sm leading-8 text-white/70 sm:text-base lg:mx-0">
              کنسرت، ورزش، تئاتر، فناوری و سفر را کشف کن و تجربه‌ای متفاوت برای
              خودت بساز.
            </p>

            {/* Search */}

            <EventSearch />

            {/* CTA */}

            <Link
              href="/events"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-[#f0abfc]"
            >
              مشاهده همه رویدادها
              <span>←</span>
            </Link>
          </div>

          {/* 
              Images
           */}

          <div className="order-1 relative mx-auto h-[350px] w-full max-w-[560px] sm:h-[420px] lg:order-2 lg:h-[540px]">
            {/* Decorative ring */}

            <div className="absolute left-[5%] top-[12%] h-[260px] w-[260px] rounded-full border border-[#7c3aed]/40 sm:h-[320px] sm:w-[320px] lg:h-[430px] lg:w-[430px]" />

            <div className="absolute left-[10%] top-[18%] h-[200px] w-[200px] rounded-full border border-[#ec4899]/30 sm:h-[260px] sm:w-[260px] lg:h-[350px] lg:w-[350px]" />

            
                 {/* Main image */}
                <div className="concert-image absolute left-[8%] top-[20%] h-[245px] w-[245px] rounded-full bg-gradient-to-br from-[#f93999] via-[#8B5CF6] to-[#6217db] p-[5px] shadow-2xl shadow-[#EC4899]/20 sm:left-[8%] sm:h-[300px] sm:w-[300px] lg:left-[8%] lg:top-[18%] lg:h-[370px] lg:w-[370px]">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                    src="/images/hero/concert.png"
                    alt="کنسرت و اجرای زنده"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 640px) 245px, (max-width: 1024px) 300px, 370px"
                    />
                </div>
                </div>

                {/* Top right image */}
                <div className="sport-image absolute right-[2%] top-[3%] h-[125px] w-[125px] rounded-full bg-gradient-to-br from-[#69caf4] via-[#038dce] to-[#103291] p-[4px] shadow-xl shadow-cyan-500/20 sm:h-[155px] sm:w-[155px] lg:right-[4%] lg:h-[205px] lg:w-[205px]">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                    src="/images/hero/sport.jpg"
                    alt="رویداد ورزشی"
                    fill
                    className="object-cover"
                    sizes="205px"
                    />
                </div>
                </div>

                {/* Bottom right image */}
                <div className="travel-image absolute bottom-[-10%] right-[40%] h-[135px] w-[135px] rounded-full bg-gradient-to-br from-[#f49958] via-[#f8755e] to-[#d22a2a] p-[4px] shadow-xl shadow-orange-500/20 sm:h-[165px] sm:w-[165px] sm:bottom-[4%] sm:right-[5%] lg:bottom-[8%] lg:h-[215px] lg:w-[215px]">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                    src="/images/hero/travel.png"
                    alt="سفر و گردشگری"
                    fill
                    className="object-cover"
                    sizes="215px"
                    />
                </div>
                </div>
            
            {/* Decorative dots */}

            <span className="absolute bottom-[25%] left-[2%] h-4 w-4 rounded-full bg-[#ec4899] shadow-lg shadow-pink-500/40" />

            <span className="absolute right-[13%] top-[42%] h-5 w-5 rounded-full bg-[#0693d4] shadow-lg shadow-cyan-500/40" />

            <span className="absolute right-[35%] bottom-[5%] h-2.5 w-2.5 rounded-full bg-[#c084fc]" />
          </div>
        </div>
      </div>
    </section>
  );
}
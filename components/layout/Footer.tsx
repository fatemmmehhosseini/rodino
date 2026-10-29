import Link from "next/link";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

const quickLinks = [
  { title: "خانه", href: "/" },
  { title: "همه رویدادها", href: "/events" },
  { title: "رویدادهای محبوب", href: "/events?sort=popular" },
  { title: "دسته‌بندی‌ها", href: "/events" },
];

const categories = [
  { title: "موسیقی", href: "/events?category=MUSIC" },
  { title: "ورزشی", href: "/events?category=SPORTS" },
  { title: "تئاتر", href: "/events?category=THEATER" },
  { title: "فناوری", href: "/events?category=TECHNOLOGY" },
  { title: "سفر و گردشگری", href: "/events?category=TRAVEL" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#100A1C] text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#7C3AED]/25 blur-[120px]" />

        <div className="absolute -bottom-40 left-[-100px] h-[400px] w-[400px] rounded-full bg-[#EC4899]/20 blur-[120px]" />

        <div className="absolute right-[45%] top-[30%] h-2 w-2 rounded-full bg-[#A855F7]/60" />
        <div className="absolute right-[20%] top-[15%] h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />

        <div className="absolute bottom-[25%] left-[30%] h-3 w-3 rounded-full bg-[#EC4899]/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Main footer */}
        <div className="grid gap-12 py-16 text-center sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:text-right">
          {/* Brand */}
          <div className="flex flex-col items-center sm:col-span-2 lg:col-span-1 lg:items-start">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <span className="text-2xl font-extrabold tracking-tight">
                رودینو
              </span>

              
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-8 text-white/55">
              جایی برای پیدا کردن رویدادهای موردعلاقه‌ات و ساختن
              تجربه‌های تازه.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="تلگرام رودینو"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-500/15 hover:text-white"
              >
                <Send size={18} strokeWidth={1.8} />
              </a>

              <a
                href="#"
                aria-label="شبکه اجتماعی رودینو"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-500/15 hover:text-white"
              >
                <MessageCircle size={18} strokeWidth={1.8} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold text-white">
              دسترسی سریع
            </h3>

            <ul className="mt-5 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold text-white">
              دسته‌بندی رویدادها
            </h3>

            <ul className="mt-5 space-y-4">
              {categories.map((category) => (
                <li key={category.title}>
                  <Link
                    href={category.href}
                    className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white">
              ارتباط با ما
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-center gap-3 text-sm text-white/50 lg:justify-start">
                <Phone
                  size={17}
                  strokeWidth={1.8}
                  className="shrink-0 text-violet-400"
                />

                <span dir="ltr">۰۹۱۲ ۱۲۳ ۴۵۶۷</span>
              </div>

              <div className="flex items-center justify-center gap-3 text-sm text-white/50 lg:justify-start">
                <Mail
                  size={17}
                  strokeWidth={1.8}
                  className="shrink-0 text-violet-400"
                />

                <span>hello@rodino.ir</span>
              </div>

              <div className="flex items-center justify-center gap-3 text-sm leading-7 text-white/50 lg:justify-start">
                <MapPin
                  size={17}
                  strokeWidth={1.8}
                  className="shrink-0 text-violet-400"
                />

                <span>ایران، تهران</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-white/35 sm:flex-row sm:text-right">
            <p>
              © رودینو1405. تمامی حقوق محفوظ است.
            </p>

            <p>ساخته شده برای تجربه‌های بهتر</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
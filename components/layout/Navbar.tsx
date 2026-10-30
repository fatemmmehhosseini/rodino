"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${
        !isHomePage || scrolled
          ? "bg-[#1A102E]/85 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14 xl:px-20">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="relative z-10 flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <span className="bg-gradient-to-br from-[#06b6d4] via-[#7c3aed] to-[#ec4899] bg-clip-text text-2xl font-black text-transparent">
              R
            </span>
          </div>

          <span className="text-2xl font-black tracking-tight text-white">
            رودینو
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 text-white lg:flex">
          <Link
            href="/events"
            className="group relative flex items-center gap-1 text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
          >
            رویدادها

            <span className="absolute -bottom-2 right-0 h-[2px] w-0 rounded-full bg-gradient-to-l from-[#ec4899] to-[#7c3aed] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/about"
            className="group relative text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
          >
            درباره ما

            <span className="absolute -bottom-2 right-0 h-[2px] w-0 rounded-full bg-gradient-to-l from-[#ec4899] to-[#7c3aed] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/magazine"
            className="group relative text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
          >
            مجله

            <span className="absolute -bottom-2 right-0 h-[2px] w-0 rounded-full bg-gradient-to-l from-[#ec4899] to-[#7c3aed] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/contact"
            className="group relative text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
          >
            تماس با ما

            <span className="absolute -bottom-2 right-0 h-[2px] w-0 rounded-full bg-gradient-to-l from-[#ec4899] to-[#7c3aed] transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/host"
            className="group flex items-center rounded-xl border border-white/40  px-4 py-2.5 text-sm !text-white transition-all duration-300 hover:bg-linear-to-l hover:from-[#7C3AED]/30 hover:to-[#EC4899]/20"
          >
            رویداد خودت رو ثبت کن
          </Link>

          {/* Desktop login */}
          <Link href="/login" className="btn flex">
            <UserRound size={18} strokeWidth={2} />
            ورود / ثبت‌نام
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 lg:hidden"
        >
          {menuOpen ? (
            <X size={22} strokeWidth={2} />
          ) : (
            <Menu size={22} strokeWidth={2} />
          )}
        </button>
      </div>

      <div
        className={`lg:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        } absolute inset-x-0 top-[76px] overflow-hidden border-t border-white/10 bg-[#100c20]/95 backdrop-blur-xl transition-all duration-500 ease-in-out`}
      >
        <nav className="mx-auto flex max-w-[1440px] flex-col px-5 py-4 text-white sm:px-8">
          {[
            { href: "/events", label: "رویدادها" },
            { href: "/about", label: "درباره ما" },
            { href: "/magazine", label: "مجله" },
            { href: "/contact", label: "تماس با ما" },
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`border-b border-white/10 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:translate-x-[-4px] hover:text-white ${
                menuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
              style={{
                transitionDelay: menuOpen
                  ? `${index * 80 + 100}ms`
                  : "0ms",
              }}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile host button */}
          <Link
            href="/host"
            onClick={closeMenu}
            className={`mt-5 flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: menuOpen ? "400ms" : "0ms",
            }}
          >
            رویداد خودت رو ثبت کن
          </Link>

          {/* Mobile login */}
          <Link
            href="/login"
            onClick={closeMenu}
            className={`btn mt-3 flex items-center justify-center gap-2 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: menuOpen ? "480ms" : "0ms",
            }}
          >
            <UserRound size={18} strokeWidth={2} />
            ورود / ثبت‌نام
          </Link>
        </nav>
      </div>
    </header>
  );
}
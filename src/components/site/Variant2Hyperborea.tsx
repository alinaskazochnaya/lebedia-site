'use client'

import { useState, useEffect } from "react";
import {
  ensemble,
  leader,
  achievements,
  repertoire,
  gallery,
  events,
  instruments,
} from "./data";

// — Палитра «Гиперборея» — мифический редакторский стиль
const palette = {
  bg: "#FAF7F0",          // слоновая кость / пергамент
  dark: "#1E3A52",        // гиперборейский синий
  accent: "#6B9BC3",      // средний небесно-голубой
  gold: "#D4AF37",        // античное золото
  cream: "#F4ECD8",       // тёплый кремовый (для текста на тёмном)
  text: "#2A2A2A",        // почти чёрный
  textMuted: "#5A5A5A",
  border: "#E0D9C5",      // мягкая граница
};

const navLinks = [
  { id: "about", label: "О ансамбле" },
  { id: "leader", label: "Руководитель" },
  { id: "achievements", label: "Достижения" },
  { id: "repertoire", label: "Репертуар" },
  { id: "events", label: "Афиша" },
  { id: "gallery", label: "Галерея" },
  { id: "contacts", label: "Контакты" },
];

// Мотив струн гуслей — тонкие горизонтальные золотые линии
function StringsMotif({ count = 7, color = palette.gold, opacity = 0.5 }: { count?: number; color?: string; opacity?: number }) {
  return (
    <div className="flex flex-col gap-1.5" style={{ opacity }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-px"
          style={{
            background: color,
            opacity: 1 - i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// Орнаментальный разделитель в стиле рукописей
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="h-px w-16" style={{ background: palette.gold, opacity: 0.6 }} />
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={palette.gold}>
        <path d="M12 2 L 14 10 L 22 12 L 14 14 L 12 22 L 10 14 L 2 12 L 10 10 Z" opacity="0.8" />
      </svg>
      <div className="h-px w-16" style={{ background: palette.gold, opacity: 0.6 }} />
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  align = "center",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  const textColor = dark ? palette.cream : palette.dark;
  const eyebrowColor = dark ? palette.gold : palette.gold;
  return (
    <div className={align === "center" ? "text-center mb-12" : "mb-10"}>
      {eyebrow && (
        <div
          className="text-xs uppercase tracking-[0.4em] mb-3"
          style={{
            color: eyebrowColor,
            fontFamily: "var(--font-manrope)",
            fontWeight: 600,
            letterSpacing: "0.3em",
          }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className="text-3xl md:text-5xl"
        style={{
          fontFamily: "var(--font-playfair)",
          color: textColor,
          fontWeight: 400,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h2>
      {align === "center" && <GoldDivider />}
    </div>
  );
}

export default function Variant2Hyperborea() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const sections = ["home", ...navLinks.map((l) => l.id)];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <div
      style={{
        background: palette.bg,
        color: palette.text,
        fontFamily: "var(--font-manrope)",
      }}
      className="min-h-screen"
    >
      {/* ─── Header ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-md py-3" : "py-5"
        }`}
        style={{
          background: scrolled ? `rgba(30, 58, 82, 0.95)` : "transparent",
          borderBottom: scrolled ? `1px solid ${palette.gold}33` : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Логотип */}
          <button onClick={() => scrollTo("home")} className="cursor-pointer flex items-center gap-3">
            <img
              src={scrolled ? "/lebedia-logo-white.svg" : "/lebedia-logo-white.svg"}
              alt="Лебёдия"
              className="h-9 w-auto"
              style={{ objectFit: "contain" }}
            />
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
                style={{
                  color: scrolled
                    ? activeSection === link.id
                      ? palette.gold
                      : palette.cream
                    : activeSection === link.id
                    ? palette.gold
                    : palette.cream,
                  fontWeight: activeSection === link.id ? 600 : 400,
                  borderBottom: activeSection === link.id ? `1px solid ${palette.gold}` : "1px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={palette.cream} strokeWidth="1.5">
              {mobileMenuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav
            className="md:hidden px-6 pb-4 flex flex-col gap-3"
            style={{ background: palette.dark, borderBottom: `1px solid ${palette.gold}55` }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-xs uppercase tracking-widest py-1.5 cursor-pointer"
                style={{
                  color: activeSection === link.id ? palette.gold : palette.cream,
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* ─── Hero — тёмный полноэкранный ─── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: palette.dark }}
      >
        {/* Фоновое изображение */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${gallery[0].src})`,
            opacity: 0.35,
            filter: "contrast(1.05) saturate(0.85)",
          }}
        />
        {/* Затемнение */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${palette.dark}cc 0%, ${palette.dark}99 50%, ${palette.dark}f2 100%)`,
          }}
        />

        {/* Тонкие золотые струны по бокам */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-12 px-6 hidden md:block">
          <StringsMotif count={9} opacity={0.4} />
        </div>
        <div className="absolute right-0 top-1/4 bottom-1/4 w-12 px-6 hidden md:block">
          <StringsMotif count={9} opacity={0.4} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          {/* Логотип белый */}
          <div className="flex justify-center mb-8">
            <img
              src="/lebedia-logo-white.svg"
              alt="Ансамбль «Лебёдия»"
              className="h-28 md:h-36 w-auto"
              style={{ objectFit: "contain" }}
            />
          </div>

          <div
            className="text-xs md:text-sm uppercase tracking-[0.5em] mb-6"
            style={{ color: palette.gold, fontWeight: 500, letterSpacing: "0.4em" }}
          >
            {ensemble.type}
          </div>

          <div
            className="text-2xl md:text-4xl italic mb-8"
            style={{ color: palette.cream, fontFamily: "var(--font-playfair)" }}
          >
            {ensemble.tagline}
          </div>

          <div className="flex justify-center mb-8">
            <GoldDivider />
          </div>

          <p
            className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-10"
            style={{ color: palette.cream, opacity: 0.85 }}
          >
            {ensemble.concept}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("about")}
              className="px-8 py-3.5 text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer hover:scale-[1.03]"
              style={{
                background: palette.gold,
                color: palette.dark,
                fontWeight: 600,
              }}
            >
              Узнать о нас
            </button>
            <button
              onClick={() => scrollTo("repertoire")}
              className="px-8 py-3.5 text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
              style={{
                border: `1px solid ${palette.cream}66`,
                color: palette.cream,
                background: "transparent",
              }}
            >
              Репертуар
            </button>
          </div>
        </div>

        {/* Стрелка-указатель вниз */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <svg viewBox="0 0 24 24" className="w-6 h-6 animate-pulse" fill="none" stroke={palette.gold} strokeWidth="1.5">
            <path d="M12 4v16M6 14l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ─── About — светлый блок ─── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Концепция" title="О ансамбле" />

          {/* Цитата-эпиграф */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p
              className="text-xl md:text-2xl italic leading-relaxed"
              style={{ fontFamily: "var(--font-playfair)", color: palette.dark }}
            >
              «Названный в честь мифической страны Лебёдии — символа мира, гармонии и утраченного золотого века — коллектив воплощает эту идею через чистоту и искренность живого звука»
            </p>
            <div className="flex justify-center mt-4">
              <div className="h-px w-12" style={{ background: palette.gold }} />
            </div>
          </div>

          {/* Звучание и инструменты */}
          <div className="mb-20">
            <h3
              className="text-2xl md:text-3xl mb-4 text-center"
              style={{ fontFamily: "var(--font-playfair)", color: palette.dark }}
            >
              Звучание и инструменты
            </h3>
            <div className="flex justify-center mb-8">
              <GoldDivider />
            </div>
            <p className="leading-relaxed mb-10 max-w-3xl mx-auto text-center" style={{ color: palette.text }}>
              {ensemble.sound}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: palette.border }}>
              {instruments.map((inst) => (
                <div
                  key={inst.name}
                  className="p-6 transition-all duration-300 hover:bg-amber-50"
                  style={{ background: palette.bg }}
                >
                  <div
                    className="text-lg mb-2"
                    style={{ fontFamily: "var(--font-playfair)", color: palette.dark }}
                  >
                    {inst.name}
                  </div>
                  <div className="text-xs leading-snug" style={{ color: palette.textMuted }}>
                    {inst.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Художественный метод */}
          <div className="mb-20">
            <h3
              className="text-2xl md:text-3xl mb-4 text-center"
              style={{ fontFamily: "var(--font-playfair)", color: palette.dark }}
            >
              Репертуар и художественный метод
            </h3>
            <div className="flex justify-center mb-8">
              <GoldDivider />
            </div>
            <div className="space-y-5 max-w-3xl mx-auto">
              {ensemble.method.map((p, i) => (
                <p key={i} className="leading-relaxed" style={{ color: palette.text }}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Визуальный образ — тёмная врезка */}
          <div
            className="grid md:grid-cols-2 gap-10 items-center p-10 md:p-14"
            style={{ background: palette.dark, color: palette.cream }}
          >
            <div>
              <h3
                className="text-2xl md:text-3xl mb-4"
                style={{ fontFamily: "var(--font-playfair)", color: palette.cream }}
              >
                Визуальный образ
              </h3>
              <div className="flex mb-6">
                <div className="h-px w-12" style={{ background: palette.gold }} />
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: palette.cream, opacity: 0.9 }}>
                {ensemble.visualImage}
              </p>
              <div className="flex flex-wrap gap-3">
                <span
                  className="text-xs uppercase tracking-widest px-4 py-2"
                  style={{
                    border: `1px solid ${palette.gold}66`,
                    color: palette.gold,
                  }}
                >
                  {ensemble.size}
                </span>
                <span
                  className="text-xs uppercase tracking-widest px-4 py-2"
                  style={{
                    border: `1px solid ${palette.gold}66`,
                    color: palette.gold,
                  }}
                >
                  Женская соборность
                </span>
              </div>
            </div>
            <div
              className="aspect-[4/5] bg-cover bg-center"
              style={{
                backgroundImage: `url(${gallery[3].src})`,
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── Leader — тёмная секция ─── */}
      <section id="leader" className="py-24 px-6" style={{ background: palette.dark, color: palette.cream }}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Лицо ансамбля" title="Руководитель" dark />

          <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
            {/* Заглушка для портрета */}
            <div
              className="aspect-[3/4] flex items-center justify-center"
              style={{
                border: `1px solid ${palette.gold}66`,
              }}
            >
              <div className="text-center px-4">
                <svg viewBox="0 0 48 48" className="w-12 h-12 mx-auto mb-3" fill="none" stroke={palette.gold} strokeWidth="1">
                  <circle cx="24" cy="17" r="7" />
                  <path d="M10 40 C 12 30, 16 27, 24 27 C 32 27, 36 30, 38 40" />
                </svg>
                <div
                  className="text-xs italic"
                  style={{ color: palette.gold, fontFamily: "var(--font-playfair)" }}
                >
                  Фото будет добавлено
                </div>
              </div>
            </div>

            <div>
              <div
                className="text-xs uppercase tracking-[0.3em] mb-2"
                style={{ color: palette.gold }}
              >
                {leader.stageName}
              </div>
              <h3
                className="text-3xl md:text-4xl mb-5"
                style={{ fontFamily: "var(--font-playfair)", color: palette.cream }}
              >
                {leader.name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {leader.roles.map((role) => (
                  <span
                    key={role}
                    className="text-xs uppercase tracking-wider px-3 py-1.5"
                    style={{
                      border: `1px solid ${palette.gold}55`,
                      color: palette.gold,
                    }}
                  >
                    {role}
                  </span>
                ))}
              </div>

              {leader.bio ? (
                <p className="leading-relaxed mb-5" style={{ color: palette.cream, opacity: 0.9 }}>{leader.bio}</p>
              ) : (
                <div
                  className="p-5 text-sm italic mb-5"
                  style={{
                    border: `1px dashed ${palette.gold}55`,
                    color: palette.gold,
                    opacity: 0.8,
                  }}
                >
                  Биография руководителя будет добавлена позже.
                </div>
              )}

              <div className="mt-6">
                <div
                  className="text-xs uppercase tracking-[0.2em] mb-3"
                  style={{ color: palette.gold }}
                >
                  Достижения руководителя
                </div>
                <ul className="space-y-2">
                  {leader.achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 flex-shrink-0" fill={palette.gold}>
                        <path d="M12 2 L 14 10 L 22 12 L 14 14 L 12 22 L 10 14 L 2 12 L 10 10 Z" />
                      </svg>
                      <span style={{ color: palette.cream, opacity: 0.9 }}>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Achievements — timeline ─── */}
      <section id="achievements" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Признание" title="Достижения" />

          {/* Горизонтальная timeline с золотыми точками */}
          <div className="relative">
            {/* Линия timeline */}
            <div
              className="absolute top-6 left-0 right-0 h-px hidden md:block"
              style={{ background: `linear-gradient(90deg, transparent, ${palette.gold}66, transparent)` }}
            />

            <div className="grid md:grid-cols-3 gap-8">
              {achievements.map((ach, i) => (
                <div key={i} className="relative text-center">
                  {/* Точка */}
                  <div className="flex justify-center mb-5">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center relative z-10"
                      style={{
                        background: palette.bg,
                        border: `2px solid ${palette.gold}`,
                      }}
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill={palette.gold}>
                        <path d="M12 2 L 14 10 L 22 12 L 14 14 L 12 22 L 10 14 L 2 12 L 10 10 Z" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="text-xs uppercase tracking-widest mb-2"
                    style={{ color: palette.gold, fontWeight: 600 }}
                  >
                    {ach.year}
                  </div>
                  <h3
                    className="text-xl mb-3"
                    style={{ fontFamily: "var(--font-playfair)", color: palette.dark }}
                  >
                    {ach.title}
                  </h3>
                  {ach.description && (
                    <p className="text-sm leading-relaxed" style={{ color: palette.textMuted }}>
                      {ach.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <GoldDivider />
          </div>
          <p
            className="text-center text-sm italic mt-2"
            style={{ color: palette.dark, fontFamily: "var(--font-playfair)" }}
          >
            Список регулярно дополняется новыми наградами
          </p>
        </div>
      </section>

      {/* ─── Repertoire — список как оглавление книги ─── */}
      <section id="repertoire" className="py-24 px-6" style={{ background: palette.dark, color: palette.cream }}>
        <div className="max-w-4xl mx-auto">
          <SectionTitle eyebrow="Звучание" title="Репертуар" dark />

          <div className="space-y-px">
            {repertoire.map((item) => (
              <div
                key={item.id}
                className="group grid grid-cols-[60px_1fr_auto] gap-6 items-baseline py-5 transition-all duration-300 hover:bg-white/5 cursor-default px-4 -mx-4"
              >
                <div
                  className="text-sm italic"
                  style={{ color: palette.gold, fontFamily: "var(--font-playfair)" }}
                >
                  {String(item.id).padStart(2, "0")}
                </div>
                <div>
                  <h3
                    className="text-2xl md:text-3xl mb-1 transition-colors"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      color: palette.cream,
                    }}
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm leading-relaxed" style={{ color: palette.cream, opacity: 0.65 }}>
                      {item.description}
                    </p>
                  )}
                </div>
                <div
                  className="text-xs uppercase tracking-widest"
                  style={{ color: palette.gold }}
                >
                  {item.type}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <GoldDivider />
          </div>
          <p
            className="text-center text-sm italic mt-2"
            style={{ color: palette.cream, fontFamily: "var(--font-playfair)", opacity: 0.7 }}
          >
            Репертуар постоянно расширяется
          </p>
        </div>
      </section>

      {/* ─── Events — тёмные карточки с золотой датой ─── */}
      <section id="events" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionTitle eyebrow="Афиша" title="Ближайшие события" />

          {events.filter((e) => e.status === "upcoming").length > 0 ? (
            <div className="space-y-6">
              {events
                .filter((e) => e.status === "upcoming")
                .map((ev, i) => (
                  <div
                    key={i}
                    className="grid md:grid-cols-[200px_1fr] gap-6 p-8 md:p-10"
                    style={{
                      background: palette.dark,
                      color: palette.cream,
                    }}
                  >
                    <div>
                      <div
                        className="text-xs uppercase tracking-widest mb-2"
                        style={{ color: palette.gold }}
                      >
                        Скоро
                      </div>
                      <div
                        className="text-2xl md:text-3xl"
                        style={{ fontFamily: "var(--font-playfair)", color: palette.gold }}
                      >
                        {ev.date}
                      </div>
                    </div>
                    <div>
                      <h3
                        className="text-xl md:text-2xl mb-2"
                        style={{ fontFamily: "var(--font-playfair)", color: palette.cream }}
                      >
                        {ev.title}
                      </h3>
                      {ev.place && (
                        <p className="text-sm" style={{ color: palette.cream, opacity: 0.7 }}>
                          {ev.place}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-4">
                        <div className="h-px w-12" style={{ background: palette.gold }} />
                        <span
                          className="text-xs uppercase tracking-widest"
                          style={{ color: palette.gold }}
                        >
                          Следите за анонсами
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p
              className="text-center text-lg italic py-12"
              style={{ color: palette.dark, fontFamily: "var(--font-playfair)" }}
            >
              Ближайшие мероприятия будут объявлены позже
            </p>
          )}
        </div>
      </section>

      {/* ─── Gallery — полноэкранный слайдер ─── */}
      <section id="gallery" className="py-24 px-6" style={{ background: palette.dark, color: palette.cream }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Моменты" title="Галерея" dark />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                style={{ border: `1px solid ${palette.gold}33` }}
              >
                <div
                  className={`bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${
                    i === 0 ? "aspect-square md:aspect-[2/1]" : "aspect-square"
                  }`}
                  style={{ backgroundImage: `url(${img.src})` }}
                />
                {img.caption && (
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-3"
                    style={{
                      background: `linear-gradient(0deg, ${palette.dark}f2, transparent)`,
                    }}
                  >
                    <div
                      className="text-xs uppercase tracking-widest mb-1"
                      style={{ color: palette.gold, fontWeight: 600 }}
                    >
                      {img.caption}
                    </div>
                    <div
                      className="text-sm italic"
                      style={{ color: palette.cream, fontFamily: "var(--font-playfair)" }}
                    >
                      Ансамбль «Лебёдия»
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contacts — тёмная секция с золотыми акцентами ─── */}
      <section id="contacts" className="py-24 px-6" style={{ background: palette.dark, color: palette.cream }}>
        <div className="max-w-4xl mx-auto">
          <SectionTitle eyebrow="Связь" title="Контакты" dark />

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="leading-relaxed mb-8 text-sm md:text-base" style={{ color: palette.cream, opacity: 0.9 }}>
                {ensemble.signature}
              </p>

              <div className="space-y-5">
                <a
                  href={`tel:${ensemble.contacts.phoneHref}`}
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{ border: `1px solid ${palette.gold}` }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={palette.gold} strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest" style={{ color: palette.gold }}>
                      Телефон руководителя
                    </div>
                    <div
                      className="text-xl"
                      style={{ fontFamily: "var(--font-playfair)", color: palette.cream }}
                    >
                      {ensemble.contacts.phone}
                    </div>
                  </div>
                </a>

                <a
                  href={ensemble.contacts.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{ border: `1px solid ${palette.gold}` }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={palette.gold}>
                      <path d="M12.785 16.241s.288-.032.435-.193c.135-.148.131-.426.131-.426s-.018-1.302.576-1.495c.586-.19 1.338 1.262 2.132 1.811.602.415 1.059.324 1.059.324l2.131-.03s1.114-.069.586-.947c-.043-.071-.307-.648-1.579-1.834-1.331-1.24-1.153-1.039.45-3.185.976-1.306 1.367-2.105 1.245-2.443-.117-.323-.842-.237-.842-.237l-2.402.015s-.178-.024-.31.055c-.13.077-.213.257-.213.257s-.378 1.005-.882 1.86c-1.063 1.806-1.488 1.901-1.662 1.789-.404-.262-.303-1.05-.303-1.61 0-1.75.265-2.482-.516-2.673-.26-.063-.452-.104-1.116-.111-.852-.009-1.573.003-1.981.205-.272.134-.481.433-.354.45.158.021.515.097.704.357.244.334.236 1.084.236 1.084s.14 2.068-.327 2.325c-.32.176-.76-.183-1.712-1.836-.485-.842-.852-1.772-.852-1.772s-.07-.174-.198-.267c-.155-.114-.371-.15-.371-.15l-2.282.015s-.343.01-.469.158c-.112.132-.009.405-.009.405s1.786 4.179 3.808 6.286c1.854 1.932 3.961 1.805 3.961 1.805h.954z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest" style={{ color: palette.gold }}>
                      Группа ВКонтакте
                    </div>
                    <div
                      className="text-xl"
                      style={{ fontFamily: "var(--font-playfair)", color: palette.cream }}
                    >
                      {ensemble.contacts.vkLabel}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <form
              className="p-7 space-y-4"
              style={{ border: `1px solid ${palette.gold}44` }}
              onSubmit={(e) => {
                e.preventDefault();
                alert("Спасибо за обращение! Мы свяжемся с вами в ближайшее время.");
              }}
            >
              <div>
                <label className="text-xs uppercase tracking-widest block mb-2" style={{ color: palette.gold }}>
                  Ваше имя
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2.5 outline-none text-sm"
                  style={{
                    background: "transparent",
                    border: `1px solid ${palette.gold}55`,
                    color: palette.cream,
                  }}
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest block mb-2" style={{ color: palette.gold }}>
                  Телефон или e-mail
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2.5 outline-none text-sm"
                  style={{
                    background: "transparent",
                    border: `1px solid ${palette.gold}55`,
                    color: palette.cream,
                  }}
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest block mb-2" style={{ color: palette.gold }}>
                  Сообщение
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2.5 outline-none resize-none text-sm"
                  style={{
                    background: "transparent",
                    border: `1px solid ${palette.gold}55`,
                    color: palette.cream,
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 text-xs uppercase tracking-widest transition-all duration-300 hover:opacity-90 cursor-pointer"
                style={{
                  background: palette.gold,
                  color: palette.dark,
                  fontWeight: 600,
                }}
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="py-12 px-6"
        style={{ background: "#0F1E2C", color: palette.cream }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="/lebedia-logo-white.svg"
            alt="Ансамбль «Лебёдия»"
            className="h-10 w-auto"
            style={{ objectFit: "contain" }}
          />
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: palette.gold, opacity: 0.5 }} />
            <div
              className="text-xs italic"
              style={{ color: palette.gold, fontFamily: "var(--font-playfair)" }}
            >
              {ensemble.tagline} · с {ensemble.founded}
            </div>
            <div className="h-px w-8" style={{ background: palette.gold, opacity: 0.5 }} />
          </div>
          <div className="text-xs opacity-60">
            © {new Date().getFullYear()} Ансамбль «Лебёдия»
          </div>
        </div>
      </footer>
    </div>
  );
}

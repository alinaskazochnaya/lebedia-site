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

// — Палитра «Сказка»
const palette = {
  bg: "#FDFBF7",        // тёплый бумажный белый
  section: "#E8F2F7",   // бледно-голубая дымка
  card: "#FFFFFF",
  accent: "#7BA9C4",    // припыленный голубой
  accentDeep: "#3D6B8C",// глубокий народный синий
  copper: "#B87333",    // медь / терракота
  text: "#2D2D2D",      // мягкий чёрный
  paper: "#F4ECD8",     // старая бумага (для тёмных секций)
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

// Декоративный орнамент-разделитель (стилизованная вышивка)
function Ornament({ color = palette.copper, className = "" }: { color?: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 24"
      className={`w-32 h-4 ${className}`}
      fill="none"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path d="M10 12 L 80 12" />
      <path d="M80 12 L 85 7 L 90 12 L 85 17 Z" fill={color} fillOpacity="0.5" />
      <circle cx="100" cy="12" r="3" fill={color} fillOpacity="0.7" />
      <path d="M115 12 L 120 7 L 125 12 L 120 17 Z" fill={color} fillOpacity="0.5" />
      <path d="M125 12 L 195 12" />
      <circle cx="105" cy="6" r="1" fill={color} />
      <circle cx="105" cy="18" r="1" fill={color} />
      <circle cx="95" cy="6" r="1" fill={color} />
      <circle cx="95" cy="18" r="1" fill={color} />
    </svg>
  );
}

// Стилизованная иконка лебедя (рукотворный стиль)
function SwanMark({ size = "lg" }: { size?: "lg" | "sm" }) {
  const dim = size === "lg" ? "w-10 h-10" : "w-7 h-7";
  return (
    <svg
      viewBox="0 0 48 48"
      className={dim}
      fill="none"
      stroke={palette.accentDeep}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Тело лебедя */}
      <path d="M12 32 C 16 26, 20 22, 26 22 C 32 22, 36 26, 40 32" />
      {/* Шея и голова */}
      <path d="M26 22 C 24 18, 24 14, 26 10 C 28 8, 32 8, 34 11" />
      <path d="M34 11 C 35 12, 36 12, 37 11" />
      <circle cx="35" cy="10" r="0.8" fill={palette.accentDeep} />
      {/* Крыло */}
      <path d="M22 25 C 25 24, 28 24, 30 26" opacity="0.6" />
      <path d="M22 27 C 25 26, 28 26, 30 28" opacity="0.5" />
      {/* Волна */}
      <path d="M8 38 C 14 36, 18 40, 24 38 C 30 36, 34 40, 40 38" opacity="0.5" />
    </svg>
  );
}

function Wordmark({ size = "lg" }: { size?: "lg" | "sm" }) {
  const textSize = size === "lg" ? "text-4xl md:text-5xl" : "text-2xl";
  return (
    <div className="flex items-center gap-2.5">
      <SwanMark size={size} />
      <span
        className={`${textSize}`}
        style={{
          fontFamily: "var(--font-lora)",
          color: palette.accentDeep,
          letterSpacing: "0.02em",
          fontWeight: 600,
        }}
      >
        Лебёдия
      </span>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mb-12" : "mb-10"}>
      {eyebrow && (
        <div
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{
            color: palette.copper,
            fontFamily: "var(--font-golos)",
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className="text-3xl md:text-5xl"
        style={{
          fontFamily: "var(--font-lora)",
          color: palette.accentDeep,
          fontWeight: 600,
        }}
      >
        {title}
      </h2>
      <div className={`mt-4 flex ${align === "center" ? "justify-center" : "justify-start"}`}>
        <Ornament color={palette.copper} />
      </div>
    </div>
  );
}

export default function Variant3Skazka() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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

  // Тип песни → цвет тега
  const tagColor = (type: string) => {
    if (type.toLowerCase().includes("лирич")) return palette.accent;
    if (type.toLowerCase().includes("пляс") || type.toLowerCase().includes("быстр"))
      return palette.copper;
    return palette.accentDeep;
  };

  return (
    <div
      style={{
        background: palette.bg,
        color: palette.text,
        fontFamily: "var(--font-golos)",
      }}
      className="min-h-screen"
    >
      {/* ─── Header ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          background: `rgba(253, 251, 247, 0.92)`,
          borderBottom: `1px solid ${palette.accent}55`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="cursor-pointer">
            <Wordmark size="sm" />
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm transition-colors duration-300 cursor-pointer"
                style={{
                  fontFamily: "var(--font-golos)",
                  color: activeSection === link.id ? palette.copper : palette.text,
                  fontWeight: activeSection === link.id ? 600 : 400,
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
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={palette.accentDeep} strokeWidth="1.5">
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
            style={{ background: palette.bg, borderBottom: `1px solid ${palette.accent}55` }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-sm py-1 cursor-pointer"
                style={{
                  color: activeSection === link.id ? palette.copper : palette.text,
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* ─── Hero ─── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        {/* Фоновое изображение */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${gallery[0].src})`,
            filter: "blur(3px) saturate(0.9)",
            transform: "scale(1.05)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${palette.bg}dd 0%, ${palette.bg}aa 45%, ${palette.bg}f5 100%)`,
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div
            className="text-xs uppercase tracking-[0.4em] mb-6"
            style={{ color: palette.copper, fontFamily: "var(--font-golos)", fontWeight: 500 }}
          >
            {ensemble.type}
          </div>

          <div className="flex justify-center mb-3">
            <SwanMark size="lg" />
          </div>

          <h1
            className="text-6xl md:text-8xl mb-4"
            style={{
              fontFamily: "var(--font-lora)",
              color: palette.accentDeep,
              fontWeight: 600,
              letterSpacing: "0.01em",
            }}
          >
            Лебёдия
          </h1>

          <Ornament color={palette.copper} className="mx-auto mb-6" />

          <div
            className="text-2xl md:text-3xl italic mb-8"
            style={{ color: palette.copper, fontFamily: "var(--font-lora)" }}
          >
            {ensemble.tagline}
          </div>

          <p
            className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10"
            style={{ color: palette.text, opacity: 0.85 }}
          >
            {ensemble.concept}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("about")}
              className="px-7 py-3 text-sm transition-all duration-300 cursor-pointer hover:opacity-90"
              style={{
                background: palette.accentDeep,
                color: "#fff",
                fontFamily: "var(--font-golos)",
                letterSpacing: "0.05em",
                borderRadius: "999px",
              }}
            >
              Узнать о нас
            </button>
            <button
              onClick={() => scrollTo("repertoire")}
              className="px-7 py-3 text-sm transition-all duration-300 cursor-pointer"
              style={{
                border: `1.5px solid ${palette.accentDeep}`,
                color: palette.accentDeep,
                fontFamily: "var(--font-golos)",
                letterSpacing: "0.05em",
                borderRadius: "999px",
                background: "transparent",
              }}
            >
              Репертуар
            </button>
          </div>
        </div>
      </section>

      {/* ─── About ─── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Концепция" title="О ансамбле" />

          {/* Концепция + Описание */}
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div
              className="p-7"
              style={{
                background: palette.card,
                border: `1px solid ${palette.accent}33`,
                borderRadius: "16px",
              }}
            >
              <div className="mb-3">
                <Ornament color={palette.copper} className="" />
              </div>
              <h3
                className="text-xl mb-4"
                style={{ fontFamily: "var(--font-lora)", color: palette.accentDeep }}
              >
                Миф о Лебёдине
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: palette.text }}>
                {ensemble.concept}
              </p>
            </div>
            <div
              className="p-7"
              style={{
                background: palette.card,
                border: `1px solid ${palette.accent}33`,
                borderRadius: "16px",
              }}
            >
              <div className="mb-3">
                <Ornament color={palette.copper} />
              </div>
              <h3
                className="text-xl mb-4"
                style={{ fontFamily: "var(--font-lora)", color: palette.accentDeep }}
              >
                Диалог эпох
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: palette.text }}>
                {ensemble.description}
              </p>
            </div>
          </div>

          {/* Звучание и инструменты */}
          <div
            className="p-8 md:p-12 mb-16"
            style={{
              background: palette.section,
              borderRadius: "20px",
            }}
          >
            <h3
              className="text-2xl md:text-3xl mb-4 text-center"
              style={{ fontFamily: "var(--font-lora)", color: palette.accentDeep }}
            >
              Звучание и инструменты
            </h3>
            <div className="flex justify-center mb-8">
              <Ornament color={palette.copper} />
            </div>
            <p className="text-sm leading-relaxed mb-8 max-w-3xl mx-auto" style={{ color: palette.text }}>
              {ensemble.sound}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {instruments.map((inst) => (
                <div
                  key={inst.name}
                  className="p-4 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: palette.card,
                    borderRadius: "12px",
                    border: `1px solid ${palette.accent}33`,
                  }}
                >
                  <div
                    className="text-lg mb-1"
                    style={{ fontFamily: "var(--font-lora)", color: palette.copper, fontWeight: 600 }}
                  >
                    {inst.name}
                  </div>
                  <div className="text-xs leading-snug" style={{ color: palette.text, opacity: 0.75 }}>
                    {inst.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Художественный метод */}
          <div className="mb-16">
            <h3
              className="text-2xl md:text-3xl mb-4"
              style={{ fontFamily: "var(--font-lora)", color: palette.accentDeep }}
            >
              Репертуар и художественный метод
            </h3>
            <div className="flex mb-6">
              <Ornament color={palette.copper} />
            </div>
            <div className="space-y-4">
              {ensemble.method.map((p, i) => (
                <p key={i} className="text-sm md:text-base leading-relaxed" style={{ color: palette.text }}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Визуальный образ */}
          <div
            className="grid md:grid-cols-2 gap-10 items-center p-8 md:p-10"
            style={{
              background: palette.card,
              border: `1px solid ${palette.accent}33`,
              borderRadius: "20px",
            }}
          >
            <div>
              <h3
                className="text-2xl md:text-3xl mb-3"
                style={{ fontFamily: "var(--font-lora)", color: palette.accentDeep }}
              >
                Визуальный образ
              </h3>
              <div className="flex mb-5">
                <Ornament color={palette.copper} />
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: palette.text }}>
                {ensemble.visualImage}
              </p>
              <div className="flex flex-wrap gap-2">
                <span
                  className="text-xs px-3 py-1.5"
                  style={{
                    background: palette.section,
                    color: palette.accentDeep,
                    borderRadius: "999px",
                    fontFamily: "var(--font-golos)",
                  }}
                >
                  {ensemble.size}
                </span>
                <span
                  className="text-xs px-3 py-1.5"
                  style={{
                    background: palette.section,
                    color: palette.accentDeep,
                    borderRadius: "999px",
                    fontFamily: "var(--font-golos)",
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
                borderRadius: "16px",
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── Leader ─── */}
      <section id="leader" className="py-24 px-6" style={{ background: palette.section }}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Лицо ансамбля" title="Руководитель" />

          <div
            className="grid md:grid-cols-[280px_1fr] gap-10 items-start p-8 md:p-10"
            style={{
              background: palette.card,
              border: `1px solid ${palette.accent}33`,
              borderRadius: "20px",
            }}
          >
            {/* Заглушка портрета */}
            <div className="flex flex-col items-center">
              <div
                className="aspect-square w-full max-w-[260px] flex items-center justify-center"
                style={{
                  background: palette.section,
                  border: `2px dashed ${palette.accent}`,
                  borderRadius: "50%",
                }}
              >
                <div className="text-center px-4">
                  <svg viewBox="0 0 48 48" className="w-14 h-14 mx-auto mb-3" fill="none" stroke={palette.accentDeep} strokeWidth="1.2">
                    <circle cx="24" cy="17" r="7" />
                    <path d="M10 40 C 12 30, 16 27, 24 27 C 32 27, 36 30, 38 40" />
                  </svg>
                  <div
                    className="text-xs italic"
                    style={{ color: palette.accentDeep, fontFamily: "var(--font-lora)" }}
                  >
                    Фото будет добавлено
                  </div>
                </div>
              </div>
              <div
                className="mt-4 text-sm italic"
                style={{ color: palette.copper, fontFamily: "var(--font-lora)" }}
              >
                {leader.stageName}
              </div>
            </div>

            <div>
              <h3
                className="text-2xl md:text-3xl mb-4"
                style={{ fontFamily: "var(--font-lora)", color: palette.accentDeep }}
              >
                {leader.name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-5">
                {leader.roles.map((role) => (
                  <span
                    key={role}
                    className="text-xs px-3 py-1.5"
                    style={{
                      background: palette.section,
                      color: palette.accentDeep,
                      borderRadius: "999px",
                      fontFamily: "var(--font-golos)",
                    }}
                  >
                    {role}
                  </span>
                ))}
              </div>

              {leader.bio ? (
                <p className="leading-relaxed mb-5 text-sm md:text-base">{leader.bio}</p>
              ) : (
                <div
                  className="p-5 text-sm italic mb-5"
                  style={{
                    background: palette.section,
                    color: palette.accentDeep,
                    borderRadius: "12px",
                    border: `1px dashed ${palette.accent}`,
                    opacity: 0.8,
                  }}
                >
                  Биография руководителя будет добавлена позже.
                </div>
              )}

              <div className="mt-5">
                <div
                  className="text-xs uppercase tracking-[0.2em] mb-3"
                  style={{ color: palette.copper, fontFamily: "var(--font-golos)", fontWeight: 500 }}
                >
                  Достижения руководителя
                </div>
                <ul className="space-y-2">
                  {leader.achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 flex-shrink-0" fill={palette.copper}>
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
                      </svg>
                      <span style={{ color: palette.text }}>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Achievements ─── */}
      <section id="achievements" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Признание" title="Достижения" />

          <div className="grid md:grid-cols-3 gap-5">
            {achievements.map((ach, i) => (
              <div
                key={i}
                className="p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: palette.card,
                  border: `1px solid ${palette.copper}55`,
                  borderTop: `4px solid ${palette.copper}`,
                  borderRadius: "16px",
                }}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7 mb-4" fill={palette.copper}>
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
                </svg>
                <div
                  className="text-xs uppercase tracking-wider mb-2"
                  style={{ color: palette.copper, fontFamily: "var(--font-golos)", fontWeight: 500 }}
                >
                  {ach.year}
                </div>
                <h3
                  className="text-xl mb-2"
                  style={{ fontFamily: "var(--font-lora)", color: palette.accentDeep, fontWeight: 600 }}
                >
                  {ach.title}
                </h3>
                {ach.description && (
                  <p className="text-sm leading-relaxed" style={{ color: palette.text, opacity: 0.8 }}>
                    {ach.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Ornament color={palette.copper} />
          </div>
          <p
            className="text-center text-sm italic mt-4"
            style={{ color: palette.accentDeep, fontFamily: "var(--font-lora)" }}
          >
            Список регулярно дополняется новыми наградами
          </p>
        </div>
      </section>

      {/* ─── Repertoire ─── */}
      <section id="repertoire" className="py-24 px-6" style={{ background: palette.section }}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Звучание" title="Репертуар" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {repertoire.map((item) => (
              <div
                key={item.id}
                className="group p-6 transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{
                  background: palette.card,
                  border: `1px solid ${palette.accent}44`,
                  borderRadius: "16px",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs italic"
                    style={{ color: palette.copper, fontFamily: "var(--font-lora)" }}
                  >
                    № {String(item.id).padStart(2, "0")}
                  </span>
                  <span
                    className="text-xs px-2.5 py-1"
                    style={{
                      background: tagColor(item.type),
                      color: "#fff",
                      borderRadius: "999px",
                      fontFamily: "var(--font-golos)",
                      fontWeight: 500,
                    }}
                  >
                    {item.type}
                  </span>
                </div>
                <h3
                  className="text-xl mb-2"
                  style={{ fontFamily: "var(--font-lora)", color: palette.accentDeep, fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm leading-relaxed" style={{ color: palette.text, opacity: 0.75 }}>
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Ornament color={palette.copper} />
          </div>
          <p
            className="text-center text-sm italic mt-4"
            style={{ color: palette.accentDeep, fontFamily: "var(--font-lora)" }}
          >
            Репертуар постоянно расширяется
          </p>
        </div>
      </section>

      {/* ─── Events ─── */}
      <section id="events" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionTitle eyebrow="Афиша" title="Ближайшие события" />

          {events.filter((e) => e.status === "upcoming").length > 0 ? (
            <div className="space-y-5">
              {events
                .filter((e) => e.status === "upcoming")
                .map((ev, i) => (
                  <div
                    key={i}
                    className="p-8 flex flex-col md:flex-row md:items-center gap-6"
                    style={{
                      background: palette.card,
                      border: `1px solid ${palette.accent}55`,
                      borderRadius: "20px",
                    }}
                  >
                    <div
                      className="flex-shrink-0 px-5 py-3 text-center"
                      style={{
                        background: palette.copper,
                        color: "#fff",
                        borderRadius: "12px",
                      }}
                    >
                      <div
                        className="text-base font-medium"
                        style={{ fontFamily: "var(--font-lora)" }}
                      >
                        {ev.date}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-xl md:text-2xl mb-2"
                        style={{ fontFamily: "var(--font-lora)", color: palette.accentDeep, fontWeight: 600 }}
                      >
                        {ev.title}
                      </h3>
                      {ev.place && (
                        <p className="text-sm" style={{ color: palette.text, opacity: 0.7 }}>
                          {ev.place}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p
              className="text-center text-lg italic py-12"
              style={{ color: palette.accentDeep, fontFamily: "var(--font-lora)" }}
            >
              Ближайшие мероприятия будут объявлены позже
            </p>
          )}

          <div className="mt-12 text-center">
            <p className="text-sm" style={{ color: palette.text, opacity: 0.7 }}>
              Следите за анонсами в нашей группе ВКонтакте
            </p>
          </div>
        </div>
      </section>

      {/* ─── Gallery ─── */}
      <section id="gallery" className="py-24 px-6" style={{ background: palette.section }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Моменты" title="Галерея" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                style={{
                  borderRadius: "12px",
                  border: `1px solid ${palette.accent}44`,
                }}
              >
                <div
                  className={`bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${
                    i === 0 ? "aspect-square md:aspect-[2/1]" : "aspect-square"
                  }`}
                  style={{ backgroundImage: `url(${img.src})` }}
                />
                {img.caption && (
                  <div
                    className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs italic"
                    style={{
                      background: `linear-gradient(0deg, ${palette.bg}ee, transparent)`,
                      color: palette.accentDeep,
                      fontFamily: "var(--font-lora)",
                    }}
                  >
                    {img.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contacts ─── */}
      <section id="contacts" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionTitle eyebrow="Связь" title="Контакты" />

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="leading-relaxed mb-8 text-sm md:text-base" style={{ color: palette.text }}>
                {ensemble.signature}
              </p>

              <div className="space-y-4">
                <a
                  href={`tel:${ensemble.contacts.phoneHref}`}
                  className="flex items-center gap-4 p-4 transition-all duration-300 hover:shadow-md"
                  style={{
                    background: palette.card,
                    border: `1px solid ${palette.accent}33`,
                    borderRadius: "14px",
                  }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                    style={{ background: palette.copper, color: "#fff", borderRadius: "12px" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider" style={{ color: palette.copper, fontFamily: "var(--font-golos)", fontWeight: 500 }}>
                      Телефон руководителя
                    </div>
                    <div
                      className="text-lg"
                      style={{ fontFamily: "var(--font-lora)", color: palette.accentDeep, fontWeight: 600 }}
                    >
                      {ensemble.contacts.phone}
                    </div>
                  </div>
                </a>

                <a
                  href={ensemble.contacts.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 transition-all duration-300 hover:shadow-md"
                  style={{
                    background: palette.card,
                    border: `1px solid ${palette.accent}33`,
                    borderRadius: "14px",
                  }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                    style={{ background: palette.accentDeep, color: "#fff", borderRadius: "12px" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M12.785 16.241s.288-.032.435-.193c.135-.148.131-.426.131-.426s-.018-1.302.576-1.495c.586-.19 1.338 1.262 2.132 1.811.602.415 1.059.324 1.059.324l2.131-.03s1.114-.069.586-.947c-.043-.071-.307-.648-1.579-1.834-1.331-1.24-1.153-1.039.45-3.185.976-1.306 1.367-2.105 1.245-2.443-.117-.323-.842-.237-.842-.237l-2.402.015s-.178-.024-.31.055c-.13.077-.213.257-.213.257s-.378 1.005-.882 1.86c-1.063 1.806-1.488 1.901-1.662 1.789-.404-.262-.303-1.05-.303-1.61 0-1.75.265-2.482-.516-2.673-.26-.063-.452-.104-1.116-.111-.852-.009-1.573.003-1.981.205-.272.134-.481.433-.354.45.158.021.515.097.704.357.244.334.236 1.084.236 1.084s.14 2.068-.327 2.325c-.32.176-.76-.183-1.712-1.836-.485-.842-.852-1.772-.852-1.772s-.07-.174-.198-.267c-.155-.114-.371-.15-.371-.15l-2.282.015s-.343.01-.469.158c-.112.132-.009.405-.009.405s1.786 4.179 3.808 6.286c1.854 1.932 3.961 1.805 3.961 1.805h.954z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider" style={{ color: palette.copper, fontFamily: "var(--font-golos)", fontWeight: 500 }}>
                      Группа ВКонтакте
                    </div>
                    <div
                      className="text-lg"
                      style={{ fontFamily: "var(--font-lora)", color: palette.accentDeep, fontWeight: 600 }}
                    >
                      {ensemble.contacts.vkLabel}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <form
              className="p-7 space-y-4"
              style={{
                background: palette.card,
                border: `1px solid ${palette.accent}44`,
                borderRadius: "20px",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                alert("Спасибо за обращение! Мы свяжемся с вами в ближайшее время.");
              }}
            >
              <div>
                <label
                  className="text-xs uppercase tracking-wider block mb-2"
                  style={{ color: palette.copper, fontFamily: "var(--font-golos)", fontWeight: 500 }}
                >
                  Ваше имя
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 outline-none text-sm"
                  style={{
                    background: palette.section,
                    border: `1px solid ${palette.accent}55`,
                    color: palette.text,
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div>
                <label
                  className="text-xs uppercase tracking-wider block mb-2"
                  style={{ color: palette.copper, fontFamily: "var(--font-golos)", fontWeight: 500 }}
                >
                  Телефон или e-mail
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 outline-none text-sm"
                  style={{
                    background: palette.section,
                    border: `1px solid ${palette.accent}55`,
                    color: palette.text,
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div>
                <label
                  className="text-xs uppercase tracking-wider block mb-2"
                  style={{ color: palette.copper, fontFamily: "var(--font-golos)", fontWeight: 500 }}
                >
                  Сообщение
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3.5 py-2.5 outline-none resize-none text-sm"
                  style={{
                    background: palette.section,
                    border: `1px solid ${palette.accent}55`,
                    color: palette.text,
                    borderRadius: "10px",
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 text-sm transition-all duration-300 hover:opacity-90 cursor-pointer"
                style={{
                  background: palette.copper,
                  color: "#fff",
                  letterSpacing: "0.05em",
                  borderRadius: "999px",
                  fontFamily: "var(--font-golos)",
                  fontWeight: 500,
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
        className="py-10 px-6"
        style={{ background: palette.accentDeep, color: palette.bg }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <SwanMark size="sm" />
            <span
              className="text-2xl"
              style={{ fontFamily: "var(--font-lora)", letterSpacing: "0.02em", fontWeight: 600 }}
            >
              Лебёдия
            </span>
          </div>
          <div className="flex justify-center">
            <Ornament color={palette.copper} />
          </div>
          <div
            className="text-xs italic opacity-80"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            {ensemble.tagline} · с {ensemble.founded}
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 text-center text-xs opacity-70">
          © {new Date().getFullYear()} Ансамбль «Лебёдия»
        </div>
      </footer>
    </div>
  );
}

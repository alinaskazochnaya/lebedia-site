'use client'

import { useState, useEffect, useRef } from "react";
import {
  ensemble,
  leader,
  achievements,
  repertoire,
  gallery,
  events,
  instruments,
} from "./data";
import type { RepertoireItem } from "./data";
import { Reveal } from "./Reveal";

// — Палитра «Лебяжья дымка»
const palette = {
  bg: "#F7FBFD",
  card: "#FFFFFF",
  accent: "#A8C9DD",
  accentDeep: "#5A89A8",
  text: "#2C3E50",
  gold: "#C9A961",
  mist: "#EAF3F8",
};

const navLinks = [
  { id: "about", label: "Об ансамбле" },
  { id: "leader", label: "Руководитель" },
  { id: "achievements", label: "Достижения" },
  { id: "repertoire", label: "Репертуар" },
  { id: "events", label: "Афиша" },
  { id: "gallery", label: "Галерея" },
  { id: "contacts", label: "Контакты" },
];

function Logo({ size = "lg" }: { size?: "lg" | "sm" }) {
  // Логотип ансамбля (содержит графику + название «Лебёдия»)
  const heights = size === "lg" ? "h-12 md:h-16" : "h-8";
  return (
    <img
      src="/lebedia-logo.svg"
      alt="Ансамбль «Лебёдия»"
      className={`${heights} w-auto`}
      style={{
        objectFit: "contain",
        filter: "drop-shadow(0 1px 2px rgba(44,62,80,0.08))",
      }}
    />
  );
}

function WaveDivider({ color = palette.accent, opacity = 0.4 }: { color?: string; opacity?: number }) {
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      className="w-full h-6"
      fill="none"
      stroke={color}
      strokeWidth="1"
      style={{ opacity }}
    >
      <path
        d="M0 20 C 100 8, 200 32, 300 20 C 400 8, 500 32, 600 20 C 700 8, 800 32, 900 20 C 1000 8, 1100 32, 1200 20"
        style={{
          animation: "wave-flow 18s ease-in-out infinite",
          transformOrigin: "center",
        }}
      />
      <style jsx>{`
        @keyframes wave-flow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-30px); }
        }
      `}</style>
    </svg>
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
    <Reveal direction="up" className={align === "center" ? "text-center mb-12" : "mb-10"}>
      {eyebrow && (
        <div
          className="text-sm uppercase tracking-[0.3em] mb-3"
          style={{
            color: palette.accentDeep,
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className="text-3xl md:text-5xl font-light"
        style={{
          fontFamily: "var(--font-cormorant)",
          color: palette.text,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h2>
      <div
        className="mt-4 mx-auto h-px"
        style={{
          width: align === "center" ? "60px" : "40px",
          background: palette.gold,
          opacity: 0.7,
          animation: "line-grow 1.2s ease-out 0.3s both",
        }}
      />
    </Reveal>
  );
}

// Строка репертуара — вынесена в отдельный компонент
type PaletteColors = {
  bg: string;
  card: string;
  accent: string;
  accentDeep: string;
  text: string;
  gold: string;
  mist: string;
};

type RepertoireRowProps = {
  item: RepertoireItem;
  index: number;
  palette: PaletteColors;
};

function RepertoireRow({ item, index, palette }: RepertoireRowProps) {
  return (
    <div
      className="group relative block md:grid md:grid-cols-[50px_1fr_auto] md:gap-8 md:items-baseline py-5 md:py-6 transition-all duration-300 hover:bg-white cursor-default px-5 md:px-8"
      style={{
        borderTop: `1px solid ${palette.accent}33`,
        animation: `fade-up 0.6s ease-out ${index * 0.06}s both`,
      }}
    >
      {/* Левая золотая полоска — появляется при hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: palette.gold, transform: "scaleY(0.6)", transformOrigin: "center" }}
      />

      {/* ─── Mobile layout (вертикальный) ─── */}
      <div className="md:hidden">
        {/* Строка 1: номер + тип (тип отдельной строкой, не налазит) */}
        <div className="flex items-baseline gap-3 mb-2">
          <span
            className="text-sm italic flex-shrink-0"
            style={{ color: palette.accentDeep, fontFamily: "var(--font-cormorant)" }}
          >
            {String(item.id).padStart(2, "0")}
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.15em] leading-snug"
            style={{ color: palette.accentDeep, fontFamily: "var(--font-inter)", fontWeight: 500 }}
          >
            {item.type}
          </span>
        </div>

        {/* Строка 2: название + автор + видео-кнопка */}
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
          <h3
            className="text-xl transition-all duration-300 group-hover:translate-x-1"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: palette.text,
              fontWeight: 400,
            }}
          >
            {item.title}
          </h3>
          {item.author && (
            <span
              className="text-xs italic opacity-60"
              style={{ color: palette.accentDeep, fontFamily: "var(--font-cormorant)" }}
            >
              — {item.author}
            </span>
          )}
          {item.video && (
            <a
              href={item.video}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: palette.accentDeep,
                color: "#fff",
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                letterSpacing: "0.08em",
              }}
              aria-label={`Смотреть видео: ${item.title}`}
              title="Смотреть видео"
            >
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Видео</span>
            </a>
          )}
        </div>

        {/* Строка 3: описание (если есть) */}
        {item.description && (
          <p
            className="text-sm leading-relaxed"
            style={{ textAlign: "justify", color: palette.text, opacity: 0.7 }}
          >
            {item.description}
          </p>
        )}
      </div>

      {/* ─── Desktop layout (3 колонки) ─── */}
      <div
        className="hidden md:block text-sm italic transition-colors duration-300"
        style={{ color: palette.accentDeep, fontFamily: "var(--font-cormorant)" }}
      >
        {String(item.id).padStart(2, "0")}
      </div>
      <div className="hidden md:block min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
          <h3
            className="text-3xl transition-all duration-300 group-hover:translate-x-1"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: palette.text,
              fontWeight: 400,
            }}
          >
            {item.title}
          </h3>
          {item.author && (
            <span
              className="text-sm italic opacity-60"
              style={{ color: palette.accentDeep, fontFamily: "var(--font-cormorant)" }}
            >
              — {item.author}
            </span>
          )}
          {item.video && (
            <a
              href={item.video}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs uppercase tracking-wider px-2.5 py-1 transition-all duration-300 hover:scale-105 hover:shadow-sm cursor-pointer"
              style={{
                background: palette.accentDeep,
                color: "#fff",
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                letterSpacing: "0.1em",
              }}
              aria-label={`Смотреть видео: ${item.title}`}
              title="Смотреть видео"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Видео</span>
            </a>
          )}
        </div>
        {item.description && (
          <p
            className="text-sm leading-relaxed"
            style={{ textAlign: "justify", color: palette.text, opacity: 0.7 }}
          >
            {item.description}
          </p>
        )}
      </div>
      <div
        className="hidden md:block text-xs uppercase tracking-[0.2em] text-right"
        style={{ color: palette.accentDeep, fontFamily: "var(--font-inter)", fontWeight: 500 }}
      >
        {item.type}
      </div>
    </div>
  );
}

export default function Variant1Lebedia() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroScrollY, setHeroScrollY] = useState(0);
  // SSR-безопасная инициализация: на сервере false, на клиенте сразу true
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Триггерим ребрендеринг на клиенте после монтирования (через rAF, чтобы не нарушать правила effect)
    const raf = requestAnimationFrame(() => setMounted(true));
    const handleScroll = () => {
      // Параллакс только в первой секции (до ~viewport height)
      const heroY = Math.min(window.scrollY, window.innerHeight);
      setHeroScrollY(heroY);

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
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <div
      style={{ background: palette.bg, color: palette.text, fontFamily: "var(--font-inter)" }}
      className="min-h-screen"
    >
      {/* ─── Header ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          background: `rgba(247, 251, 253, 0.85)`,
          borderBottom: `1px solid ${palette.accent}33`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="cursor-pointer">
            <Logo size="sm" />
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative text-sm transition-colors duration-300 cursor-pointer py-1"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: activeSection === link.id ? palette.accentDeep : palette.text,
                  fontWeight: activeSection === link.id ? 500 : 400,
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px transition-all duration-300"
                  style={{
                    background: palette.gold,
                    width: activeSection === link.id ? "100%" : "0%",
                  }}
                />
              </button>
            ))}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={palette.text} strokeWidth="1.5">
              {mobileMenuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden px-6 pb-4 flex flex-col gap-3"
            style={{ background: palette.bg, borderBottom: `1px solid ${palette.accent}33` }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-sm py-1 cursor-pointer"
                style={{
                  color: activeSection === link.id ? palette.accentDeep : palette.text,
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
        {/* Фоновое изображение: озеро с лебедем в утреннем тумане + параллакс */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/gallery/swan-lake-hero.png)`,
            filter: "blur(1px)",
            transform: `scale(1.1) translateY(${heroScrollY * 0.3}px)`,
            transition: "transform 0.1s linear",
          }}
        />
        {/* «Дыхание» — лёгкая пульсация затемнения */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${palette.bg}cc 0%, ${palette.bg}99 50%, ${palette.bg}f2 100%)`,
            animation: "hero-breathe 8s ease-in-out infinite",
          }}
        />

        <div
          className="relative z-10 text-center px-6 max-w-4xl"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.2s ease-out, transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Логотип ансамбля — появляется с лёгким размытием→фокус */}
          <div
            className="flex justify-center mb-8"
            style={{
              animation: "logo-emerge 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both",
            }}
          >
            <img
              src="/lebedia-logo.svg"
              alt="Ансамбль «Лебёдия»"
              className="h-24 md:h-32 w-auto"
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 2px 8px rgba(44,62,80,0.12))",
              }}
            />
          </div>
          <div
            className="text-xs md:text-sm uppercase tracking-[0.4em] mb-5"
            style={{
              color: palette.accentDeep,
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              animation: "fade-up 1s ease-out 0.6s both",
            }}
          >
            {ensemble.type}
          </div>
          <div
            className="text-2xl md:text-4xl italic mb-8"
            style={{
              color: palette.accentDeep,
              fontFamily: "var(--font-cormorant)",
              animation: "fade-up 1s ease-out 0.8s both",
            }}
          >
            {ensemble.tagline}
          </div>
          <p
            className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10" style={{ textAlign: "justify" }}
            style={{
              color: palette.text,
              opacity: 0.85,
              animation: "fade-up 1s ease-out 1s both",
            }}
          >
            {ensemble.concept}
          </p>
          <div
            className="flex flex-wrap items-center justify-center gap-4"
            style={{
              animation: "fade-up 1s ease-out 1.2s both",
            }}
          >
            <button
              onClick={() => scrollTo("about")}
              className="px-7 py-3 text-sm transition-all duration-300 cursor-pointer hover:scale-[1.04] hover:shadow-lg"
              style={{
                background: palette.accentDeep,
                color: "#fff",
                fontFamily: "var(--font-inter)",
                letterSpacing: "0.1em",
              }}
            >
              УЗНАТЬ О НАС
            </button>
            <button
              onClick={() => scrollTo("repertoire")}
              className="px-7 py-3 text-sm transition-all duration-300 cursor-pointer hover:bg-white/50"
              style={{
                border: `1px solid ${palette.accentDeep}`,
                color: palette.accentDeep,
                fontFamily: "var(--font-inter)",
                letterSpacing: "0.1em",
              }}
            >
              РЕПЕРТУАР
            </button>
          </div>
        </div>

        {/* Стрелка-указатель вниз — мягкая пульсация */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block"
          style={{ animation: "scroll-hint 2.5s ease-in-out infinite" }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={palette.accentDeep} strokeWidth="1.2" opacity="0.6">
            <path d="M12 4v14M6 12l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Декоративная волна снизу */}
        <div className="absolute bottom-0 left-0 right-0">
          <WaveDivider color={palette.accentDeep} opacity={0.3} />
        </div>
      </section>

      {/* ─── About ─── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Концепция" title="Об ансамбле" />

          {/* Диалог эпох — единый блок на всю ширину */}
          <Reveal direction="up" className="mb-20">
            <h3
              className="text-2xl md:text-3xl mb-5 italic"
              style={{ fontFamily: "var(--font-cormorant)", color: palette.accentDeep }}
            >
              Диалог эпох
            </h3>
            <p className="leading-relaxed" style={{ textAlign: "justify", color: palette.text }}>
              {ensemble.description}
            </p>
          </Reveal>

          {/* Звучание и инструменты */}
          <Reveal direction="up">
            <div
              className="rounded-lg p-8 md:p-12 mb-16"
              style={{ background: palette.card, border: `1px solid ${palette.mist}` }}
            >
              <h3
                className="text-2xl md:text-3xl mb-6 italic"
                style={{ fontFamily: "var(--font-cormorant)", color: palette.accentDeep }}
              >
                Звучание и инструменты
              </h3>
              <p className="leading-relaxed mb-8" style={{ textAlign: "justify", color: palette.text }}>
                {ensemble.sound}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {instruments.map((inst, i) => (
                  <div
                    key={inst.name}
                    className="p-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-md cursor-default"
                    style={{
                      background: palette.mist,
                      borderRadius: "4px",
                      animation: `fade-up 0.6s ease-out ${0.1 + i * 0.07}s both`,
                    }}
                  >
                    <div
                      className="text-lg mb-1"
                      style={{ fontFamily: "var(--font-cormorant)", color: palette.accentDeep }}
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
          </Reveal>

          {/* Художественный метод */}
          <Reveal direction="up">
            <div className="mb-16">
              <h3
                className="text-2xl md:text-3xl mb-6 italic"
                style={{ fontFamily: "var(--font-cormorant)", color: palette.accentDeep }}
              >
                Репертуар и художественный метод
              </h3>
              <div className="space-y-5">
                {ensemble.method.map((p, i) => (
                  <p key={i} className="leading-relaxed" style={{ textAlign: "justify", color: palette.text }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Визуальный образ — фото во всю ширину без обрезки, текст ниже */}
          <Reveal direction="up">
            <div>
              <h3
                className="text-2xl md:text-3xl mb-4 italic"
                style={{ fontFamily: "var(--font-cormorant)", color: palette.accentDeep }}
              >
                Визуальный образ
              </h3>
              <div
                className="h-px w-12 mb-8"
                style={{ background: palette.gold, opacity: 0.7, animation: "line-grow 1.2s ease-out 0.3s both" }}
              />

              {/* Фото во всю ширину — показывается целиком без обрезки */}
              <div
                className="w-full mb-10 overflow-hidden group"
                style={{
                  borderRadius: "2px",
                  boxShadow: "0 10px 40px -10px rgba(44, 62, 80, 0.15)",
                }}
              >
                <img
                  src={gallery[0].src}
                  alt="Ансамбль «Лебёдия» в сценических костюмах"
                  className="block w-full h-auto transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]"
                  style={{ display: "block" }}
                />
              </div>

              <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
                <p className="leading-relaxed" style={{ textAlign: "justify", color: palette.text }}>
                  {ensemble.visualImage}
                </p>
                <div className="flex flex-col gap-3 md:min-w-[220px]">
                  <div
                    className="px-5 py-4 transition-all duration-300 hover:shadow-md"
                    style={{ background: palette.mist }}
                  >
                    <div
                      className="text-xs uppercase tracking-[0.2em] mb-1"
                      style={{ color: palette.accentDeep, fontFamily: "var(--font-inter)", fontWeight: 500 }}
                    >
                      Состав
                    </div>
                    <div
                      className="text-xl"
                      style={{ fontFamily: "var(--font-cormorant)", color: palette.text }}
                    >
                      {ensemble.size}
                    </div>
                  </div>
                  <div
                    className="px-5 py-4 transition-all duration-300 hover:shadow-md"
                    style={{ background: palette.mist }}
                  >
                    <div
                      className="text-xs uppercase tracking-[0.2em] mb-1"
                      style={{ color: palette.accentDeep, fontFamily: "var(--font-inter)", fontWeight: 500 }}
                    >
                      Характер
                    </div>
                    <div
                      className="text-base italic"
                      style={{ fontFamily: "var(--font-cormorant)", color: palette.text }}
                    >
                      Женская соборность
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Leader ─── */}
      <section id="leader" className="py-24 px-6" style={{ background: palette.mist }}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Лицо ансамбля" title="Руководитель" />

          <Reveal direction="up">
            <div className="grid md:grid-cols-[300px_1fr] gap-10 items-start">
              {/* Портрет руководителя */}
              <div
                className="relative overflow-hidden transition-all duration-500 hover:shadow-xl group"
                style={{
                  border: `1px solid ${palette.accent}66`,
                }}
              >
                <img
                  src="/gallery/leader.jpg"
                  alt={`${leader.name} — ${leader.stageName}`}
                  className="block w-full h-auto transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                />
                {/* Лёгкая подпись снизу */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(0deg, ${palette.bg}ee 0%, ${palette.bg}99 60%, transparent 100%)`,
                  }}
                >
                  <div
                    className="text-xs italic"
                    style={{ color: palette.accentDeep, fontFamily: "var(--font-cormorant)" }}
                  >
                    {leader.stageName}
                  </div>
                </div>
              </div>

              <div>
                <div
                  className="text-sm uppercase tracking-[0.3em] mb-2"
                  style={{ color: palette.accentDeep }}
                >
                  {leader.stageName}
                </div>
                <h3
                  className="text-3xl md:text-4xl mb-5"
                  style={{ fontFamily: "var(--font-cormorant)", color: palette.text }}
                >
                  {leader.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {leader.roles.map((role) => (
                    <span
                      key={role}
                      className="text-xs px-3 py-1 transition-all duration-300 hover:scale-105 hover:shadow-sm cursor-default"
                      style={{
                        background: palette.card,
                        color: palette.accentDeep,
                        border: `1px solid ${palette.accent}66`,
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>

                {leader.bio ? (
                  <div className="mb-5 space-y-4">
                    {leader.bio.split("\n\n").map((para, i) => (
                      <p key={i} className="leading-relaxed" style={{ textAlign: "justify", color: palette.text }}>
                        {para}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div
                    className="p-5 text-sm italic"
                    style={{
                      background: palette.card,
                      color: palette.accentDeep,
                      border: `1px dashed ${palette.accent}`,
                      opacity: 0.7,
                    }}
                  >
                    Биография руководителя будет добавлена позже.
                  </div>
                )}

                <div className="mt-6">
                  <div
                    className="text-xs uppercase tracking-[0.2em] mb-3"
                    style={{ color: palette.accentDeep }}
                  >
                    Достижения руководителя
                  </div>
                  <ul className="space-y-2">
                    {leader.achievements.map((a, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm transition-all duration-300 hover:translate-x-1"
                      >
                        <span style={{ color: palette.gold }}>✦</span>
                        <span style={{ color: palette.text }}>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Achievements ─── */}
      <section id="achievements" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Признание" title="Достижения" />

          <div className="space-y-6">
            {achievements.map((ach, i) => (
              <Reveal key={i} direction="left" delay={i * 0.12}>
                <div
                  className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 p-6 md:p-8 transition-all duration-300 hover:translate-x-1 hover:shadow-lg cursor-default"
                  style={{
                    background: palette.card,
                    border: `1px solid ${palette.gold}55`,
                    borderLeft: `3px solid ${palette.gold}`,
                  }}
                >
                  <div>
                    <div
                      className="text-3xl md:text-4xl"
                      style={{ fontFamily: "var(--font-cormorant)", color: palette.gold }}
                    >
                      {ach.year}
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-xl md:text-2xl mb-2"
                      style={{ fontFamily: "var(--font-cormorant)", color: palette.text }}
                    >
                      {ach.title}
                    </h3>
                    {ach.description && (
                      <p className="text-sm leading-relaxed" style={{ textAlign: "justify", color: palette.text, opacity: 0.8 }}>
                        {ach.description}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal direction="up" delay={0.4}>
            <p
              className="text-center text-sm italic mt-10"
              style={{ color: palette.accentDeep, fontFamily: "var(--font-cormorant)" }}
            >
              Список регулярно дополняется новыми наградами
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Repertoire — формат оглавления книги ─── */}
      <section id="repertoire" className="py-24 px-6" style={{ background: palette.mist }}>
        <div className="max-w-4xl mx-auto">
          <SectionTitle eyebrow="Звучание" title="Репертуар" />

          {/* Блок 1: Народные песни и былины */}
          <Reveal direction="up">
            <div className="flex items-center gap-4 mb-6 mt-4">
              <h3
                className="text-xl md:text-2xl italic"
                style={{ fontFamily: "var(--font-cormorant)", color: palette.accentDeep }}
              >
                Народные песни и былины
              </h3>
              <div
                className="flex-1 h-px"
                style={{ background: palette.gold, opacity: 0.4 }}
              />
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: palette.accentDeep, fontFamily: "var(--font-inter)", opacity: 0.7 }}
              >
                {repertoire.filter((r) => r.category === "traditional").length} песен
              </span>
            </div>
          </Reveal>

          <div
            className="space-y-px mb-16"
            style={{ background: palette.card }}
          >
            {repertoire.filter((r) => r.category === "traditional").map((item, i) => (
              <RepertoireRow key={item.id} item={item} index={i} palette={palette} />
            ))}
          </div>

          {/* Блок 2: Современное в фолк-обработке */}
          <Reveal direction="up">
            <div className="flex items-center gap-4 mb-6">
              <h3
                className="text-xl md:text-2xl italic"
                style={{ fontFamily: "var(--font-cormorant)", color: palette.accentDeep }}
              >
                Современное в фолк-обработке
              </h3>
              <div
                className="flex-1 h-px"
                style={{ background: palette.gold, opacity: 0.4 }}
              />
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: palette.accentDeep, fontFamily: "var(--font-inter)", opacity: 0.7 }}
              >
                {repertoire.filter((r) => r.category === "modern").length} песен
              </span>
            </div>
          </Reveal>

          <div
            className="space-y-px"
            style={{ background: palette.card }}
          >
            {repertoire.filter((r) => r.category === "modern").map((item, i) => (
              <RepertoireRow key={item.id} item={item} index={i} palette={palette} />
            ))}
          </div>

          <Reveal direction="up" delay={0.3}>
            <p
              className="text-center text-sm italic mt-10"
              style={{ color: palette.accentDeep, fontFamily: "var(--font-cormorant)" }}
            >
              Репертуар постоянно расширяется
            </p>
          </Reveal>
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
                  <Reveal key={i} direction="up" delay={i * 0.15}>
                    <div
                      className="grid grid-cols-[140px_1fr] gap-6 p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-default"
                      style={{
                        background: palette.card,
                        border: `1px solid ${palette.accent}55`,
                      }}
                    >
                      <div>
                        <div
                          className="text-2xl"
                          style={{ fontFamily: "var(--font-cormorant)", color: palette.accentDeep }}
                        >
                          {ev.date}
                        </div>
                      </div>
                      <div>
                        <h3
                          className="text-xl md:text-2xl mb-2"
                          style={{ fontFamily: "var(--font-cormorant)", color: palette.text }}
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
                  </Reveal>
                ))}
            </div>
          ) : (
            <p
              className="text-center text-lg italic py-12"
              style={{ color: palette.accentDeep, fontFamily: "var(--font-cormorant)" }}
            >
              Ближайшие мероприятия будут объявлены позже
            </p>
          )}

          <Reveal direction="up" delay={0.3}>
            <div className="mt-12 text-center">
              <p className="text-sm" style={{ color: palette.text, opacity: 0.7 }}>
                Следите за анонсами в нашей группе ВКонтакте
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Gallery ─── */}
      <section id="gallery" className="py-24 px-6" style={{ background: palette.mist }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Моменты" title="Галерея" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {gallery.map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden"
                style={{
                  border: `1px solid ${palette.accent}44`,
                  animation: `fade-up 0.8s ease-out ${i * 0.1}s both`,
                }}
              >
                <div
                  className="aspect-[3/2] bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${img.src})` }}
                />
                {/* Лёгкое затемнение снизу, проявляется при hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(180deg, transparent 60%, ${palette.text}40 100%)`,
                  }}
                />
                {img.caption && (
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-3 text-sm italic transition-transform duration-500 group-hover:translate-y-0 translate-y-1"
                    style={{
                      background: `linear-gradient(0deg, ${palette.bg}ee, transparent)`,
                      color: palette.text,
                      fontFamily: "var(--font-cormorant)",
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

          <Reveal direction="up">
            <p
              className="max-w-2xl mx-auto text-center leading-relaxed mb-12" style={{ textAlign: "justify" }}
              style={{ textAlign: "justify", color: palette.text }}
            >
              {ensemble.signature}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="max-w-xl mx-auto space-y-4">
              <a
                href={`tel:${ensemble.contacts.phoneHref}`}
                className="flex items-center gap-4 p-5 transition-all duration-300 hover:shadow-md group"
                style={{
                  background: palette.card,
                  border: `1px solid ${palette.accent}33`,
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-sm"
                  style={{ background: palette.mist, color: palette.accentDeep }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: palette.accentDeep }}>
                    Телефон руководителя
                  </div>
                  <div
                    className="text-lg"
                    style={{ fontFamily: "var(--font-cormorant)", color: palette.text }}
                  >
                    {ensemble.contacts.phone}
                  </div>
                </div>
              </a>

              <a
                href={ensemble.contacts.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 transition-all duration-300 hover:shadow-md group"
                style={{
                  background: palette.card,
                  border: `1px solid ${palette.accent}33`,
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-sm"
                  style={{ background: palette.mist, color: palette.accentDeep }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M12.785 16.241s.288-.032.435-.193c.135-.148.131-.426.131-.426s-.018-1.302.576-1.495c.586-.19 1.338 1.262 2.132 1.811.602.415 1.059.324 1.059.324l2.131-.03s1.114-.069.586-.947c-.043-.071-.307-.648-1.579-1.834-1.331-1.24-1.153-1.039.45-3.185.976-1.306 1.367-2.105 1.245-2.443-.117-.323-.842-.237-.842-.237l-2.402.015s-.178-.024-.31.055c-.13.077-.213.257-.213.257s-.378 1.005-.882 1.86c-1.063 1.806-1.488 1.901-1.662 1.789-.404-.262-.303-1.05-.303-1.61 0-1.75.265-2.482-.516-2.673-.26-.063-.452-.104-1.116-.111-.852-.009-1.573.003-1.981.205-.272.134-.481.433-.354.45.158.021.515.097.704.357.244.334.236 1.084.236 1.084s.14 2.068-.327 2.325c-.32.176-.76-.183-1.712-1.836-.485-.842-.852-1.772-.852-1.772s-.07-.174-.198-.267c-.155-.114-.371-.15-.371-.15l-2.282.015s-.343.01-.469.158c-.112.132-.009.405-.009.405s1.786 4.179 3.808 6.286c1.854 1.932 3.961 1.805 3.961 1.805h.954z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: palette.accentDeep }}>
                    Группа ВКонтакте
                  </div>
                  <div
                    className="text-lg"
                    style={{ fontFamily: "var(--font-cormorant)", color: palette.text }}
                  >
                    {ensemble.contacts.vkLabel}
                  </div>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="py-10 px-6"
        style={{ background: palette.text, color: palette.bg }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="/lebedia-logo-white.svg"
            alt="Ансамбль «Лебёдия»"
            className="h-10 w-auto"
            style={{ objectFit: "contain" }}
          />
          <div
            className="text-xs italic opacity-70"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {ensemble.tagline} · с {ensemble.founded}
          </div>
          <div className="text-xs opacity-70">
            © {new Date().getFullYear()} Ансамбль «Лебёдия»
          </div>
        </div>
      </footer>
    </div>
  );
}

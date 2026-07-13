'use client'

import { useEffect, useRef, useState } from "react";

/**
 * Хук для отслеживания появления элемента в зоне видимости.
 * Используется для запуска анимаций появления при скролле.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
  } = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  // Если пользователь предпочитает меньше анимаций — инициализируем в true сразу
  const [inView, setInView] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Если уже показан (prefers-reduced-motion) — observer не нужен
    if (inView && triggerOnce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, inView]);

  return { ref, inView };
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Inter, Lora, Golos_Text, Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// V1 «Лебяжья дымка»: Cormorant Garamond + Inter
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

// V2 «Гиперборея»: Playfair Display + Manrope
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

// V3 «Сказка»: Lora + Golos Text
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ансамбль «Лебёдия» — диалог эпох",
  description:
    "Лебёдия — женский вокально-инструментальный ансамбль. Гусли, калимба, джембе и русский фольклор в диалоге с современной музыкой.",
  keywords: ["Лебёдия", "ансамбль", "гусли", "фольклор", "народная музыка", "Гиперборея"],
  authors: [{ name: "Ансамбль «Лебёдия»" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Ансамбль «Лебёдия»",
    description: "Женский вокально-инструментальный ансамбль. Диалог эпох.",
    siteName: "Лебёдия",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${inter.variable} ${playfair.variable} ${manrope.variable} ${lora.variable} ${golos.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

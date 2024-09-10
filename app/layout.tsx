import type { Metadata } from "next";
import { Inter, Zain } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const zain = Zain({ subsets: ["arabic"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Chat App",
  description: "Chat App with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${
          locale === "ar" ? zain.className : inter.className
        } h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

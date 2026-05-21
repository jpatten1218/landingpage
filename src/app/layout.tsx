import type { Metadata } from "next";
import { Anton, Oswald, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coaching.wholedadmovement.com"),
  title: "Whole Dad Movement — 1:1 Coaching for the Burned-Out Dad",
  description:
    "For the high-achieving dad who's been Day 1 for the 18th week. Stop quitting in private. Build daily standards that hold on your worst day.",
  openGraph: {
    title: "Whole Dad Movement — 1:1 Coaching",
    description:
      "Stop drifting. Stop quitting in private. Daily standards that hold on your worst day.",
    url: "https://coaching.wholedadmovement.com",
    siteName: "Whole Dad Movement",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whole Dad Movement — 1:1 Coaching",
    description:
      "Stop drifting. Stop quitting in private. Daily standards that hold on your worst day.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-deep-black text-bone">
        {children}
      </body>
    </html>
  );
}

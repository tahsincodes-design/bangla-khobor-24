import "react-marquee-text/dist/styles.css";
import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Topbar from "@/Components/Topbar";
import Footer from "@/Components/Footer";
import toast, { Toaster } from 'react-hot-toast';


const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Bangla News 24 | সর্বশেষ সংবাদের আপডেট',
  description: 'সর্বশেষ জাতীয়, আন্তর্জাতিক, খেলাধুলা ও বিনোদন সংবাদ।',
  icons: {
    icon: '/logo.webp', // Pointing to public/logo.webp (or /favicon.ico)
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className={`${notoSerifBengali.className} min-h-full flex flex-col antialiased`}>
        <Topbar />
        {children}
        <Footer />

        <Toaster />
      </body>
    </html>
  );
}
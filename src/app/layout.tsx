import type { Metadata, Viewport } from "next";
import { Noto_Sans_Bengali, Noto_Serif_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Topbar from "@/Components/Topbar";
import Footer from "@/Components/Footer";

const sans = Noto_Sans_Bengali({
    subsets: ["bengali"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-bengali-sans",
    display: "swap",
});

const serif = Noto_Serif_Bengali({
    subsets: ["bengali"],
    weight: ["500", "600", "700", "800"],
    variable: "--font-bengali-serif",
    display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bangla-khobor-24.vercel.app";

const siteDescription =
    "বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ, রাজনীতি, অর্থনীতি, খেলা, বিনোদন ও প্রযুক্তির নির্ভরযোগ্য আপডেট — বাংলা নিউজ ২৪।";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "বাংলা নিউজ ২৪ — সর্বশেষ সংবাদ ও বিশ্লেষণ",
        template: "%s | বাংলা নিউজ ২৪",
    },
    description: siteDescription,
    keywords: [
        "বাংলা খবর",
        "সর্বশেষ সংবাদ",
        "বাংলাদেশ",
        "রাজনীতি",
        "অর্থনীতি",
        "খেলা",
        "বিনোদন",
        "প্রযুক্তি",
    ],
    applicationName: "বাংলা নিউজ ২৪",
    authors: [{ name: "বাংলা নিউজ ২৪" }],
    openGraph: {
        type: "website",
        locale: "bn_BD",
        siteName: "বাংলা নিউজ ২৪",
        title: "বাংলা নিউজ ২৪ — সর্বশেষ সংবাদ ও বিশ্লেষণ",
        description: siteDescription,
        images: [{ url: "/logo.webp", width: 512, height: 512, alt: "বাংলা নিউজ ২৪" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "বাংলা নিউজ ২৪ — সর্বশেষ সংবাদ ও বিশ্লেষণ",
        description: siteDescription,
        images: ["/logo.webp"],
    },
    icons: {
        icon: "/logo.webp",
        shortcut: "/logo.webp",
        apple: "/logo.webp",
    },
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
};

export const viewport: Viewport = {
    themeColor: "#faf7f2",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="bn" className="h-full">
            <body
                className={`${sans.variable} ${serif.variable} flex min-h-full flex-col bg-paper font-sans text-ink antialiased`}
            >
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
                >
                    মূল কনটেন্টে যান
                </a>

                <Topbar />

                <main id="main-content" className="flex-1">
                    {children}
                </main>

                <Footer />

                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 3500,
                        style: {
                            background: "#17130f",
                            color: "#faf7f2",
                            borderRadius: "12px",
                            fontSize: "14px",
                            padding: "10px 16px",
                        },
                        success: { iconTheme: { primary: "#b3122e", secondary: "#faf7f2" } },
                        error: { iconTheme: { primary: "#b3122e", secondary: "#faf7f2" } },
                    }}
                />
            </body>
        </html>
    );
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "বাংলা নিউজ ২৪",
        short_name: "বাংলা নিউজ",
        description:
            "বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ, রাজনীতি, অর্থনীতি, খেলা, বিনোদন ও প্রযুক্তির আপডেট।",
        start_url: "/",
        display: "standalone",
        background_color: "#faf7f2",
        theme_color: "#b3122e",
        lang: "bn",
        icons: [
            {
                src: "/logo.webp",
                sizes: "512x512",
                type: "image/webp",
            },
        ],
    };
}

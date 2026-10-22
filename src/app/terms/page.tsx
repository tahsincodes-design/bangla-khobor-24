import type { Metadata } from "next";
import Container from "@/Components/ui/Container";
import Breadcrumbs from "@/Components/ui/Breadcrumbs";
import PageHeader from "@/Components/ui/PageHeader";

export const metadata: Metadata = {
    title: "ব্যবহারের শর্তাবলী",
    description: "বাংলা নিউজ ২৪ ব্যবহার করার শর্ত, অ্যাকাউন্টের দায়িত্ব ও কনটেন্ট ব্যবহারের নিয়ম।",
    alternates: { canonical: "/terms" },
};

const sections = [
    {
        heading: "শর্তের স্বীকৃতি",
        body: "এই ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলী মেনে নিচ্ছেন। শর্তে সম্মত না হলে সাইটটি ব্যবহার করা থেকে বিরত থাকুন।",
    },
    {
        heading: "অ্যাকাউন্টের দায়িত্ব",
        body: "আপনার অ্যাকাউন্টের পাসওয়ার্ড গোপন রাখা এবং অ্যাকাউন্টে হওয়া কার্যকলাপের দায়িত্ব আপনার। সন্দেহজনক কিছু লক্ষ্য করলে সঙ্গে সঙ্গে পাসওয়ার্ড পরিবর্তন করুন।",
    },
    {
        heading: "কনটেন্ট ব্যবহার",
        body: "বাংলা নিউজ ২৪-এ প্রকাশিত লেখা, ছবি ও ভিডিওর স্বত্ব সংশ্লিষ্ট প্রতিষ্ঠানের। ব্যক্তিগত, অ-বাণিজ্যিক ব্যবহারের জন্য শেয়ার করা যাবে; তবে অনুমতি ছাড়া পুনঃপ্রকাশ বা বাণিজ্যিক ব্যবহার নিষিদ্ধ।",
    },
    {
        heading: "গ্রহণযোগ্য ব্যবহার",
        body: "বিদ্বেষমূলক, হয়রানিমূলক, বিভ্রান্তিকর বা বেআইনি কনটেন্ট তৈরি ও প্রচার করা যাবে না। সাইটের নিরাপত্তা বা স্বাভাবিক কার্যক্রম ব্যাহত করার চেষ্টা নিষিদ্ধ।",
    },
    {
        heading: "দায়সীমা",
        body: "সংবাদ সঠিকভাবে প্রকাশের সর্বোচ্চ চেষ্টা করা হয়, তবে কোনো তথ্যের নির্ভুলতা সম্পর্কে চূড়ান্ত নিশ্চয়তা দেওয়া হয় না। গুরুত্বপূর্ণ সিদ্ধান্তের আগে স্বাধীনভাবে তথ্য যাচাই করুন।",
    },
    {
        heading: "পরিবর্তন",
        body: "প্রয়োজনে শর্তাবলী হালনাগাদ করা হতে পারে। পরিবর্তন এই পৃষ্ঠায় প্রকাশের পর তা কার্যকর হবে।",
    },
];

export default function TermsPage() {
    return (
        <Container size="narrow" className="py-10">
            <Breadcrumbs items={[{ label: "ব্যবহারের শর্তাবলী" }]} />

            <PageHeader
                eyebrow="নীতি"
                title="ব্যবহারের শর্তাবলী"
                description="সাইট ও অ্যাকাউন্ট ব্যবহারের আগে এই শর্তগুলো পড়ে নিন।"
            />

            <div className="mt-8 space-y-8">
                {sections.map((section, index) => (
                    <section key={section.heading} className="border-b border-line pb-7 last:border-0">
                        <h2 className="text-lg font-bold text-ink">
                            <span className="mr-2 font-serif text-brand-600">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            {section.heading}
                        </h2>
                        <p className="mt-2 text-[15px] leading-8 text-ink-soft">{section.body}</p>
                    </section>
                ))}
            </div>

            <p className="mt-8 text-xs text-muted">
                সর্বশেষ হালনাগাদ: অক্টোবর ২০২৬।
            </p>
        </Container>
    );
}

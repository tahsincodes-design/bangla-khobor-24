import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/Components/ui/Container";
import Breadcrumbs from "@/Components/ui/Breadcrumbs";
import PageHeader from "@/Components/ui/PageHeader";

export const metadata: Metadata = {
    title: "আমাদের সম্পর্কে",
    description: "বাংলা নিউজ ২৪-এর লক্ষ্য, সম্পাদকীয় নীতি ও সাংবাদিকতার মান।",
    alternates: { canonical: "/about" },
};

export default function AboutPage() {
    return (
        <Container size="narrow" className="py-10">
            <Breadcrumbs items={[{ label: "আমাদের সম্পর্কে" }]} />
            <PageHeader
                eyebrow="পরিচিতি"
                title="আমাদের সম্পর্কে"
                description="সত্য ও বস্তুনিষ্ঠ সংবাদকে সবার কাছে পৌঁছে দেওয়াই বাংলা নিউজ ২৪-এর লক্ষ্য।"
            />

            <div className="mt-8 space-y-8 text-[15px] leading-8 text-ink-soft">
                <section>
                    <h2 className="text-xl font-bold text-ink">আমরা কী করি</h2>
                    <p className="mt-2">
                        দেশ-বিদেশের গুরুত্বপূর্ণ ঘটনা, রাজনীতি, অর্থনীতি, খেলা, বিনোদন ও
                        প্রযুক্তির খবর আমরা দ্রুত ও নির্ভুলভাবে পাঠকের কাছে পৌঁছে দিই। প্রতিটি
                        প্রতিবেদনে তথ্যের সূত্র উল্লেখ এবং প্রয়োজনীয় প্রেক্ষাপট দেওয়ার চেষ্টা
                        করি।
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-ink">সম্পাদকীয় নীতি</h2>
                    <p className="mt-2">
                        সংবাদ প্রকাশে আমরা নিরপেক্ষতা, স্বচ্ছতা ও জবাবদিহিতা মেনে চলি। কোনো
                        তথ্য যাচাইয়ের আগে প্রকাশ করা হয় না। ভুল হয়ে গেলে সংশোধনী প্রকাশ করা
                        হয় এবং পাঠকের মতামতকে গুরুত্ব দেওয়া হয়।
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-ink">আমাদের দল</h2>
                    <p className="mt-2">
                        অভিজ্ঞ সম্পাদক, প্রতিবেদক ও প্রযুক্তি দলের সমন্বয়ে আমাদের নিউজরুম
                        পরিচালিত হয়। পাঠক, গবেষক ও বিষয় বিশেষজ্ঞদের সঙ্গে নিয়মিত যোগাযোগ
                        রাখি।
                    </p>
                    <p className="mt-3 text-sm text-muted">
                        সংশোধনী, অভিযোগ বা পরামর্শ পাঠাতে{" "}
                        <Link href="/contact" className="font-semibold text-brand-700 hover:underline">
                            যোগাযোগ
                        </Link>{" "}
                        পৃষ্ঠাটি ব্যবহার করুন।
                    </p>
                </section>
            </div>
        </Container>
    );
}

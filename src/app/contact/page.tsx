import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/Components/ui/Container";
import Breadcrumbs from "@/Components/ui/Breadcrumbs";
import PageHeader from "@/Components/ui/PageHeader";

export const metadata: Metadata = {
    title: "যোগাযোগ",
    description: "সম্পাদকীয় দল, বিজ্ঞাপন ও কারিগরি সহায়তার জন্য বাংলা নিউজ ২৪-এর সঙ্গে যোগাযোগ করুন।",
    alternates: { canonical: "/contact" },
};

export default function ContactPage() {
    return (
        <Container size="narrow" className="py-10">
            <Breadcrumbs items={[{ label: "যোগাযোগ" }]} />

            <PageHeader
                eyebrow="যোগাযোগ"
                title="আমাদের সঙ্গে কথা বলুন"
                description="সংবাদের সূত্র, সংশোধনী, মতামত বা কারিগরি সহায়তা — সব বিষয়ে জানাতে পারেন।"
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
                    <p className="text-[11px] font-bold tracking-[0.16em] text-brand-600 uppercase">
                        সম্পাদকীয়
                    </p>
                    <h2 className="mt-2 text-lg font-bold text-ink">সংবাদ ও সংশোধনী</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                        কোনো প্রতিবেদনে ভুল বা অস্পষ্টতা পেলে সূত্রসহ জানান। আমরা যাচাই করে
                        সংশোধনী প্রকাশ করব।
                    </p>
                    <a
                        href="mailto:newsroom@banglanews24.example"
                        className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
                    >
                        newsroom@banglanews24.example
                    </a>
                </div>

                <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
                    <p className="text-[11px] font-bold tracking-[0.16em] text-brand-600 uppercase">
                        সহায়তা
                    </p>
                    <h2 className="mt-2 text-lg font-bold text-ink">অ্যাকাউন্ট ও কারিগরি</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                        সাইন ইন, প্রোফাইল বা পাসওয়ার্ড সংক্রান্ত সমস্যায় সহায়তা নিতে যোগাযোগ
                        করুন।
                    </p>
                    <a
                        href="mailto:support@banglanews24.example"
                        className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
                    >
                        support@banglanews24.example
                    </a>
                </div>
            </div>

            <div className="mt-8 rounded-2xl border border-line bg-paper-deep/60 p-6 text-sm leading-relaxed text-ink-soft">
                <h2 className="text-lg font-bold text-ink">নিউজরুম</h2>
                <p className="mt-2 text-muted">
                    ঢাকা, বাংলাদেশ
                    <br />
                    সোমবার থেকে শুক্রবার, সকাল ৯টা — সন্ধ্যা ৬টা
                </p>
                <p className="mt-4 text-xs text-muted">
                    পাসওয়ার্ড ভুলে গেলে অ্যাকাউন্টের ইমেইল থেকে সহায়তা দলে যোগাযোগ করুন।{" "}
                    <Link href="/signIn" className="font-semibold text-brand-700 hover:underline">
                        সাইন ইন
                    </Link>{" "}
                    পৃষ্ঠায় ফিরে যান।
                </p>
            </div>
        </Container>
    );
}

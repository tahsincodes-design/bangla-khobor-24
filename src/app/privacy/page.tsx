import type { Metadata } from "next";
import Container from "@/Components/ui/Container";
import Breadcrumbs from "@/Components/ui/Breadcrumbs";
import PageHeader from "@/Components/ui/PageHeader";

export const metadata: Metadata = {
    title: "গোপনীয়তা নীতি",
    description: "বাংলা নিউজ ২৪ কীভাবে ব্যবহারকারীর তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষিত রাখে।",
    alternates: { canonical: "/privacy" },
};

const sections = [
    {
        heading: "আমরা কোন তথ্য সংগ্রহ করি",
        body: "অ্যাকাউন্ট তৈরি বা সাইন ইন করলে আপনার নাম, ইমেইল ঠিকানা এবং প্রোফাইল ছবির লিঙ্ক সংরক্ষণ করা হয়। পাসওয়ার্ড এনক্রিপ্টেড অবস্থায় থাকে এবং আমরা তা কখনো সরাসরি দেখি না।",
    },
    {
        heading: "তথ্য কীভাবে ব্যবহার করা হয়",
        body: "সেশন পরিচালনা, অ্যাকাউন্ট সুরক্ষা এবং ব্যক্তিগত অভিজ্ঞতা উন্নত করতে তথ্য ব্যবহার করা হয়। আপনার সম্মতি ছাড়া বিপণনের উদ্দেশ্যে তথ্য বিক্রি করা হয় না।",
    },
    {
        heading: "সামাজিক সাইন ইন",
        body: "Google বা GitHub দিয়ে সাইন ইন করলে সংশ্লিষ্ট প্রদানকারী আপনার নাম, ইমেইল ও প্রোফাইল ছবি আমাদের সঙ্গে শেয়ার করতে পারে। তাদের নিজস্ব গোপনীয়তা নীতি প্রযোজ্য।",
    },
    {
        heading: "কুকি ও সেশন",
        body: "সাইন ইন অবস্থা ধরে রাখতে প্রয়োজনীয় কুকি ব্যবহার করা হয়। এগুলো ছাড়া অ্যাকাউন্টভিত্তিক সেবা সঠিকভাবে কাজ করবে না।",
    },
    {
        heading: "আপনার অধিকার",
        body: "আপনি যেকোনো সময় প্রোফাইল থেকে তথ্য হালনাগাদ করতে পারেন এবং অ্যাকাউন্ট মুছে ফেলার অনুরোধ করতে পারেন। অনুরোধের জন্য যোগাযোগ পৃষ্ঠা ব্যবহার করুন।",
    },
];

export default function PrivacyPage() {
    return (
        <Container size="narrow" className="py-10">
            <Breadcrumbs items={[{ label: "গোপনীয়তা নীতি" }]} />

            <PageHeader
                eyebrow="নীতি"
                title="গোপনীয়তা নীতি"
                description="আপনার তথ্যের নিরাপত্তা আমাদের দায়িত্ব। এই নীতিতে বলা হয়েছে আমরা কী সংগ্রহ করি এবং কীভাবে তা ব্যবহার করি।"
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
                সর্বশেষ হালনাগাদ: অক্টোবর ২০২৬। নীতিতে পরিবর্তন হলে এই পৃষ্ঠায় জানানো হবে।
            </p>
        </Container>
    );
}

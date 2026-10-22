import { getCategories, getLatestHeadlines } from "@/lib/news-api";
import { formatFullDate } from "@/lib/format";
import Ticker from "@/Components/ui/Ticker";
import SiteHeader from "@/Components/SiteHeader";

export default async function Topbar() {
    const [categories, headlines] = await Promise.all([
        getCategories(),
        getLatestHeadlines(10),
    ]);

    return (
        <header id="top">
            <Ticker headlines={headlines} />
            <SiteHeader categories={categories} today={formatFullDate()} />
        </header>
    );
}

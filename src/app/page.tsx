import HomeNewsCard from "@/Components/HomeNewsCard";
import OtherNewsSection from "@/Components/OtherNewsSection";

type NewsArticle = {
  id?: string | number;
  title?: string;
  [key: string]: unknown;
};

type NewsSection = {
  id?: string | number;
  title?: string;
  articles?: NewsArticle[];
};

export default async function Page() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
    next: { revalidate: 60 },
  });
  const newsData = (await res.json()) as { data?: NewsSection[] };
  const sections = newsData?.data || [];

  // Extract and flatten all articles from the returned sections
  const allArticles = sections.flatMap((section) => section.articles || []);

  // Deduplicate articles by ID
  const mainNewsData = Array.from(
    new Map(
      allArticles.map((item) => {
        const article = {
          ...item,
          id: String(item.id ?? item.title ?? ""),
          title: String(item.title ?? ""),
        };
        return [article.id, article] as const;
      })
    ).values()
  );
  console.log(sections);
  const excludedTitles = [
    "প্রধান খবর",
    "বিবিসি বাংলা এখন হোয়াটসঅ্যাপে!",
    "বিবিসি বাংলা এখন ইন্সটাগ্রামে!",
    "সামাজিক মাধ্যমে বিবিসি বাংলা",
  ];

  const otherSection = sections.filter(
    (item) => item.title === undefined || !excludedTitles.includes(item.title)
  );

  return (
    <main>
      <HomeNewsCard mainNewsData={mainNewsData} />
      {otherSection.map((item: NewsSection, index: number) => (
        <OtherNewsSection
          key={String(item.id ?? item.title ?? index)}
          title={item.title ?? ""}
          articles={item.articles}
        />
      ))}
    </main>
  );
}
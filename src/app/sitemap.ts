import type { MetadataRoute } from "next";
import { getAllArticles, getCategories } from "@/lib/news-api";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [articles, categories] = await Promise.all([getAllArticles(), getCategories()]);

    const staticPages: MetadataRoute.Sitemap = [
        { url: SITE_URL, changeFrequency: "hourly", priority: 1 },
        { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.4 },
        { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.4 },
        { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
        { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
    ];

    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${SITE_URL}/category/${category.slug}`,
        changeFrequency: "hourly",
        priority: 0.8,
    }));

    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${SITE_URL}/news/${article.id}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: "daily",
        priority: 0.7,
    }));

    return [...staticPages, ...categoryPages, ...articlePages];
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleView from "@/Components/ArticleView";
import { getArticle, getRelated } from "@/lib/news-api";
import { SITE_NAME, SITE_URL } from "@/lib/site";

interface NewsPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
    const { id } = await params;
    const article = await getArticle(id);

    if (!article) notFound();

    return {
        title: article.title,
        description: article.description,
        alternates: { canonical: `/news/${article.id}` },
        openGraph: {
            type: "article",
            title: article.title,
            description: article.description,
            publishedTime: article.publishedAt,
            modifiedTime: article.lastPublished || article.publishedAt,
            authors: article.byline.map((author) => author.name),
            section: article.category,
            images: article.imageUrl ? [{ url: article.imageUrl, alt: article.imageAlt }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.description,
            images: article.imageUrl ? [article.imageUrl] : undefined,
        },
    };
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
    const { id } = await params;
    const article = await getArticle(id);

    if (!article) notFound();

    const related = await getRelated(article, 3);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title,
        description: article.description,
        image: article.imageUrl ? [article.imageUrl] : undefined,
        datePublished: article.publishedAt,
        dateModified: article.lastPublished || article.publishedAt,
        author: article.byline.map((author) => ({
            "@type": "Person",
            name: author.name,
        })),
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/logo.webp`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/news/${article.id}`,
        },
        articleSection: article.category,
        keywords: article.tags.join(", "),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ArticleView article={article} related={related} />
        </>
    );
}

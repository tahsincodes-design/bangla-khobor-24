import {
    fixtureArticleById,
    fixtureArticles,
    fixtureCategories,
    fixtureCategory,
    fixtureSections,
} from "@/lib/fixtures";
import { slugify } from "@/lib/slug";
import type {
    Article,
    ArticleDetail,
    BodyBlock,
    Category,
    CategoryPageData,
    Section,
} from "@/types/news";

const API_BASE = process.env.NEWS_API_URL ?? "https://news-api-v2.vercel.app";
const TIMEOUT_MS = 2500;
const COOLDOWN_MS = 60_000;

/**
 * The public news API is currently returning 402 DEPLOYMENT_DISABLED.
 * When it fails we fall back to bundled fixtures so every page still renders.
 * A short cooldown avoids paying the network timeout on each request.
 */
let disabledUntil = 0;

async function getJson(path: string, revalidate = 120): Promise<unknown | null> {
    if (Date.now() < disabledUntil) return null;

    try {
        const response = await fetch(`${API_BASE}${path}`, {
            headers: { accept: "application/json" },
            next: { revalidate },
            signal: AbortSignal.timeout(TIMEOUT_MS),
        });

        if (!response.ok) {
            disabledUntil = Date.now() + COOLDOWN_MS;
            return null;
        }

        return (await response.json()) as unknown;
    } catch {
        disabledUntil = Date.now() + COOLDOWN_MS;
        return null;
    }
}

function asRecord(value: unknown): Record<string, unknown> {
    return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function asArray(value: unknown): unknown[] {
    return Array.isArray(value) ? value : [];
}

function text(value: unknown, fallback = ""): string {
    return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function categorySlug(raw: Record<string, unknown>, fallbackTitle?: string): string {
    const nested = asRecord(raw.category);
    const explicit = text(raw.categorySlug) || text(nested.slug) || text(raw.category_slug);
    if (explicit) return slugify(explicit);

    const title = text(raw.category, fallbackTitle ?? "");
    const match = fixtureCategories.find((category) => category.title === title);
    return match?.slug ?? slugify(title) ?? "news";
}

function normalizeArticle(
    value: unknown,
    fallback?: { category?: string; categorySlug?: string },
): Article | null {
    const raw = asRecord(value);
    const id = text(raw.id) || text(raw.slug) || text(raw._id);
    const title = text(raw.title) || text(raw.headline);

    if (!id || !title) return null;

    const categoryTitle =
        text(raw.category) || fallback?.category || text(raw.section) || "সংবাদ";
    const fallbackSlug = fallback?.categorySlug;
    const publishedAt =
        text(raw.publishedAt) ||
        text(raw.firstPublished) ||
        text(raw.lastPublished) ||
        new Date().toISOString();

    return {
        id,
        title,
        description: text(raw.description) || text(raw.summary) || text(raw.excerpt),
        category: categoryTitle,
        categorySlug: fallbackSlug ?? categorySlug(raw, categoryTitle),
        imageUrl: text(raw.imageUrl) || text(raw.image) || text(raw.thumbnail),
        imageAlt: text(raw.imageAlt) || title,
        publishedAt,
        isLive: Boolean(raw.isLive),
        views: Number(raw.views ?? raw.viewCount ?? 0) || 0,
        source: text(raw.source),
    };
}

function normalizeSection(value: unknown, index: number): Section | null {
    const raw = asRecord(value);
    const title = text(raw.title) || text(raw.name);
    if (!title) return null;

    const slug = text(raw.slug) || slugify(title) || `section-${index}`;
    const articles = asArray(raw.articles)
        .map((article) => normalizeArticle(article, { category: title, categorySlug: slug }))
        .filter((article): article is Article => Boolean(article));

    return {
        id: text(raw.id) || slug,
        slug,
        title,
        description: text(raw.description),
        articles,
    };
}

function dedupe(articles: Article[]): Article[] {
    const seen = new Map<string, Article>();
    for (const article of articles) {
        if (!seen.has(article.id)) seen.set(article.id, article);
    }
    return Array.from(seen.values());
}

export async function getCategories(): Promise<Category[]> {
    const json = await getJson("/api/categories", 600);
    const raw = asRecord(json);
    const list = asArray(json).length
        ? asArray(json)
        : asArray(raw.data).length
          ? asArray(raw.data)
          : asArray(raw.categories);

    if (!list.length) return fixtureCategories;

    const categories: Category[] = [];

    for (const value of list) {
        const item = asRecord(value);
        const title = text(item.title) || text(item.name);
        const slug = text(item.slug) || slugify(title);
        if (!title || !slug) continue;
        categories.push({
            slug,
            title,
            description: text(item.description) || undefined,
        });
    }

    return categories.length ? categories : fixtureCategories;
}

export async function getSections(): Promise<Section[]> {
    const json = await getJson("/api/news/sections");
    const raw = asRecord(json);
    const list = asArray(raw.data).length ? asArray(raw.data) : asArray(json);

    if (list.length) {
        const sections = list
            .map((section, index) => normalizeSection(section, index))
            .filter((section): section is Section => Boolean(section && section.articles.length));
        if (sections.length) return sections;
    }

    return fixtureSections;
}

export async function getAllArticles(): Promise<Article[]> {
    const sections = await getSections();
    return dedupe(sections.flatMap((section) => section.articles));
}

export async function getLatestHeadlines(limit = 10): Promise<Article[]> {
    const json = await getJson(`/api/news?limit=${limit}`, 120);
    const raw = asRecord(json);
    const list = asArray(raw.data).length ? asArray(raw.data) : asArray(json);

    if (list.length) {
        return list
            .map((article) => normalizeArticle(article))
            .filter((article): article is Article => Boolean(article))
            .slice(0, limit);
    }

    return fixtureArticles.slice(0, limit);
}

export async function getCategoryPage(
    slug: string,
    page = 1,
    pageSize = 9,
): Promise<CategoryPageData | null> {
    const json = await getJson(`/api/category/${slug}`, 120);
    const raw = asRecord(json);
    const list = asArray(raw.data);

    let articles: Article[] = [];
    let title = "";

    if (list.length) {
        title = text(raw.title);
        articles = list
            .map((article) => normalizeArticle(article, { category: title, categorySlug: slug }))
            .filter((article): article is Article => Boolean(article));
    }

    const fallback = fixtureCategory(slug);

    if (!articles.length && fallback) {
        articles = fallback.articles;
        title = fallback.category.title;
    }

    if (!articles.length) return null;

    const category =
        fallback?.category ?? (await getCategories()).find((item) => item.slug === slug);

    const start = Math.max(0, (page - 1) * pageSize);

    return {
        title: category?.title ?? title ?? slug,
        description: category?.description,
        articles: articles.slice(start, start + pageSize),
        total: articles.length,
    };
}

function normalizeBlock(value: unknown): BodyBlock | null {
    const block = asRecord(value);
    const type = text(block.type);
    if (type !== "text" && type !== "image" && type !== "subheading") return null;

    return {
        type,
        text: text(block.text),
        url: text(block.url) || text(block.imageUrl),
        caption: text(block.caption) || null,
        altText: text(block.altText),
        copyrightHolder: text(block.copyrightHolder),
    };
}

function normalizeDetail(value: unknown): ArticleDetail | null {
    const raw = asRecord(value);
    const base = normalizeArticle(raw);
    if (!base) return null;

    const body = asArray(raw.body)
        .map(normalizeBlock)
        .filter((block): block is BodyBlock => Boolean(block));

    const byline = asArray(raw.byline)
        .map((value) => {
            const item = asRecord(value);
            const name = text(item.name);
            return name ? { name, role: text(item.role) } : null;
        })
        .filter((item): item is { name: string; role: string } => Boolean(item));

    const topics = asArray(raw.topics)
        .map((value) => {
            const item = asRecord(value);
            const name = text(item.name) || text(item.title);
            if (!name) return null;
            const slug = text(item.slug) || slugify(name);
            return { id: text(item.id) || slug, name, slug };
        })
        .filter((item): item is { id: string; name: string; slug: string } => Boolean(item));

    return {
        ...base,
        body,
        byline,
        topics,
        tags: asArray(raw.tags).map((tag) => text(tag)).filter(Boolean),
        sourceUrl: text(raw.sourceUrl),
        lastPublished: text(raw.lastPublished),
        wordCount: Number(raw.wordCount ?? 0) || undefined,
    };
}

export async function getArticle(id: string): Promise<ArticleDetail | null> {
    for (const path of [`/api/article/${id}`, `/api/news/${id}`]) {
        const json = await getJson(path, 300);
        if (json == null) break;

        const raw = asRecord(json);
        const detail = normalizeDetail(raw.data ?? json);
        if (detail) return detail;
    }

    return fixtureArticleById(id);
}

export async function getMostRead(limit = 6): Promise<Article[]> {
    const articles = await getAllArticles();
    return [...articles].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, limit);
}

export async function getRelated(article: ArticleDetail, limit = 3): Promise<Article[]> {
    const articles = await getAllArticles();
    const sameCategory = articles.filter(
        (item) => item.id !== article.id && item.categorySlug === article.categorySlug,
    );
    const others = articles.filter(
        (item) => item.id !== article.id && item.categorySlug !== article.categorySlug,
    );
    return [...sameCategory, ...others].slice(0, limit);
}

export async function searchArticles(query: string, limit = 24): Promise<Article[]> {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    const articles = await getAllArticles();
    return articles
        .filter((article) =>
            [article.title, article.description, article.category]
                .join(" ")
                .toLowerCase()
                .includes(term),
        )
        .slice(0, limit);
}

export async function getLatestArticles(limit = 8): Promise<Article[]> {
    const articles = await getAllArticles();
    return [...articles]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
}

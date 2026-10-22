export interface Category {
    slug: string;
    title: string;
    description?: string;
}

export interface Article {
    id: string;
    title: string;
    description: string;
    category: string;
    categorySlug: string;
    imageUrl: string;
    imageAlt: string;
    publishedAt: string;
    isLive?: boolean;
    views?: number;
    source?: string;
}

export interface BodyBlock {
    type: "text" | "image" | "subheading";
    text?: string;
    url?: string;
    caption?: string | null;
    altText?: string;
    copyrightHolder?: string;
}

export interface Byline {
    name: string;
    role: string;
}

export interface Topic {
    id: string;
    name: string;
    slug?: string;
}

export interface ArticleDetail extends Article {
    lastPublished?: string;
    byline: Byline[];
    topics: Topic[];
    tags: string[];
    body: BodyBlock[];
    sourceUrl?: string;
    wordCount?: number;
}

export interface Section {
    id: string;
    slug: string;
    title: string;
    description?: string;
    articles: Article[];
}

export interface CategoryPageData {
    title: string;
    description?: string;
    articles: Article[];
    total: number;
}

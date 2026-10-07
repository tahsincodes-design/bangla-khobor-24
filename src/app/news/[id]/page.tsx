import DetailNewsCard, { DetailNewsData } from '@/Components/DetailNewsCard';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
    const { id } = await params;

    let newsData: DetailNewsData | null = null;
    let apiError: string | null = null;

    // Try Endpoint 1: /api/article/${id}
    try {
        let res = await fetch(`https://news-api-v2.vercel.app/api/article/${id}`, {
            next: { revalidate: 0 },
        });

        // Fallback to Endpoint 2 if Endpoint 1 fails: /api/news/${id}
        if (!res.ok) {
            res = await fetch(`https://news-api-v2.vercel.app/api/news/${id}`, {
                next: { revalidate: 0 },
            });
        }

        if (!res.ok) {
            apiError = `API returned HTTP status ${res.status} for ID: ${id}`;
        } else {
            const json = await res.json();
            newsData = json?.data || json || null;
            if (!newsData) {
                apiError = `API returned 200 OK but data payload was empty for ID: ${id}`;
            }
        }
    } catch (err: unknown) {
        apiError = `Fetch Error: ${err instanceof Error ? err.message : 'Failed to connect to API'}`;
    }

    // Display debugging feedback instead of silently triggering 404
    if (apiError || !newsData) {
        return (
            <div className="mx-auto max-w-xl my-12 p-6 bg-red-50 border border-red-200 rounded-xl text-center">
                <h2 className="text-lg font-bold text-red-700 mb-2">API Error / Data Not Found</h2>
                <p className="text-sm text-red-600 mb-4">{apiError}</p>
                <div className="text-xs text-slate-500 bg-white p-3 rounded border border-slate-200 text-left font-mono">
                    Article ID Requested: {id}
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50/50 py-4 sm:py-8">
            <DetailNewsCard detailNews={newsData} />
        </main>
    );
}
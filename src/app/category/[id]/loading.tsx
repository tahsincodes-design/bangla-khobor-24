import Container from "@/Components/ui/Container";

export default function CategoryLoading() {
    return (
        <Container className="py-8 sm:py-10">
            <div className="mb-5 h-3 w-40 animate-pulse rounded bg-paper-deep" />
            <div className="border-b border-line pb-8">
                <div className="h-3 w-16 animate-pulse rounded bg-paper-deep" />
                <div className="mt-3 h-9 w-52 animate-pulse rounded bg-paper-deep" />
                <div className="mt-3 h-3 w-80 animate-pulse rounded bg-paper-deep" />
            </div>
            <div className="mt-6 mb-8 flex gap-2">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div
                        key={item}
                        className="h-8 w-20 animate-pulse rounded-full bg-paper-deep"
                    />
                ))}
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                        key={item}
                        className="overflow-hidden rounded-2xl border border-line bg-surface"
                    >
                        <div className="aspect-[16/10] animate-pulse bg-paper-deep" />
                        <div className="space-y-2 p-4">
                            <div className="h-4 w-full animate-pulse rounded bg-paper-deep" />
                            <div className="h-4 w-3/4 animate-pulse rounded bg-paper-deep" />
                            <div className="h-3 w-1/2 animate-pulse rounded bg-paper-deep" />
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}

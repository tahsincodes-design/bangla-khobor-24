import Container from "@/Components/ui/Container";

export default function Loading() {
    return (
        <Container className="py-6 sm:py-8">
            <div className="mb-5 flex items-center justify-between">
                <div className="h-3 w-32 animate-pulse rounded bg-paper-deep" />
                <div className="h-3 w-40 animate-pulse rounded bg-paper-deep" />
            </div>

            <div className="grid gap-5 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <div className="aspect-[16/10] animate-pulse rounded-3xl bg-paper-deep sm:aspect-[16/9]" />
                </div>
                <div className="space-y-4 lg:col-span-5">
                    {[1, 2].map((item) => (
                        <div
                            key={item}
                            className="flex gap-4 rounded-2xl border border-line bg-surface p-3"
                        >
                            <div className="aspect-[4/3] w-28 shrink-0 animate-pulse rounded-xl bg-paper-deep sm:w-36" />
                            <div className="flex-1 space-y-2 py-1">
                                <div className="h-3 w-16 animate-pulse rounded bg-paper-deep" />
                                <div className="h-4 w-full animate-pulse rounded bg-paper-deep" />
                                <div className="h-4 w-3/4 animate-pulse rounded bg-paper-deep" />
                            </div>
                        </div>
                    ))}
                    <div className="h-32 animate-pulse rounded-2xl bg-paper-deep" />
                </div>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px]">
                <div>
                    <div className="mb-6 h-8 w-40 animate-pulse rounded bg-paper-deep" />
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="overflow-hidden rounded-2xl border border-line bg-surface"
                            >
                                <div className="aspect-[16/10] animate-pulse bg-paper-deep" />
                                <div className="space-y-2 p-4">
                                    <div className="h-4 w-full animate-pulse rounded bg-paper-deep" />
                                    <div className="h-4 w-2/3 animate-pulse rounded bg-paper-deep" />
                                    <div className="h-3 w-1/3 animate-pulse rounded bg-paper-deep" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hidden h-80 animate-pulse rounded-2xl bg-paper-deep lg:block" />
            </div>
        </Container>
    );
}

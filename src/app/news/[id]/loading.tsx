import Container from "@/Components/ui/Container";

export default function NewsLoading() {
    return (
        <Container className="py-8 sm:py-10">
            <div className="mx-auto max-w-4xl">
                <div className="mb-5 h-3 w-52 animate-pulse rounded bg-paper-deep" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-paper-deep" />
                <div className="mt-4 space-y-3">
                    <div className="h-10 w-full animate-pulse rounded bg-paper-deep" />
                    <div className="h-10 w-4/5 animate-pulse rounded bg-paper-deep" />
                </div>
                <div className="mt-4 space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-paper-deep" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-paper-deep" />
                </div>
                <div className="mt-6 flex items-center justify-between border-y border-line py-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 animate-pulse rounded-full bg-paper-deep" />
                        <div className="space-y-2">
                            <div className="h-3 w-32 animate-pulse rounded bg-paper-deep" />
                            <div className="h-3 w-44 animate-pulse rounded bg-paper-deep" />
                        </div>
                    </div>
                    <div className="h-8 w-24 animate-pulse rounded-full bg-paper-deep" />
                </div>
                <div className="mt-6 aspect-[16/9] animate-pulse rounded-2xl bg-paper-deep" />
                <div className="mt-8 space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="space-y-2">
                            <div className="h-4 w-full animate-pulse rounded bg-paper-deep" />
                            <div className="h-4 w-full animate-pulse rounded bg-paper-deep" />
                            <div className="h-4 w-3/4 animate-pulse rounded bg-paper-deep" />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}

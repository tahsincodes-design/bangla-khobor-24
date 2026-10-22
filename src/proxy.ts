import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest): Promise<NextResponse> {
    let hasSession = false;

    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        hasSession = Boolean(session?.user);
    } catch {
        // Database/auth outages should not turn a guarded page into a 500.
        // Fall through to the sign-in redirect; the form handles the rest.
        hasSession = false;
    }

    if (!hasSession) {
        const signIn = new URL("/signIn", request.url);
        signIn.searchParams.set("next", request.nextUrl.pathname);
        return NextResponse.redirect(signIn);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile"],
};

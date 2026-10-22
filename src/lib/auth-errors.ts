type AuthErrorContext = "signIn" | "signUp";

/**
 * Better Auth returns provider/database messages in English. Keep the UI
 * Bengali and avoid leaking infrastructure details to the reader.
 */
export function authErrorMessage(
    message: string | undefined,
    context: AuthErrorContext = "signIn",
): string {
    const raw = (message ?? "").toLowerCase();

    if (raw.includes("invalid email or password") || raw.includes("invalid credentials")) {
        return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
    }

    if (raw.includes("already exists") || raw.includes("user exists")) {
        return "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে।";
    }

    if (raw.includes("password") && (raw.includes("short") || raw.includes("8"))) {
        return "পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে।";
    }

    if (raw.includes("invalid email")) {
        return "সঠিক ইমেইল অ্যাড্রেস দিন।";
    }

    if (raw.includes("too many") || raw.includes("rate limit")) {
        return "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।";
    }

    if (
        raw.includes("database") ||
        raw.includes("mongo") ||
        raw.includes("bad auth") ||
        raw.includes("internal server")
    ) {
        return "অ্যাকাউন্ট সেবা এখন উপলব্ধ নয়। কিছুক্ষণ পর আবার চেষ্টা করুন।";
    }

    return context === "signUp"
        ? "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"
        : "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।";
}

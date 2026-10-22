"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Container from "@/Components/ui/Container";
import Breadcrumbs from "@/Components/ui/Breadcrumbs";
import PasswordField from "@/Components/ui/PasswordField";
import { formatDate, formatDateTime } from "@/lib/format";

type TabKey = "profile" | "security" | "sessions" | "account";

const inputClass =
    "w-full rounded-xl border border-line bg-paper/60 px-3.5 py-3 text-sm text-ink transition-colors placeholder:text-muted/60 focus:border-brand-400 focus:bg-surface focus:ring-4 focus:ring-brand-600/10 focus:outline-none";

const tabs: Array<{ key: TabKey; label: string; icon: ReactNode }> = [
    {
        key: "profile",
        label: "প্রোফাইল তথ্য",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
        ),
    },
    {
        key: "security",
        label: "পাসওয়ার্ড ও নিরাপত্তা",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
        ),
    },
    {
        key: "sessions",
        label: "সক্রিয় সেশন",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
        ),
    },
    {
        key: "account",
        label: "অ্যাকাউন্ট",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        ),
    },
];

interface SessionRecord {
    id: string;
    token: string;
    userAgent?: string | null;
    ipAddress?: string | null;
    createdAt: string | Date;
    expiresAt?: string | Date;
}

function isTab(value: string | null): value is TabKey {
    return tabs.some((tab) => tab.key === value);
}

function deviceLabel(userAgent?: string | null): string {
    if (!userAgent) return "অজানা ডিভাইস";
    if (/android/i.test(userAgent)) return "Android ডিভাইস";
    if (/iphone|ipad|ios/i.test(userAgent)) return "iOS ডিভাইস";
    if (/windows/i.test(userAgent)) return "Windows কম্পিউটার";
    if (/mac os|macintosh/i.test(userAgent)) return "Mac কম্পিউটার";
    if (/linux/i.test(userAgent)) return "Linux কম্পিউটার";
    return "ব্রাউজার";
}

function browserLabel(userAgent?: string | null): string {
    if (!userAgent) return "—";
    if (/edg\//i.test(userAgent)) return "Edge";
    if (/chrome|crios/i.test(userAgent)) return "Chrome";
    if (/firefox|fxios/i.test(userAgent)) return "Firefox";
    if (/safari/i.test(userAgent)) return "Safari";
    return "ব্রাউজার";
}

function toIso(value: string | Date | undefined): string {
    if (!value) return "";
    return typeof value === "string" ? value : value.toISOString();
}

export default function ProfileView() {
    const router = useRouter();
    const params = useSearchParams();
    const tabParam = params.get("tab");
    const activeTab: TabKey = isTab(tabParam) ? tabParam : "profile";

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [brokenUrl, setBrokenUrl] = useState<string | null>(null);
    const [savingProfile, setSavingProfile] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [revokeOthers, setRevokeOthers] = useState(true);
    const [changingPassword, setChangingPassword] = useState(false);

    const [sessionsData, setSessionsData] = useState<{
        userId: string;
        items: SessionRecord[];
    } | null>(null);

    const avatarUrl = image ?? user?.image ?? "";
    const imageBroken = Boolean(avatarUrl) && brokenUrl === avatarUrl;
    const sessions = sessionsData && sessionsData.userId === user?.id ? sessionsData.items : [];
    const sessionsLoading =
        activeTab === "sessions" && (!sessionsData || sessionsData.userId !== user?.id);

    useEffect(() => {
        if (activeTab !== "sessions" || !user) return;

        let cancelled = false;

        authClient
            .listSessions()
            .then(({ data }) => {
                if (!cancelled) {
                    setSessionsData({
                        userId: user.id,
                        items: ((data ?? []) as unknown) as SessionRecord[],
                    });
                }
            })
            .catch(() => {
                if (!cancelled) {
                    toast.error("সেশনের তালিকা আনা যায়নি");
                    setSessionsData({ userId: user.id, items: [] });
                }
            });

        return () => {
            cancelled = true;
        };
    }, [activeTab, user]);

    const setTab = (key: TabKey) => {
        router.replace(key === "profile" ? "/profile" : `/profile?tab=${key}`, {
            scroll: false,
        });
    };

    const updateProfile = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const profileName = (name ?? user?.name ?? "").trim();
        if (!profileName) {
            toast.error("নাম ফাঁকা রাখা যাবে না");
            return;
        }

        setSavingProfile(true);
        try {
            const { error } = await authClient.updateUser({
                name: profileName,
                image: (image ?? user?.image ?? "").trim() || undefined,
            });

            if (error) {
                toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি");
                return;
            }

            toast.success("প্রোফাইল হালনাগাদ হয়েছে");
            router.refresh();
        } catch {
            toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setSavingProfile(false);
        }
    };

    const changePassword = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (newPassword.length < 8) {
            toast.error("নতুন পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("দুটি নতুন পাসওয়ার্ড মিলছে না");
            return;
        }

        setChangingPassword(true);
        try {
            const { error } = await authClient.changePassword({
                currentPassword,
                newPassword,
                revokeOtherSessions: revokeOthers,
            });

            if (error) {
                toast.error(error.message || "পাসওয়ার্ড পরিবর্তন করা যায়নি");
                return;
            }

            toast.success("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch {
            toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setChangingPassword(false);
        }
    };

    const revokeSession = async (token: string) => {
        try {
            const { error } = await authClient.revokeSession({ token });
            if (error) {
                toast.error(error.message || "সেশন বাতিল করা যায়নি");
                return;
            }
            setSessionsData((current) =>
                current
                    ? {
                          ...current,
                          items: current.items.filter((item) => item.token !== token),
                      }
                    : current,
            );
            toast.success("সেশন বাতিল হয়েছে");
        } catch {
            toast.error("সেশন বাতিল করা যায়নি");
        }
    };

    const signOut = async () => {
        try {
            await authClient.signOut();
            toast.success("সাইন আউট হয়েছে");
            router.push("/");
            router.refresh();
        } catch {
            toast.error("সাইন আউট করা যায়নি");
        }
    };

    if (isPending) {
        return (
            <Container className="py-10">
                <div className="mx-auto max-w-5xl space-y-5">
                    <div className="h-48 animate-pulse rounded-3xl bg-paper-deep" aria-hidden />
                    <div className="grid gap-5 lg:grid-cols-4">
                        <div className="h-56 animate-pulse rounded-2xl bg-paper-deep" aria-hidden />
                        <div className="h-56 animate-pulse rounded-2xl bg-paper-deep lg:col-span-3" aria-hidden />
                    </div>
                </div>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container size="narrow" className="py-14">
                <div className="rounded-3xl border border-line bg-surface p-10 text-center shadow-card">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                        <svg
                            className="h-7 w-7"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.8}
                            aria-hidden
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h1 className="mt-4 text-xl font-bold text-ink">সাইন ইন প্রয়োজন</h1>
                    <p className="mt-2 text-sm text-muted">
                        প্রোফাইল দেখতে ও পরিচালনা করতে অনুগ্রহ করে সাইন ইন করুন।
                    </p>
                    <Link
                        href="/signIn?next=/profile"
                        className="mt-6 inline-flex rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
                    >
                        সাইন ইন করুন
                    </Link>
                </div>
            </Container>
        );
    }

    const verified = Boolean(user.emailVerified);

    return (
        <Container className="py-8 sm:py-10">
            <div className="mx-auto max-w-5xl">
                <Breadcrumbs items={[{ label: "আমার প্রোফাইল" }]} />

                <section className="overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
                    <div className="relative h-32 bg-gradient-to-r from-brand-700 via-brand-600 to-ink sm:h-40">
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at 20% 30%, rgba(255,255,255,.5) 0, transparent 35%), radial-gradient(circle at 80% 70%, rgba(255,255,255,.35) 0, transparent 30%)",
                            }}
                            aria-hidden
                        />
                    </div>

                    <div className="flex flex-col gap-5 px-5 pb-6 sm:flex-row sm:items-end sm:px-7">
                        <div className="relative -mt-14 h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-surface bg-brand-600 shadow-card sm:-mt-16 sm:h-28 sm:w-28">
                            {avatarUrl && !imageBroken ? (
                                <Image
                                    src={avatarUrl}
                                    alt={user.name || "ব্যবহারকারীর ছবি"}
                                    fill
                                    sizes="112px"
                                    className="object-cover"
                                    onError={() => setBrokenUrl(avatarUrl)}
                                />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center font-serif text-3xl font-bold text-white">
                                    {user.name?.charAt(0)?.toUpperCase() || "ব"}
                                </span>
                            )}
                        </div>

                        <div className="flex-1 sm:pb-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-2xl font-bold text-ink">
                                    {user.name || "ব্যবহারকারী"}
                                </h1>
                                <span
                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                                        verified
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-gold-100 text-gold-700"
                                    }`}
                                >
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${
                                            verified ? "bg-emerald-500" : "bg-gold-500"
                                        }`}
                                    />
                                    {verified ? "যাচাইকৃত" : "ইমেইল যাচাই হয়নি"}
                                </span>
                            </div>
                            <p className="mt-1 text-sm text-muted">{user.email}</p>
                            <p className="mt-1 text-xs text-muted">
                                যোগদান: {formatDate(toIso(user.createdAt))}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setTab("profile")}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-brand-200 hover:text-brand-700 sm:mb-1"
                        >
                            <svg
                                className="h-3.5 w-3.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                aria-hidden
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.1 2.1 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                                />
                            </svg>
                            সম্পাদনা
                        </button>
                    </div>
                </section>

                <div className="mt-6 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
                    <nav
                        aria-label="প্রোফাইল বিভাগ"
                        className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
                    >
                        {tabs.map((tab) => {
                            const active = tab.key === activeTab;
                            return (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setTab(tab.key)}
                                    aria-current={active ? "page" : undefined}
                                    className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
                                        active
                                            ? "bg-brand-600 text-white shadow-sm"
                                            : "border border-line bg-surface text-ink-soft hover:border-brand-200 hover:text-brand-700 lg:border-transparent lg:bg-transparent"
                                    }`}
                                >
                                    <svg
                                        className="h-4 w-4 shrink-0"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.8}
                                        aria-hidden
                                    >
                                        {tab.icon}
                                    </svg>
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="min-w-0">
                        {activeTab === "profile" ? (
                            <Panel
                                title="প্রোফাইল তথ্য"
                                description="আপনার নাম ও প্রদর্শনী ছবি হালনাগাদ করুন।"
                            >
                                <form onSubmit={updateProfile} className="space-y-5">
                                    <div>
                                        <label
                                            htmlFor="profile-name"
                                            className="mb-1.5 block text-xs font-bold tracking-wide text-ink-soft uppercase"
                                        >
                                            পূর্ণ নাম
                                        </label>
                                        <input
                                            id="profile-name"
                                            type="text"
                                            required
                                            value={name ?? user.name ?? ""}
                                            onChange={(event) => setName(event.target.value)}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="profile-image"
                                            className="mb-1.5 block text-xs font-bold tracking-wide text-ink-soft uppercase"
                                        >
                                            প্রোফাইল ছবির URL
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                id="profile-image"
                                                type="url"
                                                value={image ?? user.image ?? ""}
                                                onChange={(event) => setImage(event.target.value)}
                                                placeholder="https://example.com/photo.jpg"
                                                className={inputClass}
                                            />
                                            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-line bg-paper-deep">
                                                {avatarUrl && !imageBroken ? (
                                                    <Image
                                                        src={avatarUrl}
                                                        alt="প্রোফাইল ছবির প্রাকদর্শন"
                                                        fill
                                                        sizes="44px"
                                                        unoptimized
                                                        className="object-cover"
                                                        onError={() => setBrokenUrl(avatarUrl)}
                                                    />
                                                ) : (
                                                    <span className="flex h-full w-full items-center justify-center text-xs font-bold text-muted">
                                                        {user.name?.charAt(0)?.toUpperCase() || "ব"}
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        <p className="mt-1.5 text-xs text-muted">
                                            ছবির সরাসরি লিঙ্ক দিন। ফাঁকা রাখলে পুরোনো ছবি থাকবে।
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={savingProfile}
                                        className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:opacity-70"
                                    >
                                        {savingProfile ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                                সংরক্ষণ হচ্ছে...
                                            </>
                                        ) : (
                                            "পরিবর্তন সংরক্ষণ করুন"
                                        )}
                                    </button>
                                </form>
                            </Panel>
                        ) : null}

                        {activeTab === "security" ? (
                            <Panel
                                title="পাসওয়ার্ড ও নিরাপত্তা"
                                description="নিয়মিত পাসওয়ার্ড পরিবর্তন করলে অ্যাকাউন্ট নিরাপদ থাকে।"
                            >
                                <form onSubmit={changePassword} className="space-y-4">
                                    <PasswordField
                                        id="current-password"
                                        label="বর্তমান পাসওয়ার্ড"
                                        value={currentPassword}
                                        onChange={setCurrentPassword}
                                        autoComplete="current-password"
                                    />
                                    <PasswordField
                                        id="new-password"
                                        label="নতুন পাসওয়ার্ড"
                                        value={newPassword}
                                        onChange={setNewPassword}
                                        autoComplete="new-password"
                                        hint="অন্তত ৮ অক্ষর ব্যবহার করুন।"
                                    />
                                    <PasswordField
                                        id="confirm-new-password"
                                        label="নতুন পাসওয়ার্ড নিশ্চিত করুন"
                                        value={confirmPassword}
                                        onChange={setConfirmPassword}
                                        autoComplete="new-password"
                                    />

                                    <label className="flex cursor-pointer items-start gap-2 rounded-xl border border-line bg-paper/40 p-3 text-xs leading-relaxed text-ink-soft">
                                        <input
                                            type="checkbox"
                                            checked={revokeOthers}
                                            onChange={(event) =>
                                                setRevokeOthers(event.target.checked)
                                            }
                                            className="mt-0.5 h-4 w-4 accent-brand-600"
                                        />
                                        অন্য সব ডিভাইস থেকে সাইন আউট করুন
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={changingPassword}
                                        className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:opacity-70"
                                    >
                                        {changingPassword ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                                আপডেট হচ্ছে...
                                            </>
                                        ) : (
                                            "পাসওয়ার্ড আপডেট করুন"
                                        )}
                                    </button>
                                </form>
                            </Panel>
                        ) : null}

                        {activeTab === "sessions" ? (
                            <Panel
                                title="সক্রিয় সেশন"
                                description="আপনার অ্যাকাউন্টে যেসব ডিভাইস সাইন ইন আছে তা দেখুন ও নিয়ন্ত্রণ করুন।"
                            >
                                {sessionsLoading ? (
                                    <div className="space-y-3">
                                        {[1, 2].map((item) => (
                                            <div
                                                key={item}
                                                className="h-20 animate-pulse rounded-xl bg-paper-deep"
                                                aria-hidden
                                            />
                                        ))}
                                    </div>
                                ) : sessions.length ? (
                                    <ul className="space-y-3">
                                        {sessions.map((item) => {
                                            const current = item.token === session?.session?.token;
                                            return (
                                                <li
                                                    key={item.id}
                                                    className="flex flex-col gap-3 rounded-xl border border-line bg-paper/30 p-4 sm:flex-row sm:items-center sm:justify-between"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface text-muted">
                                                            <svg
                                                                className="h-4 w-4"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth={1.8}
                                                                aria-hidden
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                        </span>
                                                        <div>
                                                            <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink">
                                                                {deviceLabel(item.userAgent)}
                                                                {current ? (
                                                                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                                                        এই ডিভাইস
                                                                    </span>
                                                                ) : null}
                                                            </p>
                                                            <p className="mt-0.5 text-xs text-muted">
                                                                {browserLabel(item.userAgent)}
                                                                {item.ipAddress
                                                                    ? ` · ${item.ipAddress}`
                                                                    : ""}
                                                                {item.createdAt
                                                                    ? ` · ${formatDateTime(toIso(item.createdAt))}`
                                                                    : ""}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {current ? (
                                                        <span className="text-[11px] font-medium text-muted">
                                                            চলমান
                                                        </span>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                revokeSession(item.token)
                                                            }
                                                            className="self-start rounded-lg border border-line px-3 py-1.5 text-[11px] font-bold text-brand-700 transition-colors hover:bg-brand-50 sm:self-auto"
                                                        >
                                                            বাতিল করুন
                                                        </button>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-muted">
                                        কোনো সক্রিয় সেশন পাওয়া যায়নি।
                                    </p>
                                )}
                            </Panel>
                        ) : null}

                        {activeTab === "account" ? (
                            <Panel
                                title="অ্যাকাউন্ট বিবরণ"
                                description="আপনার অ্যাকাউন্টের মূল তথ্য ও সাইন আউট।"
                            >
                                <dl className="divide-y divide-line text-sm">
                                    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                                        <dt className="text-xs font-bold tracking-wide text-muted uppercase">
                                            ইমেইল
                                        </dt>
                                        <dd className="font-medium text-ink">{user.email}</dd>
                                    </div>
                                    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                                        <dt className="text-xs font-bold tracking-wide text-muted uppercase">
                                            ইমেইল স্ট্যাটাস
                                        </dt>
                                        <dd>
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                                    verified
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : "bg-gold-100 text-gold-700"
                                                }`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${
                                                        verified
                                                            ? "bg-emerald-500"
                                                            : "bg-gold-500"
                                                    }`}
                                                />
                                                {verified ? "যাচাইকৃত" : "যাচাই করা হয়নি"}
                                            </span>
                                        </dd>
                                    </div>
                                    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                                        <dt className="text-xs font-bold tracking-wide text-muted uppercase">
                                            অ্যাকাউন্ট আইডি
                                        </dt>
                                        <dd className="font-mono text-xs text-ink-soft">
                                            {user.id}
                                        </dd>
                                    </div>
                                    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                                        <dt className="text-xs font-bold tracking-wide text-muted uppercase">
                                            যোগদানের তারিখ
                                        </dt>
                                        <dd className="font-medium text-ink">
                                            {formatDate(toIso(user.createdAt))}
                                        </dd>
                                    </div>
                                </dl>

                                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
                                    <button
                                        type="button"
                                        onClick={signOut}
                                        className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:border-brand-200 hover:bg-brand-50"
                                    >
                                        সাইন আউট
                                    </button>
                                    <Link
                                        href="/privacy"
                                        className="text-xs font-semibold text-muted hover:text-brand-700"
                                    >
                                        গোপনীয়তা নীতি
                                    </Link>
                                    <Link
                                        href="/terms"
                                        className="text-xs font-semibold text-muted hover:text-brand-700"
                                    >
                                        শর্তাবলী
                                    </Link>
                                </div>
                            </Panel>
                        ) : null}
                    </div>
                </div>
            </div>
        </Container>
    );
}

function Panel({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-7">
            <h2 className="text-lg font-bold text-ink">{title}</h2>
            {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
            <div className="mt-5">{children}</div>
        </section>
    );
}

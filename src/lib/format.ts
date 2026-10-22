const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const MONTHS = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
];

export function toBengaliNumber(value: number | string): string {
    return String(value).replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)]);
}

export function formatDate(value?: string): string {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const dhaka = toDhaka(date);
    return `${toBengaliNumber(dhaka.getUTCDate())} ${MONTHS[dhaka.getUTCMonth()]}, ${toBengaliNumber(dhaka.getUTCFullYear())}`;
}

export function formatTime(value?: string): string {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const dhaka = toDhaka(date);
    const hours = dhaka.getUTCHours();
    const minutes = String(dhaka.getUTCMinutes()).padStart(2, "0");
    const period =
        hours < 6 ? "রাত" : hours < 12 ? "সকাল" : hours < 16 ? "দুপুর" : hours < 18 ? "বিকাল" : hours < 20 ? "সন্ধ্যা" : "রাত";
    return `${period} ${toBengaliNumber(hours % 12 || 12)}:${toBengaliNumber(minutes)}`;
}

export function formatDateTime(value?: string): string {
    if (!value) return "";
    const date = formatDate(value);
    const time = formatTime(value);
    if (!date) return "";
    return time ? `${date} · ${time}` : date;
}

const WEEKDAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];

const DHAKA_OFFSET = 6 * 60 * 60 * 1000;

/** Shift a date so UTC getters return Bangladesh (UTC+6) wall-clock values. */
function toDhaka(value: string | Date): Date {
    const date = typeof value === "string" ? new Date(value) : value;
    return new Date(date.getTime() + DHAKA_OFFSET);
}

export function formatFullDate(value: Date | string = new Date()): string {
    const date = typeof value === "string" ? new Date(value) : value;
    if (Number.isNaN(date.getTime())) return "";
    const dhaka = toDhaka(date);
    return `${WEEKDAYS[dhaka.getUTCDay()]}, ${formatDate(date.toISOString())}`;
}

export function timeAgo(value?: string): string {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    const minutes = Math.round((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return "এইমাত্র";
    if (minutes < 60) return `${toBengaliNumber(minutes)} মিনিট আগে`;

    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${toBengaliNumber(hours)} ঘণ্টা আগে`;

    const days = Math.round(hours / 24);
    if (days < 7) return `${toBengaliNumber(days)} দিন আগে`;

    return formatDate(value);
}

export function readingTime(text: string | number, fallbackWords = 0): string {
    const words = typeof text === "number" ? text : text.trim().split(/\s+/).filter(Boolean).length;
    const total = words || fallbackWords || 1;
    return `${toBengaliNumber(Math.max(1, Math.ceil(total / 180)))} মিনিট পড়া`;
}

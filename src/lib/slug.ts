export function slugify(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9\u0980-\u09FF]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

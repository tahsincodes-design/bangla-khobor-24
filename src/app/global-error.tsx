"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="bn">
            <body
                style={{
                    margin: 0,
                    minHeight: "100vh",
                    display: "grid",
                    placeItems: "center",
                    background: "#faf7f2",
                    color: "#17130f",
                    fontFamily: "system-ui, sans-serif",
                    padding: "24px",
                }}
            >
                <div
                    style={{
                        maxWidth: "420px",
                        textAlign: "center",
                        background: "#fff",
                        border: "1px solid #e7dfd4",
                        borderRadius: "24px",
                        padding: "40px 28px",
                    }}
                >
                    <p style={{ margin: 0, fontSize: "13px", color: "#b3122e", fontWeight: 700 }}>
                        বাংলা নিউজ ২৪
                    </p>
                    <h1 style={{ margin: "12px 0 8px", fontSize: "22px" }}>
                        সাইটটি লোড করা যায়নি
                    </h1>
                    <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.7, color: "#6f675f" }}>
                        একটি অপ্রত্যাশিত সমস্যা হয়েছে। পৃষ্ঠাটি রিফ্রেশ করে আবার চেষ্টা করুন।
                    </p>
                    <button
                        type="button"
                        onClick={reset}
                        style={{
                            marginTop: "22px",
                            border: 0,
                            borderRadius: "12px",
                            background: "#b3122e",
                            color: "#fff",
                            padding: "10px 22px",
                            fontSize: "14px",
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                    >
                        আবার চেষ্টা করুন
                    </button>
                </div>
            </body>
        </html>
    );
}

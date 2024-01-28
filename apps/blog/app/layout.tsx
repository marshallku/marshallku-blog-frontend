import "#styles/reset.scss";
import "#styles/globals.scss";
import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
    assets: [
        "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css",
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body>{children}</body>
        </html>
    );
}

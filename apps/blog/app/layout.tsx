import "@marshallku/icon/dist/icons.css";
import "#styles/reset.scss";
import "#styles/globals.scss";
import "./globals.css";

import type { Metadata } from "next";
import { Footer, GlobalNavigation } from "#components";
import { SITE_DESCRIPTION, SITE_NAME } from "#constants";

export const metadata: Metadata = {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    assets: [
        "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css",
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body>
                {/* HACK: Dirty hack for implementing theme toggle */}
                <script
                    id="theme"
                    dangerouslySetInnerHTML={{
                        __html: `(function(){var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"sepia"}document.documentElement.dataset.theme=t,document.documentElement.style.colorScheme=t})()`,
                    }}
                />
                <GlobalNavigation />
                {children}
                <Footer />
            </body>
        </html>
    );
}

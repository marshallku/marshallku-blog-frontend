import "@marshallku/icon/dist/icons.css";
import "@marshallku/toast/dist/index.css";
import "#styles/reset.scss";
import "#styles/globals.scss";
import "./globals.css";

import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE_DESCRIPTION, SITE_NAME } from "#constants";
import Footer from "#components/Footer";
import GlobalNavigation from "#components/GlobalNavigation";
import TopButton from "#components/TopButton";

export const metadata: Metadata = {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    assets: [
        "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css",
        "https://fonts.googleapis.com/css2?family=Fira+Code&display=swap",
    ],
    manifest: "/manifest.json",
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
                <TopButton />
                <div id="drawer-root" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){if("serviceWorker" in navigator) {window.addEventListener("load",() => {navigator.serviceWorker.register("/service-worker.js")})}})()`,
                    }}
                />
                <GoogleAnalytics gaId="G-WPZTSDZ027" />
            </body>
        </html>
    );
}

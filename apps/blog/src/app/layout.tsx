import "@marshallku/icon/dist/icons.css";
import "@marshallku/toast/dist/index.css";
import "@marshallku/ui/styles/reset.scss";
import "@marshallku/ui/styles/globals.scss";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE_DESCRIPTION, SITE_NAME } from "#constants";
import Footer from "#components/Footer";
import GlobalNavigation from "#components/GlobalNavigation";
import TopButton from "#components/TopButton";
import NewrelicSnippet from "#components/NewrelicSnippet";

export const metadata: Metadata = {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    assets: [
        "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css",
        "https://fonts.googleapis.com/css2?family=Fira+Code&display=swap",
    ],
    manifest: "/manifest.json",
    applicationName: SITE_NAME,
    icons: [
        { rel: "icon", url: "https://marshallku.com/favicon.ico" },
        { rel: "apple-touch-icon", url: "https://marshallku.com/logo/logo-152.png" },
        { rel: "apple-touch-icon-precomposed", url: "https://marshallku.com/favicon.ico" },
    ],
    authors: [{ url: "https://marshallku.com/", name: "Marshall K" }],
};

export const viewport: Viewport = {
    themeColor: "#f1718c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body>
                <NewrelicSnippet />
                {/* HACK: Dirty hack for implementing theme toggle */}
                <script
                    id="theme"
                    dangerouslySetInnerHTML={{
                        __html: `!function(){function e(e){document.documentElement.dataset.theme=e,document.documentElement.style.colorScheme=e==='dark'?e:'light'}function t(e=!1){return e?"dark":"sepia"}const n=window.matchMedia("(prefers-color-scheme: dark)");e(localStorage.getItem("theme")||t(n.matches)),n.addEventListener("change",(n=>{e(t(n.matches))}))}();`,
                    }}
                />
                <GlobalNavigation />
                {children}
                <Footer />
                <TopButton />
                <div id="drawer-root" />
                <Script
                    id="service-worker"
                    dangerouslySetInnerHTML={{
                        __html: `(function(){if("serviceWorker" in navigator) {window.addEventListener("load",() => {navigator.serviceWorker.register("/service-worker.js")})}})()`,
                    }}
                />
                <GoogleAnalytics gaId="G-WPZTSDZ027" />
            </body>
        </html>
    );
}

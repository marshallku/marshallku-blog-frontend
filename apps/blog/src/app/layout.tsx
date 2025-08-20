import "@marshallku/icon/dist/icons.css";
import "@marshallku/toast/dist/index.css";
import "@marshallku/ui/styles/reset.scss";
import "@marshallku/ui/styles/globals.scss";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
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
        { rel: "icon", url: `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}/favicon.ico` },
        { rel: "apple-touch-icon", url: `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}/logo/logo-152.png` },
        { rel: "apple-touch-icon-precomposed", url: `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}/favicon.ico` },
    ],
    authors: [{ url: `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}/`, name: "Marshall K" }],
    openGraph: {
        type: "website",
        locale: "ko_KR",
        siteName: SITE_NAME,
        description: SITE_DESCRIPTION,
        images: [{ url: `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}/assets/banner.png` }],
    },
    alternates: {
        types: {
            "application/rss+xml": [
                { title: "All Posts", url: `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}/feed` },
                { title: "Dev Posts", url: `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}/dev/feed` },
                { title: "Chat Posts", url: `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}/chat/feed` },
                { title: "Gallery Posts", url: `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}/gallery/feed` },
                { title: "Other Posts", url: `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}/others/feed` },
                { title: "Works", url: `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}/work/feed` },
                { title: "Notices", url: `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}/notice/feed` },
            ],
        },
    },
};

export const viewport: Viewport = {
    themeColor: "#f1718c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <GoogleTagManager gtmId="GTM-5PZZGKF" />
            <body>
                <NewrelicSnippet />
                {/* HACK: Dirty hack for implementing theme toggle */}
                <script
                    id="theme"
                    dangerouslySetInnerHTML={{
                        __html: `!function(){function e(e){document.documentElement.dataset.theme=e,document.documentElement.style.colorScheme=e==='dark'?e:'light'}function t(e=!1){return e?"dark":"light"}const n=window.matchMedia("(prefers-color-scheme: dark)");e(localStorage.getItem("theme")||t(n.matches)),n.addEventListener("change",(n=>{e(t(n.matches))}))}();`,
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

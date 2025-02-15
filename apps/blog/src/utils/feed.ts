"use server";

import { marked } from "marked";
import { SITE_DESCRIPTION, SITE_NAME } from "#constants";
import { getCategories, getPosts } from "./post";
import { Post } from "#types";

export async function formatCategoryFeed(filterFunction: (post: Post) => boolean) {
    const renderer = new marked.Renderer();

    renderer.link = ({ href, title, text }) =>
        `<a href="${href}" title="${title}" target="_blank" rel="noopener noreferrer">${text}</a>`;

    renderer.image = ({ href, title, text }) => {
        const src = href.startsWith("http") ? href : `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}${href}`;

        return `<img src="${src}" alt="${text}" title="${title}" loading="lazy" />`;
    };

    marked.setOptions({
        gfm: true,
        breaks: true,
        renderer,
    });

    const posts = getPosts(undefined, true);
    const lastBuildDate = new Date().toUTCString();
    const categories = getCategories();
    const host = process.env.NEXT_PUBLIC_BLOG_ORIGIN;
    const formattedPosts = await Promise.all(
        posts
            .filter(filterFunction)
            .slice(0, 10)
            .map(async (post) => {
                const url = `${host}${post.slug
                    .split("/")
                    .map((x) => encodeURIComponent(x))
                    .join("/")}`;

                return {
                    title: post.data.title,
                    link: url,
                    pubDate: post.data.date.posted.toUTCString(),
                    category: categories.find(({ slug }) => slug === post.category)?.name || post.category.slice(1),
                    tags: post.data.tags,
                    description: post.data.description,
                    content: await marked.parse(post.content),
                };
            }),
    );

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
>
<channel>
    <title>${SITE_NAME}</title>
    <description>${SITE_DESCRIPTION}</description>
    <language>ko-KR</language>
    <atom:link href="${host}/feed" rel="self" type="application/rss+xml" />
    <link>${host}</link>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <sy:updatePeriod>hourly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
${formattedPosts
    .map((x) => ({
        ...x,
        tags: x.tags ? x.tags.map((tag) => `        <category><![CDATA[${tag}]]></category>`).join("\n") : "",
    }))
    .map(
        ({ title, link, pubDate, category, tags, description, content }) => `    <item>
        <title>${title}</title>
        <link>${link}</link>
        <dc:creator><![CDATA[Marshall K]]></dc:creator>
        <pubDate>${pubDate}</pubDate>
        <category><![CDATA[${category}]]></category>${tags ? `\n` : ""}${tags}
        <guid isPermaLink="false">${link}</guid>
        <description><![CDATA[${description}]]></description>
        <content:encoded><![CDATA[${content}]]></content:encoded>
    </item>`,
    )
    .join("\n")}
</channel>
</rss>
`;
}

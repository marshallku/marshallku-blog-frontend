import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { POSTS_DIRECTORY } from "#constants";

export function getPostSlugs() {
    return readdirSync(POSTS_DIRECTORY)
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): {
    data: {
        title: string;
        excerpt: string;
        coverImage: string;
        date: Date;
        ogImage: { src: string };
    };
    content: string;
    slug: string;
} {
    const fullPath = join(POSTS_DIRECTORY, `${slug}.md`);
    const fileContents = readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        data: {
            title: data.title,
            excerpt: data.excerpt,
            coverImage: data.coverImage,
            date: new Date(data.date),
            ogImage: data.ogImage,
        },
        content,
        slug,
    };
}

export function getAllPosts() {
    return getPostSlugs()
        .map((slug) => getPostBySlug(slug))
        .sort((a, b) => (a.data.date > b.data.date ? -1 : 1));
}

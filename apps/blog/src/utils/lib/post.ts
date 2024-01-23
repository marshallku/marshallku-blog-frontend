import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { POSTS_DIRECTORY } from "#constants";

export function getPostSlugs() {
    return readdirSync(POSTS_DIRECTORY).map((x) => x.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string) {
    const fullPath = join(POSTS_DIRECTORY, `${slug}.md`);
    const fileContents = readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return { data, content };
}

export function getAllPosts() {
    return getPostSlugs()
        .map((slug) => getPostBySlug(slug))
        .sort((a, b) => (a.data.date > b.data.date ? -1 : 1));
}

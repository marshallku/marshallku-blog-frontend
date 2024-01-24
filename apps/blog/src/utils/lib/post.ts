import { readFileSync } from "fs";
import { join, parse } from "path";
import matter from "gray-matter";
import { POSTS_DIRECTORY } from "#constants";
import { walk } from "./file";

export function getPostSlugs(subDirectory?: string) {
    const files: string[] = [];

    walk(subDirectory ? join(POSTS_DIRECTORY, subDirectory) : POSTS_DIRECTORY, (path) => {
        if (path.endsWith(".md")) {
            files.push(path);
        }
    });

    return files.map((file) => file.replace(POSTS_DIRECTORY, "").replace(/\.md$/, ""));
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
    category: string;
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
        category: parse(slug).dir,
    };
}

export function getPosts(category?: string) {
    return getPostSlugs(category)
        .map((slug) => getPostBySlug(slug))
        .sort((a, b) => (a.data.date > b.data.date ? -1 : 1));
}

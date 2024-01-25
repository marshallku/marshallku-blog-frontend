import { readFileSync } from "fs";
import { join, parse } from "path";
import matter from "gray-matter";
import { POSTS_DIRECTORY } from "#constants";
import { walk } from "./file";

export function getPostSlugs(subDirectory?: string) {
    const files: string[] = [];

    walk(subDirectory ? join(POSTS_DIRECTORY, subDirectory) : POSTS_DIRECTORY, (path) => {
        if (path.endsWith(".mdx")) {
            files.push(path);
        }
    });

    return files.map((file) => file.replace(POSTS_DIRECTORY, "").replace(/\.mdx$/, ""));
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
    const fullPath = join(POSTS_DIRECTORY, `${slug}.mdx`);
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

export function getAllCategories() {
    const posts = getPosts();
    const categories = new Set(posts.map((post) => post.category));

    return [...categories];
}

export function getGroupedPostByCategory() {
    const posts = getPosts();
    const groupedPosts: Record<string, typeof posts> = {};

    for (let i = 0, max = posts.length; i < max; i++) {
        const post = posts[i];
        if (!groupedPosts[post.category]) {
            groupedPosts[post.category] = [];
        }
        groupedPosts[post.category].push(post);
    }

    return groupedPosts;
}

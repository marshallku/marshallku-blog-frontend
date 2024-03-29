import { existsSync, readFileSync } from "fs";
import { join, parse } from "path";
import matter from "gray-matter";
import { POSTS_DIRECTORY } from "#constants";
import { Category, Post } from "#types";
import { walk } from "./file";

export function checkCategoryExists(category: string) {
    return existsSync(join(POSTS_DIRECTORY, category));
}

export function getPostSlugs(subDirectory?: string) {
    const files: string[] = [];
    const fullPath = subDirectory ? join(POSTS_DIRECTORY, subDirectory) : POSTS_DIRECTORY;

    if (!existsSync(fullPath)) {
        return [];
    }

    walk(fullPath, (path) => {
        if (path.endsWith(".mdx")) {
            files.push(path);
        }
    });

    return files.map((file) => file.replace(POSTS_DIRECTORY, "").replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | undefined {
    const fullPath = join(POSTS_DIRECTORY, `${slug}.mdx`);

    if (!existsSync(fullPath)) {
        return;
    }

    const fileContents = readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        data: {
            title: data.title.replace(/\\/g, ""),
            description: data.description,
            date: {
                posted: new Date(data.date.posted),
                modified: data.date.modified ? new Date(data.date.modified) : undefined,
            },
            tags: data.tags,
            coverImage: data.coverImage,
            ogImage: data.ogImage,
        },
        content,
        slug,
        category: parse(slug).dir,
    };
}

export function getPostsByTag(tag: string) {
    const posts = getPosts();

    return posts.filter(({ data: { tags } }) => tags?.find((x) => x === tag));
}

export function getPosts(category?: string) {
    return getPostSlugs(category)
        .map((slug) => getPostBySlug(slug)!)
        .sort((a, b) => {
            if (a.data.date.posted > b.data.date.posted) {
                return -1;
            }

            if (a.data.date.posted < b.data.date.posted) {
                return 1;
            }

            return 0;
        });
}

export function getTags() {
    const posts = getPosts();

    return [...new Set(posts.filter(({ data: { tags } }) => 0 < tags?.length).flatMap(({ data: { tags } }) => tags))];
}

export function getGroupedPostByCategory() {
    const posts = getPosts();
    const groupedPosts: Record<string, typeof posts> = {};

    for (let i = 0, max = posts.length; i < max; ++i) {
        const post = posts[i];
        const category = post.category.split("/")[1];

        if (!groupedPosts[category]) {
            groupedPosts[category] = [];
        }

        groupedPosts[category].push(post);
    }

    return groupedPosts;
}

export function getCategoryBySlug(slug: string): Category | undefined {
    const fullPath = join(POSTS_DIRECTORY, slug, "_category.json");

    if (!existsSync(fullPath)) {
        return;
    }

    const fileContents = readFileSync(fullPath, "utf8");
    const data = JSON.parse(fileContents);

    return data;
}

export function getCategorySlugs(subDirectory?: string) {
    const files: string[] = [];

    walk(subDirectory ? join(POSTS_DIRECTORY, subDirectory) : POSTS_DIRECTORY, (path) => {
        if (path.endsWith("_category.json")) {
            files.push(path);
        }
    });

    return files.map((file) => file.replace(POSTS_DIRECTORY, "").replace(/\/_category\.json$/, ""));
}

export function getCategories() {
    return getCategorySlugs()
        .map((slug) => ({ ...getCategoryBySlug(slug), slug }))
        .filter(({ hidden }) => hidden !== true)
        .sort((a, b) => {
            if (a.index == null || b.index == null) {
                return 0;
            }

            if (a.index > b.index) {
                return 1;
            }

            if (a.index < b.index) {
                return -1;
            }

            return 0;
        });
}

import { existsSync, readFileSync } from "fs";
import { join, parse } from "path";
import matter from "gray-matter";
import { groupBy } from "@marshallku/utils";
import { POSTS_DIRECTORY } from "#constants";
import { Category, Post } from "#types";
import { walk } from "./file";

export function checkCategoryExists(category: string): boolean {
    return existsSync(join(POSTS_DIRECTORY, category));
}

export function getPostSlugs(subDirectory?: string): string[] {
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

export function getPostsByTag(tag: string): Post[] {
    const posts = getPosts();

    return posts.filter(({ data: { tags } }) => tags?.find((x) => x.toLocaleLowerCase() === tag.toLocaleLowerCase()));
}

export function getPosts(category?: string): Post[] {
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

export function getTags(): string[] {
    const posts = getPosts();

    return posts
        .filter(({ data: { tags } }) => !!tags)
        .flatMap(({ data: { tags } }) => tags)
        .reduce(
            (acc, tag) => {
                const lowerCased = tag.toLocaleLowerCase();

                if (!acc.map.has(lowerCased)) {
                    acc.map.set(lowerCased, tag);
                    acc.result.push(lowerCased);
                }

                return acc;
            },
            { map: new Map<string, string>(), result: [] as string[] },
        ).result;
}

export function getGroupedPostByCategory(): Record<string, Post[]> {
    return groupBy(getPosts(), ({ category }) => category.split("/")[1]);
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

export function getCategorySlugs(subDirectory?: string): string[] {
    const files: string[] = [];

    walk(subDirectory ? join(POSTS_DIRECTORY, subDirectory) : POSTS_DIRECTORY, (path) => {
        if (path.endsWith("_category.json")) {
            files.push(path);
        }
    });

    return files.map((file) => file.replace(POSTS_DIRECTORY, "").replace(/\/_category\.json$/, ""));
}

export function getCategories(): (Category & { slug: string })[] {
    return getCategorySlugs()
        .map((slug) => ({ ...getCategoryBySlug(slug), slug }))
        .filter((category): category is Category & { slug: string } => "name" in category && category.hidden !== true)
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

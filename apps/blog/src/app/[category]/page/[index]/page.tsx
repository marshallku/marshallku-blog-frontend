import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { PAGE_SIZE } from "#constants";
import Archive from "#templates/Archive";
import { getCategoryBySlug, getGroupedPostByCategory, getPosts } from "#utils/post";

export const dynamic = "error";

interface ArchiveProps {
    params: Promise<{
        category: string;
        index: string;
    }>;
}

export async function generateMetadata({ params }: ArchiveProps): Promise<Metadata> {
    const { category } = await params;
    const categoryInfo = getCategoryBySlug(`/${category}`);

    return {
        title: categoryInfo?.name ? `${categoryInfo.name} 카테고리 글` : "카테고리 최근 글",
        description: categoryInfo?.description,
    };
}

export function generateStaticParams() {
    const groupedPosts = getGroupedPostByCategory();

    return Object.entries(groupedPosts).flatMap(([category, posts]) =>
        Array.from({ length: Math.ceil(posts.length / PAGE_SIZE) }, (_, i) => ({
            params: {
                category,
                index: `${i + 1}`,
            },
        })),
    );
}

export default async function ArchivePage({ params }: ArchiveProps) {
    const { category, index } = await params;
    const posts = getPosts(category);
    const pageIndex = Number(index);

    if (Number.isNaN(pageIndex) || pageIndex < 1 || Math.ceil(posts.length / PAGE_SIZE) < pageIndex) {
        return notFound();
    }

    const categoryInfo = getCategoryBySlug(`/${category}`);
    const actualIndex = pageIndex - 1;
    const start = actualIndex * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const postsInPage = posts.slice(start, end);
    const firstPost = postsInPage[0];

    return (
        <Archive
            title={categoryInfo?.name ? `${categoryInfo.name} 카테고리 글` : "카테고리 최근 글"}
            coverImage={categoryInfo?.coverImage || firstPost?.data?.coverImage || firstPost?.data?.ogImage}
            postListProps={{
                posts: postsInPage,
                paginationProps: {
                    currentIndex: pageIndex,
                    totalCount: posts.length,
                    basePath: `/${category}`,
                },
            }}
        />
    );
}

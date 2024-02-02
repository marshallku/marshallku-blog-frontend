import { notFound } from "next/navigation";
import { Archive } from "#templates";
import { getCategoryBySlug, getGroupedPostByCategory, getPosts } from "#utils";
import { PAGE_SIZE } from "#constants";

export const dynamic = "error";

interface ArchiveProps {
    params: {
        category: string;
        index: string;
    };
}

export function generateMetadata({ params: { category } }: ArchiveProps) {
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

export default async function ArchivePage({ params: { category, index } }: ArchiveProps) {
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

    return (
        <Archive
            title={categoryInfo?.name ? `${categoryInfo.name} 카테고리 글` : "카테고리 최근 글"}
            coverImage={categoryInfo?.coverImage || postsInPage[0]?.data?.coverImage}
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

import { notFound } from "next/navigation";
import Archive from "#templates/Archive";
import { checkCategoryExists, getCategoryBySlug, getGroupedPostByCategory, getPosts } from "#utils/post";
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

    return Object.entries(groupedPosts).flatMap(([category]) => ({
        category,
    }));
}

export default async function ArchivePage({ params: { category } }: ArchiveProps) {
    if (!checkCategoryExists(category)) {
        return notFound();
    }
    const posts = getPosts(category);
    const postsInPage = posts.slice(0, PAGE_SIZE);
    const categoryInfo = getCategoryBySlug(`/${category}`);

    return (
        <Archive
            title={categoryInfo?.name ? `${categoryInfo.name} 카테고리 글` : "카테고리 최근 글"}
            coverImage={categoryInfo?.coverImage || postsInPage[0]?.data?.coverImage}
            postListProps={{
                posts: postsInPage,
                paginationProps: {
                    currentIndex: 1,
                    totalCount: posts.length,
                    basePath: `/${category}`,
                },
            }}
        />
    );
}

import { Pagination, PostCard } from "#components";
import { PAGE_SIZE } from "#constants";
import { getCategoryBySlug, getGroupedPostByCategory, getPosts } from "#utils";

export const dynamic = "error";

interface ArchiveProps {
    params: {
        category: string;
        index: string;
    };
}

export function generateStaticParams() {
    const groupedPosts = getGroupedPostByCategory();

    return Object.entries(groupedPosts).flatMap(([category]) => ({
        category,
    }));
}

export default async function Archive({ params: { category } }: ArchiveProps) {
    const posts = getPosts(category);
    const postsInPage = posts.slice(0, PAGE_SIZE);
    const categoryInfo = getCategoryBySlug(`/${category}`);

    return (
        <section>
            <h1>{categoryInfo?.name || "카테고리 최근 글"}</h1>
            <section>
                {postsInPage.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </section>
            <Pagination currentIndex={1} totalCount={posts.length} basePath={`/${category}`} rowSize={PAGE_SIZE} />
        </section>
    );
}

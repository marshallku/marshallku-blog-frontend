import { notFound } from "next/navigation";
import { Pagination, PostCard } from "#components";
import { PAGE_SIZE } from "#constants";
import { getGroupedPostByCategory, getPosts } from "#utils";

export const dynamic = "error";

interface ArchiveProps {
    params: {
        category: string;
        index: string;
    };
}

export function generateStaticParams() {
    const groupedPosts = getGroupedPostByCategory();

    return Object.entries(groupedPosts).flatMap(([category, posts]) =>
        Array.from({ length: Math.ceil(posts.length / PAGE_SIZE) }, (_, i) => ({
            params: {
                category: category.slice(1),
                index: `${i + 1}`,
            },
        })),
    );
}

export default async function Archive({ params: { category, index } }: ArchiveProps) {
    const posts = getPosts(category);
    const pageIndex = Number(index);

    if (Number.isNaN(pageIndex) || pageIndex < 1 || Math.ceil(posts.length / PAGE_SIZE) < pageIndex) {
        return notFound();
    }

    const actualIndex = pageIndex - 1;
    const start = actualIndex * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const postsInPage = posts.slice(start, end);
    const maxPage = Math.ceil(posts.length / PAGE_SIZE);

    return (
        <section>
            <h2>Recent posts</h2>
            <section>
                {postsInPage.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </section>
            <Pagination
                currentIndex={pageIndex}
                totalCount={posts.length}
                basePath={`/${category}`}
                rowSize={PAGE_SIZE}
            />
        </section>
    );
}

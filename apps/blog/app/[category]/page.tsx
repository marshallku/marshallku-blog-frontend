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

    return Object.entries(groupedPosts).flatMap(([category]) => ({
        category: category.slice(1),
    }));
}

export default async function Archive({ params: { category } }: ArchiveProps) {
    const posts = getPosts(category);
    const postsInPage = posts.slice(0, PAGE_SIZE);

    return (
        <section>
            <h2>Recent posts</h2>
            <section>
                {postsInPage.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </section>
            <Pagination currentIndex={1} totalCount={posts.length} basePath={`/${category}`} rowSize={PAGE_SIZE} />
        </section>
    );
}

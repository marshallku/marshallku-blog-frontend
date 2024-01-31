import { PostList } from "#components";
import { getTags, getPostsByTag } from "#utils";
import { PAGE_SIZE } from "#constants";

export const dynamic = "error";

interface TagArchivePageProps {
    params: { tag: string };
}

export async function generateStaticParams() {
    return getTags().map((tag) => ({ tag }));
}

export default function TagArchivePage({ params: { tag } }: TagArchivePageProps) {
    const posts = getPostsByTag(decodeURIComponent(tag));
    const postsInPage = posts.slice(0, PAGE_SIZE);

    return (
        <section>
            <h1>{tag} 태그 글</h1>
            <PostList
                posts={postsInPage}
                paginationProps={{
                    currentIndex: 1,
                    totalCount: posts.length,
                    basePath: `/tag/${tag}`,
                }}
            />
        </section>
    );
}

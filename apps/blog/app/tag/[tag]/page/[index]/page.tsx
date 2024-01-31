import { notFound } from "next/navigation";
import { PostList } from "#components";
import { PAGE_SIZE } from "#constants";
import { getPosts, getPostsByTag } from "#utils";

export const dynamic = "error";

interface TagArchivePageProps {
    params: {
        tag: string;
        index: string;
    };
}

export function generateStaticParams() {
    const posts = getPosts();
    const tags = [...new Set(posts.flatMap(({ data: { tags } }) => tags))];

    return tags.flatMap((tag) => {
        const postsWithTags = posts.filter(({ data: { tags: postTags } }) => postTags?.find((x) => x === tag));

        return Array.from({ length: Math.ceil(postsWithTags.length / PAGE_SIZE) }, (_, i) => ({
            params: {
                tag,
                index: `${i + 1}`,
            },
        }));
    });
}

export default async function TagArchivePage({ params: { tag, index } }: TagArchivePageProps) {
    const posts = getPostsByTag(tag);
    const pageIndex = Number(index);

    if (Number.isNaN(pageIndex) || pageIndex < 1 || Math.ceil(posts.length / PAGE_SIZE) < pageIndex) {
        return notFound();
    }

    const actualIndex = pageIndex - 1;
    const start = actualIndex * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const postsInPage = posts.slice(start, end);

    return (
        <>
            <h1>{tag} 태그 글</h1>
            <PostList
                posts={postsInPage}
                paginationProps={{
                    currentIndex: pageIndex,
                    totalCount: posts.length,
                    basePath: `/tag/${tag}`,
                }}
            />
        </>
    );
}

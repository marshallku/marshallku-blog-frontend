import { Metadata } from "next";
import { notFound } from "next/navigation";
import Archive from "#templates/Archive";
import { getPosts, getPostsByTag } from "#utils/post";
import { PAGE_SIZE } from "#constants";

export const dynamic = "error";

interface TagArchivePageProps {
    params: Promise<{
        tag: string;
        index: string;
    }>;
}

export async function generateMetadata({ params }: TagArchivePageProps): Promise<Metadata> {
    const { tag } = await params;

    return {
        title: `${decodeURIComponent(tag)} 태그 글`,
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

export default async function TagArchivePage({ params }: TagArchivePageProps) {
    const { tag, index } = await params;
    const decodedTag = decodeURIComponent(tag);
    const posts = getPostsByTag(decodedTag);
    const pageIndex = Number(index);

    if (Number.isNaN(pageIndex) || pageIndex < 1 || Math.ceil(posts.length / PAGE_SIZE) < pageIndex) {
        return notFound();
    }

    const actualIndex = pageIndex - 1;
    const start = actualIndex * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const postsInPage = posts.slice(start, end);

    return (
        <Archive
            title={`${decodedTag} 태그 글`}
            postListProps={{
                posts: postsInPage,
                paginationProps: {
                    currentIndex: pageIndex,
                    totalCount: posts.length,
                    basePath: `/tag/${tag}`,
                },
            }}
        />
    );
}

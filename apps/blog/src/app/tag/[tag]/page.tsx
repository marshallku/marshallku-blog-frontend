import { type Metadata } from "next";

import { PAGE_SIZE } from "#constants";
import Archive from "#templates/Archive";
import { getTags, getPostsByTag } from "#utils/post";

export const dynamic = "error";

interface TagArchivePageProps {
    params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: TagArchivePageProps): Promise<Metadata> {
    const { tag } = await params;

    return {
        title: `${decodeURIComponent(tag)} 태그 글`,
    };
}

export async function generateStaticParams() {
    return getTags().map(({ name }) => ({ tag: name }));
}

export default async function TagArchivePage({ params }: TagArchivePageProps) {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    const posts = getPostsByTag(decodedTag);
    const postsInPage = posts.slice(0, PAGE_SIZE);

    return (
        <Archive
            title={`${decodedTag} 태그 글`}
            postListProps={{
                posts: postsInPage,
                paginationProps: {
                    currentIndex: 1,
                    totalCount: posts.length,
                    basePath: `/tag/${tag}`,
                },
            }}
        />
    );
}

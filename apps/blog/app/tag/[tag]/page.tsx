import { Archive } from "#layouts";
import { getTags, getPostsByTag } from "#utils";
import { PAGE_SIZE } from "#constants";

export const dynamic = "error";

interface TagArchivePageProps {
    params: { tag: string };
}

export function generateMetadata({ params: { tag } }: TagArchivePageProps) {
    return {
        title: `${tag} 태그 글`,
    };
}

export async function generateStaticParams() {
    return getTags().map((tag) => ({ tag }));
}

export default function TagArchivePage({ params: { tag } }: TagArchivePageProps) {
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

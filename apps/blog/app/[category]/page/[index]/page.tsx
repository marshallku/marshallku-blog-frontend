import { notFound } from "next/navigation";
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
                category,
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

    return (
        <section>
            <h2>Recent posts</h2>
            <section>
                {postsInPage.map(({ content, data }, i) => (
                    <article key={i}>{JSON.stringify({ content, data })}</article>
                ))}
            </section>
        </section>
    );
}

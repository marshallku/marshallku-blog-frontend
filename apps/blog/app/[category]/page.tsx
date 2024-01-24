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
        category,
    }));
}

export default async function Archive({ params: { category } }: ArchiveProps) {
    const posts = getPosts(category);
    const postsInPage = posts.slice(0, PAGE_SIZE);
    const maxPage = Math.ceil(posts.length / PAGE_SIZE);

    return (
        <section>
            <h2>Recent posts</h2>
            <section>
                {postsInPage.map(({ content, data }, i) => (
                    <article key={i}>{JSON.stringify({ content, data })}</article>
                ))}
            </section>
            <ul>
                {Array.from({ length: maxPage }, (_, i) => (
                    <li key={i}>
                        <a href={`/${category}/page/${i + 1}`}>{i + 1}</a>
                    </li>
                ))}
                {maxPage > 1 && (
                    <li>
                        <a href={`/${category}/page/2`}>Next</a>
                    </li>
                )}
            </ul>
        </section>
    );
}

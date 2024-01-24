import { PAGE_SIZE } from "#constants";
import { getPosts } from "#utils";

export const dynamic = "error";

interface ArchiveProps {
    params: {
        category: string;
        index: string;
    };
}

export function generateStaticParams() {
    const posts = getPosts();
    const groupedPosts = posts.reduce(
        (acc, post) => {
            const category = post.category.slice(1);

            if (!category) {
                return acc;
            }

            if (!acc[category]) {
                acc[category] = [];
            }

            acc[category].push(post.slug);
            return acc;
        },
        {} as Record<string, string[]>,
    );

    return Object.entries(groupedPosts).flatMap(([category]) => ({
        category,
    }));
}

export default async function Archive({ params: { category } }: ArchiveProps) {
    const posts = getPosts(category);
    const postsInPage = posts.slice(PAGE_SIZE);

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

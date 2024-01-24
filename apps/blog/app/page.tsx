import { getAllCategories, getPosts } from "#utils";
import { PAGE_SIZE } from "#constants";
import Link from "next/link";

export default async function Home() {
    const posts = getPosts();
    const postsInPage = posts.slice(0, PAGE_SIZE);

    return (
        <section>
            <h1>Welcome to my blog</h1>
            <h2>Recent posts</h2>
            {postsInPage.map(({ data, slug }) => (
                <article key={slug}>
                    <Link href={slug}>
                        <h2>{data.title}</h2>
                    </Link>
                </article>
            ))}
            <h2>Categories</h2>
            {getAllCategories().map((category) => (
                <Link href={category}>{category}</Link>
            ))}
        </section>
    );
}

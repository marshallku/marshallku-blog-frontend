import Link from "next/link";
import { PostList } from "#components";
import { getAllCategories, getPosts } from "#utils";
import { PAGE_SIZE } from "#constants";

export const dynamic = "error";

export default async function Home() {
    const posts = getPosts();
    const postsInPage = posts.slice(0, PAGE_SIZE);

    return (
        <section>
            <h1>Welcome to my blog</h1>
            <h2>Recent posts</h2>
            <PostList posts={postsInPage} />
            <h2>Categories</h2>
            {getAllCategories().map((category) => (
                <Link href={category}>{category}</Link>
            ))}
        </section>
    );
}

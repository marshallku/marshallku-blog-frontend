import { getPostBySlug, getPostSlugs } from "#utils";
import { MDXRemote } from "next-mdx-remote/rsc";

export const dynamic = "error";

interface PostProps {
    params: {
        category: string;
        slug: string[];
    };
}

export async function generateStaticParams() {
    return getPostSlugs().map((slug) => ({
        category: slug.slice(1).split("/")[0],
        slug: slug.slice(1).split("/").slice(1),
    }));
}

export default async function Post({ params: { category, slug } }: PostProps) {
    const post = getPostBySlug(`${category}/${slug.join("/")}`);

    return (
        <article>
            <header>
                <h1>{post.data.title}</h1>
                <figure>
                    <img src={post.data.coverImage} alt={post.data.title} />
                </figure>
                <time dateTime={post.data.date.toISOString()}>{post.data.date.toLocaleDateString("ko-KR")}</time>
            </header>
            <section>
                <MDXRemote source={post.content} />
            </section>
        </article>
    );
}

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";
import { MDXComponents } from "#components";
import { setImageMetaData, getPostBySlug, getPostSlugs } from "#utils";

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
    const post = getPostBySlug(`${category}/${slug.map((x) => decodeURIComponent(x)).join("/")}`);

    return (
        <article>
            <header>
                <h1>{post.data.title}</h1>
                <figure>
                    <img src={post.data.coverImage} alt={post.data.title} />
                </figure>
                <time dateTime={post.data.date.posted.toISOString()}>
                    {post.data.date.posted.toLocaleDateString("ko-KR")}
                </time>
            </header>
            <section>
                <MDXRemote
                    source={post.content}
                    components={MDXComponents}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkToc, remarkGfm, remarkSlug],
                            rehypePlugins: [
                                rehypeAutolinkHeadings,
                                [
                                    // @ts-expect-error
                                    rehypePrettyCode,
                                    {
                                        theme: "solarized-light",
                                        keepBackground: true,
                                    },
                                ],
                                setImageMetaData,
                            ],
                        },
                    }}
                />
            </section>
        </article>
    );
}

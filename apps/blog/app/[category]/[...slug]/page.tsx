import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";
import { classNames } from "@marshallku/utils";
import { MDXComponents, Typography } from "#components";
import { setImageMetaData, getPostBySlug, getPostSlugs } from "#utils";
import styles from "./page.module.scss";
import remarkUnwrapImages from "remark-unwrap-images";

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

const cx = classNames(styles, "page");

export default async function Post({ params: { category, slug } }: PostProps) {
    const post = getPostBySlug(`${category}/${slug.map((x) => decodeURIComponent(x)).join("/")}`);

    return (
        <article className={cx()}>
            <header className={cx("__header")}>
                <figure className={cx("__cover")}>
                    <img src={post.data.coverImage} alt={post.data.title} />
                </figure>
                <div className={cx("__post-information")}>
                    <Typography variant="h1" component="h1" fontWeight={700} className={cx("__title")}>
                        {post.data.title}
                    </Typography>
                    <Typography component="time" dateTime={post.data.date.posted.toISOString()}>
                        {post.data.date.posted.toLocaleDateString("ko-KR")}
                    </Typography>
                </div>
            </header>
            <main className={cx("__body")}>
                <MDXRemote
                    source={post.content}
                    components={MDXComponents}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkToc, remarkGfm, remarkSlug, remarkUnwrapImages],
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
            </main>
        </article>
    );
}

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";
import remarkUnwrapImages from "remark-unwrap-images";
import { Icon } from "@marshallku/icon";
import { classNames } from "@marshallku/utils";
import { Banner, MDXComponents, PostList, PrevNextPost, Typography } from "#components";
import { setImageMetaData, getPostBySlug, getPostSlugs, getCategoryBySlug, getPosts } from "#utils";
import styles from "./page.module.scss";
import Link from "next/link";

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
    const categoryInfo = getCategoryBySlug(category);
    const postSlug = `${category}/${slug.map((x) => decodeURIComponent(x)).join("/")}`;
    const post = getPostBySlug(postSlug);
    const posts = getPosts(category);
    const postIndex = posts.findIndex((post) => post.slug === `/${postSlug}`);

    return (
        <article className={cx()}>
            <Banner title={post.data.title} coverImage={post.data.coverImage}>
                <Typography variant="h1" component="h1" fontWeight={700} className={cx("__title")}>
                    {post.data.title}
                </Typography>
                <Typography variant="b2">
                    {categoryInfo && (
                        <span className={cx("__category")}>
                            <Link href={`/${category}`}>
                                {categoryInfo.icon && (
                                    <Icon
                                        name={categoryInfo.icon}
                                        color={categoryInfo.color}
                                        className={cx("__category-icon")}
                                    />
                                )}
                                {categoryInfo.name}
                            </Link>{" "}
                            •{" "}
                        </span>
                    )}
                    <time dateTime={post.data.date.posted.toISOString()}>
                        {post.data.date.posted.toLocaleDateString("ko-KR")}
                    </time>
                </Typography>
            </Banner>
            <div className={cx("__meta")}>
                {post.data.date.modified && (
                    <Typography variant="c1" component="div" marginBottom={8}>
                        최종 수정일:{" "}
                        <time dateTime={post.data.date.modified.toISOString()}>
                            {post.data.date.modified.toLocaleDateString("ko-KR")}
                        </time>
                    </Typography>
                )}
                <div className={cx("__tags")}>
                    {!!post.data.tags?.length &&
                        post.data.tags.map((tag) => (
                            <Link href={`/tag/${tag}`} key={tag}>
                                <Typography variant="b2" component="span" marginBottom={24}>
                                    <Icon name="tag" /> {tag}
                                </Typography>
                            </Link>
                        ))}
                </div>
            </div>
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
            <PrevNextPost previousPost={posts[postIndex + 1]} nextPost={posts[postIndex - 1]} />
            <aside className={cx("-related-articles")}>
                <Typography
                    variant="h4"
                    component="h2"
                    fontWeight={700}
                    marginBottom={16}
                    className={cx("-related-articles__title")}
                >
                    <Link href={`/${category}`}>{categoryInfo?.name} 카테고리</Link> 다른 글
                </Typography>
                <Typography variant="b2" className={cx("-related-articles__text")} marginBottom={24}>
                    위 글이 유용하셨다면, 아래 글도 읽어보세요!
                </Typography>
                <PostList posts={posts.filter((post) => post.slug !== `/${postSlug}`).slice(0, 3)} />
                <div className={cx("-related-articles__more")}>
                    <Link href={`/${category}`}>
                        {categoryInfo?.name} 관련 글 더 보기 <Icon name="arrow-forward" />
                    </Link>
                </div>
            </aside>
        </article>
    );
}

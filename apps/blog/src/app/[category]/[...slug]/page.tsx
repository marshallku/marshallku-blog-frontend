import { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import nextDynamic from "next/dynamic";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkUnwrapImages from "remark-unwrap-images";
import imageSize from "image-size";
import Typography from "@marshallku/ui/Typography";
import { Icon } from "@marshallku/icon";
import { classNames, formatDate } from "@marshallku/utils";
import MDXComponents from "#components/MDXComponents";
import InteractPost from "#components/InteractPost";
import Image from "#components/Image";
import PostList from "#components/PostList";
import PrevNextPost from "#components/PrevNextPost";
import { ensureToc } from "#utils/remark";
import { setImageMetaData, makeIframeResponsive, formatToc } from "#utils/rehype";
import { getPostBySlug, getPostSlugs, getCategoryBySlug, getPosts } from "#utils/post";
import styles from "./page.module.scss";

export const dynamic = "error";

interface PostProps {
    params: {
        category: string;
        slug: string[];
    };
}

export function generateMetadata({ params: { category, slug } }: PostProps): Metadata {
    const post = getPostBySlug(`${category}/${slug.map((x) => decodeURIComponent(x)).join("/")}`);

    if (!post) {
        return {
            title: "페이지를 찾을 수 없습니다",
            description: "페이지를 찾을 수 없습니다",
        };
    }

    return {
        metadataBase: new URL("https://marshallku.com"),
        title: post.data.title,
        description: post.data.description,
        openGraph: {
            type: "article",
            title: post.data.title,
            description: post.data.description,
            url: `https://marshallku.com/${post.slug}`,
            publishedTime: post.data.date ? post.data.date.posted.toISOString() : "",
            modifiedTime: post.data.date ? post.data.date.modified?.toISOString() : "",
            tags: post.data.tags,
            images: [
                {
                    url: post.data.ogImage,
                    alt: post.data.title,
                },
            ],
        },
    };
}

export async function generateStaticParams() {
    return getPostSlugs().map((slug) => ({
        category: slug.slice(1).split("/")[0],
        slug: slug.slice(1).split("/").slice(1),
    }));
}

const cx = classNames(styles, "page");

const PostComment = nextDynamic(() => import("#components/PostComment"), {
    ssr: false,
});

export default async function Post({ params: { category, slug } }: PostProps) {
    const postSlug = `${category}/${slug.map((x) => decodeURIComponent(x)).join("/")}`;
    const post = getPostBySlug(postSlug);

    if (!post) {
        return notFound();
    }

    const categoryInfo = getCategoryBySlug(category);
    const posts = getPosts(category);
    const postIndex = posts.findIndex((post) => post.slug === `/${postSlug}`);
    const hasCoverImage = !!post.data.coverImage;
    const dimensions = hasCoverImage && imageSize(`public${decodeURIComponent(post.data.coverImage)}`);

    return (
        <article className={cx()}>
            <header className={cx("__banner", hasCoverImage && "__banner--has-cover")}>
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
                    {post.data.date && (
                        <time dateTime={post.data.date.posted.toISOString()}>
                            {formatDate(post.data.date.posted, "yyyy년 MM월 dd일")}
                        </time>
                    )}
                </Typography>
            </header>
            {dimensions && (
                <figure className={cx("__cover-image")}>
                    <Image
                        src={post.data.coverImage}
                        alt={post.data.title}
                        width={dimensions.width}
                        height={dimensions.height}
                        useLowQualityPlaceholder
                    />
                </figure>
            )}
            <div className={cx("__meta")}>
                {post.data.date.modified && (
                    <Typography variant="c1" component="div" marginBottom={8}>
                        최종 수정일:{" "}
                        <time dateTime={post.data.date.modified.toISOString()}>
                            {formatDate(post.data.date.modified, "yyyy년 MM월 dd일")}
                        </time>
                    </Typography>
                )}
            </div>
            <main className={cx("__body")}>
                <MDXRemote
                    source={post.content}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [ensureToc, remarkToc, remarkGfm, remarkUnwrapImages],
                            rehypePlugins: [
                                rehypeSlug,
                                rehypeAutolinkHeadings,
                                [
                                    rehypePrettyCode,
                                    {
                                        theme: {
                                            dark: "one-dark-pro",
                                            light: "material-theme-lighter",
                                            sepia: "solarized-light",
                                        },
                                        keepBackground: true,
                                    },
                                ],
                                setImageMetaData,
                                makeIframeResponsive,
                                formatToc,
                            ],
                        },
                    }}
                    components={MDXComponents}
                />
                <Typography component="div" variant="c1" className={cx("__copyright")}>
                    ⓒ {post.data.date.posted.getFullYear()}. Marshall K All rights reserved
                </Typography>
            </main>
            <InteractPost className={cx("__interact")} title={post.data.title} slug={post.slug} />
            <PostComment slug={`/${postSlug}`} />
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
                <PostList posts={posts.filter((post) => post.slug !== `/${postSlug}`).slice(0, 4)} />
                <div className={cx("-related-articles__more")}>
                    <Link href={`/${category}`}>
                        {categoryInfo?.name} 관련 글 더 보기 <Icon name="arrow-forward" />
                    </Link>
                </div>
            </aside>
            {post.data.displayAd && process.env.NEXT_PUBLIC_GOOGLE_AD_ID && (
                <Script
                    id="google-ads"
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_AD_ID}`}
                    strategy="beforeInteractive"
                    crossOrigin="anonymous"
                />
            )}
        </article>
    );
}

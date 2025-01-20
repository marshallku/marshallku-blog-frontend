import Link from "next/link";
import Button from "@marshallku/ui/Button";
import Typography from "@marshallku/ui/Typography";
import { Icon } from "@marshallku/icon";
import { classNames, formatDate } from "@marshallku/utils";
import PostList from "#components/PostList";
import PostListGallery from "#components/PostListGallery";
import Image from "#components/Image";
import { getPosts, getCategories } from "#utils/post";
import { PAGE_SIZE } from "#constants";
import styles from "./page.module.scss";

export const dynamic = "error";

const cx = classNames(styles, "home");

export default async function Home() {
    const posts = getPosts();
    const categories = getCategories();
    const devPosts = posts.filter(({ category }) => category === "/dev");
    const mostRecentPost = devPosts[0];
    const postsInPage = devPosts.slice(1).slice(0, PAGE_SIZE);
    const galleryPosts = posts.filter(({ category }) => category === "/gallery").slice(0, 6);

    return (
        <section className={cx()}>
            <header className={cx("-header")}>
                <figure className={cx("-header__cover")}>
                    <Image
                        src={mostRecentPost.data.coverImage || mostRecentPost.data.ogImage}
                        alt={mostRecentPost.data.title}
                        loading="eager"
                    />
                </figure>
                <div className={cx("-header__content")}>
                    <Typography variant="c1">
                        {formatDate(mostRecentPost.data.date.posted, "yyyy년 MM월 dd일")}
                    </Typography>
                    <Typography component="h1" variant="h1" fontWeight={700} className={cx("-header__title")}>
                        <Link href={mostRecentPost.slug}>{mostRecentPost.data.title}</Link>
                    </Typography>
                    {mostRecentPost.data.tags && (
                        <Typography variant="b2" component="span" marginBottom={8} className={cx("-header__tags")}>
                            {mostRecentPost.data.tags.map((tag) => (
                                <Button
                                    key={tag}
                                    component={Link}
                                    href={`/tag/${tag}`}
                                    variant="outline"
                                    size="small"
                                    color="secondary"
                                >
                                    {tag}
                                </Button>
                            ))}
                        </Typography>
                    )}
                    <Typography variant="b2">
                        <Link href={mostRecentPost.slug}>
                            {mostRecentPost.data.description}
                            <br />더 보기 <Icon name="arrow-forward" />
                        </Link>
                    </Typography>
                </div>
            </header>
            <section className={cx("__container")}>
                <PostList posts={postsInPage} />
            </section>
            <section className={cx("__container", "__container--padding", "__category")}>
                {categories
                    .filter(
                        (
                            category,
                        ): category is (typeof categories)[number] &
                            Required<Pick<(typeof categories)[number], "icon">> => !!category.icon,
                    )
                    .map(({ slug, name, icon, color }) => (
                        <Link href={slug} key={slug}>
                            <Typography variant="h4" fontWeight={700}>
                                {name}
                            </Typography>
                            <Icon name={icon} color={color} />
                            <div style={{ backgroundColor: color }} />
                        </Link>
                    ))}
            </section>
            <section className={cx("__gallery")}>
                <PostListGallery posts={galleryPosts} />
            </section>
        </section>
    );
}

import Link from "next/link";
import { Icon } from "@marshallku/icon";
import { classNames, formatDate } from "@marshallku/utils";
import PostList from "#components/PostList";
import PostListGallery from "#components/PostListGallery";
import Image from "#components/Image";
import Typography from "#components/Typography";
import { getPosts, getCategories } from "#utils/post";
import { PAGE_SIZE } from "#constants";
import styles from "./page.module.scss";

export const dynamic = "error";

const cx = classNames(styles, "home");

export default async function Home() {
    const posts = getPosts();
    const mostRecentPost = posts[0];
    const categories = getCategories();
    const postsInPage = posts
        .slice(1)
        .filter(({ category }) => !!categories.find(({ slug }) => slug === category))
        .slice(0, PAGE_SIZE);
    const galleryPosts = posts.filter(({ category }) => category === "/gallery").slice(0, 6);

    return (
        <section className={cx()}>
            <header className={cx("-header")}>
                <figure className={cx("-header__cover")}>
                    <Image src={mostRecentPost.data.coverImage} alt={mostRecentPost.data.title} loading="eager" />
                </figure>
                <div className={cx("-header__content")}>
                    <Typography variant="c1">
                        {formatDate(mostRecentPost.data.date.posted, "yyyy년 MM월 dd일")}
                    </Typography>
                    <Typography component="h1" variant="h1" fontWeight={700} className={cx("-header__title")}>
                        <Link href={mostRecentPost.slug}>{mostRecentPost.data.title}</Link>
                    </Typography>
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
                    .filter(({ icon }) => !!icon)
                    .map(({ slug, name, icon, color }) => (
                        <Link href={slug} key={slug}>
                            <Typography variant="h4" fontWeight={700}>
                                {name}
                            </Typography>
                            <Icon name={icon!} color={color} />
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

import Link from "next/link";
import Typography from "@marshallku/ui/Typography";
import { Icon } from "@marshallku/icon";
import { classNames } from "@marshallku/utils";
import PostList from "#components/PostList";
import PostListGallery from "#components/PostListGallery";
import Profile from "#components/Profile";
import { getPosts, getCategories } from "#utils/post";
import { PAGE_SIZE, SMALL_PAGE_SIZE, SITE_DESCRIPTION, SITE_NAME } from "#constants";
import styles from "./page.module.scss";
import BlogBanner from "#components/BlogBanner";

export const dynamic = "error";

const cx = classNames(styles, "home");

export default async function Home() {
    const posts = getPosts();
    const categories = getCategories();
    const devPosts = posts.filter(({ category }) => category === "/dev").slice(0, PAGE_SIZE);
    const galleryPosts = posts.filter(({ category }) => category === "/gallery").slice(0, SMALL_PAGE_SIZE);

    return (
        <section className={cx()}>
            <BlogBanner>
                <header className={cx("__header")}>
                    <div className={cx("__header-content")}>
                        <Typography variant="h1" component="h1" fontWeight={700} marginBottom={8}>
                            {SITE_NAME}
                        </Typography>
                        <Typography marginBottom={24}>{SITE_DESCRIPTION}</Typography>
                    </div>
                    <div className={cx("__profile")}>
                        <Profile size="small" showContact />
                    </div>
                </header>
            </BlogBanner>
            <section className={cx("__container")}>
                <PostList posts={devPosts} />
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

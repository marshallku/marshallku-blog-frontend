import Link from "next/link";
import Button from "@marshallku/ui/Button";
import Typography from "@marshallku/ui/Typography";
import { Icon } from "@marshallku/icon";
import { classNames, formatDate } from "@marshallku/utils";
import PostList from "#components/PostList";
import PostListGallery from "#components/PostListGallery";
import Image from "#components/Image";
import { getPosts, getCategories } from "#utils/post";
import { PAGE_SIZE, SITE_DESCRIPTION, SITE_NAME } from "#constants";
import styles from "./page.module.scss";
import Profile from "#components/Profile";

export const dynamic = "error";

const cx = classNames(styles, "home");

export default async function Home() {
    const posts = getPosts();
    const categories = getCategories();
    const devPosts = posts.filter(({ category }) => category === "/dev");
    const postsInPage = devPosts.slice(0, PAGE_SIZE);
    const galleryPosts = posts.filter(({ category }) => category === "/gallery").slice(0, 6);

    return (
        <section className={cx()}>
            <header className={cx("__header")}>
                <Typography variant="h1" fontWeight={700}>
                    {SITE_NAME}
                </Typography>
                <Typography>{SITE_DESCRIPTION}</Typography>
                <Profile size="small" showContact />
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

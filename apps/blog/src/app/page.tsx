import Typography from "@marshallku/ui/Typography";
import { classNames } from "@marshallku/utils";

import styles from "./page.module.scss";

import BlogBanner from "#components/BlogBanner";
import HomePostList from "#components/HomePostList";
import PostListGallery from "#components/PostListGallery";
import Profile from "#components/Profile";
import { SMALL_PAGE_SIZE, SITE_DESCRIPTION, SITE_NAME } from "#constants";
import { getPosts, getCategories } from "#utils/post";


export const dynamic = "error";

const cx = classNames(styles, "home");

export default async function Home() {
    const posts = getPosts();
    const categories = getCategories();
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
            <HomePostList categories={categories} posts={posts} />
            <section className={cx("__gallery")}>
                <PostListGallery posts={galleryPosts} />
            </section>
        </section>
    );
}

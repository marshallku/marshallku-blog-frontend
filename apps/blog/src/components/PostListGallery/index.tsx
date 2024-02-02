import { classNames } from "@marshallku/utils";
import styles from "./index.module.scss";
import { Post } from "#types";
import Link from "next/link";

export interface PostListGalleryProps {
    posts: Post[];
}

const cx = classNames(styles, "post-list-gallery");

function PostListGallery({ posts }: PostListGalleryProps) {
    return (
        <div className={cx()}>
            {posts.map((post) => (
                <Link key={post.slug} href={post.slug} className={cx("__item")}>
                    <img className={cx("__image")} src={post.data.coverImage} alt={post.data.title} />
                </Link>
            ))}
        </div>
    );
}

export default PostListGallery;
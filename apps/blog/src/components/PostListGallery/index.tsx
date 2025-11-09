import { classNames } from "@marshallku/utils";
import Link from "next/link";

import styles from "./index.module.scss";

import Image from "#components/Image";
import { type Post } from "#types";


export interface PostListGalleryProps {
    posts: Omit<Post, "content">[];
}

const cx = classNames(styles, "post-list-gallery");

function PostListGallery({ posts }: PostListGalleryProps) {
    return (
        <div className={cx()}>
            {posts.map((post) => (
                <Link key={post.slug} href={post.slug} className={cx("__item")}>
                    <Image
                        className={cx("__image")}
                        src={post.data.coverImage || post.data.ogImage}
                        alt={post.data.title}
                        useLowQualityPlaceholder
                    />
                </Link>
            ))}
        </div>
    );
}

export default PostListGallery;

import Link from "next/link";
import { classNames } from "@marshallku/utils";
import { Post } from "#types";
import { Typography } from "#components";
import styles from "./index.module.scss";

interface PostCardProps {
    post: Post;
}

const cx = classNames(styles, "post-card");

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className={cx()}>
            {post.data.ogImage?.url && (
                <figure className={cx("__image")}>
                    <img src={post.data.ogImage.url} alt={post.data.title} />
                </figure>
            )}
            <header className={cx("__header")}>
                <Link href={post.slug}>
                    <Typography component="h2" variant="h2" fontWeight={700} className={cx("__title")}>
                        {post.data.title}
                    </Typography>
                </Link>
                <Link href={post.slug}>
                    <Typography component="p" className={cx("__excerpt")}>
                        {post.data.excerpt}
                    </Typography>
                </Link>
                <Typography
                    component="time"
                    className={cx("__time")}
                    variant="c1"
                    dateTime={post.data.date.toISOString()}
                >
                    {post.data.date.toLocaleDateString("ko-KR")}
                </Typography>
            </header>
        </article>
    );
}

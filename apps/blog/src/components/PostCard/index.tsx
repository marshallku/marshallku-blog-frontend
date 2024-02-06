import Link from "next/link";
import { classNames, formatDate } from "@marshallku/utils";
import Image from "#components/Image";
import Typography from "#components/Typography";
import { Post } from "#types";
import styles from "./index.module.scss";

export interface PostCardProps {
    post: Post;
}

const cx = classNames(styles, "post-card");

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className={cx()}>
            {post.data.ogImage && (
                <figure className={cx("__image")}>
                    <Image src={post.data.ogImage} alt={post.data.title} forceSize={500} />
                </figure>
            )}
            <header className={cx("__header")}>
                <Link href={post.slug}>
                    <Typography component="h2" variant="h2" fontWeight={700} className={cx("__title")} marginBottom={8}>
                        {post.data.title}
                    </Typography>
                </Link>
                <Link href={post.slug}>
                    <Typography component="p" className={cx("__description")} variant="b2" marginBottom={8}>
                        {post.data.description}
                    </Typography>
                </Link>
                <Typography
                    component="time"
                    className={cx("__time")}
                    variant="c1"
                    dateTime={post.data.date.posted.toISOString()}
                >
                    {formatDate(post.data.date.posted, "yyyy년 MM월 dd일")}
                </Typography>
            </header>
        </article>
    );
}

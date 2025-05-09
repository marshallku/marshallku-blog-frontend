import Link from "next/link";
import Button from "@marshallku/ui/Button";
import Typography from "@marshallku/ui/Typography";
import { classNames, formatDate } from "@marshallku/utils";
import Image from "#components/Image";
import { Post } from "#types";
import styles from "./index.module.scss";

export interface PostCardProps {
    post: Omit<Post, "content">;
}

const cx = classNames(styles, "post-card");

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className={cx()}>
            {post.data.ogImage && (
                <Link href={post.slug}>
                    <figure className={cx("__image")}>
                        <Image src={post.data.ogImage} alt={post.data.title} forceSize={500} useLowQualityPlaceholder />
                    </figure>
                </Link>
            )}
            <header className={cx("__header")}>
                <Link href={post.slug}>
                    <Typography component="h2" variant="h2" fontWeight={700} className={cx("__title")} marginBottom={8}>
                        {post.data.title}
                    </Typography>
                </Link>
                <Link href={post.slug}>
                    <Typography component="p" className={cx("__description")} variant="b2" marginBottom={12}>
                        {post.data.description}
                    </Typography>
                </Link>
                {post.data.tags && (
                    <Typography variant="b2" component="span" marginBottom={8} className={cx("__tags")}>
                        {post.data.tags.map((tag) => (
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

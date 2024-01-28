import Link from "next/link";
import { classNames } from "@marshallku/utils";
import { Post } from "#types";
import styles from "./index.module.scss";

interface PostCardProps {
    post: Post;
}

const cx = classNames(styles, "post-card");

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className={cx()}>
            {post.data.ogImage?.url && (
                <Link href={post.slug}>
                    <figure>
                        <img src={post.data.ogImage.url} alt={post.data.title} />
                    </figure>
                </Link>
            )}
            <header>
                <Link href={post.slug}>
                    <h2>{post.data.title}</h2>
                </Link>
                <Link href={post.slug}>
                    <p>{post.data.excerpt}</p>
                </Link>
                <time dateTime={post.data.date.toISOString()}>{post.data.date.toLocaleDateString("ko-KR")}</time>
            </header>
        </article>
    );
}

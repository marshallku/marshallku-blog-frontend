import Link from "next/link";
import { classNames } from "@marshallku/utils";
import { Typography } from "#components";
import { Post } from "#types";
import styles from "./index.module.scss";

export interface PrevNextPostProps {
    previousPost?: Post;
    nextPost?: Post;
}

const cx = classNames(styles, "prev-next-post");

const Post = ({ post, isPreviousPost }: { post: Post; isPreviousPost?: boolean }) => (
    <article className={cx("-post", isPreviousPost && "-post--previous")}>
        <Link href={post.slug} className={cx("-post__meta")}>
            <Typography variant="c1" className={cx("-post__label")}>
                {isPreviousPost ? "이전 글" : "다음 글"}
            </Typography>
            <Typography variant="h2" component="h4" className={cx("-post__title")} fontWeight={600}>
                {post.data.title}
            </Typography>
        </Link>
        <img className={cx("-post__cover-image")} src={post.data.coverImage} alt={post.data.title} />
    </article>
);

function PrevNextPost({ previousPost, nextPost }: PrevNextPostProps) {
    return (
        <aside className={cx()}>
            {previousPost && <Post post={previousPost} isPreviousPost />}
            {nextPost && <Post post={nextPost} />}
        </aside>
    );
}

export default PrevNextPost;

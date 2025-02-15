import Link from "next/link";
import Typography from "@marshallku/ui/Typography";
import { classNames } from "@marshallku/utils";
import Image from "#components/Image";
import { Post } from "#types";
import styles from "./index.module.scss";
import { Icon } from "@marshallku/icon";

export interface PrevNextPostProps {
    previousPost?: Omit<Post, "content">;
    nextPost?: Omit<Post, "content">;
}

const cx = classNames(styles, "prev-next-post");

const Article = ({ post, isPreviousPost }: { post: Omit<Post, "content">; isPreviousPost?: boolean }) => (
    <article className={cx("-post", isPreviousPost && "-post--previous")}>
        <Link href={post.slug} className={cx("-post__meta")}>
            <Typography variant="c1" className={cx("-post__label")}>
                <Icon name={isPreviousPost ? "arrow-back" : "arrow-forward"} />
                {isPreviousPost ? "이전 글" : "다음 글"}
            </Typography>
            <Typography variant="h4" component="h4" className={cx("-post__title")} fontWeight={600}>
                {post.data.title}
            </Typography>
        </Link>
        <Image
            className={cx("-post__cover-image")}
            src={post.data.coverImage || post.data.ogImage}
            alt={post.data.title}
            forceSize={500}
        />
    </article>
);

function PrevNextPost({ previousPost, nextPost }: PrevNextPostProps) {
    return (
        <aside className={cx()}>
            {previousPost && <Article post={previousPost} isPreviousPost />}
            {nextPost && <Article post={nextPost} />}
        </aside>
    );
}

export default PrevNextPost;

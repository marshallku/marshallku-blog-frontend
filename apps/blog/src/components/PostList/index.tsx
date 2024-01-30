import { classNames } from "@marshallku/utils";
import { Pagination, PaginationProps, PostCard } from "#components";
import { PAGE_SIZE } from "#constants";
import { Post } from "#types";
import styles from "./index.module.scss";

export interface PostListProps {
    posts: Post[];
    paginationProps?: Omit<PaginationProps, "rowSize">;
}

const cx = classNames(styles, "post-list");

function PostList({ posts, paginationProps }: PostListProps) {
    return (
        <section className={cx()}>
            <section>
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </section>
            {paginationProps && <Pagination {...paginationProps} rowSize={PAGE_SIZE} />}
        </section>
    );
}

export default PostList;

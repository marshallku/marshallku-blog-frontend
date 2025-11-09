import { classNames } from "@marshallku/utils";

import styles from "./index.module.scss";

import Pagination, { type PaginationProps } from "#components/Pagination";
import PostCard from "#components/PostCard";
import { PAGE_SIZE } from "#constants";
import { type Post } from "#types";

export interface PostListProps {
    posts: Omit<Post, "content">[];
    paginationProps?: Omit<PaginationProps, "rowSize">;
}

const cx = classNames(styles, "post-list");

function PostList({ posts, paginationProps }: PostListProps) {
    return (
        <section className={cx()}>
            <div className={cx("__list")}>
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
            {paginationProps && <Pagination {...paginationProps} rowSize={PAGE_SIZE} />}
        </section>
    );
}

export default PostList;

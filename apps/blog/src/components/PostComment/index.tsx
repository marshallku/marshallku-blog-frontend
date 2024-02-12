import { classNames } from "@marshallku/utils";
import { type CommentListResponse } from "#api";
import CommentList from "#components/CommentList";
import styles from "./index.module.scss";

export interface PostCommentProps {
    data: CommentListResponse;
}

const cx = classNames(styles, "post-comment");

function PostComment({ data }: PostCommentProps) {
    return (
        <div className={cx()}>
            <CommentList data={data} />
        </div>
    );
}

export default PostComment;

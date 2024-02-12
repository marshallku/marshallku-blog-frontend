import { classNames } from "@marshallku/utils";
import { type CommentListResponse } from "#api";
import CommentForm from "#components/CommentForm";
import CommentList from "#components/CommentList";
import styles from "./index.module.scss";

export interface PostCommentProps {
    data?: CommentListResponse;
}

const cx = classNames(styles, "post-comment");

function PostComment({ data }: PostCommentProps) {
    return (
        <div className={cx()}>
            <CommentForm />
            {data && <CommentList data={data} />}
        </div>
    );
}

export default PostComment;

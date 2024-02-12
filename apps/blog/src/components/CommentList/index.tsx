import { Fragment } from "react";
import { classNames } from "@marshallku/utils";
import { type CommentListResponse } from "#api";
import CommentBubble from "#components/CommentBubble";
import styles from "./index.module.scss";

export interface CommentListProps {
    data: CommentListResponse;
}

const cx = classNames(styles, "comment-list");

function CommentList({ data }: CommentListProps) {
    return (
        <ul className={cx()}>
            {data.map(({ replies, ...comment }) => (
                <Fragment key={comment._id}>
                    <CommentBubble data={comment} border />
                    {!!replies?.length && (
                        <ul>
                            {replies.map((child) => (
                                <CommentBubble key={child._id} data={child} />
                            ))}
                        </ul>
                    )}
                </Fragment>
            ))}
        </ul>
    );
}

export default CommentList;

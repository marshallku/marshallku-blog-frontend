import { classNames, formatDate } from "@marshallku/utils";
import { type Comment } from "#api";
import styles from "./index.module.scss";
import CommentAvatar from "#components/CommentAvatar";
import Typography from "#components/Typography";

export interface CommentBubbleProps {
    data: Comment;
    border?: boolean;
}

const cx = classNames(styles, "comment-bubble");

function CommentBubble({ border, data: { name, url, body, createdAt, byPostAuthor } }: CommentBubbleProps) {
    return (
        <li className={cx("", byPostAuthor && "--author", border && "--border")}>
            <figure className={cx("__avatar")}>
                <CommentAvatar name={name} url={url} postAuthor={byPostAuthor} />
            </figure>
            <div className={cx("__content")}>
                <div className={cx("__name")}>
                    <Typography
                        variant="c1"
                        component={url ? "a" : "span"}
                        {...(url && { href: url, target: "_blank", rel: "noopener noreferrer nofollow" })}
                    >
                        {name}
                    </Typography>
                </div>
                <Typography variant="b1" className={cx("__text")}>
                    {body}
                </Typography>
                <Typography variant="c2" className={cx("__date")}>
                    {formatDate(new Date(createdAt), "yyyy. MM. dd")}
                </Typography>
            </div>
        </li>
    );
}

export default CommentBubble;

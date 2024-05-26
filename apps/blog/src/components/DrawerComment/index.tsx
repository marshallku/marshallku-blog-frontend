"use client";

import { classNames, formatDate } from "@marshallku/utils";
import { useComments } from "#api/comment/queries";
import CommentAvatar from "#components/CommentAvatar";
import Typography from "#components/Typography";
import styles from "./index.module.scss";

const cx = classNames(styles, "drawer-comment");

function DrawerComment() {
    const { data } = useComments({ count: 6 });

    return (
        <ol className={cx()}>
            {data.map(({ name, url, body, createdAt, byPostAuthor, _id: id }) => (
                <li key={id} className={cx("__comment")}>
                    <figure className={cx("__avatar")}>
                        <CommentAvatar name={name} url={url} postAuthor={byPostAuthor} />
                    </figure>
                    <div>
                        <Typography className={cx("__body")} marginBottom={4}>
                            {body}
                        </Typography>
                        <Typography variant="c2">
                            {name} &middot;{" "}
                            <time dateTime={new Date(createdAt).toISOString()}>
                                {formatDate(new Date(createdAt), "yyyy. MM. dd")}
                            </time>
                        </Typography>
                    </div>
                </li>
            ))}
        </ol>
    );
}

export default DrawerComment;

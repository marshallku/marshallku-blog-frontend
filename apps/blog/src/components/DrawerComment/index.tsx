"use client";

import Link from "next/link";
import { classNames, formatDate } from "@marshallku/utils";
import { useComments } from "#api/comment/queries";
import CommentAvatar from "#components/CommentAvatar";
import Typography from "#components/Typography";
import styles from "./index.module.scss";

export interface DrawerCommentProps {
    closeDrawer(): void;
}

const cx = classNames(styles, "drawer-comment");

function DrawerComment({ closeDrawer }: DrawerCommentProps) {
    const { data } = useComments({ count: 6 });

    return (
        <ol className={cx()}>
            {data.map(({ _id: id, name, url, body, createdAt, byPostAuthor, postSlug }) => (
                <li key={id} className={cx("__comment")}>
                    <Link href={postSlug} className={cx("__link")} onClick={closeDrawer}>
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
                    </Link>
                </li>
            ))}
        </ol>
    );
}

export default DrawerComment;

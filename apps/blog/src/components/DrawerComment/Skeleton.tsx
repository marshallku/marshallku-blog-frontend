import Typography from "@marshallku/ui/Typography";
import { classNames } from "@marshallku/utils";

import styles from "./index.module.scss";

import { DRAWER_COMMENT_COUNT } from "#constants";

const cx = classNames(styles, "drawer-comment");

function DrawerCommentSkeleton() {
    return (
        <ol className={cx()}>
            {Array.from({ length: DRAWER_COMMENT_COUNT }).map((_, index) => (
                <li className={cx("__comment")} key={index}>
                    <div className={cx("__link")}>
                        <figure className={cx("__avatar", "__skeleton")} />
                        <div className={cx("__skeleton-body")}>
                            <Typography className={cx("__body", "__skeleton")} marginBottom={4}>
                                Loading...
                            </Typography>
                            <Typography variant="c2" className={cx("__skeleton")}>
                                Loading...
                            </Typography>
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    );
}

export default DrawerCommentSkeleton;

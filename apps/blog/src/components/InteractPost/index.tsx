"use client";

import { copyToClipboard } from "copy2clip";
import { Icon } from "@marshallku/icon";
import { classNames } from "@marshallku/utils";
import { toast } from "@marshallku/toast";
import styles from "./index.module.scss";

export interface InteractPostProps {
    className?: string;
    title: string;
    slug: string;
}

// Avoid using 'share' as a name to avoid ad blockers
const cx = classNames(styles, "interact-post");

function InteractPost({ className, title, slug }: InteractPostProps) {
    const url = `https://marshallku.com/${slug}`;
    return (
        <div className={cx("", { className })}>
            <a
                href={`https://github.com/marshallku/marshallku-blog-frontend/issues/new?title=${encodeURIComponent(
                    `Discussion about ${title}`,
                )}&assignees=marshallku&body=${encodeURIComponent(`Link of the post: ${url}\n\n---\n\n`)}`}
                className={cx("__github")}
            >
                <Icon name="github" />
                Create an issue
            </a>
            <div className={cx("__send")}>
                <button
                    type="button"
                    onClick={() => {
                        copyToClipboard(url);
                        toast("주소가 클립보드에 복사되었습니다.", { removable: true });
                    }}
                >
                    <Icon name="link" />
                    <span className="sr-only">Copy link</span>
                </button>
            </div>
        </div>
    );
}

export default InteractPost;
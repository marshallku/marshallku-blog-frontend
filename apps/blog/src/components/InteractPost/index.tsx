"use client";

import { copyToClipboard } from "copy2clip";
import { Icon } from "@marshallku/icon";
import { classNames } from "@marshallku/utils";
import { toast } from "@marshallku/toast";
import styles from "./index.module.scss";
import Button from "#components/Button";
import { AnchorHTMLAttributes } from "react";
import ReportIssueButton from "#components/ReportIssueButton";

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
            <ReportIssueButton title={`Discussion about ${title}`} body={`Link of the post: ${url}\n\n---\n\n`} />
            <div className={cx("__send")}>
                <Button
                    onClick={() => {
                        copyToClipboard(url);
                        toast("주소가 클립보드에 복사되었습니다.", { removable: true });
                    }}
                >
                    <Icon name="link" />
                    <span className="sr-only">Copy link</span>
                </Button>
            </div>
        </div>
    );
}

export default InteractPost;

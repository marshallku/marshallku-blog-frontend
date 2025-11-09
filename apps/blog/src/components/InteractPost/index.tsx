"use client";

import { Icon } from "@marshallku/icon";
import { toast } from "@marshallku/toast";
import Button from "@marshallku/ui/Button";
import { classNames } from "@marshallku/utils";
import { copyToClipboard } from "copy2clip";

import styles from "./index.module.scss";

import ReportIssueButton from "#components/ReportIssueButton";


export interface InteractPostProps {
    className?: string;
    title: string;
    slug: string;
}

// Avoid using 'share' as a name to avoid ad blockers
const cx = classNames(styles, "interact-post");

function InteractPost({ className, title, slug }: InteractPostProps) {
    const url = `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}/${slug}`;
    return (
        <div className={cx("", { className })}>
            <ReportIssueButton title={`Discussion about ${title}`} body={`Link of the post: ${url}\n\n---\n\n`} />
            <div className={cx("__send")}>
                <Button
                    onClick={async () => {
                        await copyToClipboard(url);
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

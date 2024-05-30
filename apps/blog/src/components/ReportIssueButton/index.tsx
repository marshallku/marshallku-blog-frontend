import { AnchorHTMLAttributes, ReactNode } from "react";
import Button from "@marshallku/ui/Button";
import { Icon } from "@marshallku/icon";
import styles from "./index.module.scss";
import { classNames } from "@marshallku/utils";

export interface ReportIssueButtonProps {
    title: string;
    body: string;
    className?: string;
    children?: ReactNode;
}

const cx = classNames(styles, "report-issue-button");

function ReportIssueButton({ title, body, className, children = "Report an issue" }: ReportIssueButtonProps) {
    return (
        <Button
            component={(x: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...x} />}
            href={`https://github.com/marshallku/marshallku-blog-frontend/issues/new?title=${encodeURIComponent(
                title,
            )}&assignees=marshallku&body=${encodeURIComponent(body)}`}
            className={cx("", { className })}
            target="_blank"
            rel="noreferrer noopener nofollow"
        >
            <Icon name="github" />
            {children}
        </Button>
    );
}

export default ReportIssueButton;

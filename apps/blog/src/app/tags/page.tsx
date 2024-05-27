import { Metadata } from "next";
import Link from "next/link";
import { getTags } from "#utils/post";
import { classNames } from "@marshallku/utils";
import styles from "./page.module.scss";

export const dynamic = "error";

export const metadata: Metadata = {
    title: "태그 목록",
};

const cx = classNames(styles, "tag-cloud");

export default function TagCloudPage() {
    const tags = getTags();

    return (
        <div className={cx()}>
            {tags.map(({ name, count }) => (
                <Link key={name} href={`/tag/${name}`}>
                    {name} ({count})
                </Link>
            ))}
        </div>
    );
}

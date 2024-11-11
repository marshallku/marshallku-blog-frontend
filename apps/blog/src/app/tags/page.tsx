import { Metadata } from "next";
import Link from "next/link";
import { getTags } from "#utils/post";
import Typography from "@marshallku/ui/Typography";
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
            <Typography variant="h1" component="h1" fontWeight={700} className={cx("__title")}>
                태그 목록
            </Typography>
            <div className={cx("__tags")}>
                {tags.map(({ name, count }) => (
                    <Link key={name} href={`/tag/${name}`}>
                        <Typography component="span" variant="b2">
                            {name}
                        </Typography>
                        <Typography component="span" variant="c1">
                            ({count})
                        </Typography>
                    </Link>
                ))}
            </div>
        </div>
    );
}

import { Metadata } from "next";
import Link from "next/link";
import { getTags } from "#utils";

export const dynamic = "error";

export const metadata: Metadata = {
    title: "태그 목록",
};

export default function TagCloudPage() {
    const tags = getTags();

    return (
        <div>
            {tags.map((tag) => (
                <Link key={tag} href={`/tag/${tag}`}>
                    {tag}
                </Link>
            ))}
        </div>
    );
}

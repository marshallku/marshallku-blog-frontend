import { getPosts } from "#utils";
import Link from "next/link";

export default function TagCloudPage() {
    const posts = getPosts();
    const tags = [
        ...new Set(posts.filter(({ data: { tags } }) => 0 < tags?.length).flatMap(({ data: { tags } }) => tags)),
    ];

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

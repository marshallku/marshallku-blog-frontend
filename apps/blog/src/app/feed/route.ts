import { formatCategoryFeed } from "#utils/feed";
import { getCategories } from "#utils/post";

export const dynamic = "error";

export async function GET() {
    const categories = getCategories();
    const feed = await formatCategoryFeed(({ category }) => !!categories.find(({ slug }) => slug === category));

    return new Response(feed, {
        headers: {
            "Content-Type": "application/rss+xml; charset=UTF-8",
        },
    });
}

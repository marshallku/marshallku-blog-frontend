import { formatCategoryFeed } from "#utils/feed";

export const dynamic = "error";

export async function GET(_: Request, { params }: { params: Promise<{ category: string }> }) {
    const { category: currentCategory } = await params;
    const feed = await formatCategoryFeed(({ category }) => category === `/${currentCategory}`);

    return new Response(feed, {
        headers: {
            "Content-Type": "application/rss+xml; charset=UTF-8",
        },
    });
}

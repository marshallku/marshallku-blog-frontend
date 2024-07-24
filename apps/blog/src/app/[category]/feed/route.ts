import { formatCategoryFeed } from "#utils/feed";

export const dynamic = "error";

export async function GET(_: Request, { params }: { params: { category: string } }) {
    const feed = await formatCategoryFeed(({ category }) => category === `/${params.category}`);

    return new Response(feed, {
        headers: {
            "Content-Type": "application/rss+xml; charset=UTF-8",
        },
    });
}

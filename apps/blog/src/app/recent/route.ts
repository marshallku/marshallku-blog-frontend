import { getPosts } from "#utils/post";

export const dynamic = "error";

export async function GET() {
    const posts = getPosts();

    return Response.json(
        posts.slice(0, 6).map((post) => ({
            title: post.data.title,
            uri: `${process.env.NEXT_PUBLIC_BLOG_ORIGIN}${post.slug
                .split("/")
                .map((x) => encodeURIComponent(x))
                .join("/")}`,
            date: post.data.date.posted.toISOString(),
            desc: post.data.description,
        })),
    );
}

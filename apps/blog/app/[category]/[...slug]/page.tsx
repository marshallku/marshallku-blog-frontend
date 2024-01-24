import { getPostBySlug, getPostSlugs } from "#utils";

export const dynamic = "error";

interface PostProps {
    params: {
        category: string;
        slug: string[];
    };
}

export async function generateStaticParams() {
    return getPostSlugs().map((slug) => ({
        category: slug.slice(1).split("/")[0],
        slug: slug.slice(1).split("/").slice(1),
    }));
}

export default async function Post({ params: { category, slug } }: PostProps) {
    const post = getPostBySlug(`${category}/${slug.join("/")}`);

    return <section>{JSON.stringify(post)}</section>;
}

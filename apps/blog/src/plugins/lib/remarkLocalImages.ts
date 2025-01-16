import { mkdirSync, copyFileSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import { POSTS_DIRECTORY, PUBLIC_DIRECTORY } from "#constants";

export default function remarkLocalImages({ slug }: { slug: string }) {
    const postsDir = POSTS_DIRECTORY;
    const publicDir = PUBLIC_DIRECTORY;

    return (tree: Root) => {
        visit(tree, "image", (node) => {
            const imageUrl = node.url || "";

            // Only handle local images (e.g., './images/foo.png')
            if (!imageUrl.startsWith("./")) {
                return;
            }

            // Absolute path to the MDX file
            const mdxFilePath = join(postsDir, slug, "index.mdx");
            // e.g. /Users/you/your-project/posts/hello-world/index.mdx
            const mdxDir = dirname(mdxFilePath);

            // Source image (on disk)
            const sourcePath = join(mdxDir, imageUrl);
            // e.g. /Users/you/your-project/posts/hello-world/images/sample.png

            // Destination within publicDir
            //   -> We figure out a sub-directory by removing postsDir from sourcePath
            //   -> For example, if postsDir = /Users/you/your-project/posts
            //      subPath might be: hello-world/images/sample.png
            const subPath = relative(postsDir, sourcePath);
            // e.g. "hello-world/images/sample.png"

            const targetPath = join(publicDir, "posts", subPath);
            // e.g. /Users/you/your-project/public/posts/hello-world/images/sample.png

            // Ensure the target directory exists
            mkdirSync(dirname(targetPath), { recursive: true });

            // Copy the image
            copyFileSync(sourcePath, targetPath);

            // Rewrite the Markdown image URL
            // so that Next.js serves it from /posts/hello-world/images/sample.png
            node.url = "/posts/" + subPath.replace(/\\/g, "/");
        });
    };
}

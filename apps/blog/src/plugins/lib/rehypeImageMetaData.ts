import { visit } from "unist-util-visit";
import type { Processor } from "unified";
import type { Node } from "unist";
import type { VFile } from "vfile";
import { imageSizeFromFile } from "image-size/fromFile";
import { to } from "@marshallku/utils";
import type { ImageNode } from "#plugins/types";

function isExternalImage(path: string) {
    return path.startsWith("http");
}

async function addImageMetaData(node: ImageNode) {
    const {
        properties: { src },
    } = node;

    if (isExternalImage(src)) {
        return;
    }

    const [error, dimensions] = await to(imageSizeFromFile(`public${decodeURIComponent(src)}`));

    if (error) {
        console.error(error);
        return;
    }

    if (dimensions) {
        node.properties = {
            ...node.properties,
            width: dimensions.width,
            height: dimensions.height,
        };
    }
}

export default function rehypeImageMetaData(this: Processor) {
    return async function transformer(tree: Node, _: VFile) {
        const promises: Promise<void>[] = [];

        visit(tree, "element", (node: ImageNode) => {
            if (node.type === "element" && node.tagName === "img") {
                promises.push(addImageMetaData(node));
            }
        });

        await Promise.all(promises);

        return tree;
    };
}

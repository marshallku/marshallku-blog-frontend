import { visit } from "unist-util-visit";
import type { Processor } from "unified";
import type { Node } from "unist";
import type { VFile } from "vfile";
import { imageSize } from "image-size";
import { unsafe } from "@marshallku/utils";
import type { ImageNode } from "#plugins/types";

function isExternalImage(path: string) {
    return path.startsWith("http");
}

function addImageMetaData(node: ImageNode) {
    const {
        properties: { src },
    } = node;

    if (isExternalImage(src)) {
        return;
    }

    unsafe(() => {
        const dimensions = imageSize(`public${decodeURIComponent(src)}`);

        if (dimensions) {
            node.properties.width = dimensions.width;
            node.properties.height = dimensions.height;
        }
    }, true);
}

export default function rehypeImageMetaData(this: Processor) {
    return async function transformer(tree: Node, _: VFile) {
        visit(tree, "element", (node: ImageNode) => {
            if (node.type === "element" && node.tagName === "img") {
                addImageMetaData(node);
            }
        });

        return tree;
    };
}

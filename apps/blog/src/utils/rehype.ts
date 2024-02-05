import { visit } from "unist-util-visit";
import type { Processor } from "unified";
import type { Node } from "unist";
import type { VFile } from "vfile";
import { imageSize } from "image-size";

interface ImageNode extends Node {
    type: "element";
    tagName: "img";
    properties: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
    };
}

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

    try {
        const dimensions = imageSize(`public${decodeURIComponent(src)}`);

        if (dimensions) {
            node.properties.width = dimensions.width;
            node.properties.height = dimensions.height;
        }
    } catch (err) {
        console.error(`Failed to get image dimensions for ${src}`);
    }
}

export function setImageMetaData(this: Processor) {
    return async function transformer(tree: Node, _: VFile) {
        const imageNodes: ImageNode[] = [];

        visit(tree, "element", (node: ImageNode) => {
            if (node.type === "element" && node.tagName === "img") {
                imageNodes.push(node);
            }
        });

        for (const node of imageNodes) {
            await addImageMetaData(node);
        }

        return tree;
    };
}

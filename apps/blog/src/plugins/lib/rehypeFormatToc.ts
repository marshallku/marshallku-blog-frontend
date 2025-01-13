import { visit } from "unist-util-visit";
import type { Processor } from "unified";
import type { Node } from "unist";
import type { VFile } from "vfile";
import type { ElementNode } from "#plugins/types";

export default function rehypeFormatToc(this: Processor) {
    return async function transformer(tree: Node, _: VFile) {
        let willUpdateToc = false;
        let headingIndex = -1;

        visit(tree, "element", (node: ElementNode, index: number, parent: ElementNode) => {
            if (node.tagName === "h2" && node.properties.id === "table-of-contents") {
                willUpdateToc = true;
                headingIndex = index;
            } else if (willUpdateToc && node.tagName === "ul") {
                parent.children[headingIndex] = {
                    type: "element",
                    tagName: "div",
                    properties: { className: "toc" },
                    children: [
                        {
                            type: "element",
                            tagName: "nav",
                            properties: { className: "toc__container" },
                            children: [
                                {
                                    type: "element",
                                    tagName: "h2",
                                    properties: { id: "table-of-contents" },
                                    children: [{ type: "text", value: "Table of Contents" }],
                                },
                                node,
                            ],
                        },
                    ],
                };
                parent.children.splice(index, 1);
                willUpdateToc = false;
            }
        });
    };
}

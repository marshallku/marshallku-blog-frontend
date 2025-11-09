import { visit } from "unist-util-visit";

import type { ElementNode } from "#plugins/types";
import type { Processor } from "unified";
import type { Node } from "unist";

export default function rehypeFormatToc(this: Processor) {
    return async function transformer(tree: Node) {
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

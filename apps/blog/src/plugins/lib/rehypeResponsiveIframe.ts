import { visit } from "unist-util-visit";
import type { Processor } from "unified";
import type { Node, Parent } from "unist";
import type { VFile } from "vfile";
import type { IframeNode } from "#plugins/types";

function simplifyAspectRatio(width: number, height: number): { width: number; height: number } {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const factor = gcd(width, height);
    return {
        width: width / factor,
        height: height / factor,
    };
}

export default function rehypeResponsiveIframe(this: Processor) {
    return async function transformer(tree: Node, _: VFile) {
        visit(tree, "mdxJsxFlowElement", (node: IframeNode, index, parent: Parent) => {
            if (node.name !== "iframe") {
                return;
            }

            const width = Number(node.attributes.find((attr) => attr.name === "width")?.value || 0);
            const height = Number(node.attributes.find((attr) => attr.name === "height")?.value || 0);
            let className = "iframe-container";

            if (width && height) {
                const ratio = simplifyAspectRatio(width, height);
                className += ` iframe-container--ratio-${ratio.width}-${ratio.height}`;
            }

            const wrapperNode = {
                type: "mdxJsxFlowElement",
                name: "div",
                attributes: [{ type: "mdxJsxAttribute", name: "className", value: className }],
                children: [] as IframeNode[],
            };

            if (parent && Array.isArray(parent.children)) {
                parent.children.splice(index, 1, wrapperNode);
                wrapperNode.children.push(node);
            }
        });
    };
}

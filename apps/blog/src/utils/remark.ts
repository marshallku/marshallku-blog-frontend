import { visit } from "unist-util-visit";
import type { Root } from "mdast";

export function ensureToc() {
    return (tree: Root) => {
        let hasToc = false;

        visit(tree, "heading", (node) => {
            if (node.depth === 1 && "value" in node.children[0] && node.children[0].value === "Table of Contents") {
                hasToc = true;
            }
        });

        if (!hasToc) {
            tree.children.unshift({
                type: "heading",
                depth: 2,
                children: [{ type: "text", value: "Table of Contents" }],
            });
        }
    };
}

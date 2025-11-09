import { visit } from "unist-util-visit";

import type { Root } from "mdast";

export default function remarkEnsureToc() {
    return (tree: Root) => {
        let hasToc = false;
        let hasHeading = false;

        visit(tree, "heading", (node) => {
            hasHeading = true;

            if (node.depth === 1 && "value" in node.children[0] && node.children[0].value === "Table of Contents") {
                hasToc = true;
            }
        });

        if (!hasToc && hasHeading) {
            tree.children.unshift({
                type: "heading",
                depth: 2,
                children: [{ type: "text", value: "Table of Contents" }],
            });
        }
    };
}

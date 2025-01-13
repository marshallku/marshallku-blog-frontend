import type { Node } from "unist";

export interface Text {
    type: "text";
    value: string;
}

export interface ElementNode extends Node {
    type: "element";
    tagName: string;
    properties: Record<string, unknown>;
    children: (Text | ElementNode)[];
}

export interface ImageNode extends Node {
    type: "element";
    tagName: "img";
    properties: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
    };
}

export interface IframeNode extends Node {
    type: "mdxJsxFlowElement";
    name: "iframe";
    attributes: { type: "mdxJsxAttribute"; name: string; value: unknown }[];
}

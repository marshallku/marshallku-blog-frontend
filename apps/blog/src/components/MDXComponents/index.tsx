import type { AnchorHTMLAttributes, DetailedHTMLProps, ImgHTMLAttributes, TableHTMLAttributes } from "react";
import NextLink from "next/link";
import { Icon } from "@marshallku/icon";
import PostImage from "#components/PostImage";

function Link({
    href,
    children,
    ...rest
}: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
    if (!href) {
        return null;
    }

    if (href.startsWith("#")) {
        return (
            <a href={href} {...rest}>
                {children}
            </a>
        );
    }

    if (href.startsWith("http")) {
        return (
            <a className="external-link" href={href} {...rest} target="_blank" rel="noopener noreferrer">
                {children}
                <Icon name="open-in-new" />
            </a>
        );
    }

    return (
        <NextLink data-foo="id" href={href} {...rest}>
            {children}
        </NextLink>
    );
}

const MDXComponents = {
    img: (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => (
        <PostImage {...props} useLowQualityPlaceholder />
    ),
    a: Link,
    table: (props: DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>) => (
        <div className="table">
            <table {...props} />
        </div>
    ),
};

export default MDXComponents;

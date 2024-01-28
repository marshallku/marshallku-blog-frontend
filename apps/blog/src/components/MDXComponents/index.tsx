import { HTMLProps } from "react";
import NextImage from "next/image";
import NextLink from "next/link";

function Image({ src, alt, width, height }: HTMLProps<HTMLImageElement>) {
    if (!src) {
        return null;
    }

    if (src.startsWith("http") || !width || !height) {
        return <img src={src} alt={alt} width={width} height={height} />;
    }

    return <NextImage src={src} alt={alt || ""} width={Number(width)} height={Number(height)} />;
}

function Link({ href, ...rest }: Omit<HTMLProps<HTMLAnchorElement>, "ref">) {
    if (!href) {
        return null;
    }

    if (href.startsWith("#")) {
        return <a href={href} {...rest} />;
    }

    return <NextLink data-foo="id" href={href} {...rest} />;
}

const MDXComponents = {
    img: Image,
    a: Link,
};

export default MDXComponents;

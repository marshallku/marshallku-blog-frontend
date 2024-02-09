import { HTMLProps } from "react";
import NextLink from "next/link";
import { Icon } from "@marshallku/icon";
import CustomImage from "#components/Image";
import PostImage from "#components/PostImage";

function Image({ src, alt, width, height, title }: HTMLProps<HTMLImageElement>) {
    if (!src) {
        return null;
    }

    if (src.includes("lh3.googleusercontent.com")) {
        return (
            <figure>
                <img
                    decoding="async"
                    src={`${src}=w1180`}
                    srcSet={`${src}=w1180 1180w, ${src}=w600 600w, ${src}=w400 400w, ${src}=w1536 1536w, ${src}=w2048 2048w`}
                    sizes="(max-width: 1180px) 100vw, 1180px"
                    alt={alt}
                />
                {title && <figcaption>{title}</figcaption>}
            </figure>
        );
    }

    if (src.startsWith("http") || !width || !height) {
        return <img src={src} alt={alt} width={width} height={height} />;
    }

    return (
        <figure className="image-block">
            <CustomImage src={src} alt={alt || ""} width={width} height={height} />
            {title && <figcaption>{title}</figcaption>}
        </figure>
    );
}

function Link({ href, children, ...rest }: Omit<HTMLProps<HTMLAnchorElement>, "ref">) {
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

    return <NextLink data-foo="id" href={href} children={children} {...rest} />;
}

const MDXComponents = {
    img: PostImage,
    a: Link,
    table: (props: HTMLProps<HTMLTableElement>) => (
        <div className="table">
            <table {...props} />
        </div>
    ),
};

export default MDXComponents;

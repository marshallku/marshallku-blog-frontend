import { type HTMLProps } from "react";

const IMAGE_SIZE = [480, 600, 860, 1180];

function Image({ src, alt, width, height, ...rest }: HTMLProps<HTMLImageElement>) {
    return (
        <img
            src={`${process.env.NEXT_PUBLIC_CDN_URL}${src}`}
            srcSet={
                width && height
                    ? IMAGE_SIZE.filter((size) => size < Number(width))
                          .map((size) => `${process.env.NEXT_PUBLIC_CDN_URL}${src}=w${size} ${size}w`)
                          .join(", ")
                    : undefined
            }
            alt={alt || ""}
            width={width}
            height={height}
            loading="lazy"
            {...rest}
        />
    );
}

export default Image;

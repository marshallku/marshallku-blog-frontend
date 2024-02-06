import { type ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    forceSize?: number;
}

const IMAGE_SIZE = [480, 600, 860, 1180];

function Image({ src, alt, width, height, forceSize, ...rest }: ImageProps) {
    return (
        <img
            src={`${process.env.NEXT_PUBLIC_CDN_URL}${src}${
                forceSize && process.env.NEXT_PUBLIC_CDN_URL !== "" ? `=w${forceSize}` : ""
            }`}
            srcSet={
                width && height && process.env.NEXT_PUBLIC_CDN_URL !== ""
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

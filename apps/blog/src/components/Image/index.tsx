import { type ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    forceSize?: number;
}

const IMAGE_SIZE = [480, 600, 860, 1180];

function Image({ src, alt, width, height, forceSize, ...rest }: ImageProps) {
    const extension = src.split(".").pop();
    const srcWithoutExtension = src.split(".").slice(0, -1).join(".");

    return (
        <img
            src={`${process.env.NEXT_PUBLIC_CDN_URL}${srcWithoutExtension}${
                forceSize && process.env.NEXT_PUBLIC_CDN_URL !== "" ? `.w${forceSize}` : ""
            }.${extension}`}
            srcSet={
                width && height && process.env.NEXT_PUBLIC_CDN_URL !== ""
                    ? IMAGE_SIZE.filter((size) => size < Number(width))
                          .map(
                              (size) =>
                                  `${process.env.NEXT_PUBLIC_CDN_URL}${srcWithoutExtension}.w${size}.${extension} ${size}w`,
                          )
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

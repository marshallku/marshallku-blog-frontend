import { type ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    forceSize?: number;
    disableWebP?: boolean;
}

const IMAGE_SIZE = [480, 600, 860, 1180];

function Image({ src, alt, width, height, forceSize, disableWebP, ...rest }: ImageProps) {
    const extension = src.split(".").pop();
    const srcWithoutExtension = src.split(".").slice(0, -1).join(".");
    const hasCdnUrl = process.env.NEXT_PUBLIC_CDN_URL !== "";

    if (!disableWebP && hasCdnUrl) {
        const sizes = forceSize
            ? [forceSize]
            : width && height
              ? IMAGE_SIZE.filter((size) => size < Number(width))
              : IMAGE_SIZE;

        return (
            <picture>
                {sizes.map((size) => (
                    <source
                        key={`webp-${size}`}
                        type="image/webp"
                        srcSet={`${process.env.NEXT_PUBLIC_CDN_URL}${srcWithoutExtension}.w${size}.${extension}.webp`}
                        media={forceSize ? "" : `(max-width: ${size}px)`}
                    />
                ))}
                {!forceSize && (
                    <source
                        type="image/webp"
                        srcSet={`${process.env.NEXT_PUBLIC_CDN_URL}${srcWithoutExtension}.${extension}.webp`}
                    />
                )}
                {sizes.map((size) => (
                    <source
                        key={size}
                        srcSet={`${process.env.NEXT_PUBLIC_CDN_URL}${srcWithoutExtension}.w${size}.${extension}`}
                        media={forceSize ? "" : `(max-width: ${size}px)`}
                    />
                ))}
                {!forceSize && (
                    <source srcSet={`${process.env.NEXT_PUBLIC_CDN_URL}${srcWithoutExtension}.${extension}`} />
                )}
                <img
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}${srcWithoutExtension}${
                        forceSize ? `.w${forceSize}` : ""
                    }.${extension}`}
                    alt={alt || ""}
                    width={width}
                    height={height}
                    loading="lazy"
                    {...rest}
                />
            </picture>
        );
    }

    return (
        <img
            src={`${process.env.NEXT_PUBLIC_CDN_URL}${srcWithoutExtension}${
                forceSize && hasCdnUrl ? `.w${forceSize}` : ""
            }.${extension}`}
            srcSet={
                width && height && hasCdnUrl
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

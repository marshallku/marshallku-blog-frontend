import { type ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    forceSize?: number;
    disableWebP?: boolean;
    useLowQualityPlaceholder?: boolean;
}

const IMAGE_SIZE = [480, 600, 860, 1180];
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || "";

function Image({ src, alt, width, height, forceSize, disableWebP, useLowQualityPlaceholder, ...rest }: ImageProps) {
    const extension = src.split(".").pop();
    const srcWithoutExtension = src.split(".").slice(0, -1).join(".");
    const hasCdnUrl = CDN_URL !== "";

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
                        srcSet={`${CDN_URL}${srcWithoutExtension}.w${size}.${extension}.webp`}
                        media={forceSize ? "" : `(max-width: ${size}px)`}
                    />
                ))}
                {!forceSize && (
                    <source type="image/webp" srcSet={`${CDN_URL}${srcWithoutExtension}.${extension}.webp`} />
                )}
                {sizes.map((size) => (
                    <source
                        key={size}
                        srcSet={`${CDN_URL}${srcWithoutExtension}.w${size}.${extension}`}
                        media={forceSize ? "" : `(max-width: ${size}px)`}
                    />
                ))}
                {!forceSize && <source srcSet={`${CDN_URL}${srcWithoutExtension}.${extension}`} />}
                <img
                    src={`${CDN_URL}${srcWithoutExtension}${forceSize ? `.w${forceSize}` : ""}.${extension}`}
                    alt={alt || ""}
                    width={width}
                    height={height}
                    loading="lazy"
                    {...rest}
                    style={
                        useLowQualityPlaceholder
                            ? {
                                  backgroundImage: `url(${CDN_URL}${srcWithoutExtension}.w10.${extension})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                              }
                            : {}
                    }
                />
            </picture>
        );
    }

    return (
        <img
            src={`${CDN_URL}${srcWithoutExtension}${forceSize && hasCdnUrl ? `.w${forceSize}` : ""}.${extension}`}
            srcSet={
                width && height && hasCdnUrl
                    ? IMAGE_SIZE.filter((size) => size < Number(width))
                          .map((size) => `${CDN_URL}${srcWithoutExtension}.w${size}.${extension} ${size}w`)
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

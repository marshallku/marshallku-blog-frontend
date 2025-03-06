"use client";

import { useMemo, useState, type ImgHTMLAttributes } from "react";
import { classNames } from "@marshallku/utils";
import styles from "./index.module.scss";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    forceSize?: number;
    disableWebP?: boolean;
    useLowQualityPlaceholder?: boolean;
}

const IMAGE_SIZE = [480, 600, 860, 1180];
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || "";

const cx = classNames(styles, "image");

function Image({ src, alt, width, height, forceSize, disableWebP, useLowQualityPlaceholder, ...rest }: ImageProps) {
    const [srcWithoutExtension, extension] = useMemo(() => {
        const srcWithoutExtension = src.split(".").slice(0, -1).join(".");
        const extension = src.split(".").pop();
        return [srcWithoutExtension, extension];
    }, [src]);
    const hasCdnUrl = CDN_URL !== "";
    const [loaded, setLoaded] = useState(false);

    const handleLoad = () => {
        setLoaded(true);
    };

    if (!disableWebP && hasCdnUrl) {
        const sizes = forceSize
            ? [forceSize]
            : width && height
              ? IMAGE_SIZE.filter((size) => size < Number(width))
              : IMAGE_SIZE;

        return (
            <picture className={cx()}>
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
                                  filter: loaded ? "none" : "blur(20px)",
                                  ...rest.style,
                              }
                            : rest.style
                    }
                    className={cx("__image", useLowQualityPlaceholder && "__image--placeholder", {
                        className: rest.className,
                    })}
                    onLoad={handleLoad}
                    onError={handleLoad}
                    ref={(imageRef) => {
                        if (imageRef?.complete) {
                            handleLoad();
                        }
                    }}
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

"use client";

import { ImgHTMLAttributes, useEffect, useRef } from "react";
import { classNames, tryParseUrl } from "@marshallku/utils";
import useZoom from "#hooks/useZoom";
import styles from "./index.module.scss";
import PostBlobImage from "#components/PostBlobImage";

const IMAGE_SIZE = [480, 600, 860, 1180, 1536, 2048];
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || "";

export interface PostImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    useLowQualityPlaceholder?: boolean;
}

const cx = classNames(styles, "post-image");

function PostImage({ useLowQualityPlaceholder = true, src, title, alt, width, height, ...rest }: PostImageProps) {
    const imageRef = useRef<HTMLImageElement>(null);
    const { attach, detach } = useZoom();
    const isBlob = typeof src === "object" && src instanceof Blob;

    useEffect(() => {
        if (!imageRef.current) {
            return;
        }

        const { current: image } = imageRef;

        attach(image);

        return () => {
            detach(image);
        };
    }, [attach, detach]);

    if (!src) {
        return null;
    }

    if (isBlob) {
        return (
            <figure>
                <PostBlobImage src={src} alt={alt} />
            </figure>
        );
    }

    const url = tryParseUrl(src);

    if (url?.hostname === "https://lh3.googleusercontent.com") {
        return (
            <figure className={cx()}>
                <img
                    ref={imageRef}
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
        return <img ref={imageRef} src={src} alt={alt} width={width} height={height} />;
    }

    const extension = src.split(".").pop();
    const srcWithoutExtension = src.split(".").slice(0, -1).join(".");
    const hasCdnUrl = CDN_URL !== "";
    const sizes = hasCdnUrl ? IMAGE_SIZE.filter((size) => size <= Number(width)) : [];

    return (
        <figure className={cx("", { className: "image-block" })}>
            <picture>
                {sizes.map((size) => (
                    <source
                        key={`webp-${size}`}
                        type="image/webp"
                        srcSet={`${CDN_URL}${srcWithoutExtension}.w${size}.${extension}.webp`}
                        media={`(max-width: ${size}px)`}
                    />
                ))}
                {hasCdnUrl && (
                    <source type="image/webp" srcSet={`${CDN_URL}${srcWithoutExtension}.${extension}.webp`} />
                )}
                {sizes.map((size) => (
                    <source
                        key={size}
                        srcSet={`${CDN_URL}${srcWithoutExtension}.w${size}.${extension}`}
                        media={`(max-width: ${size}px)`}
                    />
                ))}
                <source srcSet={`${CDN_URL}${srcWithoutExtension}.${extension}`} />
                <img
                    ref={imageRef}
                    src={`${CDN_URL}${src}`}
                    alt={alt || ""}
                    width={width}
                    height={height}
                    loading="lazy"
                    crossOrigin="anonymous"
                    {...rest}
                    style={
                        useLowQualityPlaceholder && hasCdnUrl
                            ? {
                                  backgroundImage: `url(${CDN_URL}${srcWithoutExtension}.w10.${extension})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                              }
                            : undefined
                    }
                />
            </picture>
            {title && <figcaption>{title}</figcaption>}
        </figure>
    );
}

export default PostImage;

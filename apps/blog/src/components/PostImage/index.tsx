"use client";

import { ImgHTMLAttributes, useEffect, useRef } from "react";
import { classNames } from "@marshallku/utils";
import useZoom from "#hooks/useZoom";
import styles from "./index.module.scss";

const IMAGE_SIZE = [480, 600, 860, 1180, 1536, 2048];

const cx = classNames(styles, "post-image");

function PostImage({ src, title, alt, width, height, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
    const imageRef = useRef<HTMLImageElement>(null);
    const { attach, detach } = useZoom();

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

    if (src.includes("lh3.googleusercontent.com")) {
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

    return (
        <figure className={cx("", { className: "image-block" })}>
            <img
                ref={imageRef}
                src={`${process.env.NEXT_PUBLIC_CDN_URL}${src}`}
                srcSet={
                    width && height && process.env.NEXT_PUBLIC_CDN_URL !== ""
                        ? [...IMAGE_SIZE, Number(width)]
                              .filter((size) => size <= Number(width))
                              .map(
                                  (size) =>
                                      `${process.env.NEXT_PUBLIC_CDN_URL}${srcWithoutExtension}${
                                          size === Number(width) ? "" : `.w${size}`
                                      }.${extension} ${size}w`,
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
            {title && <figcaption>{title}</figcaption>}
        </figure>
    );
}

export default PostImage;

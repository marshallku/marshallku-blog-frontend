"use client";

import { type ReactNode, useEffect, useState } from "react";
import { classNames, randomInRange } from "@marshallku/utils";
import styles from "./index.module.scss";

interface BlogBannerProps {
    children: ReactNode;
}

const cx = classNames(styles, "blog-banner");

function BlogBanner({ children }: BlogBannerProps) {
    const [items, setItems] = useState<
        {
            cx: number;
            cy: number;
            r: number;
            fill: string;
        }[]
    >([]);

    useEffect(() => {
        setItems(
            Array.from({ length: 15 }).map(() => ({
                cx: randomInRange(100, 1100),
                cy: randomInRange(100, 300),
                r: randomInRange(50, 100),
                fill: `url(#gradient${randomInRange(1, 3)})`,
            })),
        );
    }, []);

    return (
        <figure className={cx()}>
            <svg
                width="1200"
                height="400"
                viewBox="0 0 1200 400"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                className={cx("__image")}
            >
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#4f46e5", stopOpacity: 0.7 }} />
                        <stop offset="100%" style={{ stopColor: "#7c3aed", stopOpacity: 0.5 }} />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#2563eb", stopOpacity: 0.6 }} />
                        <stop offset="100%" style={{ stopColor: "#4f46e5", stopOpacity: 0.4 }} />
                    </linearGradient>

                    <radialGradient id="gradient3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" style={{ stopColor: "#6366f1", stopOpacity: 0.6 }} />
                        <stop offset="100%" style={{ stopColor: "#3b82f6", stopOpacity: 0.3 }} />
                    </radialGradient>
                </defs>
                {items.map(({ cx: x, cy: y, r, fill }, index) => (
                    <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r={r}
                        fill={fill}
                        className={cx("__circle")}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    />
                ))}
            </svg>
            {children}
        </figure>
    );
}

BlogBanner.displayName = "BlogBanner";

export default BlogBanner;

"use client";

import { useEffect, useRef } from "react";
import { classNames } from "@marshallku/utils";
import styles from "./index.module.scss";

const cx = classNames(styles, "global-navigation-background");

function GlobalNavigationBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) {
                return;
            }

            const { scrollY } = window;
            const { current: container } = containerRef;

            container.style.opacity = scrollY > 0 ? "1" : "0";
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return <div className={cx()} ref={containerRef} />;
}

export default GlobalNavigationBackground;

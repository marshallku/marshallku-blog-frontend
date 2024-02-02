"use client";

import { useEffect, useRef } from "react";
import { classNames } from "@marshallku/utils";
import { Icon } from "@marshallku/icon";
import { useScroll } from "#hooks";
import styles from "./index.module.scss";

export interface TopButtonProps {}

const cx = classNames(styles, "top-button");

function TopButton({}: TopButtonProps) {
    const { scroll } = useScroll();
    const progressRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const { current: progressElement } = progressRef;
        const handleScroll = () => {
            if (!progressElement) {
                return;
            }

            const circle = progressElement.querySelector("circle");

            if (!circle) {
                return;
            }

            const { scrollY: currentScroll } = window;
            const radius = circle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (currentScroll / documentHeight) * circumference;

            progressElement.style.strokeDasharray = `${circumference} ${circumference}`;
            progressElement.style.strokeDashoffset = `${circumference - scrollProgress}`;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <button
            className={cx()}
            type="button"
            onClick={() => {
                scroll(0);
            }}
        >
            <Icon name="arrow-upward" />
            <svg className={cx("__progress")} width="30" height="30" ref={progressRef}>
                <circle cx="15" cy="15" r="14" />
            </svg>
        </button>
    );
}

export default TopButton;

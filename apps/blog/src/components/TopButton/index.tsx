"use client";

import { useEffect, useRef } from "react";
import { classNames } from "@marshallku/utils";
import { Icon } from "@marshallku/icon";
import useScroll from "#hooks/useScroll";
import styles from "./index.module.scss";

const cx = classNames(styles, "top-button");

function TopButton() {
    const { scroll } = useScroll();
    const progressRef = useRef<SVGSVGElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const circumference = useRef(0);

    useEffect(() => {
        const { current: progressElement } = progressRef;
        const { current: buttonElement } = buttonRef;
        const handleScroll = () => {
            if (!progressElement || !buttonElement) {
                return;
            }

            const { scrollY: currentScroll } = window;

            buttonElement.style.opacity = currentScroll <= 0 ? "0" : "1";

            const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (currentScroll / documentHeight) * circumference.current;

            progressElement.style.strokeDasharray = `${circumference.current} ${circumference.current}`;
            progressElement.style.strokeDashoffset = `${circumference.current - scrollProgress}`;
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
            ref={buttonRef}
            style={{ opacity: "0" }}
        >
            <Icon name="arrow-upward" />
            <svg className={cx("__progress")} width="30" height="30" ref={progressRef}>
                <circle
                    cx="15"
                    cy="15"
                    r="14"
                    ref={(element) => {
                        if (element) {
                            circumference.current = element.r.baseVal.value * 2 * Math.PI;
                        }
                    }}
                />
            </svg>
        </button>
    );
}

export default TopButton;

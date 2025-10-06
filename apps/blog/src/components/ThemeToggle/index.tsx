"use client";

import { classNames } from "@marshallku/utils";
import styles from "./index.module.scss";

const THEMES = ["light", "sepia", "dark"] as const;

const cx = classNames(styles, "theme-toggle");

function ThemeToggle() {
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") as (typeof THEMES)[number];
        const nextTheme = THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length];

        document.documentElement.setAttribute("data-theme", nextTheme);
        document.documentElement.style.colorScheme = nextTheme === "dark" ? "dark" : "light";

        const userPrefersTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        if (userPrefersTheme !== nextTheme) {
            localStorage.setItem("theme", nextTheme);
        }
    };

    return (
        <button type="button" className={cx()} aria-label="테마 토글" title="테마 토글" onClick={toggleTheme}>
            <svg
                className={cx("__icon")}
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                x="0"
                y="0"
                viewBox="0 0 20 20"
                width="30"
                height="30"
            >
                <circle className={cx("__ray")} cx="10" cy="10" r="6" />
                <circle className={cx("__sun")} cx="10" cy="10" r="6" />
                <g className={cx("__rays")}>
                    <circle cx="2" cy="10" r="1" />
                    <circle cx="10" cy="18" r="1" />
                    <circle cx="18" cy="10" r="1" />
                    <circle cx="10" cy="2" r="1" />
                    <circle cx="4" cy="4" r="1" />
                    <circle cx="16" cy="4" r="1" />
                    <circle cx="16" cy="16" r="1" />
                    <circle cx="4" cy="16" r="1" />
                </g>
                <path
                    d="M10,4C7.8,4,5.8,5.2,4.8,7c0.9-0.6,2-0.9,3.2-0.9c3.3,0,6,2.7,6,6c0,1.1-0.3,2.1-0.8,3C14.9,14,16,12.1,16,10 C16,6.7,13.3,4,10,4z"
                    className={cx("__moon")}
                />
            </svg>
        </button>
    );
}

export default ThemeToggle;

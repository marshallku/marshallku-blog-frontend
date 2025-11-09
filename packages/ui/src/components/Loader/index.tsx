import { classNames } from "@marshallku/utils";
import { type CSSProperties } from "react";

import styles from "./index.module.scss";

export interface LoaderProps {
    className?: string;
    /**
     * Diameter of the loader in pixels
     *
     * default: 150
     */
    size?: number;
    /**
     * Boolean indicating the direction of spinning
     *
     * default: true
     */
    clockwise?: boolean;
    /**
     * Thickness of the loader stroke in pixels
     *
     * default: 5
     */
    strokeWidth?: number;
}

const cx = classNames(styles, "loader");

function Loader({ className = "", size = 150, clockwise = true, strokeWidth = 5 }: LoaderProps) {
    const radius = (size - strokeWidth) / 2;
    const fullRadius = size / 2;
    const circumference = radius * 2 * Math.PI;

    return (
        <svg
            className={cx("", clockwise && "--clockwise", { className })}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            // Browsers do not start SVG animations until the entire page has fully loaded.
            // So I used CSS animations instead SVG `<animate>` elements to overcome this limitation.
            style={
                {
                    "--spinner-size": `${size}px`,
                    "--spinner-stroke-width": `${strokeWidth}px`,
                    "--radius": `${radius}px`,
                    "--full-radius": `${fullRadius}px`,
                    "--circumference": `${circumference}px`,
                } as CSSProperties
            }
        >
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                className={cx("__spinner")}
            />
        </svg>
    );
}

export default Loader;

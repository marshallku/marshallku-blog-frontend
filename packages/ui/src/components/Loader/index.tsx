import { classNames } from "@marshallku/utils";
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
    const rotationDirection = clockwise ? 1 : -1;

    return (
        <svg className={cx("", { className })} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
                cx={fullRadius}
                cy={fullRadius}
                r={radius}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                strokeLinecap="round"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    from={circumference * rotationDirection}
                    to={-circumference * rotationDirection}
                    dur="1.5s"
                    repeatCount="indefinite"
                />
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 ${fullRadius} ${fullRadius}`}
                    to={`${360 * rotationDirection} ${fullRadius} ${fullRadius}`}
                    dur="2s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
}

export default Loader;

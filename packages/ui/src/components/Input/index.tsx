import { type InputHTMLAttributes, type FocusEvent, ReactNode, forwardRef, useRef } from "react";
import { classNames } from "@marshallku/utils";
import Typography from "../Typography";
import styles from "./index.module.scss";

type InputVariant = "line" | "box";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant;
    label?: string;
    children?: ReactNode;
    /** Callback when input is focused for the first time */
    onFirstFocus?: (event: FocusEvent<HTMLInputElement, Element>) => void;
}

const cx = classNames(styles, "input");

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, variant = "box", children, onFirstFocus, ...props }, ref) => {
        const focused = useRef(false);
        return (
            <label className={cx("", `--${variant}`, children && "--has-child", { className })}>
                {!!label && (
                    <Typography variant="c1" className={cx("__label")} component="div">
                        {label}
                    </Typography>
                )}
                <input
                    className={cx("__input")}
                    {...props}
                    ref={ref}
                    onFocus={(event) => {
                        if (!focused.current) {
                            focused.current = true;
                            onFirstFocus?.(event);
                        }
                        props.onFocus?.(event);
                    }}
                />
                {children && <div className={cx("__children")}>{children}</div>}
            </label>
        );
    },
);

Input.displayName = "Input";

export default Input;

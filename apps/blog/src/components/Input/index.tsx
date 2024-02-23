import { InputHTMLAttributes, forwardRef } from "react";
import { classNames } from "@marshallku/utils";
import Typography from "#components/Typography";
import styles from "./index.module.scss";

type InputVariant = "line" | "box";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant;
    label?: string;
}

const cx = classNames(styles, "input");

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, variant = "box", ...props }, ref) => {
    return (
        <label className={cx("", `--${variant}`, { className })}>
            {label && (
                <Typography variant="c1" className={cx("__label")} component="div">
                    {label}
                </Typography>
            )}
            <input className={cx("__input")} {...props} ref={ref} />
        </label>
    );
});

export default Input;

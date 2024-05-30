import { TextareaHTMLAttributes, forwardRef } from "react";
import { classNames } from "@marshallku/utils";
import Typography from "../Typography";
import styles from "./index.module.scss";

type TextareaVariant = "line" | "box";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: TextareaVariant;
    label?: string;
}

const cx = classNames(styles, "textarea");

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, variant = "box", ...props }, ref) => {
        return (
            <label className={cx("", `--${variant}`, { className })}>
                {label && (
                    <Typography variant="c1" className={cx("__label")} component="div">
                        {label}
                    </Typography>
                )}
                <textarea className={cx("__textarea")} {...props} ref={ref} />
            </label>
        );
    },
);

export default Textarea;

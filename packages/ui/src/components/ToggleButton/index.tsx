import { ButtonHTMLAttributes, forwardRef } from "react";
import { classNames } from "@marshallku/utils";
import styles from "./index.module.scss";

export interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * If true, the button will be in selected state
     */
    selected?: boolean;
    /**
     * If true, the button will be disabled
     */
    disabled?: boolean;
    /**
     * The value of the button
     */
    value: string | number;
}

const cx = classNames(styles, "toggle-button");

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
    ({ selected, disabled, children, value, className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                className={cx("", { "--selected": selected, "--disabled": disabled })}
                disabled={disabled}
                value={value}
                {...props}
            >
                {children}
            </button>
        );
    },
);

ToggleButton.displayName = "ToggleButton";

export default ToggleButton;

import { ButtonHTMLAttributes, forwardRef } from "react";
import { classNames } from "@marshallku/utils";
import styles from "./index.module.scss";
import Button from "../Button";

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
            <Button
                ref={ref}
                size="small"
                variant="text"
                radius="square"
                className={cx("", { "--selected": selected, "--disabled": disabled })}
                disabled={disabled}
                value={value}
                {...props}
            >
                {children}
            </Button>
        );
    },
);

ToggleButton.displayName = "ToggleButton";

export default ToggleButton;

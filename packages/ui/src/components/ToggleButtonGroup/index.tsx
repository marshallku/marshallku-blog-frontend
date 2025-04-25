"use client";

import { Children, ReactElement, cloneElement, useCallback, useState } from "react";
import { type ToggleButtonProps } from "../ToggleButton";
import styles from "./index.module.scss";
import { classNames } from "@marshallku/utils";

export interface ToggleButtonGroupProps<T extends string | number | (string | number)[]> {
    /**
     * The currently selected value in the group
     */
    value?: T;
    /**
     * Callback fired when the value changes
     */
    onChange?: (value: T) => void;
    /**
     * If true, multiple buttons can be selected
     */
    multiple?: boolean;
    /**
     * If true, at least one button must be selected
     */
    enforceValueSet?: boolean;
    /**
     * Additional class name for the root element
     */
    className?: string;
    /**
     * The content of the component
     */
    children: ReactElement<ToggleButtonProps> | ReactElement<ToggleButtonProps>[];
}

const cx = classNames(styles, "toggle-button-group");

function ToggleButtonGroup<T extends string | number | (string | number)[]>({
    children,
    value,
    onChange,
    multiple = false,
    enforceValueSet = true,
    className,
    ...props
}: ToggleButtonGroupProps<T>) {
    const [internalValue, setInternalValue] = useState<(string | number)[]>(
        multiple
            ? Array.isArray(value)
                ? (value as string[] | number[])
                : value != null
                  ? [value]
                  : []
            : value != null
              ? [value as string | number]
              : [],
    );

    const handleChange = useCallback(
        (buttonValue: string | number) => {
            const getSelectedValues = () => {
                if (multiple) {
                    if (internalValue.includes(buttonValue)) {
                        if (enforceValueSet && internalValue.length === 1) {
                            return internalValue;
                        }

                        return internalValue.filter((v) => v !== buttonValue);
                    }

                    return [...internalValue, buttonValue];
                }

                if (internalValue.includes(buttonValue)) {
                    if (enforceValueSet && internalValue.length === 1) {
                        return internalValue;
                    }

                    return [];
                }

                return [buttonValue];
            };

            const newValue = getSelectedValues();

            setInternalValue(newValue);
            onChange?.(multiple ? (newValue as T) : (newValue[0] as T));
        },
        [onChange, multiple, enforceValueSet, internalValue],
    );

    return (
        <div {...props} className={cx("", { className })}>
            {Children.map(children, (child) => {
                if (!child) return null;

                return cloneElement(child, {
                    selected: internalValue.includes(child.props.value),
                    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                        child.props.onClick?.(e);
                        handleChange(child.props.value);
                    },
                });
            })}
        </div>
    );
}

ToggleButtonGroup.displayName = "ToggleButtonGroup";

export default ToggleButtonGroup;

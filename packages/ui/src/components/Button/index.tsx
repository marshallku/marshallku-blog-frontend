"use client";

import { type ButtonHTMLAttributes, type ReactNode, createElement, useMemo } from "react";
import { classNames } from "@marshallku/utils";
import Typography, { type TypographyProps } from "../Typography";
import styles from "./index.module.scss";

export type ButtonSize = "large" | "medium" | "small";
export type ButtonVariant = "base" | "text" | "primary" | "secondary" | "outline";
export type ButtonRadius = "square" | "rounded" | "capsule" | "circle";
export type ButtonResizing = "hug" | "fill";

export type ButtonProps<T extends object = Record<never, never>> = ButtonHTMLAttributes<HTMLButtonElement> & {
    component?(props: T): ReactNode;
    /**
     * Size of the padding and font
     *
     * default: `large`
     */
    size?: ButtonSize;
    /**
     * Style of the button
     *
     * default: `secondary`
     */
    variant?: ButtonVariant;
    /**
     * Corner radius
     *
     * default: `rounded`
     */
    radius?: ButtonRadius;
    /**
     * Horizontal width
     *
     * default: `hug`
     */
    horizontalResizing?: ButtonResizing;
    className?: string;
    children: ReactNode;
} & T;

const cx = classNames(styles, "button");

function Button<T extends object, P>({
    component,
    size = "medium",
    variant = "secondary",
    radius = "rounded",
    horizontalResizing = "hug",
    className,
    type = "button",
    disabled,
    children,
    ...props
}: ButtonProps<T>): React.ReactElement<T, string | React.JSXElementConstructor<P>> {
    const typographyVariant: TypographyProps["variant"] = useMemo(() => {
        if (size === "medium") {
            return "b2";
        }

        if (size === "small") {
            return "c1";
        }

        return "b1";
    }, [size]);

    return createElement(
        component ?? "button",
        {
            className: cx(
                "",
                `--size-${size}`,
                `--variant-${variant}`,
                `--radius-${radius}`,
                `--resizing-${horizontalResizing}`,
                disabled && "--disabled",
                {
                    className,
                },
            ),
            type,
            disabled,
            ...props,
        } as T,
        variant === "base" || typeof children !== "string" ? (
            children
        ) : (
            <Typography component="span" variant={typographyVariant}>
                {children}
            </Typography>
        ),
    );
}

Button.displayName = "Button";

export default Button;

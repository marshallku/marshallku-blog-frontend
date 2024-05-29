import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./index.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function Button({ children, ...other }: ButtonProps): JSX.Element {
    return (
        <button type="button" className={styles.button} {...other}>
            {children}
        </button>
    );
}

Button.displayName = "Button";

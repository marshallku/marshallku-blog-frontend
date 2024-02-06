import { classNames } from "@marshallku/utils";
import styles from "./index.module.scss";

export interface HamburgerProps {
    className?: string;
    opened?: boolean;
    animationOnHover?: boolean;
    direction?: "left" | "right";
    onClick?(): void;
}

const cx = classNames(styles, "hamburger");

function Hamburger({ className, opened, animationOnHover, direction = "right", onClick }: HamburgerProps) {
    return (
        <button
            type="button"
            className={cx("", animationOnHover && "--animate", opened && "--opened", `--${direction}`, { className })}
            onClick={onClick}
        >
            <div className={cx("__line", "__line--top")} />
            <div className={cx("__line", "__line--middle")} />
            <div className={cx("__line", "__line--bottom")} />
            <span className="sr-only">{opened ? "메뉴 닫기" : "메뉴 열기"}</span>
        </button>
    );
}

export default Hamburger;

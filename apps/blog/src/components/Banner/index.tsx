import { ReactNode } from "react";
import { classNames } from "@marshallku/utils";
import styles from "./index.module.scss";

export interface BannerProps {
    title: string;
    coverImage: string;
    children?: ReactNode;
}

const cx = classNames(styles, "banner");

function Banner({ title, coverImage, children }: BannerProps) {
    return (
        <header className={cx("__header")}>
            <figure className={cx("__cover")}>
                <img src={coverImage} alt={title} />
            </figure>
            {children && <div className={cx("__content")}>{children}</div>}
        </header>
    );
}

export default Banner;

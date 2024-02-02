import Link from "next/link";
import { Icon } from "@marshallku/icon";
import { classNames } from "@marshallku/utils";
import { Logo, ThemeToggle, Typography } from "#components";
import { getCategories } from "#utils";
import styles from "./index.module.scss";

const cx = classNames(styles, "global-navigation");

function GlobalNavigation() {
    return (
        <nav className={cx()}>
            <div className={cx("__container")}>
                <div className={cx("__left")}>
                    <Link href="/">
                        <Logo animationOnHover forceWhiteColor />
                    </Link>
                </div>
                <div className={cx("__center")}>
                    <ul className={cx("__category")}>
                        {getCategories().map(({ slug, name, icon, color }) => (
                            <li key={slug}>
                                {icon && <Icon name={icon} color={color} />}
                                <Typography variant="b2" component="span" fontWeight={700}>
                                    <Link href={slug}>{name}</Link>
                                </Typography>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={cx("__right")}>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}

export default GlobalNavigation;

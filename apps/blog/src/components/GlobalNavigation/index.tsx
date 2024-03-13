import Link from "next/link";
import { Icon } from "@marshallku/icon";
import { classNames } from "@marshallku/utils";
import Drawer from "#components/Drawer";
import Logo from "#components/Logo";
import ThemeToggle from "#components/ThemeToggle";
import Typography from "#components/Typography";
import GlobalNavigationBackground from "#components/GlobalNavigationBackground";
import { getCategories } from "#utils/post";
import styles from "./index.module.scss";

const cx = classNames(styles, "global-navigation");

function GlobalNavigation() {
    return (
        <nav className={cx()}>
            <div className={cx("__container")}>
                <div className={cx("__left")}>
                    <Drawer />
                    <Link href="/" className={cx("__logo")}>
                        <Logo animationOnHover forceWhiteColor />
                        <span className="sr-only">홈으로 이동</span>
                    </Link>
                </div>
                <div className={cx("__center")}>
                    <ul className={cx("__category")}>
                        {getCategories().map(({ slug, name, icon, color }) => (
                            <li key={slug}>
                                {icon && <Icon name={icon} color={color} />}
                                <Typography variant="b2" component="span" fontWeight={700}>
                                    <Link href={slug} prefetch={false}>
                                        {name}
                                    </Link>
                                </Typography>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={cx("__right")}>
                    <ThemeToggle />
                </div>
            </div>
            <GlobalNavigationBackground />
        </nav>
    );
}

export default GlobalNavigation;

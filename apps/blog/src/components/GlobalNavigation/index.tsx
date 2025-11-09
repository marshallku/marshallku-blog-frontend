import { Icon } from "@marshallku/icon";
import Typography from "@marshallku/ui/Typography";
import { classNames } from "@marshallku/utils";
import Link from "next/link";

import styles from "./index.module.scss";

import Drawer from "#components/Drawer";
import GlobalNavigationBackground from "#components/GlobalNavigationBackground";
import Logo from "#components/Logo";
import ThemeToggle from "#components/ThemeToggle";
import { getCategories } from "#utils/post";

const cx = classNames(styles, "global-navigation");

const NAVIGATION = [
    { path: "/", name: "Home" },
    { name: "Categories", subMenu: getCategories() } as const,
    { path: "/about", name: "About" },
    { path: "/guestbook", name: "Guestbook" },
];

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
                        {NAVIGATION.map(({ path, name, subMenu }) => (
                            <li key={name} className={cx("__item", subMenu && "__item--has-sub-menu")}>
                                <Typography variant="b2" component="span" fontWeight={500}>
                                    {path ? (
                                        <Link href={path} prefetch={false}>
                                            {name}
                                        </Link>
                                    ) : (
                                        name
                                    )}
                                    {subMenu && (
                                        <ul>
                                            {subMenu.map(({ name, slug, icon, color }) => (
                                                <li key={slug}>
                                                    <Typography variant="b2" component="span" fontWeight={500}>
                                                        <Link href={slug} prefetch={false}>
                                                            {icon && <Icon name={icon} color={color} />}
                                                            {name}
                                                        </Link>
                                                    </Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
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

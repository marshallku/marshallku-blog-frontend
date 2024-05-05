import Link from "next/link";
import { classNames } from "@marshallku/utils";
import Drawer from "#components/Drawer";
import Logo from "#components/Logo";
import ThemeToggle from "#components/ThemeToggle";
import Typography from "#components/Typography";
import GlobalNavigationBackground from "#components/GlobalNavigationBackground";
import styles from "./index.module.scss";

const cx = classNames(styles, "global-navigation");

const NAVIGATION = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/guestbook", name: "Guestbook" },
] as const;

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
                        {NAVIGATION.map(({ path, name }) => (
                            <li key={path}>
                                <Typography variant="b2" component="span" fontWeight={700}>
                                    <Link href={path} prefetch={false}>
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

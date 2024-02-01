import Link from "next/link";
import { Icon } from "@marshallku/icon";
import { classNames } from "@marshallku/utils";
import { Logo, ThemeToggle } from "#components";
import { getCategorySlugs, getCategoryBySlug } from "#utils";
import styles from "./index.module.scss";

export interface GlobalNavigationProps {}

const cx = classNames(styles, "global-navigation");

function GlobalNavigation({}: GlobalNavigationProps) {
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
                        {getCategorySlugs()
                            .map((category) => ({
                                slug: category,
                                ...getCategoryBySlug(category)!,
                            }))
                            .filter(({ hidden }) => hidden === false)
                            .map(({ slug, name, icon, color }) => (
                                <li key={slug}>
                                    {icon && <Icon name={icon} color={color} />}
                                    <Link href={slug}>{name}</Link>
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

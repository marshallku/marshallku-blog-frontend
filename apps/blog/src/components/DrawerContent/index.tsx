"use client";

import Link from "next/link";
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction, Suspense, useCallback, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Icon, IconProps } from "@marshallku/icon";
import { classNames } from "@marshallku/utils";
import Hamburger from "#components/Hamburger";
import DrawerComment from "#components/DrawerComment";
import DrawerCommentSkeleton from "#components/DrawerComment/Skeleton";
import styles from "./index.module.scss";

interface DrawerContentProps {
    opened: boolean;
    willClose: boolean;
    setWillClose: Dispatch<SetStateAction<boolean>>;
    closeDrawer(): void;
}

const CATEGORIES = [
    { slug: "/dev", name: "개발", icon: "code-blocks", color: "#66b3ff" },
    { slug: "/work", name: "작업물", icon: "package", color: "#b37700" },
    { slug: "/chat", name: "잡담", icon: "chat-bubble", color: "#ffdb4d" },
    { slug: "/gallery", name: "갤러리", icon: "photo-camera", color: "#ff4d4d" },
    { slug: "/others", name: "기타", icon: "category", color: "#999" },
] as const;

const cx = classNames(styles, "drawer-content");

const List = ({
    icon,
    text,
    href,
    color,
    children,
    close,
}: {
    icon: IconProps["name"];
    text: string;
    href: string;
    color?: IconProps["color"];
    close?(): void;
    children?: ReactNode;
}) => (
    <li>
        <Link href={href} onClick={close} prefetch={false}>
            <Icon name={icon} color={color} />
            {text}
        </Link>
        {children}
    </li>
);

function DrawerContent({ opened, closeDrawer, willClose, setWillClose }: DrawerContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => {
        containerRef.current?.addEventListener("animationend", closeDrawer, { once: true, passive: true });
        setWillClose(true);
    }, [closeDrawer, setWillClose]);

    const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
        (e) => {
            if (e.target === containerRef.current) {
                close();
            }
        },
        [close],
    );

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className={cx("", opened && "--opened", willClose && "--close")} ref={containerRef} onClick={handleClick}>
            <Hamburger onClick={close} opened={!willClose} className={cx("__hamburger")} />
            <div className={cx("__content")}>
                <nav className={cx("__nav")}>
                    <ul className={cx("__item")}>
                        <List icon="home" text="Home" href="/" close={close} />
                        <List icon="notifications" text="Notice" href="/notice" close={close} />
                        <List icon="edit" text="About" href="/about" close={close} />
                        <List icon="tag" text="Tags" href="/tags" close={close} />
                        <List icon="mail" text="Guestbook" href="/guestbook" close={close} />
                    </ul>
                    <ul className={cx("__item")}>
                        {CATEGORIES.map(({ slug, name, icon, color }) => (
                            <List key={slug} icon={icon} text={name} href={slug} color={color} close={close}>
                                <a href={`${slug}/feed`} target="_blank" rel="noopener noreferrer">
                                    <Icon name="rss" />
                                    <span className="sr-only">피드 확인</span>
                                </a>
                            </List>
                        ))}
                    </ul>
                </nav>
                <ErrorBoundary fallback={<DrawerCommentSkeleton />}>
                    <Suspense fallback={<DrawerCommentSkeleton />}>
                        <DrawerComment closeDrawer={close} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    );
}

export default DrawerContent;

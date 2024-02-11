"use client";

import Link from "next/link";
import { Dispatch, MouseEventHandler, SetStateAction, useCallback, useRef } from "react";
import { Icon, IconProps } from "@marshallku/icon";
import { classNames } from "@marshallku/utils";
import Hamburger from "#components/Hamburger";
import styles from "./index.module.scss";

interface DrawerContentProps {
    opened: boolean;
    willClose: boolean;
    setWillClose: Dispatch<SetStateAction<boolean>>;
    closeDrawer(): void;
}

const cx = classNames(styles, "drawer-content");

function DrawerContent({ opened, closeDrawer, willClose, setWillClose }: DrawerContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => {
        containerRef.current?.addEventListener("animationend", closeDrawer, { once: true, passive: true });
        setWillClose(true);
    }, [closeDrawer, setWillClose]);

    const handleClick: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        if (e.target === containerRef.current) {
            close();
        }
    }, [close]);

    const List = useCallback(
        ({
            icon,
            text,
            href,
            color,
        }: {
            icon: IconProps["name"];
            text: string;
            href: string;
            color?: IconProps["color"];
        }) => (
            <li>
                <Link href={href} onClick={close}>
                    <Icon name={icon} color={color} />
                    {text}
                </Link>
            </li>
        ),
        [close],
    );

    return (
        <div className={cx("", opened && "--opened", willClose && "--close")} ref={containerRef} onClick={handleClick}>
            <Hamburger onClick={close} opened={!willClose} className={cx("__hamburger")} />
            <nav className={cx("__nav")}>
                <ul className={cx("__item")}>
                    <List icon="home" text="Home" href="/" />
                    <List icon="notifications" text="Notice" href="/notice" />
                    <List icon="tag" text="Tags" href="/tags" />
                </ul>
                <ul className={cx("__item")}>
                    <List icon="code-blocks" text="개발" href="/dev" color="#66b3ff" />
                    <List icon="package" text="작업물" href="/work" color="#b37700" />
                    <List icon="chat-bubble" text="잡담" href="/chat" color="#ffdb4d" />
                    <List icon="photo-camera" text="갤러리" href="/gallery" color="#ff4d4d" />
                    <List icon="category" text="기타" href="/others" color="#999" />
                </ul>
            </nav>
        </div>
    );
}

export default DrawerContent;

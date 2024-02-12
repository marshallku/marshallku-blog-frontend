"use client";

import { useEffect, useState } from "react";
import { toURL } from "#utils/url";

const AVATAR_SIZE = 40;

export interface CommentAvatarProps {
    name: string;
    url?: string;
    postAuthor?: boolean;
}

const getAvatar = (name: string, link?: string) => {
    if (link?.startsWith("https:")) {
        const url = toURL(link);

        if (url.hostname.endsWith("tistory.com")) {
            return `${url.origin}/index.gif`;
        }

        if (url.hostname === "github.com") {
            return `https://github.com/${url.pathname.split("/").pop()}.png`;
        }

        return `${url.origin}/favicon.ico`;
    }

    return `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`;
};

function CommentAvatar({ name, url, postAuthor }: CommentAvatarProps) {
    const [src, setSrc] = useState(getAvatar(name, url));

    useEffect(() => {
        setSrc(getAvatar(name, url));
    }, [name, url]);

    if (postAuthor) {
        return (
            <img
                width={AVATAR_SIZE}
                height={AVATAR_SIZE}
                src="https://cdn.jsdelivr.net/gh/marshall-ku/wp@2.3.7/logo/logo.svg"
                alt="블로그 로고"
            />
        );
    }

    return (
        <img
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            src={src}
            alt={`${name} 님의 아바타`}
            onError={({ currentTarget }) => {
                const fallback = getAvatar(name);

                if (currentTarget.src === fallback) {
                    return;
                }

                setSrc(fallback);
            }}
        />
    );
}

export default CommentAvatar;

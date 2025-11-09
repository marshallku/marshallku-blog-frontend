"use client";

import { useEffect, useState } from "react";

import { type PostImageProps } from "#components/PostImage";

export interface PostBlobImageProps extends PostImageProps {
    src: Blob;
}

function PostBlobImage({ src, alt, ...rest }: PostBlobImageProps) {
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        const url = URL.createObjectURL(src);
        setUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [src]);

    if (!url) {
        return null;
    }

    return <img src={url} alt={alt} {...rest} />;
}

export default PostBlobImage;

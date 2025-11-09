"use client";

import dynamic from "next/dynamic";

import { type PostCommentProps } from "#components/PostComment";

const PostComment = dynamic(() => import("#components/PostComment"), {
    ssr: false,
});

function PostCommentWrapper(props: PostCommentProps) {
    return <PostComment {...props} />;
}

export default PostCommentWrapper;

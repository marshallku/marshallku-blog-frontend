"use client";

import { PostCommentProps } from "#components/PostComment";
import dynamic from "next/dynamic";

const PostComment = dynamic(() => import("#components/PostComment"), {
    ssr: false,
});

function PostCommentWrapper(props: PostCommentProps) {
    return <PostComment {...props} />;
}

export default PostCommentWrapper;

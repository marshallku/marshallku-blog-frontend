"use client";

import { classNames } from "@marshallku/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";

import styles from "./index.module.scss";

import Comments from "#components/Comments";
import PostCommentForm from "#components/PostCommentForm";

export interface PostCommentProps {
    slug: string;
}

const cx = classNames(styles, "post-comment");

function PostComment({ slug }: PostCommentProps) {
    const queryClient = useMemo(() => new QueryClient(), []);

    return (
        <div className={cx()}>
            <QueryClientProvider client={queryClient}>
                <PostCommentForm slug={slug} />
                <ErrorBoundary fallback={null}>
                    <Suspense fallback={null}>
                        <Comments slug={slug} />
                    </Suspense>
                </ErrorBoundary>
            </QueryClientProvider>
        </div>
    );
}

export default PostComment;

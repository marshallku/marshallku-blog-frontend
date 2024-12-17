"use client";

import { Suspense, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { classNames } from "@marshallku/utils";
import Comments from "#components/Comments";
import PostCommentForm from "#components/PostCommentForm";
import styles from "./index.module.scss";

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

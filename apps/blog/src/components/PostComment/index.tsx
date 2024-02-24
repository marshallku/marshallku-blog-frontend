"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@marshallku/react-error-boundary";
import { classNames } from "@marshallku/utils";
import CommentList from "#components/CommentList";
import PostCommentForm from "#components/PostCommentForm";
import styles from "./index.module.scss";

export interface PostCommentProps {
    slug: string;
}

const cx = classNames(styles, "post-comment");

function PostComment({ slug }: PostCommentProps) {
    const queryClient = useMemo(() => new QueryClient(), []);
    const [render, setRender] = useState(false);

    useEffect(() => {
        setRender(true);
    }, []);

    return (
        <div className={cx()}>
            <QueryClientProvider client={queryClient}>
                {/* HACK: Removing dynamic data while building application */}
                {render && (
                    <>
                        <PostCommentForm slug={slug} />
                        <ErrorBoundary fallback={null}>
                            <Suspense fallback={null}>
                                <CommentList slug={slug} />
                            </Suspense>
                        </ErrorBoundary>
                    </>
                )}
            </QueryClientProvider>
        </div>
    );
}

export default PostComment;

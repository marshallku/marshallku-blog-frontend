"use client";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getCommentsBySlug, postComment } from "./api.client";

const enum QueryKeys {
    CommentList = "commentList",
}

export const useCommentList = (slug: string) =>
    useSuspenseQuery({
        queryKey: [QueryKeys.CommentList, slug],
        queryFn: () => getCommentsBySlug(slug),
    });

export const usePostComment = (slug: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (comment: Parameters<typeof postComment>[0]) => postComment(comment),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QueryKeys.CommentList, slug] }),
    });
};

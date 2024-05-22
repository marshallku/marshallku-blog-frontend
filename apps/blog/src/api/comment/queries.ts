"use client";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getCommentsBySlug, postComment } from "./api.client";

const enum QueryKeys {
    CommentsBySlug = "postComments",
}

export const useCommentsBySlug = (slug: string) =>
    useSuspenseQuery({
        queryKey: [QueryKeys.CommentsBySlug, slug],
        queryFn: () => getCommentsBySlug(slug),
    });

export const usePostComment = (slug: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (comment: Parameters<typeof postComment>[0]) => postComment(comment),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QueryKeys.CommentsBySlug, slug] }),
    });
};

"use client";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getCommentsBySlug, postComment } from "./api.client";

export const useCommentList = (slug: string) =>
    useSuspenseQuery({
        queryKey: ["commentList", slug],
        queryFn: () => getCommentsBySlug(slug),
    });

export const usePostComment = (slug: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (comment: Parameters<typeof postComment>[0]) => postComment(comment),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["commentList", slug] }),
    });
};

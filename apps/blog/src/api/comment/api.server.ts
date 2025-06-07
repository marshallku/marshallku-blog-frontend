"use server";

import { request } from "#api/instance.server";
import { removeFalsy } from "@marshallku/utils";
import { type Comment, type CommentListResponse } from "./types";

export async function getComments() {
    return request<CommentListResponse>("/api/v2/recent", {
        next: {
            revalidate: 3600,
        },
    });
}

export async function getCommentsBySlug(slug: string) {
    return request<CommentListResponse>(`/api/v2/comment/list?postSlug=${encodeURIComponent(slug)}`, {
        next: {
            tags: [slug],
        },
    });
}

export async function postComment(data: Omit<Comment, "_id" | "createdAt" | "byPostAuthor">) {
    return request("/api/v2/comment/create", {
        method: "POST",
        body: JSON.stringify(removeFalsy(data)),
    });
}

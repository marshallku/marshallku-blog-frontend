"use server";

import { request } from "#api/instance.server";
import { removeFalsy } from "@marshallku/utils";
import { type Comment, type CommentListResponse } from "./types";

export async function getComments() {
    return request<CommentListResponse>("/comment/recent", {
        next: {
            revalidate: 3600,
        },
    });
}

export async function getCommentsBySlug(slug: string) {
    return request<CommentListResponse>(`/comment/list?postSlug=${encodeURIComponent(slug)}`, {
        next: {
            tags: [slug],
        },
    });
}

export async function postComment(data: Omit<Comment, "_id" | "createdAt" | "byPostAuthor">) {
    return request("/comment/create", {
        method: "POST",
        body: JSON.stringify(removeFalsy(data)),
    });
}

"use client";

import { request } from "#api/instance.client";
import { type CommentListResponse, type CommentRequest } from "./types";

export async function getComments(slug: string) {
    return request<CommentListResponse>(`/comment/list?postSlug=${encodeURIComponent(slug)}`);
}

export async function postComment(data: CommentRequest) {
    return request("/comment/create", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

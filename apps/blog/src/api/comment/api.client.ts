"use client";

import { request } from "#api/instance.client";
import { type CommentListResponse, type CommentRequest } from "./types";

export async function getComments(): Promise<CommentListResponse> {
    return request<CommentListResponse>("/comment/recent");
}

export async function getCommentsBySlug(slug: string): Promise<CommentListResponse> {
    return request<CommentListResponse>(`/comment/list?postSlug=${encodeURIComponent(slug)}`);
}

export async function postComment(data: CommentRequest) {
    return request("/comment/create", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

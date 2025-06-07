"use client";

import { request } from "#api/instance.client";
import { removeFalsy, removeNullish, stringifyQuery } from "@marshallku/utils";
import { type GetRecentCommentParameters, type CommentListResponse, type CommentRequest } from "./types";

export async function getComments(params: GetRecentCommentParameters = {}): Promise<CommentListResponse> {
    return request<CommentListResponse>(`/api/v2/recent${stringifyQuery(removeNullish(params))}`);
}

export async function getCommentsBySlug(slug: string): Promise<CommentListResponse> {
    return request<CommentListResponse>(`/api/v2/comment/list?postSlug=${encodeURIComponent(slug)}`);
}

export async function postComment(data: CommentRequest) {
    return request("/api/v2/comment/create", {
        method: "POST",
        body: JSON.stringify(removeFalsy(data)),
    });
}

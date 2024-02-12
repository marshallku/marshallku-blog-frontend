import { request } from "#api/instance.client";
import { Comment, CommentListResponse } from "./types";

export async function getComments(slug: string) {
    return request<CommentListResponse>(`/comment/list?postSlug=${encodeURIComponent(slug)}`);
}

export async function postComment(data: Omit<Comment, "_id" | "createdAt" | "byPostAuthor">) {
    return request("/comment/create", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

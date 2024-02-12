import { request } from "#api/instance";
import { Comment, CommentListResponse } from "./types";

export async function getComments(slug: string) {
    return request<CommentListResponse>(`/comment/list?postSlug=${encodeURIComponent(slug)}`, {
        next: {
            tags: [slug],
        },
    });
}

export async function postComment(data: Omit<Comment, "_id" | "createdAt" | "byPostAuthor">) {
    return request("/comment/create", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

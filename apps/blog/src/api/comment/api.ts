import { request } from "#api/instance";
import { CommentListResponse } from "./types";

export async function getComments(slug: string) {
    return request<CommentListResponse>(`/comment/list?postSlug=${encodeURIComponent(slug)}`);
}

export interface Comment {
    _id: string;
    postSlug: string;
    createdAt: string;
    name: string;
    byPostAuthor: boolean;
    password: string;
    email: string;
    url: string;
    body: string;
    parentCommentId?: string;
}

export type CommentRequest = Omit<Comment, "_id" | "createdAt" | "byPostAuthor">;

export interface NestedComment extends Omit<Comment, "parentCommentId"> {
    replies?: Required<Comment>[];
}

export type CommentListResponse = NestedComment[];

export interface GetRecentCommentParameters {
    /** default: 5 */
    count?: number;
}

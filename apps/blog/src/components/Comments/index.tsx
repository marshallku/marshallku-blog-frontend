"use client";

import { useCommentsBySlug } from "#api/comment/queries";
import CommentList from "#components/CommentList";

export interface CommentsProps {
    slug: string;
}

function Comments({ slug }: CommentsProps) {
    const { data } = useCommentsBySlug(slug);

    return <CommentList data={data} />;
}

export default Comments;

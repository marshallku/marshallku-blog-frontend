"use client";

import { useCommentList } from "#api/comment/queries";
import CommentList from "#components/CommentList";

export interface CommentsProps {
    slug: string;
}

function Comments({ slug }: CommentsProps) {
    const { data } = useCommentList(slug);

    return <CommentList data={data} />;
}

export default Comments;

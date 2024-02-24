import { usePostComment } from "#api/comment/queries";
import CommentForm from "#components/CommentForm";

export interface PostCommentFormProps {
    slug: string;
}

function PostCommentForm({ slug }: PostCommentFormProps) {
    const { mutate } = usePostComment(slug);
    return <CommentForm slug={slug} submit={mutate} />;
}

export default PostCommentForm;

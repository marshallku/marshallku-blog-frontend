import { Metadata } from "next";
import { revalidateTag } from "next/cache";
import { Suspense } from "react";
import Typography from "@marshallku/ui/Typography";
import Loader from "@marshallku/ui/Loader";
import { classNames } from "@marshallku/utils";
import { getCommentsBySlug, postComment } from "#api/comment/api.server";
import CommentForm from "#components/CommentForm";
import CommentList from "#components/CommentList";
import styles from "./page.module.scss";

export const metadata: Metadata = {
    title: "방명록",
    description: "방명록",
};

const SLUG = "/guestbook";

const cx = classNames(styles, "guestbook");

async function Comments() {
    const data = await getCommentsBySlug(SLUG);
    return <CommentList data={data} />;
}

export default async function GuestbookPage() {
    return (
        <div className={cx()}>
            <Typography variant="h1" component="h1" className={cx("__title")} fontWeight={700}>
                방명록
            </Typography>
            <CommentForm
                slug={SLUG}
                submit={async (data) => {
                    "use server";

                    await postComment(data);
                    revalidateTag(SLUG, "max");
                }}
            />
            <Suspense fallback={<Loader size={80} className={cx("__loader")} />}>
                <Comments />
            </Suspense>
        </div>
    );
}

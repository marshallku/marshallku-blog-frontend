import Typography from "@marshallku/ui/Typography";
import { classNames } from "@marshallku/utils";

import styles from "./index.module.scss";

import Banner from "#components/Banner";
import PostList, { type PostListProps } from "#components/PostList";

export interface ArchiveProps {
    title: string;
    coverImage?: string;
    postListProps: PostListProps;
}

const cx = classNames(styles, "archive");

function Archive({ title, coverImage, postListProps: { posts, paginationProps } }: ArchiveProps) {
    const typographyProps = {
        variant: "h2",
        component: "h1",
        fontWeight: 700,
    } as const;

    return (
        <div className={cx()}>
            {coverImage ? (
                <Banner title={title} coverImage={coverImage}>
                    <Typography className={cx("__title")} {...typographyProps}>
                        {title}
                    </Typography>
                </Banner>
            ) : (
                <Typography className={cx("__title", "__title--only")} {...typographyProps}>
                    {title}
                </Typography>
            )}
            <main className={cx("__container")}>
                <PostList
                    posts={posts}
                    paginationProps={paginationProps ? { ...paginationProps, gutterTop: true } : undefined}
                />
            </main>
        </div>
    );
}

export default Archive;

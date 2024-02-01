import { classNames } from "@marshallku/utils";
import { Banner, PostList, PostListProps, Typography } from "#components";
import styles from "./index.module.scss";

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
        className: cx("__title"),
    } as const;

    return (
        <div className={cx()}>
            {coverImage ? (
                <Banner title={title} coverImage={coverImage}>
                    <Typography {...typographyProps}>{title}</Typography>
                </Banner>
            ) : (
                <Typography {...typographyProps}>{title}</Typography>
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

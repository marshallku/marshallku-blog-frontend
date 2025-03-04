"use client";

import Link from "next/link";
import { useState } from "react";
import ToggleButton from "@marshallku/ui/ToggleButton";
import ToggleButtonGroup from "@marshallku/ui/ToggleButtonGroup";
import { classNames } from "@marshallku/utils";
import PostList from "#components/PostList";
import { PAGE_SIZE } from "#constants";
import type { Category, Post } from "#types";
import styles from "./index.module.scss";
import Button from "@marshallku/ui/Button";
import { Icon } from "@marshallku/icon";

interface HomePostListProps {
    categories: (Category & { slug: string })[];
    posts: Omit<Post, "content">[];
}

const cx = classNames(styles, "home-post-list");

function HomePostList({ categories, posts }: HomePostListProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("/dev");
    const categoriesWithAll = [{ slug: "", name: "전체" }, ...categories];

    return (
        <section className={cx()}>
            <div className={cx("__toggle-button-group")}>
                <ToggleButtonGroup value={selectedCategory} onChange={setSelectedCategory}>
                    {categoriesWithAll.map(({ slug, name }) => (
                        <ToggleButton key={slug} value={slug}>
                            {name}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </div>
            <PostList
                posts={posts
                    .filter(({ category }) => selectedCategory === "" || category === selectedCategory)
                    .slice(0, PAGE_SIZE)}
            />
            {selectedCategory !== "" && (
                <div className={cx("__view-more")}>
                    <Button
                        component={Link}
                        href={`${selectedCategory}`}
                        variant="outline"
                        size="medium"
                        radius="capsule"
                        className={cx("__view-more-button")}
                    >
                        {categoriesWithAll.find(({ slug }) => slug === selectedCategory)?.name} 관련 글 더 보기
                        <Icon name="arrow-forward" />
                    </Button>
                </div>
            )}
        </section>
    );
}

HomePostList.displayName = "HomePostList";

export default HomePostList;

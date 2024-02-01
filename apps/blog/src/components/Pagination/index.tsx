import Link from "next/link";
import { useMemo } from "react";
import { Icon } from "@marshallku/icon";
import { classNames } from "@marshallku/utils";
import { NonNullableProperties } from "#types";
import styles from "./index.module.scss";

export interface PaginationProps {
    /** index of current page */
    currentIndex: number;
    /** row size of pagination */
    rowSize?: number;
    /** amount of items */
    totalCount: number;
    /** count for display in one page */
    pageRange?: number;
    /** base path for pagination */
    basePath?: string;
    /** whether to display gutter at top */
    gutterTop?: boolean;
}

const cx = classNames(styles, "pagination");

function calculatePageNumbers({
    currentIndex,
    rowSize,
    totalCount,
    pageRange,
}: NonNullableProperties<Omit<PaginationProps, "basePath" | "gutterTop">>) {
    const maxPageCount = Math.ceil(totalCount / rowSize);
    let startPage = Math.max(1, currentIndex - Math.floor(pageRange / 2));
    const endPage = Math.min(startPage + pageRange - 1, maxPageCount);

    if (endPage - startPage < pageRange - 1) {
        startPage = Math.max(1, endPage - pageRange + 1);
    }

    const pages = [];

    for (let i = startPage; i <= endPage; ++i) {
        pages.push(i);
    }

    return pages;
}

function Pagination({
    currentIndex,
    rowSize = 6,
    totalCount,
    pageRange = 5,
    basePath = "/",
    gutterTop,
}: PaginationProps) {
    const pageCount = useMemo(() => Math.ceil(totalCount / rowSize), [totalCount, rowSize]);

    return (
        <div className={cx("", gutterTop && "--gutter")} role="navigation">
            <Link
                href={`${basePath}/page/1`}
                className={cx("__direction", currentIndex < Math.ceil(pageRange / 2) + 1 && "__direction--invisible")}
            >
                <Icon name="first-page" />
                <span className="sr-only">첫 페이지</span>
            </Link>
            <Link
                href={`${basePath}/page/${Math.max(1, currentIndex - pageRange)}`}
                className={cx("__direction", currentIndex <= 1 && "__direction--invisible")}
            >
                <Icon name="chevron-left" />
                <span className="sr-only">이전 페이지</span>
            </Link>
            {calculatePageNumbers({ currentIndex, rowSize, totalCount, pageRange }).map((i) => (
                <Link
                    key={i}
                    aria-current={i === currentIndex}
                    href={`${basePath}/page/${i}`}
                    className={cx("__page", currentIndex === i && "__page--current")}
                >
                    {i}
                    <span className="sr-only">페이지로 이동</span>
                </Link>
            ))}
            <Link
                href={`${basePath}/page/${Math.min(pageCount, currentIndex + pageRange)}`}
                className={cx("__direction", pageCount <= currentIndex && "__direction--invisible")}
            >
                <Icon name="chevron-right" />
                <span className="sr-only">다음 페이지</span>
            </Link>
            <Link
                href={`${basePath}/page/${pageCount}`}
                className={cx(
                    "__direction",
                    Math.ceil(pageCount - pageRange / 2) <= currentIndex && "__direction--invisible",
                )}
            >
                <Icon name="last-page" />
                <span className="sr-only">마지막 페이지</span>
            </Link>
        </div>
    );
}

export default Pagination;

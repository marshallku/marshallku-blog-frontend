"use client";

import { FormEventHandler, useCallback, useRef, useState } from "react";
import { Icon } from "@marshallku/icon";
import { classNames } from "@marshallku/utils";
import { usePostComment } from "#api/comment/queries";
import Typography from "#components/Typography";
import CommentAvatar from "#components/CommentAvatar";
import styles from "./index.module.scss";

interface CommentFormProps {
    slug: string;
}

const cx = classNames(styles, "comment-form");

function CommentForm({ slug }: CommentFormProps) {
    const [name, setName] = useState("");
    const [body, setBody] = useState("");
    const formRef = useRef<HTMLFormElement>(null);
    const { mutate } = usePostComment(slug);

    const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
        (event) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const body = formData.get("body");

            if (!body || typeof body !== "string" || body.trim() === "") {
                return {
                    message: "내용을 입력해 주세요.",
                };
            }

            const korean = /[\u3131-\uD79D]/giu;

            if (!korean.test(body)) {
                return {
                    message: "한글을 입력해 주세요.",
                };
            }

            const data = {
                name: (formData.get("name") as string) || "익명",
                postSlug: slug,
                password: formData.get("password") as string,
                email: formData.get("email") as string,
                url: formData.get("url") as string,
                body,
                parentCommentId: formData.get("parentCommentId") as string,
            };

            mutate(data);
            formRef.current?.reset();
            setName("");
            setBody("");
        },
        [slug],
    );

    return (
        <div className={cx()}>
            <figure className={cx("__avatar")}>
                <CommentAvatar name={name} />
            </figure>
            <form className={cx("__form")} onSubmit={handleSubmit} ref={formRef}>
                <Typography variant="c1" marginBottom={16}>
                    댓글을 남겨주세요. (이메일 주소는 공개되지 않습니다.)
                </Typography>
                <input
                    className={cx("__input")}
                    name="name"
                    placeholder="이름 (미입력시 '익명')"
                    value={name}
                    onChange={({ currentTarget: { value } }) => {
                        setName(value);
                    }}
                />
                <input className={cx("__input")} name="url" inputMode="url" placeholder="주소" />
                <input className={cx("__input")} name="email" inputMode="email" placeholder="이메일 (비공개)" />
                <textarea
                    className={cx("__textarea")}
                    name="body"
                    value={body}
                    placeholder="댓글을 입력해 주세요."
                    onChange={({ currentTarget: { value } }) => {
                        setBody(value);
                    }}
                />
                <div className={cx("__buttons")}>
                    <button type="submit" disabled={!body} className={cx("__submit")}>
                        <Icon name="arrow-downward" size={24} />
                        <span className="sr-only">댓글 남기기</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CommentForm;
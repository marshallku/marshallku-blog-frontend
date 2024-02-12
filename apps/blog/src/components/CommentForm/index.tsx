"use client";

import { useFormState } from "react-dom";
import { classNames } from "@marshallku/utils";
import { submitComment } from "app/[category]/[...slug]/action";
import Button from "#components/Button";
import styles from "./index.module.scss";
import Typography from "#components/Typography";
import CommentAvatar from "#components/CommentAvatar";
import { useState } from "react";
import { Icon } from "@marshallku/icon";

const cx = classNames(styles, "comment-form");

const initialState = {
    message: "",
};

function CommentForm() {
    const [state, formAction] = useFormState(submitComment, initialState);
    const [name, setName] = useState("");
    const [body, setBody] = useState("");

    return (
        <div className={cx()}>
            <figure className={cx("__avatar")}>
                <CommentAvatar name={name} />
            </figure>
            <form action={formAction} className={cx("__form")}>
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
                {state.message && <Typography variant="c2">{state.message}</Typography>}
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

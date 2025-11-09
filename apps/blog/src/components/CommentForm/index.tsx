"use client";

import { Icon } from "@marshallku/icon";
import { toast } from "@marshallku/toast";
import Button from "@marshallku/ui/Button";
import Input from "@marshallku/ui/Input";
import Textarea from "@marshallku/ui/Textarea";
import { classNames, generateRandomName } from "@marshallku/utils";
import { type MutateOptions } from "@tanstack/react-query";
import { type FormEventHandler, useCallback, useRef, useState } from "react";

import styles from "./index.module.scss";

import { type CommentRequest } from "#api";
import CommentAvatar from "#components/CommentAvatar";

interface CommentFormProps {
    slug: string;
    submit(data: CommentRequest, options?: MutateOptions<unknown, Error, CommentRequest, unknown>): void;
    isClientSide?: boolean;
}

const cx = classNames(styles, "comment-form");

function CommentForm({ slug, submit, isClientSide = false }: CommentFormProps) {
    const [name, setName] = useState(generateRandomName());
    const [body, setBody] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    const reset = useCallback(() => {
        formRef.current?.reset();
        setName("");
        setBody("");
    }, []);

    const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
        (event) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const body = formData.get("body");

            if (!body || typeof body !== "string" || body.trim() === "") {
                toast("내용을 입력해 주세요.");
                return;
            }

            const korean = /[\u3131-\uD79D]/giu;

            if (!korean.test(body)) {
                toast("한글을 입력해 주세요.");
                return;
            }

            const data = {
                name: (formData.get("name") as string) || "익명",
                postSlug: slug,
                password: formData.get("password") as string,
                url: formData.get("url") as string,
                body,
                parentCommentId: formData.get("parentCommentId") as string,
            };

            if (isClientSide) {
                submit(data, {
                    onSuccess: reset,
                    onError: (error) => {
                        toast(error.message);
                    },
                });
            } else {
                submit(data);
                reset();
            }
        },
        [slug, isClientSide, submit, reset],
    );

    return (
        <div className={cx()}>
            <figure className={cx("__avatar")}>
                <CommentAvatar name={name} />
            </figure>
            <form className={cx("__form")} onSubmit={handleSubmit} ref={formRef}>
                <Input
                    className={cx("__input")}
                    name="name"
                    placeholder="이름"
                    value={name}
                    onChange={({ currentTarget: { value } }) => {
                        setName(value);
                    }}
                    onFirstFocus={() => {
                        setName("");
                    }}
                >
                    <Button
                        size="small"
                        onClick={() => {
                            setName(generateRandomName());
                        }}
                    >
                        무작위 생성
                    </Button>
                </Input>
                <Input className={cx("__input")} name="url" inputMode="url" placeholder="웹사이트" />
                <Textarea
                    className={cx("__textarea")}
                    name="body"
                    value={body}
                    placeholder="댓글을 입력해 주세요. 작성한 댓글은 수정하거나 삭제할 수 없습니다."
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

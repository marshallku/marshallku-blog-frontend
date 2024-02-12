"use server";

import { headers } from "next/headers";
import { postComment } from "#api";
import { revalidatePath, revalidateTag } from "next/cache";

interface State {
    message: string;
}

export async function submitComment(_: State, formData: FormData): Promise<State> {
    const headersList = headers();
    const fullUrl = headersList.get("referer") || "";
    const body = formData.get("body");

    if (!fullUrl) {
        return {
            message: "잘못된 경로입니다.",
        };
    }

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
        postSlug: decodeURIComponent(new URL(fullUrl).pathname),
        password: formData.get("password") as string,
        email: formData.get("email") as string,
        url: formData.get("url") as string,
        body,
        parentCommentId: formData.get("parentCommentId") as string,
    };

    try {
        await postComment(data);
        revalidateTag(data.postSlug);

        return {
            message: "",
        };
    } catch (error) {
        console.error(error);

        return {
            message: "댓글을 작성하는 중 오류가 발생했습니다.",
        };
    }
}

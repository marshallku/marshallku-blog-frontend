import { describe, expect, it } from "vitest";
import { to } from "../..";

describe("to function", () => {
    it("should return [null, data] when the promise resolves", async () => {
        const promise = Promise.resolve("success");
        const result = await to(promise);

        expect(result).toEqual([null, "success"]);
    });

    it("should return [Error, null] when the promise rejects with an Error instance", async () => {
        const promise = Promise.reject(new Error("failure"));
        const result = await to(promise);

        expect(result).toEqual([new Error("failure"), null]);
    });

    it("should return [Error, null] with a default message when the promise rejects with a non-Error instance", async () => {
        const promise = Promise.reject("failure");
        const result = await to(promise);

        expect(result).toEqual([{ message: "알 수 없는 오류가 발생했습니다" }, null]);
    });
});

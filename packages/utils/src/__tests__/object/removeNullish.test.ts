import { describe, expect, it } from "vitest";

import { removeNullish } from "../..";

describe("removeNullish", () => {
    it("should remove null and undefined values from object", () => {
        const input = { a: 1, b: null, c: 3, d: undefined, e: "test" };
        const result = removeNullish(input);

        expect(result).toEqual({ a: 1, c: 3, e: "test" });
    });

    it("should work with objects containing only null and undefined values", () => {
        const input = { a: null, b: undefined };
        const result = removeNullish(input);

        expect(result).toEqual({});
    });

    it("should return the same object if no nullish values", () => {
        const input = { a: 1, b: "string", c: true, d: [1, 2, 3] };
        const result = removeNullish(input);

        expect(result).toEqual(input);
    });

    it("should handle empty objects", () => {
        const input = {};
        const result = removeNullish(input);

        expect(result).toEqual({});
    });

    it("should work with nested objects", () => {
        const input = { a: 1, b: { c: 2, d: null }, e: undefined, f: "string" };
        const result = removeNullish(input);

        expect(result).toEqual({ a: 1, b: { c: 2 }, f: "string" });
    });

    it("should work with objects containing array values", () => {
        const input = { a: [1, 2, 3], b: null, c: undefined, d: ["a", "b"] };
        const result = removeNullish(input);

        expect(result).toEqual({ a: [1, 2, 3], d: ["a", "b"] });
    });

    it("should keep falsy but non-nullish values", () => {
        const input = { a: 0, b: false, c: "", d: null, e: undefined };
        const result = removeNullish(input);

        expect(result).toEqual({ a: 0, b: false, c: "" });
    });
});

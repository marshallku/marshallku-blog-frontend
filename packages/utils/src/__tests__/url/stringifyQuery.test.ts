import { describe, expect, it } from "vitest";

import { stringifyQuery } from "../..";

describe("stringifyQuery", () => {
    it("converts a simple object to a query string", () => {
        const queryObject = { name: "John", age: 30 };
        const result = stringifyQuery(queryObject);
        expect(result).toBe("?name=John&age=30");
    });

    it("encodes values if encode is true", () => {
        const queryObject = { name: "John Doe", age: 30 };
        const result = stringifyQuery(queryObject, true);
        expect(result).toBe("?name=John%20Doe&age=30");
    });

    it("does not encode values if encode is false", () => {
        const queryObject = { name: "John Doe", age: 30 };
        const result = stringifyQuery(queryObject, false);
        expect(result).toBe("?name=John Doe&age=30");
    });

    it("handles arrays correctly", () => {
        const queryObject = { tags: ["tag1", "tag2"], age: 30 };
        const result = stringifyQuery(queryObject);
        expect(result).toBe("?tags=tag1,tag2&age=30");
    });

    it("returns empty string for empty object", () => {
        const queryObject = {};
        const result = stringifyQuery(queryObject);
        expect(result).toBe("");
    });

    it("skips null and undefined values", () => {
        const queryObject = { name: "John", age: null, gender: undefined, location: "NY" };
        const result = stringifyQuery(queryObject);
        expect(result).toBe("?name=John&location=NY");
    });

    it("returns empty string if all values are nullish", () => {
        const queryObject = { name: null, age: undefined };
        const result = stringifyQuery(queryObject);
        expect(result).toBe("");
    });

    it("allows custom defaultString", () => {
        const queryObject = { name: "John", age: 30 };
        const result = stringifyQuery(queryObject, true, "&");
        expect(result).toBe("&name=John&age=30");
    });

    it("handles boolean values correctly", () => {
        const queryObject = { active: true, verified: false };
        const result = stringifyQuery(queryObject);
        expect(result).toBe("?active=true&verified=false");
    });
});

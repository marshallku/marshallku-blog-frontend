import { describe, expect, it } from "vitest";

import { groupBy } from "../..";

describe("groupBy", () => {
    it("should group numbers by even and odd", () => {
        const numbers = [1, 2, 3, 4, 5, 6];
        const result = groupBy(numbers, (num) => (num % 2 === 0 ? "even" : "odd"));

        expect(result).toEqual({
            even: [2, 4, 6],
            odd: [1, 3, 5],
        });
    });

    it("should group strings by their length", () => {
        const strings = ["one", "two", "three", "four", "five"];
        const result = groupBy(strings, (str) => str.length);

        expect(result).toEqual({
            3: ["one", "two"],
            4: ["four", "five"],
            5: ["three"],
        });
    });

    it("should return an empty object for an empty iterable", () => {
        const emptyArray: number[] = [];
        const result = groupBy(emptyArray, (num) => (num % 2 === 0 ? "even" : "odd"));

        expect(result).toEqual({});
    });

    it("should map all elements to the same key", () => {
        const numbers = [1, 3, 5, 7];
        const result = groupBy(numbers, () => "same");

        expect(result).toEqual({
            same: [1, 3, 5, 7],
        });
    });

    it("should map each element to a unique key", () => {
        const numbers = [1, 2, 3];
        const result = groupBy(numbers, (num) => num);

        expect(result).toEqual({
            1: [1],
            2: [2],
            3: [3],
        });
    });

    it("should work with sets as input", () => {
        const numbers = new Set([1, 2, 3, 4, 5]);
        const result = groupBy(numbers, (num) => (num % 2 === 0 ? "even" : "odd"));

        expect(result).toEqual({
            even: [2, 4],
            odd: [1, 3, 5],
        });
    });

    it("should handle symbols as keys", () => {
        const sym1 = Symbol("one");
        const sym2 = Symbol("two");
        const input = [sym1, sym2, sym1];
        const result = groupBy(input, (sym) => sym);

        expect(result).toEqual({
            [sym1]: [sym1, sym1],
            [sym2]: [sym2],
        });
    });

    it("should handle null and undefined values in iterable", () => {
        const input = [null, undefined, null];
        const result = groupBy(input, (val) => (val === null ? "null" : "undefined"));

        expect(result).toEqual({
            null: [null, null],
            undefined: [undefined],
        });
    });
});

/*
export const toURL = (value: string) => {
    try {
        return new URL(value);
    } catch {
        // If the URL is relative, prepend the current origin.
        const host = window.location.origin;
        const path = value[0] === "/" ? value : `/${value}`;

        return new URL(path, host);
    }
};
*/

import { describe, expect, it } from "vitest";

import { toURL } from "../url";

describe("toURL function", () => {
    it("should return a URL object when a valid URL is provided", () => {
        const url = "https://example.com/";
        const result = toURL(url);

        expect(result).toBeInstanceOf(URL);
        expect(result?.href).toBe(url);
    });

    it("should return a URL object when a relative URL is provided", () => {
        const url = "/path/to/resource";
        const result = toURL(url);

        expect(result).toBeInstanceOf(URL);
        expect(result?.href).toBe(`${window.location.origin}${url}`);
    });

    it("should return a URL object when a relative URL is provided with a leading slash", () => {
        const url = "/path/to/resource";
        const result = toURL(url);

        expect(result).toBeInstanceOf(URL);
        expect(result?.href).toBe(`${window.location.origin}${url}`);
    });

    it("should return a URL object when a relative URL is provided without a leading slash", () => {
        const url = "path/to/resource";
        const result = toURL(url);

        expect(result).toBeInstanceOf(URL);
        expect(result?.href).toBe(`${window.location.origin}/${url}`);
    });
});

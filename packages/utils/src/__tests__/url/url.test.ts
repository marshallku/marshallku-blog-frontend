import { describe, expect, it } from "vitest";

import { tryParseUrl } from "../..";

describe("tryParseUrl function", () => {
    it("should return a URL object when a valid URL is provided", () => {
        const url = "https://example.com/";
        const result = tryParseUrl(url);

        expect(result).toBeInstanceOf(URL);
        expect(result?.href).toBe(url);
    });

    it("should return null when an invalid URL is provided", () => {
        const url = "not-a-valid-url";
        const result = tryParseUrl(url);

        expect(result).toBeNull();
    });
});

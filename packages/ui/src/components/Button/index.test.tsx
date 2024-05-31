import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from ".";

describe("Button", () => {
    it("should be rendered", () => {
        render(<Button>Testing</Button>);

        expect(screen.getByText(/Testing/i)).toBeDefined();
    });
});

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from ".";

describe("Input", () => {
    it("should be rendered", () => {
        render(<Input data-testid="input" />);

        expect(screen.getByTestId("input")).toBeDefined();
    });
});

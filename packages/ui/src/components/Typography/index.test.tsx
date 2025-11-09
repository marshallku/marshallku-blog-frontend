import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Typography, { type TypographyProps } from ".";

describe("Typography", () => {
    const defaultProps: TypographyProps = {
        component: "p",
        variant: "b1",
        fontWeight: 400,
        children: "Test",
    };

    it("should render with default props", () => {
        render(<Typography {...defaultProps} />);

        expect(screen.getByText("Test")).toBeTruthy();
        expect(screen.getByText("Test").tagName).toBe("P");
    });

    it("should render with a different component", () => {
        render(<Typography {...defaultProps} component="h1" />);

        expect(screen.getByText("Test").tagName).toBe("H1");
    });
});

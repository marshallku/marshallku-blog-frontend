import { render, screen } from "@testing-library/react";
import { type AnchorHTMLAttributes, type DetailedHTMLProps } from "react";
import { describe, expect, it } from "vitest";

import Button from ".";

describe("Button", () => {
    it("should be rendered", () => {
        render(<Button>Testing</Button>);

        expect(screen.getByText(/Testing/i)).toBeDefined();
    });

    it("should have a default variant of secondary", () => {
        render(<Button data-testid="test">Testing</Button>);

        expect(
            [...screen.getByTestId("test").classList].filter((x) => x.includes("button--variant-secondary")),
        ).toHaveLength(1);
    });

    it("should be rendered with custom component", () => {
        render(
            <Button
                component={({
                    children,
                    ...props
                }: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
                    <a {...props}>{children}</a>
                )}
                href="/test"
                data-testid="test"
            >
                Testing
            </Button>,
        );

        expect(screen.getByTestId("test").tagName).toBe("A");
        expect(screen.getByTestId("test").getAttribute("href")).toBe("/test");
    });
});

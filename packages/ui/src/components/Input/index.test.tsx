import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from ".";

describe("Input", () => {
    it("should be rendered", () => {
        render(<Input data-testid="input" />);

        expect(screen.getByTestId("input").tagName).toBe("INPUT");
    });

    it("should handle onFirstFocus", () => {
        render(
            <Input
                onFirstFocus={({ currentTarget }) => {
                    currentTarget.value = "";
                }}
                data-testid="input"
            />,
        );

        expect(screen.getByTestId("input").tagName).toBe("INPUT");
        screen.getByTestId<HTMLInputElement>("input").value = "Testing";
        expect(screen.getByTestId<HTMLInputElement>("input").value).toBe("Testing");
        screen.getByTestId<HTMLInputElement>("input").focus();
        expect(screen.getByTestId<HTMLInputElement>("input").value).toBe("");
        screen.getByTestId<HTMLInputElement>("input").value = "Testing";
        expect(screen.getByTestId<HTMLInputElement>("input").value).toBe("Testing");
        screen.getByTestId<HTMLInputElement>("input").focus();
        expect(screen.getByTestId<HTMLInputElement>("input").value).toBe("Testing");
    });
});

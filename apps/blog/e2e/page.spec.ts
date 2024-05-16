import { test, expect } from "@playwright/test";

test("should render correctly", async ({ page }) => {
    await page.goto("/");

    expect(page.getByText("Home")).toBeTruthy();
});

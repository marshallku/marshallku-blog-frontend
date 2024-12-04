import { describe, expect, it } from "vitest";
import { classNames } from "../..";

describe("classNames", () => {
    const PREFIX = "prefix_";
    const SUFFIX = "_hash";
    const ROOT_CLASS = "root";
    const classes = [
        "root",
        "root--modifier",
        "root--disabled",
        "root1",
        "root2",
        "root__child",
        "root__child--modifier",
        "root__child--modifier2",
        "root__child2",
        "root__child2--modifier",
        "root__child2--modifier2",
    ];
    const formatName = (name: string): string => PREFIX + name + SUFFIX;
    const styles = Object.fromEntries(classes.map((className) => [className, formatName(className)]));

    it("should return empty string when no arguments provided", () => {
        const cx = classNames();
        expect(cx()).toBe("");
    });

    it("should return rootClassName when called without arguments", () => {
        const cx = classNames(styles, ROOT_CLASS);
        expect(cx()).toBe(formatName(ROOT_CLASS));
    });

    it("should return rootClassName when called with empty string", () => {
        const cx = classNames(styles, ROOT_CLASS);
        expect(cx("")).toBe(formatName(ROOT_CLASS));
    });

    it("should handle className property in object", () => {
        const cx = classNames(styles, ROOT_CLASS);
        expect(cx({ className: "externalClass" })).toBe("externalClass");
    });

    it("should ignore falsy values except empty string", () => {
        const cx = classNames(styles, ROOT_CLASS);
        expect(cx(false, null, undefined, "", 0, "--modifier")).toBe(
            [formatName(ROOT_CLASS), formatName(`${ROOT_CLASS}--modifier`)].join(" "),
        );
    });

    it("should handle string modifiers", () => {
        const cx = classNames(styles, ROOT_CLASS);
        expect(cx("", "--modifier", "--disabled")).toBe(
            [formatName(ROOT_CLASS), formatName(`${ROOT_CLASS}--modifier`), formatName(`${ROOT_CLASS}--disabled`)].join(
                " ",
            ),
        );
    });

    it("should handle object modifiers", () => {
        const cx = classNames(styles, ROOT_CLASS);
        expect(cx("", { "--modifier": true, "--disabled": false })).toBe(
            [formatName(ROOT_CLASS), formatName(`${ROOT_CLASS}--modifier`)].join(" "),
        );
    });

    it("should handle nested arrays", () => {
        const cn = classNames(styles, "root");
        expect(cn(["--modifier", ["--disabled"]])).toBe("");
    });

    it("should handle complex input", () => {
        const cx = classNames(styles, ROOT_CLASS);
        expect(cx("--modifier", 1, { className: "externalClass" }, [null, false])).toBe(
            [formatName(`${ROOT_CLASS}--modifier`), formatName(`${ROOT_CLASS}1`), "externalClass"].join(" "),
        );
    });
});

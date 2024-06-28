import { type Meta, type StoryObj } from "@storybook/react";
import Input, { type InputProps } from "@ui/Input";

const story: Meta<InputProps> = {
    component: Input,
    title: "Input/Input",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Let the user input single line text",
            },
        },
    },
};

export default story;

export const Default: StoryObj<InputProps> = {
    args: {
        variant: "line",
        label: "Input value",
        // common attributes
        placeholder: "Placeholder",
        type: "",
        disabled: false,
        required: false,
        readOnly: false,
        autoFocus: false,
        autoComplete: "on",
        maxLength: 100,
        minLength: 0,
        pattern: "",
        size: 20,
        spellCheck: true,
    },
};

export const Line: StoryObj<InputProps> = {
    args: {
        variant: "line",
        label: "Input value",
    },
};

export const Box: StoryObj<InputProps> = {
    args: {
        variant: "box",
        label: "Input value",
    },
};

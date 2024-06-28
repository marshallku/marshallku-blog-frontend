import { type Meta, type StoryObj } from "@storybook/react";
import Textarea, { type TextareaProps } from "@ui/Textarea";

const story: Meta<TextareaProps> = {
    component: Textarea,
    title: "Input/Textarea",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Let the user input multi-line text",
            },
        },
    },
};

export default story;

export const Line: StoryObj<TextareaProps> = {
    args: {
        variant: "line",
        label: "Input value",
    },
};

export const Box: StoryObj<TextareaProps> = {
    args: {
        variant: "box",
        label: "Input value",
    },
};

import { type Meta, type StoryObj } from "@storybook/react";
import Button, { type ButtonProps } from "@blog/Button";

const story: Meta<ButtonProps> = {
    component: Button,
    title: "Components/Button",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Allows for user interaction and can trigger specific actions",
            },
        },
    },
};

export default story;

export const StringChildren: StoryObj<ButtonProps> = {
    args: {
        children: "Click this!",
        disabled: false,
    },
};

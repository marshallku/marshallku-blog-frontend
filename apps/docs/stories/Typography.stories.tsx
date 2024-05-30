import type { Meta, StoryObj } from "@storybook/react";
import Typography, { type TypographyProps } from "@ui/Typography";

const story: Meta<TypographyProps> = {
    component: Typography,
    title: "Typography/Typography",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Displays text in a visually appealing way",
            },
        },
    },
};

export default story;

export const Default: StoryObj<TypographyProps> = {
    args: {
        children: "Hello World!",
    },
};

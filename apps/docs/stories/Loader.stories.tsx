import { type Meta, type StoryObj } from "@storybook/react";
import Loader, { type LoaderProps } from "@ui/Loader";

const story: Meta<LoaderProps> = {
    component: Loader,
    title: "Components/Loader",
    parameters: {
        docs: {
            description: {
                component: "Animated spinner loader using SVG",
            },
        },
    },
};

export default story;

export const Default: StoryObj<LoaderProps> = {
    args: {
        className: "",
        size: 150,
        clockwise: true,
        strokeWidth: 5,
    },
};

import { type Meta, type StoryObj } from "@storybook/react";
import Profile, { type ProfileProps } from "@blog/Profile";

const story: Meta<ProfileProps> = {
    component: Profile,
    title: "Components/Profile",
    parameters: {
        docs: {
            description: {
                component: "Personal profile section",
            },
        },
    },
};

export default story;

export const Default: StoryObj<ProfileProps> = {
    args: {
        size: "large",
        showContact: true,
    },
};

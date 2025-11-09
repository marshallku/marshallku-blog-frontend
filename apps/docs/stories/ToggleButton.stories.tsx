import ToggleButton from "@ui/ToggleButton";
import ToggleButtonGroup, { type ToggleButtonGroupProps } from "@ui/ToggleButtonGroup";
import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

const story: Meta<ToggleButtonGroupProps<string>> = {
    component: ToggleButtonGroup,
    title: "ToggleButton/ToggleButton",
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

const VALUES = ["Web", "Mobile", "Desktop"];

export const Default: StoryObj<ToggleButtonGroupProps<string>> = {
    args: {
        multiple: false,
        enforceValueSet: true,
    },
    render: function Render(args) {
        const [value, setValue] = useState(VALUES[0]);
        return (
            <ToggleButtonGroup value={value} onChange={setValue} {...args}>
                {VALUES.map((v) => (
                    <ToggleButton key={v} value={v}>
                        {v}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        );
    },
};

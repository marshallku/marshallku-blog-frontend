import type { Preview } from "@storybook/react";
import "./styles/preview.css";
import "./styles/reset.scss";
import "./styles/globals.scss";

const preview: Preview = {
    parameters: {
        nextjs: {
            router: {},
            appDirectory: true,
        },
    },
};

export default preview;

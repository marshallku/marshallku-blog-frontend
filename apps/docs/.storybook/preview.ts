import { Preview } from "@storybook/react";
import { getRouter } from "@storybook/nextjs/router.mock";
import "#styles/reset.scss";
import "#styles/globals.scss";
import "../../blog/src/app/globals.css";

const preview: Preview = {
    parameters: {
        nextjs: {
            router: {},
        },
    },
    async beforeEach() {
        getRouter().push.mockImplementation(() => {});
    },
};

export default preview;

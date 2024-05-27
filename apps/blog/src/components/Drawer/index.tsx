"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DrawerContent from "#components/DrawerContent";
import Hamburger from "#components/Hamburger";

function Drawer() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const [opened, setOpened] = useState(false);
    const [willClose, setWillClose] = useState(false);

    return (
        <QueryClientProvider client={queryClient}>
            <Hamburger
                animationOnHover
                opened={!willClose && opened}
                onClick={() => {
                    setOpened((prev) => !prev);
                }}
            />
            {opened &&
                createPortal(
                    <DrawerContent
                        opened={opened}
                        willClose={willClose}
                        setWillClose={setWillClose}
                        closeDrawer={() => {
                            setOpened(false);
                            setWillClose(false);
                        }}
                    />,
                    document.getElementById("drawer-root")!,
                )}
        </QueryClientProvider>
    );
}

export default Drawer;

"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import DrawerContent from "#components/DrawerContent";
import Hamburger from "#components/Hamburger";

function Drawer() {
    const [opened, setOpened] = useState(false);
    const [willClose, setWillClose] = useState(false);

    return (
        <>
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
        </>
    );
}

export default Drawer;

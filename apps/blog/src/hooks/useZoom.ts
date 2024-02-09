"use client";

import { useRef } from "react";
import Zoom from "smooth-zoom";

export default function useZoom() {
    const zoom = useRef(
        Zoom(undefined, {
            background: "auto",
            onTransitionEnd(img) {
                img.src = img.src.replace(/\.w\d+\./, ".");
            },
        }),
    );

    return {
        attach: zoom.current.attach,
        detach: zoom.current.detach,
    };
}

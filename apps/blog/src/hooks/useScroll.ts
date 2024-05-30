"use client";

import { useCallback } from "react";
import { easeInOutCubic } from "#utils/easing";

const DEFAULT_DURATION = 500;

export interface Option {
    /** Use `window.scroll` instead */
    useNativeScroll?: boolean;
    /** Easing function */
    easing?(x: number): number;
}

export interface Coordinate {
    x?: number;
    y?: number;
}

export type Target = HTMLElement | ScrollToOptions | number | null | undefined;

const parseTarget = (target: NonNullable<Target>) => {
    if (typeof target === "number") {
        return { top: target, left: 0 };
    }

    if (target instanceof HTMLElement) {
        const { top, left } = target.getBoundingClientRect();

        return { top, left };
    }

    return target;
};

export default function useScroll({ useNativeScroll = false, easing = easeInOutCubic }: Option = {}) {
    const scroll = useCallback(
        (target: Target, duration = DEFAULT_DURATION) => {
            if (target == null) {
                return;
            }

            const to = parseTarget(target);

            if (useNativeScroll) {
                window.scrollTo(to);
                return;
            }

            const { scrollY: fromTop, scrollX: fromLeft } = window;

            const startTime = performance.now();

            const animation = () => {
                const { top: toTop = 0, left: toLeft = 0 } = to;

                const now = (performance.now() - startTime) / duration;
                const progress = easing(now);

                if (1 > now) {
                    window.requestAnimationFrame(animation);
                    window.scrollTo(fromLeft + (toLeft - fromLeft) * progress, fromTop + (toTop - fromTop) * progress);
                } else {
                    window.scrollTo(toLeft, toTop);
                }
            };

            animation();
        },
        [useNativeScroll, easing],
    );

    return {
        scroll,
    };
}

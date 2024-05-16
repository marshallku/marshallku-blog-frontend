export default function classNames(
    styles: Record<string, string> = {},
    rootClassName = "",
): (...names: unknown[]) => string {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const hasOwn = {}.hasOwnProperty;
    const func = (...names: unknown[]): string => {
        const classes: unknown[] = [];

        if (names.length === 0) {
            // It's root
            classes.push(styles[rootClassName] || rootClassName);
        }

        for (let i = 0, max = names.length; i < max; i++) {
            const name = names[i];

            // HACK: To add extra modifier in root
            if (name === "") {
                classes.push(styles[rootClassName] || rootClassName);
            }

            if (!name) {
                continue;
            }

            const nameType = typeof name;

            if (nameType === "string" || nameType === "number") {
                const nameWithRoot = `${rootClassName}${name as number | string}`;
                classes.push(styles[nameWithRoot] || nameWithRoot);
                continue;
            }

            if (Array.isArray(name)) {
                func(name);
                continue;
            }

            if (nameType === "object") {
                // It's not null and array, so it must be an object.
                for (const key in name as Record<string, unknown>) {
                    const keyWithRoot = rootClassName + key;

                    if (key === "className" && (name as Record<string, unknown>)[key]) {
                        classes.push((name as Record<string, unknown>)[key]);
                        continue;
                    }

                    if (hasOwn.call(name, keyWithRoot) && (name as Record<string, unknown>)[keyWithRoot]) {
                        classes.push(styles[keyWithRoot] || keyWithRoot);
                    }
                }
            }
        }

        return classes.join(" ");
    };

    return func;
}

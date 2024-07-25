export const toURL = (value: string) => {
    try {
        return new URL(value);
    } catch {
        // If the URL is relative, prepend the current origin.
        const host = window.location.origin;
        const path = value[0] === "/" ? value : `/${value}`;

        return new URL(path, host);
    }
};

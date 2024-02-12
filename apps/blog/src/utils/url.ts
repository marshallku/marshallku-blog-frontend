export const toURL = (value: string) => {
    try {
        return new URL(value);
    } catch {
        return new URL(`${window.location.origin}${value[0] === "/" ? value : `/${value}`}`);
    }
};

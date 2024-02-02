export function linear(x: number) {
    return x;
}

export function easeInSine(x: number) {
    return 1 - Math.cos((x * Math.PI) / 2);
}

export function easeInCubic(x: number) {
    return x * x * x;
}

export function easeInQuint(x: number) {
    return 1 - x * x * x * x * x;
}

export function easeInCirc(x: number) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
}

export function easeOutSine(x: number) {
    return Math.sin((x * Math.PI) / 2);
}

export function easeOutCubic(x: number) {
    return 1 - Math.pow(1 - x, 3);
}

export function easeOutQuint(x: number) {
    return 1 - Math.pow(1 - x, 5);
}

export function easeOutCirc(x: number) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
}

export function easeInOutSine(x: number) {
    return (Math.cos(Math.PI * x) - 1) / 2;
}

export function easeInOutCubic(x: number) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function easeInOutQuint(x: number) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

export function easeInOutCirc(x: number) {
    return x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
}

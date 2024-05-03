export function groupBy<T, U extends string | number | symbol>(
    iterable: Iterable<T>,
    callbackFn: (value: T) => U,
): Record<U, T[]> {
    const result: Partial<Record<U, T[]>> = {};

    for (const value of iterable) {
        const key = callbackFn(value);

        if (!result[key]) {
            result[key] = [];
        }

        (result[key] as NonNullable<Record<U, T[]>[U]>).push(value);
    }

    return result as Record<U, T[]>;
}

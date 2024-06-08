type RemoveNullish<T> = {
    [K in keyof T]: NonNullable<T[K]>;
};

export function removeNullish<T extends object>(obj: T): RemoveNullish<T> {
    const newObj = { ...obj };
    const result = {} as RemoveNullish<T>;

    for (const key in newObj) {
        // eslint-disable-next-line eqeqeq
        if (newObj[key] != null) {
            if (typeof newObj[key] === "object" && !Array.isArray(newObj[key])) {
                result[key as keyof RemoveNullish<T>] = removeNullish(newObj[key]) as NonNullable<
                    RemoveNullish<T>[keyof RemoveNullish<T>]
                >;
                continue;
            }

            result[key as keyof RemoveNullish<T>] = newObj[key] as NonNullable<
                RemoveNullish<T>[keyof RemoveNullish<T>]
            >;
        }
    }

    return result;
}

export type Enumerate<N extends number, A extends number[] = []> = A["length"] extends N
    ? A[number]
    : Enumerate<N, [...A, A["length"]]>;

/** Restrict `number` to a certain range */
export type Range<T extends number, K extends number> = Exclude<Enumerate<K>, Enumerate<T>>;

export type NonNullableProperties<T> = {
    [K in keyof T]-?: NonNullable<T[K]>;
};

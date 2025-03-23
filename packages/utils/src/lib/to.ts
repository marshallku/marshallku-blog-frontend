export default function to<T, E = Error>(promise: Promise<T>): Promise<[E, null] | [null, T]>;
export default function to<T, E = Error>(value: T): [E, null] | [null, T];
export default function to<T, E = Error>(
    promiseOrValue: Promise<T> | T,
): Promise<[E, null] | [null, T]> | ([E, null] | [null, T]) {
    if (promiseOrValue instanceof Promise) {
        return promiseOrValue
            .then<[null, T]>((data: T) => [null, data])
            .catch<[E, null]>((error) => {
                if (error instanceof Error) {
                    return [error as E, null];
                }

                return [{ message: "알 수 없는 오류가 발생했습니다" } as E, null];
            });
    }

    try {
        return [null, promiseOrValue];
    } catch (error) {
        if (error instanceof Error) {
            return [error as E, null];
        }

        return [{ message: "알 수 없는 오류가 발생했습니다" } as E, null];
    }
}

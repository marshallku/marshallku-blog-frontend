// eslint-disable-next-line @rushstack/no-new-null
export default async function to<T, E = Error>(promise: Promise<T>): Promise<[E, null] | [null, T]> {
    try {
        const data = await promise;

        return [null, data];
    } catch (error) {
        if (error instanceof Error) {
            return [error as E, null];
        }

        return [{ message: "알 수 없는 오류가 발생했습니다" } as E, null];
    }
}

/**
 * Runs the given function, and ignores any errors that may occur.
 */
export default function unsafe<T>(
    fn: () => T,
    logErrorOrExecute: boolean | ((error: unknown) => void) = false,
): T | null {
    try {
        return fn();
    } catch (error) {
        if (typeof logErrorOrExecute === "function") {
            logErrorOrExecute(error);
        } else if (!logErrorOrExecute) {
            console.error(error);
        }

        return null;
    }
}

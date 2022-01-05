export function ensure<T>(argument: T | undefined | null) {
    if (argument === undefined || argument === null) {
        throw new TypeError("Item could not be found")
    }

    return argument;
}
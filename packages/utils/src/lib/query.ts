export const stringifyQuery = <T extends object>(queryObject: T, encode = true, defaultString = "?"): string => {
    let queryString = defaultString;
    let isFirst = true;

    for (const key in queryObject) {
        const value = queryObject[key];

        // eslint-disable-next-line eqeqeq
        if (value == null) {
            continue;
        }

        const stringifiedValue = Array.isArray(value) ? value.join(",") : String(value);

        if (isFirst) {
            isFirst = false;
        } else {
            queryString += "&";
        }

        queryString += `${key}=${encode ? encodeURIComponent(stringifiedValue) : stringifiedValue}`;
    }

    return queryString.length > defaultString.length ? queryString : "";
};

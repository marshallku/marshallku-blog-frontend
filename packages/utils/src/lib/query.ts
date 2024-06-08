export const stringifyQuery = <T extends object>(queryObject: T, encode = true, defaultString = "?"): string => {
    let queryString = defaultString;
    let isFirst = true;

    for (const key in queryObject) {
        if (!Object.prototype.hasOwnProperty.call(queryObject, key)) {
            continue;
        }

        const value = queryObject[key];

        // eslint-disable-next-line eqeqeq
        if (value == null) {
            continue;
        }

        const isArray = Array.isArray(value);
        const stringifiedValue = isArray ? value.join(",") : String(value);

        if (isFirst) {
            isFirst = false;
        } else {
            queryString += "&";
        }

        queryString += `${key}=${encode && !isArray ? encodeURIComponent(stringifiedValue) : stringifiedValue}`;
    }

    return queryString.length > defaultString.length ? queryString : "";
};

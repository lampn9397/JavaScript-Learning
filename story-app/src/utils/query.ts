export const getQueryStringValue = (query: URLSearchParams, fieldName: string, defaultValue: string | number) => {
    let value: number | string = query.get(fieldName) || defaultValue

    if (value && typeof value === "number") {
        value = +value

        if (isNaN(value)) {
            value = defaultValue
        }
    }

    return value as typeof defaultValue
}

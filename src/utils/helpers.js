export const isString = value =>
    typeof value === "string" || value instanceof String;

export const isObject = value =>
    value && typeof value === "object" && value.constructor === Object;

export const isArray = value =>
    value && typeof value === "object" && value.constructor === Array;

export const camelToKebab = value =>
    value.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

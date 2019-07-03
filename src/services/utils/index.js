export const isString = value =>
  typeof value === "string" || value instanceof String;

export const isObject = value =>
  value && typeof value === "object" && value.constructor === Object;

export const isArray = value =>
  value && typeof value === "object" && value.constructor === Array;

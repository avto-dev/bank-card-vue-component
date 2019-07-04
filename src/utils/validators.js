/**
 * Compare current length with preset length
 * @param { String } type - Key of preset object
 * @returns { Function } - curried function
 */
export const length = type =>
    /**
     * @param { String } value - Value for comparing
     * @param { Object } vm - Instance
     * @returns { Boolean }
     */
        (value, vm) =>
        value.replace(/\s/g, "").length === vm[type].replace(/\s/g, "").length;

/**
 * Compare current value with minimum value
 * @param { String } min - Key of minimum value
 * @returns { Function }
 */
export const minValue = min =>
    /**
     * @param { String } value - Value for comparing
     * @param { Object } vm - Instance
     * @returns { Boolean }
     */
        (value, vm) => +value >= +vm[min];

/**
 * Compare current value with maximum value
 * @param { String } max - Key of maximum value
 * @returns { Function }
 */
export const maxValue = max =>
    /**
     * @param { String } value - Value for comparing
     * @param { Object } vm - Instance
     * @returns { Boolean }
     */
        (value, vm) => +value <= +vm[max];

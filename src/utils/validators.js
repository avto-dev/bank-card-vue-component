import { BRANDS_WITH_MULTIPLE_MASKS } from "@/consts";
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
    (value, vm) => {
        // Crutch of variables of card number length for maestro
        if (
            vm.cardInfo.brandAlias === "maestro" &&
            value.replace(/\s/g, "").length >= 18
        ) {
            return true;
        }

        const valueSymbolLength = value.replace(/\s/g, "").length;
        const isMultipleMaskBrand = BRANDS_WITH_MULTIPLE_MASKS.includes(
            vm.cardInfo.brandAlias
        );

        // This brands has custom of count numbers on card number
        if (isMultipleMaskBrand && type === "cardNumberMask") {
            const isNumberValid = vm.cardInfo.allMasks.some(
                mask => valueSymbolLength === mask.replace(/\s/g, "").length
            );
            return isNumberValid;
        }

        return valueSymbolLength === vm[type].replace(/\s/g, "").length;
    };

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

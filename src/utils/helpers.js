export const isString = (value) =>
    typeof value === "string" || value instanceof String;

export const isObject = (value) =>
    value && typeof value === "object" && value.constructor === Object;

export const isArray = (value) =>
    value && typeof value === "object" && value.constructor === Array;

export const camelToKebab = (value) =>
    value.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

export const isObjectEmpty = (obj) =>
    Object.entries(obj).length === 0 && obj.constructor === Object;

/**
 * Get mask with max size
 * @param masks - all masks
 * @returns {string} - mask with max size
 */
export const getLongestMask = (masks) => {
    const sorted = masks.sort(function (a, b) {
        return b.length - a.length;
    });
    return sorted[0];
};

/**
 *
 * @param card - card info
 * @param inputValue - value from input
 * @returns { boolean } -inputValue equal to one of masks
 */
export const equalToOneMask = (card, inputValue) => {
    const maxSizeMask = getLongestMask(card.allMasks);
    const maxAllowedSymbols = maxSizeMask.replace(/\s/g, "").length;
    const inputSymbolCount = inputValue.replace(/\s/g, "").length;
    return inputSymbolCount === maxAllowedSymbols;
};

export const generateBlock = (numberGaps, numberLength) => {
    let maxInputSize = numberLength;
    const blocks = [];
    for (let i = numberGaps.length - 1; i >= 0; i--) {
        const blockLength = maxInputSize - numberGaps[i];
        if (blockLength > 0) {
            maxInputSize = maxInputSize - blockLength;
            blocks.push(blockLength);
        }
    }
    blocks.push(maxInputSize);
    return blocks.reverse();
};

export const generateMask = (numberBlocks) => {
    return numberBlocks.reduce((prevCell, cellCharsLength, idx) => {
        const cellMask = prevCell + Array(cellCharsLength + 1).join("#");
        const delimiter = " ";
        return idx < numberBlocks.length - 1
            ? `${cellMask}${delimiter}`
            : cellMask;
    }, "");
};

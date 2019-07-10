import readBanks from "./read-banks";

const banksWithPrefixes = readBanks();

export const getBanks = () => {
    const banks = {};
    for (const bank of banksWithPrefixes) {
        const bankWithoutPrefixes = { ...bank };
        delete bankWithoutPrefixes.prefixes;
        banks[bank.alias] = bankWithoutPrefixes;
    }

    return banks;
};

export const getPrefixes = () => {
    const prefixes = {};
    for (const bank of banksWithPrefixes) {
        const prefixesArray = [...bank.prefixes];
        for (const prefix of prefixesArray) {
            prefixes[prefix] = bank.alias;
        }
    }

    return prefixes;
};

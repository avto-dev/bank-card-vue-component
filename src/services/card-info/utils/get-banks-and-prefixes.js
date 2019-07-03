import readBanks from "./read-banks";

const banksWithPrefixes = readBanks();

const getBanks = () => {
  const banks = {};
  for (const bank of banksWithPrefixes) {
    const bankWithoutPrefixes = { ...bank };
    delete bankWithoutPrefixes.prefixes;
    banks[bank.alias] = bankWithoutPrefixes;
  }

  return banks;
};

const getPrefixes = () => {
  const prefixes = {};
  for (const bank of banksWithPrefixes) {
    const prefixesArray = [...bank.prefixes];
    for (const prefix of prefixesArray) {
      prefixes[prefix] = bank.alias;
    }
  }

  return prefixes;
};

export const banks = getBanks();
export const prefixes = getPrefixes();

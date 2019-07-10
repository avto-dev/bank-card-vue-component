import * as schemas from "../banks/schemas";

export default () => {
    const banks = [];
    for (const [key, value] of Object.entries(schemas)) {
        const bank = { ...value };
        bank.country = "ru";
        bank.alias = `${bank.country}-${key}`;
        bank.logo = `${bank.alias}`;
        bank.logoSm = `${bank.alias}-sm`;
        banks.push(bank);
    }
    return banks;
};

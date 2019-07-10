import * as schemas from "../brands/schemas";

export default () => {
    const brands = {};
    for (const brand of Object.values(schemas)) {
        brands[brand.alias] = brand;
    }
    return brands;
};

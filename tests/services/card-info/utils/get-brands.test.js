import getBrands from "@/services/card-info/utils/get-brands";
import { isObject } from "@/utils/helpers";

describe("getBrands", () => {
    const brands = getBrands();

    it("brands must be an object", () => {
        expect(isObject(brands)).toBeTruthy();
    });

    it("brands must contain certain keys", () => {
        const keys = [
            "alias",
            "name",
            "codeName",
            "codeLength",
            "gaps",
            "lengths",
            "pattern"
        ];

        for (const key of Object.keys(brands)) {
            const item = brands[key];
            expect(Object.keys(item)).toEqual(keys);
        }
    });
});

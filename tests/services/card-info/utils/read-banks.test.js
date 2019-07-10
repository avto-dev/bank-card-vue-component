import readBanks from "@/services/card-info/utils/read-banks";
import { isArray, isObject } from "@/utils/helpers";

describe("readBanks", () => {
    const banks = readBanks();
    it("banks must be an array", () => {
        expect(isArray(banks)).toBeTruthy();
    });

    it("items in banks must be an object", () => {
        for (const bank of banks) {
            expect(isObject(bank)).toBeTruthy();
        }
    });

    it("items in banks must contain certain keys", () => {
        const keys = [
            "name",
            "nameEn",
            "url",
            "backgroundColor",
            "backgroundColors",
            "backgroundLightness",
            "logoStyle",
            "text",
            "prefixes",
            "country",
            "alias",
            "logo",
            "logoSm"
        ];

        for (const bank of banks) {
            expect(Object.keys(bank)).toEqual(keys);
        }
    });
});

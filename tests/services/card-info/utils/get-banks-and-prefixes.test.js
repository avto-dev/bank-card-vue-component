import {
    getBanks,
    getPrefixes
} from "@/services/card-info/utils/get-banks-and-prefixes";
import { isObject, isString } from "@/utils/helpers";

describe("get banks and prefixes", () => {
    describe("getBanks", () => {
        const banks = getBanks();

        it("banks must be an object", () => {
            expect(isObject(banks)).toBeTruthy();
        });

        it("items in banks must be an object", () => {
            for (const key of Object.keys(banks)) {
                expect(isObject(banks[key])).toBeTruthy();
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
                "country",
                "alias",
                "logo",
                "logoSm"
            ];

            for (const key of Object.keys(banks)) {
                const item = banks[key];
                expect(Object.keys(item)).toEqual(keys);
            }
        });
    });

    describe("getPrefixes", () => {
        const prefixes = getPrefixes();

        it("brands must be an object", () => {
            expect(isObject(prefixes)).toBeTruthy();
        });

        it("items in prefixes must be a string", () => {
            for (const key of Object.keys(prefixes)) {
                expect(isString(prefixes[key])).toBeTruthy();
            }
        });
    });
});

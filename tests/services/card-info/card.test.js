import Card from "@/services/card-info/card";

describe("Card", () => {
    it("has default properties", () => {
        const cardDefault = {
            bankAlias: null,
            bankName: null,
            bankNameEn: null,
            bankCountry: null,
            bankUrl: null,
            bankLogo: null,
            bankLogoSm: null,
            bankLogoStyle: null,
            backgroundColor: "#eeeeee",
            backgroundColors: ["#eeeeee", "#dddddd"],
            backgroundLightness: "light",
            backgroundGradient: null,
            textColor: "#000",
            brandAlias: null,
            brandName: null,
            brandLogo: null,
            codeName: null,
            codeLength: null,
            numberMask: null,
            numberGaps: [4, 8, 12, 16],
            numberBlocks: null,
            allBlocks: null,
            allMasks: null,
            numberLengths: [12, 13, 14, 15, 16, 17, 18, 19],
            numberNice: null,
            number: null,
            numberSource: null,
            options: {
                banksLogosPath: "banks-logos/",
                brandsLogosPath: "brands-logos/",
                brandLogoPolicy: "auto",
                maskDigitSymbol: "#",
                maskDelimiterSymbol: " ",
                gradientDegrees: 135
            }
        };
        const card = new Card();

        for (const [key, value] of Object.entries(cardDefault)) {
            const method = typeof value === "object" ? "toEqual" : "toBe";

            expect(card[key])[method](value);
        }
    });

    it("set options", () => {
        const options = {
            banksLogosPath: "banks/",
            brandsLogosPath: "brands/",
            brandLogoPolicy: "colored",
            maskDigitSymbol: "0",
            maskDelimiterSymbol: ".",
            gradientDegrees: 45
        };
        const card = new Card(options);

        expect(card.options).toEqual(options);
    });
});

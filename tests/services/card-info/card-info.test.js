import Card from "@/services/card-info/card";
import CardInfo from "@/services/card-info";

const mirCards = [
    {
        number: "2200000000000000000",
        formattedNumber: "2200 0000 0000 0000 000",
        brand: "mir",
    },
    {
        number: "2200000000000004",
        formattedNumber: "2200 0000 0000 0004",
        brand: "mir",
    },
    {
        number: "2202000000003055",
        formattedNumber: "2202 0000 0000 3055",
        brand: "mir",
    },
    {
        number: "2200000022222222",
        formattedNumber: "2200 0000 2222 2222",
        brand: "mir",
    },
];
const undefinedCards = [
    {
        number: "2100000000000000000",
        formattedNumber: "2100 0000 0000 0000 000",
        allMasks: [
            "#### #### ####",
            "#### #### #### #",
            "#### #### #### ##",
            "#### #### #### ###",
            "#### #### #### ####",
            "#### #### #### #### #",
            "#### #### #### #### ##",
            "#### #### #### #### ###",
        ],
        brand: null,
    },
    {
        number: "2100000000000000000",
        formattedNumber: "2100 0000 0000 0000 000",
        allMasks: [
            "#### #### ####",
            "#### #### #### #",
            "#### #### #### ##",
            "#### #### #### ###",
            "#### #### #### ####",
            "#### #### #### #### #",
            "#### #### #### #### ##",
            "#### #### #### #### ###",
        ],
        brand: null,
    },
];

describe("Card-info", () => {
    it("is instance of Card", () => {
        const cardInfo = new CardInfo();

        expect(cardInfo instanceof Card).toBeTruthy();
    });

    it("set options", () => {
        const options = {
            banksLogosPath: "banks/",
            brandsLogosPath: "brands/",
            brandLogoPolicy: "colored",
            maskDigitSymbol: "0",
            maskDelimiterSymbol: ".",
            gradientDegrees: 45,
        };
        const cardInfo = new CardInfo("", options);

        expect(cardInfo.options).toEqual(options);
    });

    describe("getting info", () => {
        const number = "5536911122223333";
        const cardInfo = new CardInfo(number);

        const testValues = (infoObject) => {
            for (const [key, value] of Object.entries(infoObject)) {
                const method = typeof value === "object" ? "toEqual" : "toBe";

                expect(cardInfo[key])[method](value);
            }
        };

        describe("base", () => {
            it("bank", () => {
                const bankInfo = {
                    bankAlias: "ru-tinkoff",
                    bankCountry: "ru",
                    bankLogo: "banks-logos/ru-tinkoff.png",
                    bankLogoSm: "banks-logos/ru-tinkoff-sm.png",
                    bankLogoStyle: "white",
                    bankName: "Тинькофф Банк",
                    bankNameEn: "Tinkoff Bank",
                };

                testValues(bankInfo);
            });

            it("brand", () => {
                const brandInfo = {
                    brandAlias: "master-card",
                    brandLogo: "brands-logos/master-card-white.svg",
                    brandName: "MasterCard",
                };

                testValues(brandInfo);
            });

            it("code", () => {
                const codeInfo = {
                    codeLength: 3,
                    codeName: "CVC",
                };

                testValues(codeInfo);
            });
        });

        describe("additional", () => {
            it("number", () => {
                const numberInfo = {
                    number,
                    numberBlocks: [4, 4, 4, 4],
                    numberGaps: [4, 8, 12],
                    numberLengths: [16],
                    numberMask: "#### #### #### ####",
                    numberNice: "5536 9111 2222 3333",
                    numberSource: number,
                };

                testValues(numberInfo);
            });

            it("colors", () => {
                const colorInfo = {
                    backgroundColor: "#333",
                    backgroundColors: ["#444", "#222"],
                    backgroundGradient: "linear-gradient(135deg, #444, #222)",
                    backgroundLightness: "dark",
                    textColor: "#fff",
                };

                testValues(colorInfo);
            });
        });
    });

    describe.each(mirCards)(
        "Check MIR card",
        ({ number, formattedNumber, brand }) => {
            const ALL_MIR_MASKS = [
                "#### #### #### ####",
                "#### #### #### #### ###",
            ];
            const cardInfo = new CardInfo(number);

            const testValues = (infoObject) => {
                for (const [key, value] of Object.entries(infoObject)) {
                    const method =
                        typeof value === "object" ? "toEqual" : "toBe";

                    expect(cardInfo[key])[method](value);
                }
            };

            describe("Check base information", () => {
                it("bank", () => {
                    const bankInfo = {
                        bankAlias: null,
                        bankCountry: null,
                        bankLogo: null,
                        bankLogoSm: null,
                        bankLogoStyle: null,
                        bankName: null,
                        bankNameEn: null,
                    };

                    testValues(bankInfo);
                });

                it("Check card brand", () => {
                    const brandInfo = {
                        brandAlias: brand ? brand.toLowerCase() : null,
                        brandName: brand ? brand.toUpperCase() : null,
                    };

                    testValues(brandInfo);
                });

                it("masks", () => {
                    const maskInfo = {
                        allMasks: ALL_MIR_MASKS,
                        numberNice: formattedNumber,
                    };

                    testValues(maskInfo);
                });

                it("Check card code", () => {
                    const codeInfo = {
                        codeLength: 3,
                        codeName: "CVC",
                    };

                    testValues(codeInfo);
                });
            });

            describe("Check card additional information", () => {
                it(`Card number is: ${formattedNumber}`, () => {
                    const numberInfo = {
                        number,
                        numberBlocks: [4, 4, 4, 4, 3],
                        numberGaps: [4, 8, 12, 16],
                        numberLengths: [16, 19],
                        numberMask: "#### #### #### #### ###",
                        numberNice: formattedNumber,
                        numberSource: number,
                    };

                    testValues(numberInfo);
                });

                it("colors", () => {
                    const colorInfo = {
                        backgroundColor: "#eeeeee",
                        backgroundColors: ["#eeeeee", "#dddddd"],
                        backgroundGradient:
                            "linear-gradient(135deg, #eeeeee, #dddddd)",
                        backgroundLightness: "light",
                        textColor: "#000",
                    };

                    testValues(colorInfo);
                });
            });
        }
    );

    describe.each(undefinedCards)(
        "Check unknown bank card",
        ({ number, formattedNumber, allMasks, brand }) => {
            const cardInfo = new CardInfo(number);

            const testValues = (infoObject) => {
                for (const [key, value] of Object.entries(infoObject)) {
                    const method =
                        typeof value === "object" ? "toEqual" : "toBe";

                    expect(cardInfo[key])[method](value);
                }
            };

            describe("Check base information", () => {
                it("bank", () => {
                    const bankInfo = {
                        bankAlias: null,
                        bankCountry: null,
                        bankLogo: null,
                        bankLogoSm: null,
                        bankLogoStyle: null,
                        bankName: null,
                        bankNameEn: null,
                    };

                    testValues(bankInfo);
                });

                it("brand", () => {
                    const brandInfo = {
                        brandAlias: brand ? brand.toLowerCase() : null,
                        brandName: brand ? brand.toUpperCase() : null,
                    };

                    testValues(brandInfo);
                });

                it("masks", () => {
                    const maskInfo = {
                        allMasks: allMasks,
                        numberNice: formattedNumber,
                    };

                    testValues(maskInfo);
                });

                it("code", () => {
                    const codeInfo = {
                        codeLength: null,
                        codeName: null,
                    };

                    testValues(codeInfo);
                });
            });

            describe("Check card additional information", () => {
                it(`Card number is: ${formattedNumber}`, () => {
                    const numberInfo = {
                        number,
                        numberBlocks: [4, 4, 4, 4, 3],
                        numberGaps: [4, 8, 12, 16],
                        numberLengths: [12, 13, 14, 15, 16, 17, 18, 19],
                        numberMask: "#### #### #### #### ###",
                        numberNice: formattedNumber,
                        numberSource: number,
                    };

                    testValues(numberInfo);
                });

                it("colors", () => {
                    const colorInfo = {
                        backgroundColor: "#eeeeee",
                        backgroundColors: ["#eeeeee", "#dddddd"],
                        backgroundGradient:
                            "linear-gradient(135deg, #eeeeee, #dddddd)",
                        backgroundLightness: "light",
                        textColor: "#000",
                    };

                    testValues(colorInfo);
                });
            });
        }
    );
});

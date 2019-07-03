import Card from "@/services/card-info/card";
import CardInfo from "@/services/card-info";

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
      gradientDegrees: 45
    };
    const cardInfo = new CardInfo("", options);

    expect(cardInfo.options).toEqual(options);
  });

  describe("getting info", () => {
    const number = "5536911122223333";
    const cardInfo = new CardInfo(number);

    const testValues = infoObject => {
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
          bankNameEn: "Tinkoff Bank"
        };

        testValues(bankInfo);
      });

      it("brand", () => {
        const brandInfo = {
          brandAlias: "master-card",
          brandLogo: "brands-logos/master-card-white.png",
          brandName: "MasterCard"
        };

        testValues(brandInfo);
      });

      it("code", () => {
        const codeInfo = {
          codeLength: 3,
          codeName: "CVC"
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
          numberSource: number
        };

        testValues(numberInfo);
      });

      it("colors", () => {
        const colorInfo = {
          backgroundColor: "#333",
          backgroundColors: ["#444", "#222"],
          backgroundGradient: "linear-gradient(135deg, #444, #222)",
          backgroundLightness: "dark",
          textColor: "#fff"
        };

        testValues(colorInfo);
      });
    });
  });
});

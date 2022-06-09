export default class Card {
    constructor(options) {
        this.bankAlias = null;
        this.bankName = null;
        this.bankNameEn = null;
        this.bankCountry = null;
        this.bankUrl = null;
        this.bankLogo = null;
        this.bankLogoSm = null;
        this.bankLogoStyle = null;
        this.backgroundColor = "#eeeeee";
        this.backgroundColors = ["#eeeeee", "#dddddd"];
        this.backgroundLightness = "light";
        this.backgroundGradient = null;
        this.textColor = "#000";
        this.brandAlias = null;
        this.brandName = null;
        this.brandLogo = null;
        this.codeName = null;
        this.codeLength = null;
        this.numberMask = null;
        this.numberGaps = [4, 8, 12, 16];
        this.allBlocks = null;
        this.allMasks = null;
        this.numberBlocks = null;
        this.numberLengths = [12, 13, 14, 15, 16, 17, 18, 19];
        this.numberNice = null;
        this.number = null;
        this.numberSource = null;
        this.options = {
            banksLogosPath: "banks-logos/",
            brandsLogosPath: "brands-logos/",
            brandLogoPolicy: "auto",
            maskDigitSymbol: "#",
            maskDelimiterSymbol: " ",
            gradientDegrees: 135,
            ...options,
        };
    }
}

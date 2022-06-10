import Card from "./card";
import banks from "./banks";
import brands from "./brands";
import prefixes from "./prefixes";
import { generateBlock, generateMask } from "../../utils/helpers";

export default class CardInfo extends Card {
    constructor(numberSource = "", options) {
        super(options);

        this.numberSource = numberSource;
        this.number = this._getNumber(this.numberSource);

        const bankData = this._getBank(this.number);
        if (bankData) {
            this.bankAlias = bankData.alias;
            this.bankName = bankData.name;
            this.bankNameEn = bankData.nameEn;
            this.bankCountry = bankData.country;
            this.bankUrl = bankData.url;
            this.bankLogo = this._getLogo(
                this.options.banksLogosPath,
                bankData.logo
            );
            this.bankLogoSm = this._getLogo(
                this.options.banksLogosPath,
                bankData.logoSm
            );
            this.bankLogoStyle = bankData.logoStyle;
            this.backgroundColor = bankData.backgroundColor;
            this.backgroundColors = bankData.backgroundColors;
            this.backgroundLightness = bankData.backgroundLightness;
            this.textColor = bankData.text;
        }

        this.backgroundGradient = this._getGradient(
            this.backgroundColors,
            this.options.gradientDegrees
        );

        const brandData = this._getBrand(this.number);
        if (brandData) {
            this.brandAlias = brandData.alias;
            this.brandName = brandData.name;
            const brandLogoBasename = this._getBrandLogoBasename(
                this.brandAlias,
                this.options.brandLogoPolicy,
                this.backgroundLightness,
                this.bankLogoStyle
            );
            this.brandLogo = this._getLogo(
                this.options.brandsLogosPath,
                brandLogoBasename
            );
            this.codeName = brandData.codeName;
            this.codeLength = brandData.codeLength;
            this.numberLengths = brandData.lengths;
            this.numberGaps = brandData.gaps;
        }

        this.numberBlocks = this._getBlocks(
            this.numberGaps,
            this.numberLengths
        );

        this.allBlocks = this._getAllBlocks(
            this.numberGaps,
            this.numberLengths
        );

        this.allMasks = this._getAllMasks(
            this.options.maskDigitSymbol,
            this.options.maskDelimiterSymbol,
            this.allBlocks
        );

        this.numberMask = this._getMask(
            this.options.maskDigitSymbol,
            this.options.maskDelimiterSymbol,
            this.numberBlocks
        );
        this.numberNice = this._getNumberNice(this.number, this.numberGaps);
    }

    _getNumber(numberSource) {
        let numberSourceString = numberSource + "";
        return /^[\d ]*$/.test(numberSourceString)
            ? numberSourceString.replace(/\D/g, "")
            : "";
    }

    _getBank(number) {
        if (number.length < 6) return undefined;
        const prefix = number.substr(0, 6);
        return prefixes[prefix] ? banks[prefixes[prefix]] : undefined;
    }

    _getBrand(number) {
        const brs = [];
        Object.values(brands).forEach((brand) => {
            if (brand.pattern.test(number)) brs.push(brand);
        });
        if (brs.length === 1) return brs[0];
    }

    _getBrandLogoBasename(
        brandAlias,
        brandLogoPolicy,
        backgroundLightness,
        bankLogoStyle
    ) {
        switch (brandLogoPolicy) {
            case "auto":
                return brandAlias + "-" + (bankLogoStyle || "colored");
            case "colored":
                return brandAlias + "-colored";
            case "mono":
                return (
                    brandAlias +
                    (backgroundLightness === "light" ? "-black" : "-white")
                );
            case "black":
                return brandAlias + "-black";
            case "white":
                return brandAlias + "-white";
        }
    }

    _getLogo(dirname, basename) {
        let ext = ".png";
        const svgLogos = ["jcb", "master-card", "maestro", "visa", "mir"];
        for (const logo of svgLogos) {
            if (basename.includes(logo)) {
                ext = ".svg";
                break;
            }
        }
        return basename ? dirname + basename + ext : null;
    }

    _getGradient(backgroundColors, gradientDegrees) {
        return (
            "linear-gradient(" +
            gradientDegrees +
            "deg, " +
            backgroundColors.join(", ") +
            ")"
        );
    }

    _getBlocks(numberGaps, numberLengths) {
        let numberLength = numberLengths[numberLengths.length - 1];
        const blocks = [];
        for (let i = numberGaps.length - 1; i >= 0; i--) {
            const blockLength = numberLength - numberGaps[i];
            numberLength -= blockLength;
            blocks.push(blockLength);
        }
        blocks.push(numberLength);
        return blocks.reverse();
    }

    _getAllBlocks(numberGaps, numberLengths) {
        let result = [];
        for (let numberLength of numberLengths) {
            const block = generateBlock(numberGaps, numberLength);
            result.push(block);
        }
        return result;
    }

    _getMask(maskDigitSymbol, maskDelimiterSymbol, numberBlocks) {
        let mask = "";
        for (let i = 0; i < numberBlocks.length; i++) {
            mask +=
                (i ? maskDelimiterSymbol : "") +
                Array(numberBlocks[i] + 1).join(maskDigitSymbol);
        }
        return mask;
    }

    _getAllMasks(maskDigitSymbol, maskDelimiterSymbol, allBlocks) {
        const masks = [];
        for (const numberBlocks of allBlocks) {
            const mask = generateMask(numberBlocks);

            masks.push(mask);
        }
        return masks;
    }

    _getNumberNice(number, numberGaps) {
        const offsets = [0].concat(numberGaps).concat([number.length]);
        const components = [];
        for (let i = 0; offsets[i] < number.length; i++) {
            let start = offsets[i];
            let end = Math.min(offsets[i + 1], number.length);
            components.push(number.substring(start, end));
        }
        return components.join(" ");
    }
}

import { required } from "vuelidate/lib/validators";
import { length, minValue, maxValue } from "@/utils/validators";

const ABSOLUTE_MIN_YEAR = 0;
const ABSOLUTE_MAX_YEAR = 99;

export default {
    props: {
        isYearValidation: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            minMMDefault: "01",
            maxMMDefault: "12"
        };
    },
    computed: {
        /**
         * Get mask for card number
         * @returns {String}
         */
        cardNumberMask() {
            return this.cardInfo.numberMask;
        },
        /**
         * Get mask for expiration date month
         * @returns {String}
         */
        expDateMonthMask() {
            return "##";
        },
        /**
         * Get mask for expiration date year
         * @returns {String}
         */
        expDateYearMask() {
            return "##";
        },
        /**
         * Get mask for code number
         * @returns {String}
         */
        cvvMask() {
            let mask = "";
            const maskSymbol = "#";
            const codeLength = this.cardInfo.codeLength || 3;

            for (let i = 0; i < codeLength; i++) {
                mask += maskSymbol;
            }

            return mask;
        },
        /**
         * Current year in YY date format
         * @returns {String}
         */
        currentYY() {
            const date = new Date();
            const year = date.getFullYear();
            return year.toString().substr(-2);
        },
        /**
         * Get minimum year for date of expiration year
         * @returns {String}
         */
        minYear() {
            if (this.isYearValidation) {
                return this.currentYY;
            }
            return ABSOLUTE_MIN_YEAR;
        },
        /**
         * Get maximum year for date of expiration year
         * @returns {String}
         */
        maxYear() {
            if (this.isYearValidation) {
                return (+this.currentYY + 10).toString();
            }
            return ABSOLUTE_MAX_YEAR;
        },
        /**
         * Current month in MM date format
         * @returns {String}
         */
        currentMM() {
            const date = new Date();
            let month = date.getMonth() + 1;
            month < 10 && (month = "0" + month);

            return month;
        },
        /**
         * Get minimum month for date of expiration month
         * @returns {String} - Month in mm date format
         */
        minMonth() {
            return this.expDateYear === this.minYear
                ? this.currentMM
                : this.minMMDefault;
        },
        /**
         * Get maximum month for date of expiration month
         * @returns {String} - Month in mm date format
         */
        maxMonth() {
            return this.maxMMDefault;
        }
    },
    validations: {
        cardNumber: {
            required: required,
            length: length("cardNumberMask")
        },
        expDateMonth: {
            required: required,
            length: length("expDateMonthMask"),
            minValue: minValue("minMonth"),
            maxValue: maxValue("maxMonth")
        },
        expDateYear: {
            required: required,
            length: length("expDateYearMask"),
            minValue: minValue("minYear"),
            maxValue: maxValue("maxYear")
        },
        cvv: {
            required: required,
            length: length("cvvMask")
        }
    }
};

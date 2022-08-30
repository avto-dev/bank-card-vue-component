<template>
    <article class="vue-bank-card__wrapper">
        <VueBankCardBase
            v-if="!isSmall"
            :is-new="isNew"
            :card-info="cardInfo"
            :card-number="cardNumber"
            :card-holder-name="cardHolderName"
            :exp-date-month="expDateMonth"
            :exp-date-year="expDateYear"
            :cvv="cvv"
            :errors="errors"
            :is-reset="isReset"
            :is-focus="isFocus"
            :images-base-path="imagesBasePath"
            :is-year-validation="isYearValidation"
            @input-card-number="cardNumber = $event"
            @input-exp-date-month="expDateMonth = $event"
            @input-exp-date-year="expDateYear = $event"
            @input-cvv="cvv = $event"
            @enter="$emit('enter', $event)"
            @clear-errors="$emit('clear-errors', $event)"
            @reset="$emit('reset', $event)"
        />
        <VueBankCardSmall
            v-else
            :is-new="isNew"
            :card-info="cardInfo"
            :card-number="cardNumber"
            :card-holder-name="cardHolderName"
            :exp-date-month="expDateMonth"
            :exp-date-year="expDateYear"
            :cvv="cvv"
            :errors="errors"
            :disable-delete="disableDelete"
            :is-reset="isReset"
            :is-focus="isFocus"
            :images-base-path="imagesBasePath"
            :is-year-validation="isYearValidation"
            @input-card-number="cardNumber = $event"
            @input-exp-date-month="expDateMonth = $event"
            @input-exp-date-year="expDateYear = $event"
            @input-cvv="cvv = $event"
            @enter="$emit('enter', $event)"
            @clear-errors="$emit('clear-errors', $event)"
            @reset="$emit('reset', $event)"
            @delete-card="deleteCard"
        />
    </article>
</template>

<script>
import CardInfo from "@/services/card-info";

import VueBankCardBase from "./VueBankCardBase";
import VueBankCardSmall from "./VueBankCardSmall";

export default {
    name: "VueBankCard",
    components: {
        VueBankCardBase,
        VueBankCardSmall
    },
    props: {
        isSmall: {
            type: Boolean,
            default: false
        },
        isNew: {
            type: Boolean,
            default: false
        },
        disableDelete: {
            type: Boolean,
            default: false
        },
        number: {
            type: [String, Object],
            default: ""
        },
        errors: {
            type: Object,
            default: () => ({})
        },
        isReset: {
            type: Boolean,
            default: false
        },
        isFocus: {
            type: Boolean,
            default: false
        },
        imagesBasePath: {
            type: String,
            default: String(
                process.env.BANK_CARD_VUE_COMPONENT_IMAGES_BASE_PATH
            )
        },
        isYearValidation: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            cardNumber: "",
            expDateMonth: "",
            expDateYear: "",
            cvv: "",
            cardHolderName: "CARDHOLDER NAME"
        };
    },
    methods: {
        deleteCard(event) {
            if (!this.disableDelete) {
                this.$emit("delete-card", event);
            }
        }
    },
    computed: {
        /**
         * Get card information by card number via card-info service
         * @returns {Object}
         */
        cardInfo() {
            return new CardInfo(this.cardNumber);
        },
        /**
         * Transform number if it is an object
         * @returns {String}
         */
        numberTransform() {
            if (typeof this.number === "object") {
                const cardInfo = new CardInfo(this.number.first_six);
                let lengthNumber = 0;
                const lengthKnown = 10;
                cardInfo.numberBlocks.forEach(block => (lengthNumber += block));
                const mask = "0".repeat(lengthNumber - lengthKnown);
                return this.number.first_six + mask + this.number.last_four;
            }
            return this.number;
        }
    },
    watch: {
        numberTransform: {
            immediate: true,
            handler(v) {
                this.cardNumber = v;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=PT+Sans&display=swap&subset=cyrillic");
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap&subset=cyrillic");

$font-path: "https://cdn.jsdelivr.net/gh/noppa/text-security@master/dist/";

@font-face {
    font-family: "text-security-disc";
    src: url("#{$font-path}text-security-disc.eot");
    src: url("#{$font-path}text-security-disc.eot?#iefix")
            format("embedded-opentype"),
        url("#{$font-path}text-security-disc.woff2") format("woff2"),
        url("#{$font-path}text-security-disc.woff") format("woff"),
        url("#{$font-path}text-security-disc.ttf") format("truetype"),
        url("#{$font-path}text-security-disc.svg#text-security") format("svg");
}

.vue-bank-card__wrapper {
    width: 100%;
}
</style>

<style lang="scss">
.vue-bank-card__wrapper {
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
}
</style>

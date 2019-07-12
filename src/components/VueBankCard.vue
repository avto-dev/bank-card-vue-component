<template>
    <article class="vue-bank-card__wrapper">
        <VueBankCardBase
            v-if="!isSmall"
            :is-new="isNew"
            :card-info="cardInfo"
            :number="cardNumber"
            :name="cardHolderName"
            :month="expDateMonth"
            :year="expDateYear"
            :code="cvv"
            :errors="errors"
            :is-reset="isReset"
            :images-base-path="imagesBasePath"
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
            :number="cardNumber"
            :name="cardHolderName"
            :month="expDateMonth"
            :year="expDateYear"
            :code="cvv"
            :errors="errors"
            :is-reset="isReset"
            :images-base-path="imagesBasePath"
            @input-card-number="cardNumber = $event"
            @input-exp-date-month="expDateMonth = $event"
            @input-exp-date-year="expDateYear = $event"
            @input-cvv="cvv = $event"
            @enter="$emit('enter', $event)"
            @clear-errors="$emit('clear-errors', $event)"
            @reset="$emit('reset', $event)"
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
        imagesBasePath: {
            type: String,
            default: String(
                process.env.BANK_CARD_VUE_COMPONENT_IMAGES_BASE_PATH
            )
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
    created() {
        this.init();
    },
    methods: {
        init() {
            this.cardNumber = this.numberTransform;
        }
    }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=PT+Sans&display=swap&subset=cyrillic");
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap&subset=cyrillic");

.vue-bank-card__wrapper {
    width: 100%;
}
</style>

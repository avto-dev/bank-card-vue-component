<template>
  <article style="width: 100%">
    <CardBase
      v-if="!isSmall"
      :is-new="isNew"
      :card-info="cardInfo"
      :card-number="cardNumber"
      :card-holder-name="cardHolderName"
      :exp-date-month="expDateMonth"
      :exp-date-year="expDateYear"
      :cvv="cvv"
      :errors="errors"
      @input-card-number="cardNumber = $event"
      @input-exp-date-month="expDateMonth = $event"
      @input-exp-date-year="expDateYear = $event"
      @input-cvv="cvv = $event"
      @enter="$emit('enter', $event)"
      @clear-errors="$emit('clear-errors', $event)"
    />
    <CardSmall
      v-else
      :is-new="isNew"
      :card-info="cardInfo"
      :card-number="cardNumber"
      :card-holder-name="cardHolderName"
      :exp-date-month="expDateMonth"
      :exp-date-year="expDateYear"
      :cvv="cvv"
      :errors="errors"
      @input-card-number="cardNumber = $event"
      @input-exp-date-month="expDateMonth = $event"
      @input-exp-date-year="expDateYear = $event"
      @input-cvv="cvv = $event"
      @enter="$emit('enter', $event)"
      @clear-errors="$emit('clear-errors', $event)"
    />
  </article>
</template>

<script>
import CardInfo from "@/services/card-info";

import CardBase from "./CardBase";
import CardSmall from "./CardSmall";

export default {
  name: "Card",
  components: {
    CardBase,
    CardSmall
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
    this.cardNumber = this.numberTransform;
  }
};
</script>

<style lang="scss" scoped></style>

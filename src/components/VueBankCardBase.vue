<template>
  <div
    class="card"
    :style="{ backgroundColor: cssPropertySpecial('backgroundColor') }"
  >
    <form class="card-inner" @keydown.enter="$emit('enter', $event)">
      <div class="card__main">
        <div class="card__info">
          <div class="card__brand-placeholder" v-if="!cardInfo.bankName">
            <div
              class="card__brand-logo-wrapper"
              v-for="brand in brandsPlaceholder"
              :key="`brand-placeholder-${brand.alias}`"
            >
              <img
                class="card__brand-logo"
                :src="
                  `${imagePath}/images/brands-logos/${brand.alias}-colored.png`
                "
                :alt="brand.name"
              />
            </div>
          </div>

          <div class="card__bank-info" v-else>
            <div class="card__bank-logo-wrapper">
              <img
                class="card__bank-logo"
                :src="`${imagePath}/images/${cardInfo.bankLogo}`"
                :alt="cardInfo.bankName"
              />
            </div>

            <div class="card__brand-logo-wrapper">
              <img
                class="card__brand-logo"
                :src="`${imagePath}/images/${cardInfo.brandLogo}`"
                :alt="cardInfo.brandName"
              />
            </div>
          </div>
        </div>

        <div class="card__number">
          <span v-if="!isNew" class="card__field-mock">
            {{ numberCollapsed }}
          </span>
          <input
            v-else
            type="text"
            data-cp="cardNumber"
            ref="cardNumber"
            placeholder="0000 0000 0000 0000"
            v-mask="cardNumberMask"
            :value="cardNumber"
            :class="fieldCssClasses('cardNumber')"
            :readonly="!isNew"
            @input="$emit('input-card-number', $event.target.value)"
            @keydown.delete="moveCaretTo('back', 'cardNumber')"
            @focus="clearErrors('cardNumber')"
            @blur="$v.cardNumber.$touch()"
          />

          <input type="hidden" data-cp="name" :value="cardHolderName" />

          <button
            v-if="!isFieldEmpty('cardNumber')"
            class="card__field-icon"
            @click="onReset"
          >
            <span class="card__field-icon-close"></span>
          </button>

          <VueBankCardTooltip :is-show="$v.cardNumber.$error">
            Вам нужно заполнить это поле
          </VueBankCardTooltip>
          <VueBankCardTooltip :is-show="!!errorFiltered('cardNumber')">
            {{ errorFiltered("cardNumber") }}
          </VueBankCardTooltip>
        </div>
      </div>

      <div class="card__extra" v-if="isNew">
        <div class="card__field-group">
          <p
            class="card__field-label"
            :style="{ color: cssPropertySpecial('textColor') }"
          >
            Действует до:
          </p>

          <div class="card__expiration">
            <div class="card__date">
              <input
                type="text"
                data-cp="expDateMonth"
                ref="expDateMonth"
                placeholder="ММ"
                v-mask="expDateMonthMask"
                :value="expDateMonth"
                :class="fieldCssClasses('expDateMonth')"
                @input="$emit('input-exp-date-month', $event.target.value)"
                @keydown.delete="moveCaretTo('back', 'expDateMonth')"
                @focus="clearErrors('expDateMonth')"
                @blur="
                  autocompleteDate($event);
                  $v.expDateMonth.$touch();
                "
              />
            </div>

            <span
              class="card__field-divider"
              :style="{ color: cssPropertySpecial('textColor') }"
            >
              /
            </span>

            <div class="card__date">
              <input
                type="text"
                data-cp="expDateYear"
                ref="expDateYear"
                placeholder="ГГ"
                v-mask="expDateYearMask"
                :value="expDateYear"
                :class="fieldCssClasses('expDateYear')"
                @input="$emit('input-exp-date-year', $event.target.value)"
                @keydown.delete="moveCaretTo('back', 'expDateYear')"
                @focus="clearErrors('expDateYear')"
                @blur="
                  autocompleteDate($event);
                  $v.expDateYear.$touch();
                "
              />
            </div>
          </div>

          <VueBankCardTooltip
            :is-show="$v.expDateMonth.$error || $v.expDateYear.$error"
          >
            Введите дату как на карте
          </VueBankCardTooltip>
          <VueBankCardTooltip
            :is-show="
              !!errorFiltered('expDateMonth') || !!errorFiltered('expDateYear')
            "
          >
            {{ errorFiltered("expDateMonth") || errorFiltered("expDateYear") }}
          </VueBankCardTooltip>
        </div>

        <div class="card__field-group card__code">
          <p
            class="card__field-label"
            :style="{ color: cssPropertySpecial('textColor') }"
          >
            Код с обратной стороны:
          </p>

          <input
            type="password"
            data-cp="cvv"
            ref="cvv"
            v-mask="cvvMask"
            :value="cvv"
            :placeholder="cardInfo.codeName || 'CVV'"
            :class="fieldCssClasses('cvv')"
            @input="$emit('input-cvv', $event.target.value)"
            @keydown.delete="moveCaretTo('back', 'cvv')"
            @focus="
              toggleType($event);
              clearErrors('cvv');
            "
            @blur="
              toggleType($event);
              $v.cvv.$touch();
            "
          />

          <VueBankCardTooltip :is-show="$v.cvv.$error">
            Вам нужно заполнить это поле
          </VueBankCardTooltip>

          <VueBankCardTooltip :is-show="!!errorFiltered('cvv')">
            {{ errorFiltered("cvv") }}
          </VueBankCardTooltip>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import { validationMixin } from "vuelidate";
import getBrands from "@/services/card-info/utils/get-brands";
import {
  commonMixin,
  validatorsMixin,
  moveCaretMixin,
  helpersMixin
} from "@/mixins";
import clickOutside from "@/utils/click-outside-directive";
import VueBankCardTooltip from "./VueBankCardTooltip";

export default {
  name: "VueBankCardBase",
  components: {
    VueBankCardTooltip
  },
  directives: { mask, clickOutside },
  mixins: [
    commonMixin,
    validationMixin,
    validatorsMixin,
    moveCaretMixin,
    helpersMixin
  ],
  props: {
    isNew: Boolean,
    cardInfo: {
      type: Object,
      default: null
    },
    cardNumber: {
      type: String,
      required: true
    },
    cardHolderName: {
      type: String,
      required: true
    },
    expDateMonth: {
      type: String,
      required: true
    },
    expDateYear: {
      type: String,
      required: true
    },
    cvv: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      fields: [
        { ref: "cardNumber" },
        { ref: "expDateMonth" },
        { ref: "expDateYear" },
        { ref: "cvv" }
      ]
    };
  },
  computed: {
    /**
     * Create array of brands for placeholder in empty card
     * @returns {Array}
     */
    brandsPlaceholder() {
      const brands = Object.values(getBrands());
      const aliases = ["visa", "master-card", "maestro", "mir"];

      return brands.filter(brand => aliases.includes(brand.alias));
    }
  },
  methods: {
    /**
     * Returns special css property for banks depending by cardInfo
     * @param {String} property - Special property (see CardInfo docs)
     * @returns {String}
     */
    cssPropertySpecial(property) {
      return this.cardInfo.bankName ? this.cardInfo[property] : "";
    },
    /**
     * Dynamic CSS classes for fields
     * @param {String} type - Type of field (see props)
     * @returns {Array}
     */
    fieldCssClasses(type) {
      return [
        "card__field",
        {
          "card__field--invalid":
            this.$v[type].$error || this.errorFiltered(type)
        }
      ];
    },
    onReset(event) {
      event.preventDefault();
      this.resetForm();
    }
  }
};
</script>

<style lang="scss" scoped>
$base-font-family: "PT Sans", Arial, sans-serif;
$field-font-family: "Roboto Mono", Arial, sans-serif;

$card-bg-color: #e5e5e5;

$base-color: #000;
$field-color: #343434;

$field-focus-outline-color: #ffd141;
$field-invalid-outline-color: #df4242;

.card {
  position: relative;
  width: 380px;
  border-radius: 10px;
  background-color: $card-bg-color;
  transition: background-color 0.3s;

  &::before {
    content: "";
    display: block;
    padding-top: 61.1%;
  }

  &-inner {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 6.3%;
  }

  &__main {
    display: flex;
    flex-flow: column nowrap;
  }

  &__info {
    display: flex;
    width: 100%;
    height: 55px;
  }

  &__number {
    position: relative;
  }

  &__extra {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__code,
  &__date {
    width: 70px;
  }

  &__expiration {
    display: flex;
    align-items: center;
  }

  &__field {
    width: 100%;
    padding: 10px;
    border: 2px solid transparent;
    outline: none;
    font-family: $field-font-family;
    font-size: 16px;
    color: $field-color;
    line-height: 20px;
    transition: border-color 0.3s;

    &::placeholder {
      color: $field-color;
    }

    &:focus {
      border-color: $field-focus-outline-color;
    }

    &--invalid {
      border-color: $field-invalid-outline-color;
    }

    &-label {
      margin: 0 0 5px 0;
      font-family: $base-font-family;
      font-size: 10px;
      line-height: 13px;
      color: $base-color;
      transition: color 0.3s;
    }

    &-divider {
      margin: 0 5px;
      font-family: $field-font-family;
      font-size: 18px;
      line-height: 21px;
      color: $field-color;
      transition: color 0.3s;
    }

    &-group {
      position: relative;
    }

    &-mock {
      display: block;
      width: 100%;
      padding: 10px;
      border: 2px solid transparent;
      background-color: #fff;
      font-size: 16px;
      line-height: 20px;
      font-family: $field-font-family;
    }

    &-icon {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      width: 30px;
      height: 30px;
      border: 0;
      outline: none;
      background-color: transparent;
      cursor: pointer;

      &:hover,
      &:focus {
        .card__field-icon-close {
          &::before,
          &::after {
            background-color: lighten($field-color, 10%);
          }
        }
      }

      &-close {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        display: block;
        width: 20px;
        height: 20px;

        &::before,
        &::after {
          content: "";
          position: absolute;
          background-color: lighten($field-color, 50%);
          transition: background-color 0.3s;
        }

        &::before {
          top: 0;
          left: 50%;
          height: 100%;
          transform: translateX(-50%);
          width: 2px;
        }

        &::after {
          top: 50%;
          left: 0;
          width: 100%;
          height: 2px;
          transform: translateY(-50%);
        }
      }
    }
  }

  &__brand {
    &-placeholder {
      display: flex;
    }

    &-logo {
      max-height: 30px;

      &-wrapper {
        display: flex;

        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
  }

  &__bank {
    &-info {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &-logo {
      max-height: 35px;

      &-wrapper {
        display: flex;
      }
    }
  }
}
</style>

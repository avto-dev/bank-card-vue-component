<template>
    <div
        class="card"
        ref="card"
        :class="{ 'card--focused': cardFocused }"
        v-click-outside="onBlurCard"
        @click="onFocusCard"
    >
        <div class="card__avatar">
            <div
                class="card__icon"
                :style="{
                    backgroundImage: `url(${avatarIconSrc})`,
                    backgroundColor: cardInfo.bankName
                        ? cardInfo.backgroundColor
                        : '',
                    backgroundSize: cardInfo.bankName ? '80%' : 'contain'
                }"
            ></div>
        </div>
        <form
            :class="['card__main', { 'card__main--focused': cardFocused }]"
            @keydown.enter="$emit('enter', $event)"
        >
            <span
                v-show="!cardFocused && isFieldEmpty('cardNumber')"
                class="card__main-title"
                :class="{
                    'card__main-title--invalid': !!errorFiltered('cardNumber')
                }"
            >
                Новая карта
            </span>

            <VueBankCardTooltip
                position="left"
                :is-show="!!errorFiltered('cardNumber')"
            >
                {{ errorFiltered("cardNumber") }}
            </VueBankCardTooltip>

            <div
                v-show="cardFocused || !isFieldEmpty('cardNumber')"
                class="card__main-inner"
            >
                <div :class="cardNumberCssClasses">
                    <label
                        v-if="isNew"
                        class="card__field-label"
                        :for="generateId('cardNumber')"
                    >
                        Номер карты
                    </label>

                    <input
                        v-show="!cardNumberCollapsed"
                        class="card__field"
                        type="tel"
                        data-cp="cardNumber"
                        ref="cardNumber"
                        v-mask="cardNumberMask"
                        :value="cardNumber"
                        :id="generateId('cardNumber')"
                        :readonly="!isNew"
                        @input="onInput($event, 'cardNumber')"
                        @focus="onFocus($event, 'cardNumber')"
                        @blur="onBlur($event, 'cardNumber')"
                        @keydown.delete="onDel($event, 'cardNumber')"
                        @keydown.enter="onCardNumberEnter"
                    />

                    <span
                        v-show="cardNumberCollapsed"
                        class="card__number-caption"
                        @click="onClickCollapsed"
                    >
                        {{ numberCollapsed }}
                    </span>

                    <input
                        type="hidden"
                        data-cp="name"
                        :value="cardHolderName"
                    />

                    <VueBankCardTooltip
                        position="left"
                        :is-show="
                            $v.cardNumber.$error && $v.cardNumber.required
                        "
                    >
                        Вам нужно заполнить это поле
                    </VueBankCardTooltip>
                </div>

                <div
                    v-show="isNew && cardNumberCollapsed"
                    :class="expDateCssClasses"
                >
                    <label
                        class="card__field-label"
                        :for="generateId('expDateMonth')"
                    >
                        ММ / ГГ
                    </label>

                    <div class="card__date-inner">
                        <input
                            class="card__field"
                            type="tel"
                            ref="expDateMonth"
                            data-cp="expDateMonth"
                            v-mask="expDateMonthMask"
                            :value="expDateMonth"
                            :id="generateId('expDateMonth')"
                            @input="onInput($event, 'expDateMonth')"
                            @focus="onFocus($event, 'expDateMonth')"
                            @blur="onBlur($event, 'expDateMonth')"
                            @keydown.delete="onDel($event, 'expDateMonth')"
                        />

                        <span
                            v-show="
                                isFieldFull('expDateMonth') ||
                                    isFieldFull('expDateYear')
                            "
                            class="card__field-divider"
                        >
                            /
                        </span>

                        <input
                            class="card__field"
                            type="tel"
                            ref="expDateYear"
                            data-cp="expDateYear"
                            v-mask="expDateYearMask"
                            :value="expDateYear"
                            @input="onInput($event, 'expDateYear')"
                            @focus="onFocus($event, 'expDateYear')"
                            @blur="onBlur($event, 'expDateYear')"
                            @keydown.delete="onDel($event, 'expDateYear')"
                        />
                    </div>

                    <VueBankCardTooltip
                        position="right"
                        :is-show="
                            $v.expDateMonth.$error || $v.expDateYear.$error
                        "
                    >
                        Введите дату как на карте
                    </VueBankCardTooltip>
                    <VueBankCardTooltip
                        position="right"
                        :is-show="
                            !!errorFiltered('expDateMonth') ||
                                !!errorFiltered('expDateYear')
                        "
                    >
                        {{
                            errorFiltered("expDateMonth") ||
                                errorFiltered("expDateYear")
                        }}
                    </VueBankCardTooltip>
                </div>

                <div
                    v-show="isNew && cardNumberCollapsed"
                    :class="cvvCssClasses"
                >
                    <label class="card__field-label" :for="generateId('cvv')">
                        {{ cardInfo.codeName || "CVV" }}
                    </label>

                    <input
                        class="card__field"
                        type="tel"
                        ref="cvv"
                        data-cp="cvv"
                        v-mask="cvvMask"
                        :value="cvv"
                        :id="generateId('cvv')"
                        @input="onInput($event, 'cvv')"
                        @focus="onFocus($event, 'cvv')"
                        @blur="onBlur($event, 'cvv')"
                        @keydown.delete="onDel($event, 'cvv')"
                    />

                    <VueBankCardTooltip
                        :is-show="$v.cvv.$error"
                        position="right"
                    >
                        Вам нужно заполнить это поле
                    </VueBankCardTooltip>

                    <VueBankCardTooltip
                        :is-show="!!errorFiltered('cvv')"
                        position="right"
                    >
                        {{ errorFiltered("cvv") }}
                    </VueBankCardTooltip>
                </div>
            </div>
        </form>
        <button
            v-if="!isNew"
            class="card-button__delete"
            title="Удалить данные карты"
            @click.stop="$emit('delete-card', $event)"
        >
            <svg
                width="15"
                height="17"
                viewBox="0 0 15 17"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M13.609 3.139h-3.362v-.83A1.47 1.47 0 008.795.856h-3.28a1.47 1.47 0 00-1.452 1.453v.83H.785a.638.638 0 00-.623.622c0 .332.29.623.623.623h.747v11.163A1.47 1.47 0 002.984 17h8.425a1.47 1.47 0 001.453-1.453V4.384h.788c.332 0 .623-.29.623-.623 0-.332-.332-.622-.664-.622zm-8.3-.83c0-.125.082-.208.207-.208h3.279c.124 0 .207.083.207.208v.83H5.308v-.83zm6.266 13.238c0 .125-.083.208-.207.208H2.943c-.125 0-.208-.083-.208-.208V4.384h8.84v11.163z"
                />
                <path
                    d="M4.686 4.305a.638.638 0 00-.623.623v7.47c0 .332.29.623.623.623.332 0 .622-.291.622-.623v-7.47a.611.611 0 00-.622-.623zM7.134 4.305a.638.638 0 00-.622.623v7.47c0 .332.29.623.622.623s.623-.291.623-.623v-7.47c0-.374-.249-.623-.623-.623zM9.002 4.928v7.47c0 .332.29.623.623.623.332 0 .622-.291.622-.623v-7.47a.638.638 0 00-.622-.623.611.611 0 00-.623.623z"
                />
            </svg>
        </button>
    </div>
</template>

<script>
import { mask } from "vue-the-mask";
import { validationMixin } from "vuelidate";

import { commonMixin, validatorsMixin, helpersMixin } from "@/mixins";
import clickOutside from "@/utils/click-outside-directive";
import VueBankCardTooltip from "./VueBankCardTooltip";

export default {
    name: "VueBankCardSmall",
    components: {
        VueBankCardTooltip
    },
    directives: { mask, clickOutside },
    mixins: [commonMixin, validationMixin, validatorsMixin, helpersMixin],
    data() {
        return {
            cardFocused: false,
            cardNumberCollapsed: false,
            fields: [
                { ref: "cardNumber", collapsible: true },
                { ref: "expDateMonth" },
                { ref: "expDateYear" },
                { ref: "cvv" }
            ]
        };
    },
    computed: {
        /**
         * Generate path for icon in avatar field
         * @returns { String }
         */
        avatarIconSrc() {
            const {
                cardInfo: { bankName, bankLogoSm, brandName, brandLogo }
            } = this;
            const cardIcon = "card-icon.svg";
            const dynamicPath = bankName
                ? bankLogoSm
                : brandName
                ? brandLogo
                : cardIcon;

            return this.imagesBasePath + dynamicPath;
        },
        /**
         * CCS classes for card number element
         * @returns { Array }
         */
        cardNumberCssClasses() {
            return [
                "card__number",
                "card__field-wrapper",
                { "card__number--collapsed": this.cardNumberCollapsed },
                {
                    "card__field-wrapper--focused":
                        !this.isFieldEmpty("cardNumber") && this.isNew
                },
                {
                    "card__field-wrapper--invalid":
                        (this.$v.cardNumber.$error &&
                            this.$v.cardNumber.required) ||
                        !!this.errorFiltered("cardNumber")
                }
            ];
        },
        /**
         * CCS classes for expiration date element
         * @returns { Array }
         */
        expDateCssClasses() {
            return [
                "card__date",
                "card__field-wrapper",
                {
                    "card__field-wrapper--focused":
                        !this.isFieldEmpty("expDateMonth") ||
                        !this.isFieldEmpty("expDateYear")
                },
                {
                    "card__field-wrapper--invalid":
                        this.$v.expDateMonth.$error ||
                        this.$v.expDateYear.$error ||
                        !!this.errorFiltered("expDateMonth") ||
                        !!this.errorFiltered("expDateYear")
                }
            ];
        },
        /**
         * CCS classes for expiration date element
         * @returns { Array }
         */
        cvvCssClasses() {
            return [
                "card__cvv",
                "card__field-wrapper",
                { "card__field-wrapper--focused": !this.isFieldEmpty("cvv") },
                {
                    "card__field-wrapper--invalid":
                        this.$v.cvv.$error || !!this.errorFiltered("cvv")
                },
                {
                    "card__field-wrapper--secured":
                        this.isCvvSecured && !this.isFieldEmpty("cvv")
                }
            ];
        }
    },
    created() {
        !this.isNew && (this.cardNumberCollapsed = true);
    },
    mounted() {
        this.isFocus && this.isNew && this.$refs.card.click();
    },
    methods: {
        /**
         * Handle focus on card element
         * @param { Object } e - Event
         */
        onFocusCard(e) {
            if (this.isNew) {
                this.cardFocused = true;
                if (e.target.className !== "card__field") {
                    for (let i = 0; i < this.fields.length; i++) {
                        const ref = this.fields[i].ref;

                        if (!this.isFieldFull(ref)) {
                            this.focusOnField(ref);
                            break;
                        }
                    }
                }
            }
        },
        /**
         * Handle blur on card element
         */
        onBlurCard() {
            this.cardFocused = false;
            if (this.isFieldFull("cardNumber")) this.cardNumberCollapsed = true;
        },
        /**
         * Handle click on collapsed number
         */
        onClickCollapsed() {
            if (this.isNew) {
                this.cardNumberCollapsed = false;
                this.focusOnField("cardNumber");
            }
        },
        /**
         * Generate unique id for labels and inputs
         * @param { String } id - custom prefix id
         * @returns { String }
         */
        generateId(id) {
            return `${id}-${this._uid}`;
        },
        /**
         * Card number handler on enter
         */
        onCardNumberEnter() {
            const name = "cardNumber";

            if (this.isFieldFull(name)) {
                this.cardNumberCollapsed = true;
                this.moveCaretTo("forward", name);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
$base-font-family: "PT Sans", Arial, sans-serif;
$field-font-family: "Roboto Mono", Arial, sans-serif;
$security-font-family: "text-security-disc";

$base-color: #343434;
$invalid-color: #ff0624;

.card {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 45px;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    background-color: #fafafa;
    transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s;

    &--focused {
        background-color: #fff;
        border-color: #067eff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    }

    &__avatar {
        display: flex;
        width: 52px;
        height: 100%;
    }

    &__icon {
        width: 30px;
        height: 30px;
        margin: auto;
        border-radius: 3px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    &__main {
        position: relative;
        flex-grow: 1;
        display: flex;
        align-items: center;
        margin: -1px;
        padding: 0 10px 0;
        border: 1px solid transparent;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        transition: border-color 0.3s;

        &--focused {
            border-color: #ffc510;
        }

        &-inner {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 100%;
        }

        &-title {
            margin: 0;
            font-size: 16px;
            line-height: 21px;
            font-family: $base-font-family;
            color: $base-color;

            &--invalid {
                color: $invalid-color;
            }
        }
    }

    &__number {
        display: flex;
        width: 100%;
        transition: margin 0.3s;

        &--collapsed {
            width: auto;
        }

        &-caption {
            display: block;
            height: 100%;
            margin: 0;
            font-family: $field-font-family;
            font-size: 16px;
            line-height: 21px;
            color: $base-color;
            white-space: nowrap;
        }
    }

    &__date {
        width: 55px;

        &-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &-inner .card__field {
            width: 22px;
        }
    }

    &__cvv {
        width: 33px;
    }

    &__field {
        width: 100%;
        height: 100%;
        padding: 0;
        border: 0;
        outline: none;
        background-color: transparent;
        font-family: $field-font-family;
        font-size: 16px;
        line-height: 1;
        color: $base-color;

        &-label {
            position: absolute;
            top: 0;
            font-family: $base-font-family;
            font-size: 16px;
            line-height: 19px;
            color: #ababab;
            transition: font-size 0.2s, color 0.2s, transform 0.2s;
        }

        &-divider {
            display: block;
            height: 19px;
            font-family: $field-font-family;
            font-size: 16px;
            line-height: 19px;
            color: $base-color;
        }

        &-wrapper {
            position: relative;
            display: flex;
            max-height: 21px;
            height: 100%;
            margin-top: 10px;

            &.card__number {
                margin-top: 0;
            }

            &--focused {
                &.card__number {
                    margin-top: 10px;
                }

                .card__field-label {
                    font-size: 10px;
                    line-height: 13px;
                    transform: translateY(-12px);
                }
            }

            &--invalid {
                .card {
                    &__field {
                        color: $invalid-color;

                        &-label {
                            color: $invalid-color;
                        }

                        &-divider {
                            color: $invalid-color;
                        }
                    }
                }
            }

            &--secured {
                .card__field {
                    font-family: $security-font-family;
                    font-size: 12px;
                    letter-spacing: 0.35em;
                }
            }
        }
    }

    &-button__delete {
        display: flex;
        width: 43px;
        height: 100%;
        padding: 0;
        border: 0;
        border-left: 1px solid #e5e5e5;
        outline: none;
        background-color: transparent;
        cursor: pointer;

        svg {
            display: block;
            width: 15px;
            height: 15px;
            margin: auto;
            fill: lighten($invalid-color, 5%);
            transition: fill 0.3s;
        }

        &:hover,
        &:focus {
            svg {
                fill: darken($invalid-color, 5%);
            }
        }
    }
}
</style>

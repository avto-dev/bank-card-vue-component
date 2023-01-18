<template>
    <div
        class="card"
        ref="card"
        :class="{
            'card--focused': isNew && cardFocused,
            'card--error': outsideErrors,
            'card--invalid': invalidSomeElement,
            'card--hover': isNew && !cardFocused,
            'card--active': !isNew && cardFocused,
            'card--saved': !isNew && !cardFocused
        }"
        v-click-outside="onBlurCard"
        @click="onFocusCard"
    >
        <div class="card__avatar" :class="{ 'avatar--border': isNew }">
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
            <VueBankCardTooltip
                position="left"
                :is-show="!!errorFiltered('cardNumber')"
            >
                {{ errorFiltered("cardNumber") }}
            </VueBankCardTooltip>

            <div class="card__main-inner">
                <div :class="cardNumberCssClasses">
                    <label
                        v-if="isLabelInputShow && $v.cardNumber.length"
                        data-test-label-field-number
                        class="card__field-label"
                        :for="generateId('cardNumber')"
                    >
                        Номер карты
                    </label>

                    <input
                        v-show="!cardNumberCollapsed"
                        data-test-input-field-number
                        class="card__field"
                        type="tel"
                        data-cp="cardNumber"
                        autocomplete="cc-number"
                        maxlength="23"
                        pattern="[ 0-9]*"
                        inputmode="numeric"
                        ref="cardNumber"
                        :placeholder="textPlaceholderInput"
                        v-mask="cardNumberMask"
                        :value="cardNumber"
                        :id="generateId('cardNumber')"
                        :readonly="!isNew"
                        @input="onInput($event, 'cardNumber')"
                        @focus="onFocus($event, 'cardNumber')"
                        @focusout="leaveFromCardNumber"
                        @blur="onBlur($event, 'cardNumber')"
                        @keydown.delete="onDel($event, 'cardNumber')"
                        @keydown.enter="onCardNumberEnter"
                    />

                    <span
                        v-show="cardNumberCollapsed"
                        class="card__number-caption"
                        @click.prevent="onClickCollapsed"
                    >
                        {{ numberCollapsed }}
                    </span>

                    <input
                        type="hidden"
                        data-cp="name"
                        autocomplete="cc-name"
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
                <transition name="fade">
                    <div v-if="displayNextStep" class="card__number-next">
                        <img
                            @click="onCardNumberEnter"
                            :src="nextIcon"
                            alt="Следующий шаг"
                        />
                    </div>
                </transition>
                <div v-show="isNew" :class="expDateCssClasses">
                    <label
                        :for="generateId('expDateMonth')"
                        class="card__field-label"
                    >
                        ММ/ГГ
                    </label>

                    <div class="card__date-inner">
                        <input
                            class="card__field"
                            type="tel"
                            ref="expDateMonth"
                            data-cp="expDateMonth"
                            autocomplete="cc-exp-month"
                            pattern="[0-9]{2}"
                            maxlength="2"
                            inputmode="numeric"
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
                            autocomplete="cc-exp-year"
                            pattern="[0-9]{2}"
                            maxlength="2"
                            inputmode="numeric"
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
                        Введите дату в формате ММ/ГГ как на карте
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

                <div v-show="isNew" :class="cvvCssClasses">
                    <label :for="generateId('cvv')" class="card__field-label">
                        {{ cardInfo.codeName || "CVV" }}
                    </label>

                    <input
                        class="card__field"
                        type="tel"
                        ref="cvv"
                        data-cp="cvv"
                        autocomplete="cc-csc"
                        inputmode="numeric"
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

        <vue-bank-card-small-btn-del
            v-if="!isNew"
            :disable="disableDelete"
            @delete-card="$emit('delete-card', $event)"
            :focused="cardFocused"
        />
    </div>
</template>

<script>
import { mask } from "vue-the-mask";
import { validationMixin } from "vuelidate";

import { commonMixin, validatorsMixin, helpersMixin } from "@/mixins";
import clickOutside from "@/utils/click-outside-directive";
import VueBankCardTooltip from "./VueBankCardTooltip";
import VueBankCardSmallBtnDel from "@/components/VueBankCardSmallBtnDel";

export default {
    name: "VueBankCardSmall",
    components: {
        VueBankCardSmallBtnDel,
        VueBankCardTooltip
    },
    directives: { mask, clickOutside },
    mixins: [commonMixin, validationMixin, validatorsMixin, helpersMixin],
    data() {
        return {
            cardFocused: false,
            cardNumberCollapsed: false,
            focusedField: null,
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
         * Condition for show or don't show a label
         * @return {string}
         */
        isLabelInputShow() {
            return this.isNew && !this.isFieldEmpty("cardNumber");
        },
        /**
         * Text for placeholder
         * @return {string}
         */
        textPlaceholderInput() {
            if (!this.cardFocused && this.isFieldEmpty("cardNumber")) {
                return "Новая карта";
            }
            return "Номер карты";
        },
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
                },
                { "card-number_input": !this.cardNumberCollapsed }
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
                { "card__field-wrapper--hidden": !this.cardNumberCollapsed },
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
                "card__field-wrapper--secured",
                { "card__field-wrapper--hidden": !this.cardNumberCollapsed },
                { "card__field-wrapper--focused": !this.isFieldEmpty("cvv") },
                {
                    "card__field-wrapper--invalid":
                        this.$v.cvv.$error || !!this.errorFiltered("cvv")
                }
            ];
        },
        displayNextStep() {
            return (
                this.$v.cardNumber.length &&
                this.isNew &&
                !this.cardNumberCollapsed &&
                this.cardFocused
            );
        },
        nextIcon() {
            return this.imagesBasePath + "next-step.svg";
        },
        invalidSomeElement() {
            return (
                (this.$v.cardNumber.$error && this.$v.cardNumber.required) ||
                this.$v.expDateMonth.$error ||
                this.$v.expDateYear.$error ||
                this.$v.cvv.$error
            );
        },
        outsideErrors() {
            return Object.keys(this.errors).length > 0;
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
            this.cardFocused = true;
            if (this.isNew) {
                if (!this.cardNumber) {
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
        },
        leaveFromCardNumber() {
            if (!this.cardNumberCollapsed) {
                this.onCardNumberEnter();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
$base-font-family: "Roboto", sans-serif;
$field-font-family: "Roboto", sans-serif;
$security-font-family: "text-security-disc";

$base-color: #2c303b;
$secondary-color: #fc0cf;
$invalid-color: #f93232;
$disabled-color: #e5e9ed;
$focused-color: #ffb82e;
$default-color: #dbdfe2;
$hover-color: #b7c7dc;
$placeholder-color: #74747c;

$base-font-size: 14px;

.card {
    // For implementing outline using box-shadow. This need for support radius corner at Safari
    --card-outline-color: transparent;
    --card-outline-width: 2px;

    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 45px;
    border: 1px solid $default-color;
    border-radius: 5px;
    background-color: #fff;
    transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s;
    box-shadow: 0 0 0 var(--card-outline-width) var(--card-outline-color);

    &--hover:hover {
        border-color: $hover-color;
        .avatar--border {
            border-color: $hover-color;
        }
    }

    &--saved {
        border-color: $hover-color;
        .avatar--border {
            border-color: $hover-color;
        }
    }

    &--error {
        --card-outline-color: #{$invalid-color};

        background-color: #ffecec;
        border-color: $invalid-color;
        .avatar--border {
            border-color: $invalid-color;
        }
    }

    &--invalid {
        --card-outline-color: #{$invalid-color};

        border-color: $invalid-color;
        .avatar--border {
            border-color: $invalid-color;
        }
    }

    &--focused {
        --card-outline-color: #{$focused-color};

        background-color: #fff;
        border-color: $focused-color;
        .avatar--border {
            border-color: $focused-color;
        }
    }

    &--active {
        --card-outline-color: #067eff;

        background-color: #fff;
        border-color: #067eff;
    }

    &__avatar {
        display: flex;
        width: 52px;
        height: 100%;
    }
    &__icon {
        width: 26px;
        height: 26px;
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
            .card__field-label {
                color: $secondary-color;
            }
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
        --display-next-step: inline;

        display: flex;
        width: 100%;
        transition: margin 0.3s;

        &-next {
            cursor: pointer;
            display: var(--display-next-step);
            transition: opacity 0.25s;

            &:hover {
                opacity: 0.5;
            }

            img {
                max-height: 20px;
            }
        }

        &--collapsed {
            width: auto;
            --display-next-step: none;
        }

        &-caption {
            display: block;
            height: 100%;
            margin: 0;
            font-family: $field-font-family;
            font-size: $base-font-size;
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
            font-size: $base-font-size;
            line-height: 17.5px;
            color: $base-color;
            font-weight: 400;
            transition: font-size 0.2s, color 0.2s, transform 0.2s;
        }

        &-divider {
            display: block;
            height: 19px;
            font-family: $field-font-family;
            font-size: $base-font-size;
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
                    &.card-number_input {
                        margin-top: 0px;
                    }
                }

                .card__field-label {
                    font-size: 10px;
                    line-height: 15px;
                    color: $placeholder-color;
                    font-weight: 300;
                    white-space: nowrap;
                    transform: translateY(-12px);
                }
            }

            &--invalid {
                .card {
                    &__field {
                        color: $invalid-color;

                        &-divider {
                            color: $invalid-color;
                        }
                    }
                }
            }

            &--secured {
                .card__field {
                    font-family: $security-font-family;
                    font-size: $base-font-size;
                    letter-spacing: 0.35em;
                }
            }

            &--hidden {
                width: 1px;
                overflow: hidden;
                opacity: 0;
            }
        }

        &::placeholder {
            font-size: $base-font-size;
            font-family: $base-font-family;
            line-height: 19px;
            color: $placeholder-color;
        }

        &:focus::placeholder {
            color: $placeholder-color;
        }
    }
}

.avatar--border {
    border-right: 1px solid $default-color;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
</style>

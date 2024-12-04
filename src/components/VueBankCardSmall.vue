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
                :is-show="Boolean(errorFiltered('cardNumber'))"
            >
                {{ errorFiltered("cardNumber") }}
            </VueBankCardTooltip>

            <div class="card__main-inner">
                <div :class="cardNumberCssClasses">
                    <label
                        v-if="isLabelInputShow && isFieldFull('cardNumber', localCardNumber)"
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
                        v-maska
                        :data-maska="cardInfo.numberMask"
                        v-model="localCardNumber"
                        :id="generateId('cardNumber')"
                        :readonly="!isNew"
                        @input="onInput($event, 'cardNumber')"
                        @focus="onFocusField('localCardNumber')"
                        @keydown.delete="onDel($event, 'cardNumber')"
                        @focusout="leaveFromCardNumber"
                        @blur="onBlurField('localCardNumber')"
                    />

                    <span
                        v-show="cardNumberCollapsed"
                        class="card__number-caption"
                        @click.prevent="onClickCollapsed"
                    >
                        <span class="card__number-caption--secured">1111</span>
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
                        :is-show="Boolean(localErrors.localCardNumber)"
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
                            v-bind="localExpDateMonthAttrs"
                            data-maska="##"
                            v-model="localExpDateMonth"
                            v-maska
                            :id="generateId('expDateMonth')"
                            @input="onInput($event, 'expDateMonth')"
                            @focus="onFocusField('localExpDateMonth')"
                            @blur="onBlurDateField($event, 'localExpDateMonth')"
                            @keydown.delete="onDel($event, 'expDateMonth')"
                        />

                        <span
                            v-show="
                                isFieldFull('expDateMonth', localExpDateMonth) ||
                                    isFieldFull('expDateYear', localExpDateYear)
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
                            v-bind="localExpDateYearAttrs"
                            v-maska
                            data-maska="##"
                            v-model="localExpDateYear"
                            @input="onInput($event, 'expDateYear')"
                            @focus="onFocusField('localExpDateYear')"
                            @blur="onBlurDateField($event, 'localExpDateYear')"
                            @keydown.delete="onDel($event, 'expDateYear')"
                        />
                    </div>

                    <VueBankCardTooltip
                        position="right"
                        :is-show="
                            Boolean(localErrors.localExpDateMonth || localErrors.localExpDateYear)
                        "
                    >
                        Введите дату в формате ММ/ГГ как на карте
                    </VueBankCardTooltip>
                    <VueBankCardTooltip
                        position="right"
                        :is-show="
                            Boolean(errorFiltered('expDateMonth') ||
                                errorFiltered('expDateYear'))
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
                        v-bind="localCvvAttrs"
                        v-maska
                        :data-maska="cvvMask"
                        v-model="localCvv"
                        :id="generateId('cvv')"
                        @input="onInput($event, 'cvv')"
                        @focus="onFocusField('localCvv')"
                        @blur="onBlurField('localCvv')"
                        @keydown.delete="onDel($event, 'cvv')"
                    />

                    <VueBankCardTooltip
                        :is-show="Boolean(localErrors.localCvv)"
                        position="right"
                    >
                        Вам нужно заполнить это поле
                    </VueBankCardTooltip>

                    <VueBankCardTooltip
                        :is-show="Boolean(errorFiltered('cvv'))"
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
        >
            <template v-if="$slots['remove-icon']" #default>
                <slot name="remove-icon" />
            </template>
        </vue-bank-card-small-btn-del>
    </div>
</template>

<script>
import {commonMixin, helpersMixin} from "@/mixins";
import clickOutside from "@/utils/click-outside-directive";
import VueBankCardTooltip from "./VueBankCardTooltip";
import VueBankCardSmallBtnDel from "@/components/VueBankCardSmallBtnDel";
import {computed, defineComponent, ref, watch, getCurrentInstance} from "vue";
import {useValidation} from "./useValidation";

export default defineComponent({
    name: "VueBankCardSmall",
    components: {
        VueBankCardSmallBtnDel,
        VueBankCardTooltip
    },
    directives: {clickOutside},
    mixins: [commonMixin, helpersMixin],
    data() {
        return {
            cardFocused: false,
            focusedField: null,
            fields: [
                {ref: "cardNumber", collapsible: true},
                {ref: "expDateMonth"},
                {ref: "expDateYear"},
                {ref: "cvv"}
            ]
        };
    },
    setup(props) {
        const {
            values,
            localErrors,
            setFieldError,
            resetForm,
            localCardNumber,
            localCardNumberAttrs,
            localCvv,
            localCvvAttrs,
            localExpDateMonth,
            localExpDateMonthAttrs,
            localExpDateYear,
            validateField,
            localExpDateYearAttrs,
        } = useValidation(props);

        let blurPromise = null;

        const onFocusField = async (field) => {
            if (blurPromise) {
                await blurPromise;
            }
            setFieldError(field, '');
        };

        const onBlurField = async (field) => {
            if(field === 'localCardNumber' && !localCardNumber.value) return

            blurPromise = validateField(field).then(() => {
                blurPromise = null;
            });
        };

        const cardNumberCollapsed = ref(false)
        function onResetLocal() {
            resetForm();
            cardNumberCollapsed.value = false;
        }

        /**
         * Generate unique id for labels and inputs
         * @param { String } id - custom prefix id
         * @returns { String }
         */
        function generateId(id) {
            const instance = getCurrentInstance();
            return `${id}-${instance.uid}`;
        }

        watch(() => props.isReset, () => {
            onReset()
        })

        const cvvMask = computed(() => {
            let mask = "";
            const maskSymbol = "#";
            const codeLength = props.cardInfo.codeLength || 3;

            for (let i = 0; i < codeLength; i++) {
                mask += maskSymbol;
            }

            return mask;
        })

        return {
            values,
            localErrors,
            setFieldError,
            localCardNumber,
            localCardNumberAttrs,
            localCvv,
            localCvvAttrs,
            localExpDateMonth,
            localExpDateMonthAttrs,
            localExpDateYear,
            localExpDateYearAttrs,
            cardNumberCollapsed,
            onBlurField,
            onFocusField,
            onResetLocal,
            generateId,
            cvvMask,
        }
    },
    computed: {
        /**
         * Condition for show or don't show a label
         * @return {string}
         */
        isLabelInputShow() {
            return this.isNew && this.localCardNumber;
        },
        /**
         * Text for placeholder
         * @return {string}
         */
        textPlaceholderInput() {
            if (!this.cardFocused && !this.localCardNumber) {
                return "Новая карта";
            }
            return "Номер карты";
        },
        /**
         * Generate default icon card
         * @returns { String }
         */
        getDefaultIconCard() {
            if(this.variantDefaultIcon === 'primary') {
                return 'card-icon-primary.svg'
            }

            if(this.variantDefaultIcon === 'inverted') {
                return 'card-icon-inverted.svg'
            }

            return 'card-icon.svg'
        },
        /**
         * Generate path for icon in avatar field
         * @returns { String }
         */
        avatarIconSrc() {
            const {
                cardInfo: {bankName, bankLogoSm, brandName, brandLogo}
            } = this;
            const cardIcon = this.getDefaultIconCard;
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
                {"card__number--collapsed": this.cardNumberCollapsed},
                {
                    "card__field-wrapper--focused":
                        this.localCardNumber && this.isNew
                },
                {
                    "card__field-wrapper--invalid":
                        (this.localErrors.localCardNumber) ||
                        !!this.errorFiltered("cardNumber")
                },
                {"card-number_input": !this.cardNumberCollapsed}
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
                {"card__field-wrapper--hidden": !this.cardNumberCollapsed},
                {
                    "card__field-wrapper--focused":
                        this.localExpDateMonth ||
                        this.localExpDateYear
                },
                {
                    "card__field-wrapper--invalid":
                        this.localErrors.localExpDateMonth ||
                        this.localErrors.localExpDateYear ||
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
                {"card__field-wrapper--hidden": !this.cardNumberCollapsed},
                {"card__field-wrapper--focused": this.localCvv},
                {
                    "card__field-wrapper--invalid":
                        this.localErrors.localCvv || !!this.errorFiltered("cvv")
                }
            ];
        },
        displayNextStep() {
            return (
                this.isFieldFull('cardNumber', this.localCardNumber) &&
                this.isNew &&
                !this.cardNumberCollapsed &&
                this.cardFocused
            );
        },
        nextIcon() {
            return this.imagesBasePath + "next-step.svg";
        },
        invalidSomeElement() {
            return Object.keys(this.localErrors).length !== 0;
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
         * Reset form
         */
        onReset() {
            this.onResetLocal();
            this.resetForm();
        },
        /**
         * Handle focus on card element
         * @param { Object } e - Event
         */
        onFocusCard(e) {
            this.cardFocused = true;

            if (!this.isNew || this.cardNumber || e.target.className === "card__field") {
                return;
            }

            for (let i = 0; i < this.fields.length; i++) {
                const ref = this.fields[i].ref;

                if (!this.isFieldFull(ref, this[ref])) {
                    this.focusOnField(ref);
                    break;
                }
            }
        },
        /**
         * Handle blur on card element
         */
        onBlurCard() {
            this.cardFocused = false;
            if (this.isFieldFull("cardNumber", this.localCardNumber)) this.cardNumberCollapsed = true;
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
         * Card number handler on enter
         */
        onCardNumberEnter() {
            const name = "cardNumber";
            if (this.isFieldFull('cardNumber', this.localCardNumber)) {
                this.cardNumberCollapsed = true;
                this.moveCaretTo("forward", name, this.localCardNumber);
            }
        },
        leaveFromCardNumber() {
            if (!this.cardNumberCollapsed) {
                this.onCardNumberEnter();
            }
        },
        onBlurDateField(event, field) {
            this.autocompleteDate(event)
            this.onBlurField(field)
        },
    }
});
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
    --card-outline-color: var(--custom-card-outline-color, #{$default-color});
    --card-outline-width: 0;

    --card-border-radius: var(--custom-card-border-radius, 5px);
    --card-border-height: var(--custom-card-border-height, 1px);
    --card-border-color: var(--custom-card-border-color, #{$default-color});

    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 48px;
    border: var(--card-border-height) solid var(--card-border-color);
    border-radius: var(--card-border-radius);
    background-color: var(--custom-card-background-color, #fff);
    transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s;
    box-shadow: 0 0 0 var(--card-outline-width) var(--card-outline-color);

    &--hover:hover {
        --card-shadow-hover: var(--custom-card-shadow-hover, none);
        --card-border-color: var(--custom-card-border-color-hover, #{$hover-color});
        box-shadow: var(--card-shadow-hover);
    }

    &--saved {
        --card-border-color: var(--custom-card-border-color-saved, #{$hover-color});
    }

    &--error {
        --card-outline-color: var(--custom-card-outline-color-error, #{$invalid-color});
        --card-outline-width: var(--custom-card-outline-width-error, 1px);
        --card-border-color: var(--custom-card-border-color-error, #{$invalid-color});

        background-color: var(--custom-card-background-color-error, #ffecec);
    }

    &--focused {
        --card-outline-color: var(--custom-card-outline-color-focused, #{$focused-color});
        --card-outline-width: var(--custom-card-outline-width-focused, 1px);
        --card-border-color: var(--custom-card-border-color-focused, #{$focused-color});

        background-color: var(--custom-card-background-color-focused, #fff);
    }

    &--active {
        --card-outline-color: var(--custom-card-outline-color-active, #067eff);
        --card-outline-width: var(--custom-card-outline-width-active, 1px);
        --card-border-color: var(--custom-card-border-color-active, #067eff);

        background-color: var(--custom-card-background-color-active, #fff);
    }

    &--invalid {
        --card-outline-color: var(--custom-card-outline-color-invalid, #{$invalid-color});
        --card-outline-width: 1px;
        --card-border-color: var(--custom-card-border-color-invalid, #{$invalid-color});

        &:hover {
            --card-border-color: var(--custom-card-border-color-invalid-hover, #{$invalid-color});
        }
    }

    &__avatar {
        display: flex;
        width: var(--custom-card-avatar-width, 48px);
        height: 100%;
    }

    &__icon {
        --card-icon-width: var(--custom-card-icon-width, 26px);
        --card-icon-height: var(--custom-card-icon-height, 26px);
        --card-icon-margin: var(--custom-card-icon-margin, auto);

        width: var(--card-icon-width);
        height: var(--card-icon-height);
        margin: var(--card-icon-margin);
        border-radius: 3px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    &__main {
        --card-main-padding: var(--custom-card-main-padding, #{0 16px 0});
        --card-main-border-height: var(--custom-card-main-border-height, 1px);

        position: relative;
        flex-grow: 1;
        display: flex;
        align-items: center;
        margin: -2px;
        padding: var(--card-main-padding);
        border: var(--card-main-border-height) solid transparent;
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
            --card-number-caption-color: var(--custom-card-number-caption-color, #{$base-color});
            --card-number-caption-font-size: var(--custom-card-number-caption-font-size, $base-font-size);
            --card-number-caption-line-height: var(--custom-card-number-caption-line-height, 21px);
            --card-number-caption-secured-font-size: var(--custom-card-number-caption-secured-font-size, $base-font-size);
            --card-number-caption-secured-line-height: var(--custom-card-number-caption-secured-line-height, auto);
            --card-number-caption-secured-letter-spacing: var(--custom-card-number-caption-secured-letter-spacing, auto);

            display: block;
            height: 100%;
            margin: 0;
            font-family: $field-font-family;
            font-size: var(--card-number-caption-font-size);
            line-height: var(--card-number-caption-line-height);
            color: var(--card-number-caption-color);
            white-space: nowrap;

            &--secured {
                font-family: $security-font-family;
                font-size: var(--card-number-caption-secured-font-size);
                line-height: var(--card-number-caption-secured-line-height);
                letter-spacing: var(--card-number-caption-secured-letter-spacing);
            }
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
            width: 17px;
        }
    }

    &__cvv {
        width: 33px;
    }

    &__field {
        --card-field-font-size: var(--custom-card-field-font-size, 14px);
        --card-field-color: var(--custom-card-field-color, #{$base-color});
        --card-field-invalid-color: var(--custom-card-field-invalid-color, #{$invalid-color});
        --card-field-placeholder-color: var(--custom-card-field-placeholder-color, #{$placeholder-color});
        --card-field-placeholder-focus-color: var(--custom-card-field-placeholder-focus-color, #{$placeholder-color});

        width: 100%;
        height: 100%;
        padding: 0;
        border: 0;
        outline: none;
        background-color: transparent;
        font-family: $field-font-family;
        font-size: var(--card-field-font-size);
        line-height: 1;
        color: var(--card-field-color);

        &-label {
            --card-field-label-color: var(--custom-card-field-label-color, #{$base-color});

            position: absolute;
            top: 0;
            font-family: $base-font-family;
            font-size: $base-font-size;
            line-height: 17.5px;
            color: var(--card-field-label-color);
            font-weight: 400;
            transition: font-size 0.2s, color 0.2s, transform 0.2s;
        }

        &-divider {
            --card-field-divider-color: var(--custom-card-field-divider-color, #{$base-color});

            display: block;
            height: 19px;
            font-family: $field-font-family;
            font-size: $base-font-size;
            line-height: 19px;
            color: var(--card-field-divider-color);
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
                    --card-field-label-focused-color: var(--custom-card-field-label-focused-color, #{$placeholder-color});
                    --card-field-label-focused-font-size: var(--custom-card-field-label-focused-font-size, 10px);
                    --card-field-label-focused-line-height: var(--custom-card-field-label-focused-line-height, 15px);

                    font-size: var(--card-field-label-focused-font-size);
                    line-height: var(--card-field-label-focused-line-height);
                    color: var(--card-field-label-focused-color);
                    font-weight: 300;
                    white-space: nowrap;
                    transform: translateY(-12px);
                }
            }

            &--invalid {
                .card {
                    &__field {
                        color: var(--card-field-invalid-color);

                        &-divider {
                            --card-field-divider-invalid-color: var(--custom-card-field-divider-invalid-color, #{$invalid-color});
                            color: var(--card-field-divider-invalid-color);
                        }

                        &-label {
                            --card-field-label-invalid-color: var(--custom-card-field-label-invalid-color, #{$base-color});
                            color: var(--card-field-label-invalid-color);
                        }
                    }
                }
            }

            &--secured {
                .card__field {
                    font-family: $security-font-family;
                    font-size: var(--card-number-caption-secured-font-size);
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
            color: var(--card-field-placeholder-color);
        }

        &:focus::placeholder {
            color: var(--card-field-placeholder-focus-color);
        }
    }
}

.avatar--border {
    --card-avatar-border-height: var(--custom-card-avatar-border-height, 1px);
    --card-avatar-shadow: var(--custom-card-avatar-shadow, #{0 0 0 var(--card-outline-width) var(--card-outline-color)});

    border-radius: var(--card-border-radius) 0 0 var(--card-border-radius);
    border-right: var(--card-avatar-border-height) solid var(--card-border-color);
    box-shadow: var(--card-avatar-shadow);
    transition: box-shadow 0.3s;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
</style>

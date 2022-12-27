<template>
    <div
        class="card"
        :style="{ backgroundColor: cssPropertySpecial('backgroundColor') }"
    >
        <form class="card-inner">
            <div class="card__main">
                <div class="card__info">
                    <div v-if="!cardInfo.bankName">
                        <div
                            v-if="!cardInfo.brandName"
                            class="card__brand-placeholder"
                        >
                            <div
                                class="card__brand-logo-wrapper"
                                v-for="brand in availableBrands"
                                :key="`brand-placeholder-${brand}`"
                            >
                                <img
                                    class="card__brand-logo"
                                    :src="
                                        `${imagesBasePath}${cardInfo.options.brandsLogosPath}${brand}-colored.svg`
                                    "
                                    :alt="brand"
                                />
                            </div>
                        </div>
                        <div v-else class="card__brand-placeholder">
                            <div class="card__brand-logo-wrapper">
                                <img
                                    class="card__brand-logo"
                                    :src="
                                        `${imagesBasePath}${cardInfo.brandLogo}`
                                    "
                                    :alt="cardInfo.brandName"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="card__bank-info" v-else>
                        <div class="card__bank-logo-wrapper">
                            <img
                                class="card__bank-logo"
                                :src="`${imagesBasePath}${cardInfo.bankLogo}`"
                                :alt="cardInfo.bankName"
                            />
                        </div>

                        <div class="card__brand-logo-wrapper">
                            <img
                                class="card__brand-logo"
                                :src="`${imagesBasePath}${cardInfo.brandLogo}`"
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
                        autocomplete="cc-number"
                        maxlength="23"
                        pattern="[ 0-9]*"
                        inputmode="numeric"
                        ref="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        v-mask="cardNumberMask"
                        :value="cardNumber"
                        :class="fieldCssClasses('cardNumber')"
                        :readonly="!isNew"
                        @input="onInput($event, 'cardNumber')"
                        @focus="onFocus($event, 'cardNumber')"
                        @blur="onBlur($event, 'cardNumber')"
                        @keydown.delete="onDel($event, 'cardNumber')"
                        @keydown.enter.prevent="onInputEnter"
                    />

                    <input
                        type="hidden"
                        data-cp="name"
                        autocomplete="cc-name"
                        :value="cardHolderName"
                    />

                    <button
                        v-if="isNew && !isFieldEmpty('cardNumber')"
                        class="card__field-icon"
                        @click.prevent.stop="onReset"
                    >
                        <span class="card__field-icon-close"></span>
                    </button>

                    <VueBankCardTooltip :is-show="$v.cardNumber.$error">
                        Вам нужно заполнить это поле
                    </VueBankCardTooltip>
                    <VueBankCardTooltip
                        :is-show="!!errorFiltered('cardNumber')"
                    >
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
                        Карта действует до:
                    </p>

                    <div class="card__expiration">
                        <div class="card__date">
                            <input
                                type="text"
                                data-cp="expDateMonth"
                                autocomplete="cc-exp-month"
                                pattern="[0-9]{2}"
                                maxlength="2"
                                inputmode="numeric"
                                ref="expDateMonth"
                                placeholder="ММ"
                                v-mask="expDateMonthMask"
                                :value="expDateMonth"
                                :class="fieldCssClasses('expDateMonth')"
                                class="card__field-input"
                                @input="onInput($event, 'expDateMonth')"
                                @focus="onFocus($event, 'expDateMonth')"
                                @blur="onBlur($event, 'expDateMonth')"
                                @keydown.delete="onDel($event, 'expDateMonth')"
                                @keydown.enter.prevent="onInputEnter"
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
                                autocomplete="cc-exp-year"
                                pattern="[0-9]{2}"
                                maxlength="2"
                                inputmode="numeric"
                                ref="expDateYear"
                                placeholder="ГГ"
                                v-mask="expDateYearMask"
                                :value="expDateYear"
                                :class="fieldCssClasses('expDateYear')"
                                class="card__field-input"
                                @input="onInput($event, 'expDateYear')"
                                @focus="onFocus($event, 'expDateYear')"
                                @blur="onBlur($event, 'expDateYear')"
                                @keydown.delete="onDel($event, 'expDateYear')"
                                @keydown.enter.prevent="onInputEnter"
                            />
                        </div>
                    </div>

                    <VueBankCardTooltip
                        :is-show="
                            $v.expDateMonth.$error || $v.expDateYear.$error
                        "
                    >
                        Введите дату как на карте
                    </VueBankCardTooltip>
                    <VueBankCardTooltip
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

                <div class="card__field-group card__code">
                    <div class="card__field-secured-info">
                        <VueBankCardBaseHelper
                            :special-color="cssPropertySpecial('textColor') || '#74747c'"
                        />

                        <p
                            class="card__field-label"
                            :style="{ color: cssPropertySpecial('textColor') }"
                        >
                            CVV код
                        </p>
                    </div>

                    <input
                        type="text"
                        data-cp="cvv"
                        autocomplete="cc-csc"
                        inputmode="numeric"
                        ref="cvv"
                        v-mask="cvvMask"
                        :value="cvv"
                        :placeholder="cardInfo.codeName || 'CVV'"
                        :class="[...fieldCssClasses('cvv')]"
                        class="card__field--secured card__field-input"
                        @input="onInput($event, 'cvv')"
                        @focus="onFocus($event, 'cvv')"
                        @blur="onBlur($event, 'cvv')"
                        @keydown.delete="onDel($event, 'cvv')"
                        @keydown.enter.prevent="onInputEnter"
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

import { commonMixin, validatorsMixin, helpersMixin } from "@/mixins";
import VueBankCardTooltip from "./VueBankCardTooltip";
import VueBankCardBaseHelper from "./VueBankCardBaseHelper";

export default {
    name: "VueBankCardBase",
    components: {
        VueBankCardTooltip,
        VueBankCardBaseHelper
    },
    directives: { mask },
    mixins: [commonMixin, validationMixin, validatorsMixin, helpersMixin],
    data() {
        return {
            fields: [
                { ref: "cardNumber" },
                { ref: "expDateMonth" },
                { ref: "expDateYear" },
                { ref: "cvv" }
            ],
            availableBrands: ["master-card", "maestro", "visa", "mir"]
        };
    },
    mounted() {
        this.isFocus && this.isNew && this.$refs.cardNumber.focus();
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
        onReset() {
            this.resetForm();
        },
        onInputEnter(event) {
            if (!this.$v.$invalid) {
                event.target.blur();
            }
            this.$v.$touch();
            this.$emit("enter", event);
        }
    }
};
</script>

<style lang="scss" scoped>
$base-font-family: "Roboto", sans-serif;
$field-font-family: "Roboto Mono", sans-serif;
$security-font-family: "text-security-disc";

$card-bg-color: #e6e7f4;

$base-color: #000;
$field-color: #74747c;

$field-focus-outline-color: #ffb82e;
$field-invalid-outline-color: #ff5959;

.card {
    position: relative;
    width: 380px;
    border-radius: 16px;
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
        padding: 6.3% 4.2%;
    }

    &__main {
        display: flex;
        flex-flow: column nowrap;
    }

    &__info {
        display: flex;
        width: 100%;
        height: 24px;
    }

    &__number {
        position: relative;
        margin-top: 16px;
    }

    &__extra {
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-end;
        justify-content: space-between;
        .card__field-input {
            text-align: center;
            margin-top: 5px;
        }
    }

    &__date {
        width: 49px;
    }

    &__code {
        width: 76px;
    }

    &__expiration {
        display: flex;
        align-items: center;
    }

    &__field {
        width: 100%;
        padding: 15px;
        border: 1px solid #f0f5fb;
        border-radius: 5px;
        outline: none;
        font-family: $field-font-family;
        font-size: 14px;
        font-weight: 400;
        color: $base-color;
        line-height: 125%;
        transition: border-color 0.3s;

        &:focus {
            border-color: $field-focus-outline-color;
        }

        &--invalid {
            border-color: $field-invalid-outline-color;
        }

        &--secured {
            font-family: $security-font-family;
            font-size: 12px;
            letter-spacing: 0.35em;
        }

        &-label {
            margin: 0;
            vertical-align: middle;
            font-family: $base-font-family;
            font-size: 10px;
            font-weight: 300;
            line-height: 15px;
            color: $field-color;
            transition: color 0.3s;
        }
        &-secured-info {
            display: flex;
            align-items: center;
        }

        &-divider {
            margin: 0 4px;
            font-family: $field-font-family;
            font-size: 14px;
            font-weight: 400;
            line-height: 125%;
            color: $field-color;
            transition: color 0.3s;
        }

        &-group {
            position: relative;
        }

        &-mock {
            display: block;
            width: 100%;
            padding: 15px;
            border: 1px solid #f0f5fb;
            border-radius: 5px;
            background-color: #fff;
            font-size: 16px;
            line-height: 125%;
            font-weight: 400;
            font-family: $field-font-family;
            color: $field-color;
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
                        background-color: $field-color;
                    }
                }
            }

            &-close {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(45deg);
                display: block;
                width: 12px;
                height: 12px;

                &::before,
                &::after {
                    content: "";
                    position: absolute;
                    background-color: $base-color;
                    transition: background-color 0.3s;
                }

                &::before {
                    top: 0;
                    left: 50%;
                    height: 100%;
                    transform: translateX(-50%);
                    width: 1px;
                }

                &::after {
                    top: 50%;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    transform: translateY(-50%);
                }
            }
        }
    }

    &__brand {
        &-placeholder {
            padding-top: 4px;
            display: flex;

            .card__brand-logo-wrapper {
                align-items: center;
            }
        }

        &-logo {
            min-height: 15px;
            max-height: 24px;

            &-wrapper {
                display: flex;
                align-items: flex-start;
                max-width: 90px;

                &:not(:last-child) {
                    margin-right: 16px;
                }
            }
        }
    }

    &__bank {
        &-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            img {
                height: 24px;
            }
        }

        &-logo {
            max-height: 24px;

            &-wrapper {
                display: flex;
            }
        }
    }
}
</style>

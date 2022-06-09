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
                        Действует до:
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
                    <p
                        class="card__field-label"
                        :style="{ color: cssPropertySpecial('textColor') }"
                    >
                        Код с обратной стороны:
                    </p>

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
                        class="card__field--secured"
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

export default {
    name: "VueBankCardBase",
    components: {
        VueBankCardTooltip
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
$base-font-family: "PT Sans", Arial, sans-serif;
$field-font-family: "Roboto Mono", Arial, sans-serif;
$security-font-family: "text-security-disc";

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

            .card__brand-logo-wrapper {
                align-items: center;
            }
        }

        &-logo {
            width: 40px;

            &-wrapper {
                display: flex;
                align-items: flex-start;
                max-width: 40px;

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

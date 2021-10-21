import { shallowMount } from "@vue/test-utils";

import VueBankCardSmall from "@/components/VueBankCardSmall";
import CardInfo from "@/services/card-info";
import { isObject } from "@/utils/helpers";

describe("VueBankCardSmall", () => {
    class Props {
        constructor() {
            this.cardNumber = "";
            this.cardHolderName = "CARDHOLDER NAME";
            this.expDateMonth = "";
            this.expDateYear = "";
            this.cvv = "";
            this.errors = {};
            this.isNew = false;
            this.isReset = false;
            this.cardInfo = new CardInfo(this.cardNumber);
        }
    }
    const props = new Props();

    const wrapper = shallowMount(VueBankCardSmall, {
        propsData: { ...props }
    });

    describe("contains props", () => {
        for (const [key, value] of Object.entries(props)) {
            it(key, () => {
                const method = isObject(value) ? "toEqual" : "toBe";
                expect(wrapper.props(key))[method](value);
            });
        }
    });

    describe("if isNew", () => {
        const labelSelector = ".card__number .card__field-label";

        describe("is true", () => {
            let wrapper = null;
            let label = null;
            let input = null;
            beforeEach(() => {
                const isNew = true;
                wrapper = shallowMount(VueBankCardSmall, {
                    propsData: {
                        ...props,
                        isNew
                    }
                });
                label = wrapper.find("[data-test-label-field-number]");
                input = wrapper.find("[data-test-input-field-number]");
            });

            describe("placeholder text", () => {
                const defaultText = "Новая карта";
                const nextStepText = "Номер карты";
                it(`default: placeholder on input should be "${defaultText}"`, () => {
                    expect(input.element.placeholder).toBe(defaultText);
                });

                describe("if click on field card", () => {
                    it(`label text should be "${nextStepText}"`, async () => {
                        await wrapper.trigger("click");
                        expect(input.element.placeholder).toBe(nextStepText);
                    });
                });
            });

            describe("label", () => {
                it("default: label doesn't should exist", () => {
                    expect(label.exists()).toBeFalsy();
                });
            });

            it.each([
                ["month", "cc-exp-month"],
                ["year", "cc-exp-year"],
                ["cvc", "cc-csc"]
            ])("then show %s input", (inputName, inputType) => {
                const input = wrapper.find(`[autocomplete="${inputType}"]`);
                expect(input.isVisible()).toBeTruthy();
            });
        });

        it("is false, then show saved card", () => {
            const isNew = false;
            const cardNumber = "5536 9111 2222 3333";
            const cardInfo = new CardInfo(cardNumber);
            const wrapper = shallowMount(VueBankCardSmall, {
                propsData: {
                    ...props,
                    isNew,
                    cardNumber,
                    cardInfo
                }
            });
            const numberCollapsed = "•••• 3333";
            const numberCollapsedEl = wrapper.find(".card__number-caption");

            expect(wrapper.contains(labelSelector)).toBeFalsy();
            expect(numberCollapsedEl.isVisible()).toBeTruthy();
            expect(numberCollapsedEl.text()).toBe(numberCollapsed);
        });
    });

    describe("if info about bank and brand is", () => {
        describe("defined", () => {
            it("show brand logo", () => {
                const cardNumber = "55";
                const cardInfo = new CardInfo(cardNumber);
                const wrapper = shallowMount(VueBankCardSmall, {
                    propsData: {
                        ...props,
                        cardNumber,
                        cardInfo
                    }
                });
                const iconEl = wrapper.find(".card__icon");
                const icon = "master-card-colored.svg";

                expect(iconEl.attributes().style.includes(icon)).toBeTruthy();
            });
        });

        it("show bank logo", () => {
            const cardNumber = "5536 9111 2222 3333";
            const cardInfo = new CardInfo(cardNumber);
            const wrapper = shallowMount(VueBankCardSmall, {
                propsData: {
                    ...props,
                    cardNumber,
                    cardInfo
                }
            });
            const iconEl = wrapper.find(".card__icon");
            const icon = "ru-tinkoff-sm.png";
            const bankColor = "rgb(51, 51, 51)";

            expect(iconEl.attributes().style.includes(icon)).toBeTruthy();
            expect(iconEl.attributes().style.includes(bankColor)).toBeTruthy();
        });

        describe("undefined", () => {
            const cardNumber = "";
            const cardInfo = new CardInfo(cardNumber);
            const wrapper = shallowMount(VueBankCardSmall, {
                propsData: {
                    ...props,
                    cardNumber,
                    cardInfo
                }
            });

            it("show default card icon", () => {
                const iconEl = wrapper.find(".card__icon");
                const icon = "card-icon.svg";

                expect(iconEl.attributes().style.includes(icon)).toBeTruthy();
            });
        });
    });
});

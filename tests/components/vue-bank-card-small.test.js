import { shallowMount } from "@vue/test-utils";

import VueBankCardSmall from "@/components/VueBankCardSmall";
import CardInfo from "@/services/card-info";
import { isObject } from "@/utils/helpers";

describe("VueBankCardSmall", () => {
    class Props {
        constructor() {
            this.number = "";
            this.name = "CARDHOLDER NAME";
            this.month = "";
            this.year = "";
            this.code = "";
            this.errors = {};
            this.isNew = false;
            this.isReset = false;
            this.cardInfo = new CardInfo(this.number);
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
        const titleSelector = ".card__main-title";
        const labelSelector = ".card__number .card__field-label";

        it("is true, then show new card", () => {
            const isNew = true;
            const wrapper = shallowMount(VueBankCardSmall, {
                propsData: {
                    ...props,
                    isNew
                }
            });

            expect(wrapper.contains(labelSelector)).toBeTruthy();
            expect(wrapper.find(titleSelector).isVisible()).toBeTruthy();
        });

        it("is false, then show saved card", () => {
            const isNew = false;
            const number = "5536 9111 2222 3333";
            const cardInfo = new CardInfo(number);
            const wrapper = shallowMount(VueBankCardSmall, {
                propsData: {
                    ...props,
                    isNew,
                    number,
                    cardInfo
                }
            });
            const numberCollapsed = "•••• 3333";
            const numberCollapsedEl = wrapper.find(".card__number-caption");

            expect(wrapper.contains(labelSelector)).toBeFalsy();
            expect(wrapper.find(titleSelector).isVisible()).toBeFalsy();
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
                const icon = "master-card-colored.png";

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

import { shallowMount } from "@vue/test-utils";

import VueBankCardBase from "@/components/VueBankCardBase";
import CardInfo from "@/services/card-info";
import { isObject } from "@/utils/helpers";

describe("VueBankCardBase", () => {
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

    const wrapper = shallowMount(VueBankCardBase, {
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
        const selector = ".card__extra";
        it("true, then show new card", () => {
            const isNew = true;
            const wrapper = shallowMount(VueBankCardBase, {
                propsData: {
                    ...props,
                    isNew
                }
            });

            expect(wrapper.contains(selector)).toBeTruthy();
        });

        it("false, then show saved card", () => {
            const isNew = false;
            const cardNumber = "5536 9111 2222 3333";
            const cardInfo = new CardInfo(cardNumber);
            const wrapper = shallowMount(VueBankCardBase, {
                propsData: {
                    ...props,
                    isNew,
                    cardNumber,
                    cardInfo
                }
            });
            const numberCollapsed = "•••• 3333";

            expect(wrapper.find(".card__field-mock").text()).toBe(
                numberCollapsed
            );
            expect(wrapper.contains(selector)).toBeFalsy();
        });
    });

    describe("if info about bank and brand is", () => {
        const bankInfoSelector = ".card__bank-info";
        const brandsPlaceholderSelector = ".card__brand-placeholder";

        describe("defined", () => {
            const cardNumber = "5536 9111 2222 3333";
            const cardInfo = new CardInfo(cardNumber);
            const wrapper = shallowMount(VueBankCardBase, {
                propsData: {
                    ...props,
                    cardNumber,
                    cardInfo
                }
            });

            it("show correct color of bank in background", () => {
                expect(wrapper.attributes("style")).toBe(
                    "background-color: rgb(51, 51, 51);"
                );
            });

            it("show bank and brand logos", () => {
                expect(wrapper.contains(brandsPlaceholderSelector)).toBeFalsy();
                expect(wrapper.contains(bankInfoSelector)).toBeTruthy();
            });
        });

        describe("undefined", () => {
            const cardNumber = "";
            const cardInfo = new CardInfo(cardNumber);
            const wrapper = shallowMount(VueBankCardBase, {
                propsData: {
                    ...props,
                    cardNumber,
                    cardInfo
                }
            });

            it("show brands placeholder", () => {
                expect(
                    wrapper.contains(brandsPlaceholderSelector)
                ).toBeTruthy();
                expect(wrapper.contains(bankInfoSelector)).toBeFalsy();
            });

            it("show default color in background", () => {
                expect(wrapper.attributes("style")).toBe(undefined);
            });
        });

        describe("events", () => {
            const wrapper = shallowMount(VueBankCardBase, {
                propsData: {
                    ...props,
                    isNew: true
                }
            });

            describe("enter", () => {
                it("emit card number input on enter", () => {
                    const formSelector = '[data-cp="cardNumber"]';
                    wrapper.find(formSelector).trigger("keydown.enter");
                    expect(wrapper.emitted().enter).toBeTruthy();
                });

                it("emit expDateMonth input on enter", () => {
                    const formSelector = '[data-cp="expDateMonth"]';
                    wrapper.find(formSelector).trigger("keydown.enter");
                    expect(wrapper.emitted().enter).toBeTruthy();
                });

                it("emit expDateYear input on enter", () => {
                    const formSelector = '[data-cp="expDateYear"]';
                    wrapper.find(formSelector).trigger("keydown.enter");
                    expect(wrapper.emitted().enter).toBeTruthy();
                });

                it("emit cvv input on enter", () => {
                    const formSelector = '[data-cp="cvv"]';
                    wrapper.find(formSelector).trigger("keydown.enter");
                    expect(wrapper.emitted().enter).toBeTruthy();
                });
            });

            describe("blur", () => {
                const formSelector = '[data-cp="cvv"]';
                let formElement;

                it("should emit blur when is happening event `keydown.enter` on input if all field is valid", () => {
                    const wrapper = shallowMount(VueBankCardBase, {
                        propsData: {
                            ...props,
                            isNew: true,
                            cardNumber: "4242 4242 4242 4242",
                            expDateMonth: "06",
                            expDateYear: "29",
                            cvv: "111",
                            cardInfo: new CardInfo("4242 4242 4242 4242")
                        },
                    });

                    formElement = wrapper.find(formSelector).element;
                    jest.spyOn(formElement, 'blur').mockImplementation(() => {});

                    wrapper.vm.$nextTick();
                    wrapper.find(formSelector).trigger("keydown.enter");
                    expect(formElement.blur).toHaveBeenCalled();
                });

                it("should not emit blur when is happening event `keydown.enter` on input if any of field not valid", () => {
                    const wrapper = shallowMount(VueBankCardBase, {
                        propsData: {
                            ...props,
                            isNew: true,
                            cardNumber: "4242 4242 4242 4242",
                            expDateMonth: "",
                            expDateYear: "29",
                            cvv: "111",
                            cardInfo: new CardInfo("4242 4242 4242 4242")
                        },
                    });

                    formElement = wrapper.find(formSelector).element;
                    jest.spyOn(
                        formElement,
                        "blur"
                    ).mockImplementation(() => {});

                    wrapper.vm.$nextTick();
                    wrapper.find(formSelector).trigger("keydown.enter");
                    expect(formElement.blur).toHaveBeenCalledTimes(0);
                });
            });
        });
    });
});

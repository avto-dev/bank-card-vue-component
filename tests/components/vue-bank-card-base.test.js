import { shallowMount } from "@vue/test-utils";

import VueBankCardBase from "@/components/VueBankCardBase";
import CardInfo from "@/services/card-info";

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

    describe("if isNew", () => {
        const selector = ".card__extra";
        it("true, then show new card", () => {
            const isNew = true;
            const wrapper = shallowMount(VueBankCardBase, {
                props: {
                    ...props,
                    isNew,
                },
            });

            expect(wrapper.find(selector).exists()).toBe(true);
        });

        it("false, then show saved card", () => {
            const isNew = false;
            const cardNumber = "5536 9111 2222 3333";
            const cardInfo = new CardInfo(cardNumber);
            const wrapper = shallowMount(VueBankCardBase, {
                props: {
                    ...props,
                    isNew,
                    cardNumber,
                    cardInfo,
                },
            });
            const numberCollapsed = "3333";

            expect(wrapper.find(".card__field-mock").text()).toBe(
                numberCollapsed
            );
            expect(wrapper.find(selector).exists()).toBe(false);
        });
    });

    describe("if info about bank and brand is", () => {
        const bankInfoSelector = ".card__bank-info";
        const brandsPlaceholderSelector = ".card__brand-placeholder";

        describe("defined", () => {
            const cardNumber = "5536 9111 2222 3333";
            const cardInfo = new CardInfo(cardNumber);
            const wrapper = shallowMount(VueBankCardBase, {
                props: {
                    ...props,
                    cardNumber,
                    cardInfo,
                },
            });

            it("show correct color of bank in background", () => {
                expect(wrapper.attributes("style")).toBe(
                    "background-color: rgb(51, 51, 51);"
                );
            });

            it("show bank and brand logos", () => {
                expect(wrapper.find(brandsPlaceholderSelector).exists()).toBe(
                    false
                );
                expect(wrapper.find(bankInfoSelector).exists()).toBe(true);
            });
        });

        describe("undefined", () => {
            const cardNumber = "";
            const cardInfo = new CardInfo(cardNumber);
            const wrapper = shallowMount(VueBankCardBase, {
                props: {
                    ...props,
                    cardNumber,
                    cardInfo,
                },
            });

            it("show brands placeholder", () => {
                expect(wrapper.find(brandsPlaceholderSelector).exists()).toBe(true);
                expect(wrapper.find(bankInfoSelector).exists()).toBe(false);
            });

            it("show default color in background", () => {
                expect(wrapper.attributes("style")).toBe(undefined);
            });
        });
    });
});

import { shallowMount } from "@vue/test-utils";

import VueBankCard from "@/components/VueBankCard";
import VueBankCardBase from "@/components/VueBankCardBase";
import VueBankCardSmall from "@/components/VueBankCardSmall";
import CardInfo from "@/services/card-info";

describe("VueBankCard", () => {
    it("is an instance of Vue", () => {
        const wrapper = shallowMount(VueBankCard);

        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    describe("isSmall prop", () => {
        it("if true, show small", () => {
            const wrapper = shallowMount(VueBankCard, {
                propsData: { isSmall: true }
            });

            expect(wrapper.contains(VueBankCardSmall)).toBeTruthy();
        });

        it("if false, show base", () => {
            const wrapper = shallowMount(VueBankCard, {
                propsData: { isSmall: false }
            });

            expect(wrapper.contains(VueBankCardBase)).toBeTruthy();
        });
    });

    it("isNew prop", () => {
        const wrapper = shallowMount(VueBankCard, {
            propsData: { isNew: true }
        });

        expect(wrapper.props("isNew")).toBe(true);
    });

    describe("number prop", () => {
        it("string", () => {
            const number = "4242424242424242";
            const wrapper = shallowMount(VueBankCard, {
                propsData: { number }
            });

            expect(wrapper.vm.cardNumber).toBe(number);
        });

        it("object", () => {
            const number = {
                first_six: "424242",
                last_four: "4242"
            };
            const numberTransformed = "4242420000004242";
            const wrapper = shallowMount(VueBankCard, {
                propsData: { number }
            });

            expect(wrapper.vm.cardNumber).toBe(numberTransformed);
        });
    });

    it("errors props", () => {
        const errors = {
            cardNumber: "Недостаточно средств на карте",
            expDateMonth: "Карта просрочена",
            cvv: "Неверный код cvv"
        };
        const wrapper = shallowMount(VueBankCard, {
            propsData: { errors }
        });

        expect(wrapper.props("errors")).toEqual(errors);
    });

    it("card info", () => {
        const wrapper = shallowMount(VueBankCard);
        expect(wrapper.vm.cardInfo instanceof CardInfo).toBeTruthy();
    });
});

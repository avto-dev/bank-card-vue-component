import { mount } from "@vue/test-utils";

import VueBankCardTooltip from "@/components/VueBankCardTooltip";

describe("VueBankCardTooltip", () => {
    describe("isShow prop", () => {
        it("show tooltip if prop isShow", () => {
            const wrapper = mount(VueBankCardTooltip, {
                props: {
                    isShow: true
                }
            });

            expect(wrapper.find(".card__tooltip").exists()).toBe(true);
        });

        it("hide tooltip by default", () => {
            const wrapper = mount(VueBankCardTooltip, {
                props: {
                    isShow: false,
                }
            });

            expect(wrapper.find(".card__tooltip").exists()).toBe(false);
        });
    });

    describe("position prop", () => {
        const positions = ["right", "left"];

        for (const position of positions) {
            it(`show ${position} if prop is ${position}`, () => {
                const wrapper = mount(VueBankCardTooltip, {
                    props: {
                        isShow: true,
                        position
                    }
                });

                expect(wrapper.find(`.card__tooltip--${position}`).exists()).toBe(true);
            });
        }
    });

    it("show message", () => {
        const message = "Введите номер карты";
        const wrapper = mount(VueBankCardTooltip, {
            props: {
                isShow: true
            },
            slots: {
                default: message
            }
        });

        expect(wrapper.find(".card__tooltip-message").text()).toBe(message);
    });
});

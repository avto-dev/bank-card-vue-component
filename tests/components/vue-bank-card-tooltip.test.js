import { mount } from "@vue/test-utils";
import VueBankCardTooltip from "@/components/VueBankCardTooltip";

describe("VueBankCardTooltip", () => {
    describe("isShow prop", () => {
        it("show tooltip if prop isShow", () => {
            const wrapper = mount(VueBankCardTooltip, {
                propsData: {
                    isShow: true
                }
            });

            expect(wrapper.contains(".card__tooltip")).toBeTruthy();
        });

        it("hide tooltip by default", () => {
            const wrapper = mount(VueBankCardTooltip);

            expect(wrapper.contains(".card__tooltip")).toBeFalsy();
        });
    });

    describe("position prop", () => {
        const positions = ["right", "left"];

        for (const position of positions) {
            it(`show ${position} if prop is ${position}`, () => {
                const wrapper = mount(VueBankCardTooltip, {
                    propsData: {
                        isShow: true,
                        position
                    }
                });

                expect(
                    wrapper.contains(`.card__tooltip--${position}`)
                ).toBeTruthy();
            });
        }
    });

    it("show message", () => {
        const message = "Введите номер карты";
        const wrapper = mount(VueBankCardTooltip, {
            propsData: {
                isShow: true
            },
            slots: {
                default: message
            }
        });

        expect(wrapper.find(".card__tooltip-message").text()).toBe(message);
    });
});

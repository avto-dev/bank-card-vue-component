import { shallowMount } from "@vue/test-utils";

import VueBankCard from "@/components/VueBankCard";
import VueBankCardBase from "@/components/VueBankCardBase";
import VueBankCardSmall from "@/components/VueBankCardSmall";

describe("VueBankCard", () => {
    describe("isSmall prop", () => {
        it("if true, show small", () => {
            const wrapper = shallowMount(VueBankCard, {
                props: { isSmall: true }
            });

            expect(wrapper.findComponent(VueBankCardSmall).exists()).toBe(true);
        });

        it("if false, show base", () => {
            const wrapper = shallowMount(VueBankCard, {
                props: { isSmall: false }
            });

            expect(wrapper.findComponent(VueBankCardBase).exists()).toBe(true);
        });
    });
});

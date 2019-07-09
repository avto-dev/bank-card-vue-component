import { shallowMount } from "@vue/test-utils";

import VueBankCard from "@/components/VueBankCard";
import VueBankCardBase from "@/components/VueBankCardBase";
import VueBankCardSmall from "@/components/VueBankCardSmall";
import CardInfo from "@/services/card-info";

describe("VueBankCard", () => {
  const wrapper = shallowMount(VueBankCard);

  it("is an instance of Vue", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  describe("isSmall prop", () => {
    it("if true, show small", () => {
      wrapper.setProps({ isSmall: true });

      expect(wrapper.contains(VueBankCardSmall)).toBeTruthy();
    });

    it("if false, show base", () => {
      wrapper.setProps({ isSmall: false });

      expect(wrapper.contains(VueBankCardBase)).toBeTruthy();
    });
  });

  it("isNew prop", () => {
    wrapper.setProps({ isNew: true });

    expect(wrapper.props("isNew")).toBe(true);
  });

  describe("number prop", () => {
    const wrapper = shallowMount(VueBankCard, {
      methods: {
        create() {
          this.init();
        }
      }
    });

    it("string", () => {
      const number = "4242424242424242";
      wrapper.setProps({ number });
      wrapper.vm.create();

      expect(wrapper.vm.cardNumber).toBe(number);
    });

    it("object", () => {
      const number = {
        first_six: "424242",
        last_four: "4242"
      };
      const numberTransformed = "4242420000004242";
      wrapper.setProps({ number });
      wrapper.vm.create();

      expect(wrapper.vm.cardNumber).toBe(numberTransformed);
    });
  });

  it("errors props", () => {
    const errors = {
      cardNumber: "Недостаточно средств на карте",
      expDateMonth: "Карта просрочена",
      cvv: "Неверный код cvv"
    };
    wrapper.setProps({ errors });

    expect(wrapper.props("errors")).toEqual(errors);
  });

  it("card info", () => {
    expect(wrapper.vm.cardInfo instanceof CardInfo).toBeTruthy();
  });
});

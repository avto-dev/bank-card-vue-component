<template>
  <div id="app">
    <!--<Card is-new is-small @form-id="formBaseId = $event" />-->
    <!--<Card is-new is-small :errors="errors" @form-id="formSmallId = $event" />-->
    <!--<Card :number="number" />-->
    <Card is-new :is-reset="reset" @reset="reset = $event" />
  </div>
</template>

<script>
import Card from "@/components/VueBankCard";

export default {
  name: "App",
  components: {
    Card
  },
  data() {
    return {
      number: "4276163199737755",
      formBaseId: "",
      formSmallId: "",
      errors: {
        cardNumber: "Недостаточно средств на карте",
        expDateMonth: "Карта просрочена",
        cvv: "Неверный код cvv"
      },
      reset: false
    };
  },
  methods: {
    onEnter(event) {
      event.preventDefault();
      console.log(event);
    }
  }
};
</script>

<style lang="scss">
*,
*::after,
*::before {
  box-sizing: border-box;
}

#app {
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
}
</style>

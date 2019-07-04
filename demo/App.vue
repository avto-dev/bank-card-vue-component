<template>
  <div id="app">
    <!--<Card is-new is-small @form-id="formBaseId = $event" />-->
    <!--<Card is-new is-small :errors="errors" @form-id="formSmallId = $event" />-->
    <!--<Card :number="number" />-->
    <Card is-new is-small @enter="onEnter" />
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
      }
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
@import url("https://fonts.googleapis.com/css?family=PT+Sans&display=swap&subset=cyrillic");
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap&subset=cyrillic");

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

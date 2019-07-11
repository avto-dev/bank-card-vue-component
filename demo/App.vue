<template>
    <div id="app">
        <!--<Card is-new is-small />-->
        <!--<Card is-new is-small :errors="errors" />-->
        <!--<Card :number="number" />-->
        <VueBankCard is-new :is-reset="reset" @reset="reset = $event" />
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            number: "4276163199737755",
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

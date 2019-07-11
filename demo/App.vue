<template>
    <div id="app">
        <VueBankCard number="5536 9111 2222 3333" />
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

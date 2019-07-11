<template>
    <div id="app">
        <h1>Bank card vue component</h1>
        <h2>v{{ pckg.version }}</h2>

        <ul>
            <li>
                <h3>New base card</h3>
                <VueBankCard is-new />
            </li>
            <li>
                <h3>Saved base card</h3>
                <VueBankCard :number="number" />
            </li>
            <li>
                <h3>New small card</h3>
                <VueBankCard is-new is-small />
            </li>
            <li>
                <h3>Saved small card</h3>
                <VueBankCard is-small :number="number" />
            </li>
        </ul>

        <p>Docs are available by <a :href="readmePath">link</a></p>
    </div>
</template>

<script>
import pjson from "../package";

export default {
    name: "App",
    data() {
        return {
            pckg: pjson,
            readmePath:
                "https://github.com/avto-dev/bank-card-vue-component/blob/dev/README.md",
            number: "5536 9111 2222 3333",
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

body {
    font-family: sans-serif;
}

ul {
    padding: 0;
    margin: 0;
    list-style: none;
}

ul li {
    margin-bottom: 40px;
}

#app {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 20px;
}
</style>

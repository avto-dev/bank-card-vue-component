<template>
    <div id="app">
        <h1>Bank card vue component</h1>
        <ul>
            <li>
                <h3>New base card</h3>
                <VueBankCard :images-base-path="imagesPath" is-new />

                <div class="highlight">
                    <!-- eslint-disable -->
                    <code>
                        &lt;<span class="pl-ent">vue-bank-card </span>
                        <span class="pl-e">is-new</span>
                        /&gt;
                    </code>
                    <!-- eslint-enable -->
                </div>
            </li>
            <li>
                <h3>Saved base card</h3>
                <VueBankCard :images-base-path="imagesPath" :number="number" />

                <div class="highlight">
                    <!-- eslint-disable -->
                    <code>
                        &lt;<span class="pl-ent">vue-bank-card </span>
                        :<span class="pl-e">number</span>=<span><span class="pl-pds">"</span>number<span class="pl-pds">"</span></span>
                        /&gt;
                        <br /> <br />
                        &lt;<span class="pl-ent">script</span>&gt;<br />
                        <span class="pl-k">export</span>&nbsp;<span class="pl-sl">default</span> {<br />
                        &nbsp;&nbsp;<span class="pl-e">data</span>() { <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span class="pl-k">return</span> { <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number<span class="pl-k">:</span> <span class="pl-pds">"5536 9111 2222 3333"</span> <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;}; <br />
                        &nbsp;&nbsp;} <br />
                        } <br />
                        &lt;/<span class="pl-ent">script</span>&gt;
                    </code>
                    <!-- eslint-enable -->
                </div>
            </li>
            <li>
                <h3>New small card</h3>
                <VueBankCard :images-base-path="imagesPath" is-new is-small />

                <div class="highlight">
                    <!-- eslint-disable -->
                    <code>
                        &lt;<span class="pl-ent">vue-bank-card </span>
                        <span class="pl-e">is-new </span>
                        <span class="pl-e">is-small</span>
                        /&gt;
                    </code>
                    <!-- eslint-enable -->
                </div>
            </li>
            <li>
                <h3>Saved small card</h3>
                <VueBankCard
                    :images-base-path="imagesPath"
                    is-small
                    :number="number"
                    @delete-card="onDelete"
                />

                <div class="highlight">
                    <!-- eslint-disable -->
                    <code>
                        &lt;<span class="pl-ent">vue-bank-card </span>
                        <span class="pl-e">is-small</span>
                        :<span class="pl-e">number</span>=<span><span class="pl-pds">"</span>number<span class="pl-pds">"</span></span>
                        /&gt;
                        <br /> <br />
                        &lt;<span class="pl-ent">script</span>&gt;<br />
                        <span class="pl-k">export</span>&nbsp;<span class="pl-sl">default</span> {<br />
                        &nbsp;&nbsp;<span class="pl-e">data</span>() { <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span class="pl-k">return</span> { <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number<span class="pl-k">:</span> {<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;first_six: <span class="pl-pds">"553691"</span>, <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last_four: <span class="pl-pds">"3333"</span> <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;}; <br />
                        &nbsp;&nbsp;} <br />
                        } <br />
                        &lt;/<span class="pl-ent">script</span>&gt;
                    </code>
                    <!-- eslint-enable -->
                </div>
            </li>
        </ul>

        <p>
            v{{ componentVersion }} | Documentation can be found
            <a :href="readmePath">here</a>
        </p>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            componentVersion: String(
                process.env.BANK_CARD_VUE_COMPONENT_VERSION
            ),
            imagesPath: "images/",
            readmePath:
                "https://github.com/avto-dev/bank-card-vue-component/blob/master/README.md",
            number: {
                first_six: "553691",
                last_four: "3333"
            },
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
        },
        onDelete(event) {
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

.highlight {
    margin: 15px 0;
    padding: 16px;
    border-radius: 3px;
    background-color: #f6f8fa;

    code {
        word-wrap: normal;
        word-break: normal;
    }

    .pl {
        &-ent {
            color: #22863a;
        }

        &-e {
            color: #6f42c1;
        }

        &-pds {
            color: #032f62;
        }

        &-k {
            color: #d73a49;
        }

        &-sl {
            color: #005cc5;
        }
    }
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

# Vue Bank Card

> Vue Component for user data entry of the bank card

## Installation

```bash
npm i --save avto-dev/bank-card-vue-component
```

or

```bash
yarn add avto-dev/bank-card-vue-component
```

You can import the library and use as a Vue plugin to enable the functionality globally on all components

```javascript
import Vue from "vue"
import VueBankCard from "vue-bank-card"
import "vue-bank-card/dist/vue-bank-card.css"

Vue.use(VueBankCard)
```

Alternatively it is possible to import a component directly

```javascript
import Vue from "vue"
import { VueBankCard } from "vue-bank-card"
import "vue-bank-card/dist/vue-bank-card.css"

Vue.component("VueBankCard", VueBankCard)
```

The browser-ready bundle is also provided in the package.

```html
<link rel="stylesheet" href="vue-bank-card/dist/vue-bank-card.css" />
<script src="vue-bank-card/dist/vue-bank-card.min.js"></script>
...
<vue-bank-card></vue-bank-card>
...
```


## Basic usage

```vue
<VueBankCard is-small is-new />
```

## Properties

| Name | Required | Type | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `number` | no | String, Object | "" | Number of card |
| `isSmall` | no | Boolean | false | View card controller: base or small |
| `isNew` | no | Boolean | false | View card controller: saved or new |
| `errors` | no | Object | {} | Errors from outside the component. From server etc. |
| `isReset` | no | Boolean | false | Trigger for reset form |

## Events

| Name | Type | Parameters | Description |
| :--- | :--- | :--- | :--- |
| `enter` | Function | `event` - Event of keydown | Handler of keydown on enter event |
| `clear-errors` | Function | `errors` - Object of errors | Clearing errors from outside |
| `reset` | Function | `isReset` - State of isReset property, type Boolean | Turn off isReset property |

## Example

```vue
<template>
  <VueBankCard
    is-small
    is-new
    :errors="errors"
    :is-reset="resetForm"
    @enter="onEnter"
    @clear-errors="clearErrors"
    @reset="resetForm = $event"
  ></VueBankCard>
</template>

<script>
export default {
  data() {
    return {
      errors: {
          cardNumber: "Недостаточно средств на карте",
          expDateMonth: "Карта просрочена",
          cvv: "Неверный код cvv"
      },
      resetForm: false
    }
  },
  methods: {
    onEnter(event) {
      event.preventDefault();
      console.log(event);
    },
    clearErrors(errors) {
      this.errors = { ...errors };
    }
  }
}
</script>
```

## Contributing

```bash
# install dependencies
npm install

# serve /demo with hot reload at localhost:8080
npm run serve

# create UMB bundle into /dist
npm run build

# run eslint
npm run lint

# run eslint with auto-fixes
npm run lint:fix

# run all tests
npm run test
```

## License

[MIT](http://opensource.org/licenses/MIT)

## Свойства

* **`is-new`** тип `Boolean`, по умолчанию `false`  
    Переключение между отображением: "Новая карта" и "Сохраненная"

```js
<Card is-new />
```

* **`is-small`** тип `Boolean`, по умолчанию `false`  
    Переключение между большим и малым отображением карты

```js
<Card is-small />
```

* **`number`** тип `String, Object`, по умолчанию `""`  
    Номер сохраненной карты (допускается строка с пробелами)

```js
<Card number="5536910011112222" />

const number = {
  first_six: 553691,
  last_four: 4242
}
<Card :number="number" />
```

* **`errors`** тип `Object`, по умолчанию `{}`  
    Объект с исключениями, приходящими от сервиса оплаты

```js
/**
* Пример errors:
*/
const errors = {
    cardNumber: 'Недостаточно средств',
    expDateMonth: 'Укажите месяц',
    expDateYear: 'Укажите год',
    cvv: 'Неверный код cvv'
}

<Card is-new :errors="errors" />
```

## События

* **`@enter`** возвращает `{ Object } event`  
    Обработчик нажатия по Enter

```js
function onEnter(event) {
  console.log(event)
};

<Card @enter="onEnter" />
```

* **`@clear-errors`** возвращает `Object`  
    Обработчик чистки ошибок

```js
let errors = {};

<Card @clear-errors="errors = $event" />
```

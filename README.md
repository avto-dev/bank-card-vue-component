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

You can import the library and styles, then use it as a Vue plugin to enable the functionality globally on all components.

```javascript
import Vue from "vue"
import VueBankCard from "vue-bank-card"
import "vue-bank-card/dist/vue-bank-card.css"

Vue.component("VueBankCard", VueBankCard)
```

The browser-ready bundle is also provided in the package.  
CDN: [jsDelivr](https://cdn.jsdelivr.net/gh/avto-dev/bank-card-vue-component@latest/dist/)

```html
<link rel="stylesheet" href="vue-bank-card/vue-bank-card.css" />
<script src="vue-bank-card/vue-bank-card.umd.min.js"></script>
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

## License

[MIT](http://opensource.org/licenses/MIT)

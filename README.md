# Card

Vue компонент Card для ввода данных банковской карты пользователя

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

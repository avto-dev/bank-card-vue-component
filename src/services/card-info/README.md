# CardInfo.js

CardInfo.js allows you to get the logo of the bank and brand, brand colors and etc. by card number. Use this data to make beautiful forms for bank cards. The database currently has 49 most popular Russian banks.

[Resource](https://stevemorse.org/ssn/List_of_Bank_Identification_Numbers.html) with identifiers of all brands and banks in the world.

## Get Started

Import class `CardInfo` and use it:
```js
import CardInfo from '@/services/card-info';

const cardInfo = new CardInfo('4377730000000000');
console.log('Bank name:', cardInfo.bankName);
// > Bank name: Тинькофф Банк
console.log('Bank logo:', cardInfo.bankLogo);
// > Bank logo: /banks-logos/ru-tinkoff.png
```

## Constructor

```
new CardInfo(number)
new CardInfo(number, options)
```

* **`number`** card number, number or string, spaces are allowed in the string.
* **`options`** the object with the settings.

## Instance

If the first 6 digits of the card number failed to determine the bank details, then the fields bankAlias, bankName, bankNameEn, bankCountry, bankUrl, bankLogoPng, bankLogoSvg, bankLogo, bankLogoStyle, backgroundColor, backgroundColors, backgroundLightness, textColor, backgroundGradient will have a default value.

If the first digits in the card number failed to determine the brand information, the fields brandAlias, brandName, brandLogoPng, brandLogoSvg, brandLogo, codeName, codeLength, numberLengths, numberGaps will have a default value.

* **`bankAlias`** by default `null`  
  Short name of the bank in English, all letters are small, without spaces. If the bank is not defined, the value is `null`.
* **`bankName`** by default `null`  
  The name of the bank in the language of the country in which the bank operates.
* **`bankNameEn`** by default `null`  
  Name of the bank in English.
* **`bankCountry`** by default `null`  
  The country code in which this bank operates.  `'ru'` — Russia.
* **`bankUrl`** by default `null`  
  Link to the site of the bank.
* **`bankLogo`** by default `null`  
  The path to the bank's logo. For each bank in the folder `/banks-logos` there is a logo in PNG format. The name of the file is determined by the property of the instance of `bankAlias`. The path to the file is determined by the property of the settings `banksLogosPath`. Example: for the bank "Tinkoff" the value will be `/banks-logos/ru-tinkoff.png`.
* **`bankLogoSm`** by default `null`  
  The path to the bank's logo in small kind. for each bank in the folder `/banks-logos` there is a logo in PNG format. The name of the file is determined by the property of the instance of `bankAlias` and `-sm`. The path to the file is determined by the property of the settings `banksLogosPath`. Example: for the bank "Tinkoff" the value will be `/banks-logos/ru-tinkoff-sm.png`.
 **`bankLogoStyle`** by default `null`  
  If the logo is predominantly black, then `"black"`, if it is white, then `"white"`, if colored - `"colored"`.
* **`backgroundColor`** by default `'#eeeeee'`  
  The color associated with the bank. If the bank is not defined, the value will be `'#eeeeee'`.
* **`backgroundColors`** by default `['#eeeeee', '#dddddd']`  
  An array of colors associated with the bank. If the bank is not defined, the value will be `['#eeeeee', '#dddddd']`.
* **`backgroundLightness`** by default `'light'`  
  if the background color is light, then the value is `'light'`, otherwise `'dark'`.
* **`backgroundGradient`** by default `linear-gradient(135deg, #eeeeee, #dddddd)`  
  Contains a string with the CSS property of the `background` property, setting which, you will get a gradient from the colors specified in the field `backgroundColors`. The angle can be specified in the property of the settings `gradientDegrees`.
* **`textColor`** by default `'#000'`  
  Yje color of the text that will be will visible on the background specified in the `backgroundColor` property.
* **`brandAlias`** by default `null`  
  Short name of the brand in English, all letters are small, without spaces.
* **`brandName`** by default `null`  
  The full name of the brand.
* **`brandLogo`** by default `null`  
  The path to the logo brand. For each brand in the folder `/brands-logos` there is a logo in PNG and SVG format and in three styles: black, white and color. The name of the file is determined by the property of the instance `brandAlias`. The path to the file is determined by the properties of the `brandsLogosPath` settings. The style of the logo is determined by the property of the `brandLogoPolicy` settings. Example: for the "Visa" brand, the value will be `/brands-logos/visa-colored.png`.
* **`codeName`** by default `null`  
  The name of the code on the back of the card (CVC/CID/CVV/CVN).
* **`codeLength`** by default `null`  
  Expected length of the security code. Usually 3, but for American Express cards 4.
* **`numberMask`** by default `0000 0000 0000 0000000`  
  Mask for the card number of this brand. Usually the mask is 0000 0000 0000 0000, but some brands of cards have a different length of the card number than 16 characters, and spaces are placed in other places. For example, for American Express cards the mask will be 0000 000000 00000.  The characters in the mask can be changed by changing the settings of `maskDigitSymbol` and `maskDelimiterSymbol`. Use the `numberMask` property to apply a mask to the card number entry field.
* **`numberGaps`** by default `[4, 8, 12]`  
  An array with numbers that determines the position of spaces when creating a mask.
* **`numberBlocks`** by default `[4, 4, 4, 7]`  
  An array with numbers that determines the number if digits in each block of the mask. Is is defined on the basis of the property `numberGaps` and the maximum number in `numberLengths`.
* **`numberLengths`** by default `[12, 13, 14, 15, 16, 17, 18, 19]`  
  An array with numbers that defines the number of characters allowed in the card number.
* **`numberNice`**  
  Card number, resulted in a beautiful view. The mask is defined by the property `numberMask`. Example: 4377730000000000 → 4377 7300 0000 0000, 437773 → 4377 73.
* **`number`**  
  Card number as a string with deleted spaces. If there were any characters in the transmitted card number, except for digits and spaces, there will be an empty string.
* **`numberSource`**  
  The card number that was sent when the instance was created.
* **`options`**  
  The settings used to create the instance.

## Settings
Settings are transferred either when creating a new instance:
```js
var cardInfo = new CardInfo('4377730000000000', {
  banksLogosPath: '/my/path/to/banks/logos',
  brandsLogosPath: '/my/path/to/brands/logos'
});
```

* **`banksLogosPath`** by default `'/banks-logos/'`  
  The path to files with bank logos.
* **`brandsLogosPath`** by default `'/brands-logos/'`  
  The path to files with brand logos.
* **`brandLogoPolicy`** by default `'auto'`  
  This setting determines the style of the logo brand. Available values are: 'black', 'white', 'colored', 'auto', 'mono'.
  * `'colored'`  
    The brand logo will be colored
  * `'black'`  
    The brand logo will be black
  * `'white'`  
    The brand logo will be white
  * `'mono'`  
    The brand logo will be white, if the background (`backgroundLightness`) is dark (`'dark'`).
    The brand logo will be dark, if the background (`backgroundLightness`) is light (`'light'`).
  * `'auto'`  
    The logo of the brand will be colored if the style of the bank logo (`bankLogoStyle`) is colored (`'colored'`).
    The logo of the brand will be white if the style of the bank logo (`bankLogoStyle`) is white (`'white'`).
    The logo of the brand will be black if the style of the bank logo (`bankLogoStyle`) is black (`'black'`).
    The brand logo will be colored if the bank is not defined
* **`maskDigitSymbol`** by default `'#'`  
  A character indicating the number in the mask of the card number specified in the property of the instance `numberMask`.
* **`maskDelimiterSymbol`** by default `' '`  
  A symbol indicating the delimiter in the mask of the card number specified in the property of the `numberMask` instance.
* **`gradientDegrees`** by default `135`  
  Degree, under which there is a gradient specified in the property of the instance `backgroundGradient`.

## Ways of connecting
Connect as a module in your code
```js
const CardInfo = require('@/services/card-info')
// or
import CardInfo from '@/services/card-info'
```

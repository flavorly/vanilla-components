---
outline: deep
---

# Phone Input

A Native Input dedicated to Mobile & Local Phone numbers, includes a beautiful country picker and a native input.
Exports the national number, local number & country code for flexible & easier way to validate on the backend.

!!!include(./src/parts/title-preview.md)!!!

<ExamplePhoneInput />

:::details :surfer: Click to expand the code
<<< @/components/ExamplePhoneInput.vue
:::

!!!include(./src/parts/title-props.md)!!!

| Prop                       | Description                                             | Accepted Values                 | Default                      |
|:---------------------------|:--------------------------------------------------------|:--------------------------------|:-----------------------------|
| `modelValue`               | The value for the element                               | `Any`, `Valid Country ISO Code` | `undefined`                  |
| `countryCode`              | The country code in ISO format                          | `Any`, `Valid Country ISO Code` | `undefined`                  |
| `phonePlaceholder`         | The placeholder for the phone number input              | `String`                        | `Your national number`       |
| `countryPlaceholder`       | The placeholder for the country input                   | `String`                        | `Your country`               |
| `favoriteCountries`        | Array of favorite countries to preload                  | `Array`                         | `['us','gb','pt','fr','de']` |
| `labelWithDialCode`        | If you want the label with a dial code                  | `Boolean`                       | `false`                      |
| `labelWithCountryCode`     | If you want the label with country code                 | `Boolean`                       | `false`                      |
| `searchBoxPlaceholder`     | Placeholder for the Search Box                          | `string`                        | `Search here`                |
| `noResultsText`            | When no results are found, the text to display          | `string`                        | `Sorry...`                   |
| `searchingText`            | Text to display while searching                         | `string`                        | `Please wait...`             |
| `loadingClosedPlaceholder` | When loading but dropdown closed                        | `string`                        | `Loading please wait...`     |
| `loadingMoreResultsText`   | Text while is pulling for next pages                    | `string`                        | `Loading more options...`    |
| `minimumInputLengthText`   | A function or a number with the minimum chars to search | `String`, `Function`            | `3`                          |



!!!include(./src/parts/title-slots.md)!!!

!!!include(./src/parts/default-slots.md)!!!

!!!include(./src/parts/title-events.md)!!!

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
!!!include(./src/parts/events-model-value.md)!!!
| `update:countryDialCode` | The country dial code | `string` |
| `update:countryCode` | The ISO country code | `string` |
| `update:phoneNumberNational` | Phone number in national format | `string` |
| `update:phoneNumberInternational` | Phone number in International format | `string` |





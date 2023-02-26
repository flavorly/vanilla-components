---
outline: deep
---

# Country Input

A `<RichSelect />` made only to pick a list of countries with beautiful flags for each country. Add your favorite countries & search for other countries. 

<!--@include: ../../parts/title-preview.md-->


<ExampleCountryInput />

:::details :surfer: Click to expand the code
<<< @/components/ExampleCountryInput.vue
:::

<!--@include: ../../parts/title-props.md-->

| Prop                       | Description                                             | Accepted Values                 | Default                      |
|:---------------------------|:--------------------------------------------------------|:--------------------------------|:-----------------------------|
| `modelValue`               | The value for the element                               | `Any`, `Valid Country ISO Code` | `undefined`                  |
| `favoriteCountries`        | Array of favorite countries to preload                  | `Array`                         | `['us','gb','pt','fr','de']` |
| `labelWithDialCode`        | If you want the label with a dial code                  | `Boolean`                       | `false`                      |
| `labelWithCountryCode`     | If you want the label with country code                 | `Boolean`                       | `false`                      |
| `searchBoxPlaceholder`     | Placeholder for the Search Box                          | `string`                        | `Search here`                |
| `noResultsText`            | When no results are found, the text to display          | `string`                        | `Sorry...`                   |
| `searchingText`            | Text to display while searching                         | `string`                        | `Please wait...`             |
| `loadingClosedPlaceholder` | When loading but dropdown closed                        | `string`                        | `Loading please wait...`     |
| `loadingMoreResultsText`   | Text while is pulling for next pages                    | `string`                        | `Loading more options...`    |
| `minimumInputLengthText`   | A function or a number with the minimum chars to search | `String`, `Function`            | `3`                          |


<!--@include: ../../parts/title-slots.md-->

### Slot `label`

The slot that will be used for the label of the country, for the current selected option and when closed

| Attribute         | Description            | Type     |
|:------------------|:-----------------------|:---------|
| `option`          | The given option       | `Object` | 
| `className`       | The current class name | `String` |

### Slot `option`

The slot for the option on the select dropdown.

| Attribute    | Description                       | Type      |
|:-------------|:----------------------------------|:----------|
| `option`     | The given option                  | `Object`  | 
| `className`  | The current class name            | `String`  |
| `isSelected` | If the current option is selected | `Boolean` |

<!--@include: ../../parts/default-slots.md-->

<!--@include: ../../parts/title-events.md-->

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
<!--@include: ../../parts/events-model-value.md-->
| `update:countryDialCode` | The country dial code | `string` |
| `update:countryCode` | The ISO country code | `string` |
| `update:countryName` | The English name of the country | `string` |


## Additional Components

You may also find additional components like `CountryOption` & `CountryFlag`, they bootstrap the current component, but you may use them standalone
The Country input is just a mix of the Rich Select & the Country Option. I will not bother document there here for the time being, as it find it useless.




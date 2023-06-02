---
outline: deep
---

# Tags Input

A input to spit out some tags, with batteries included!

<!--@include: ../../parts/title-preview.md-->

<ExampleTagsInput />

:::details :surfer: Click to expand the code
<<< @/components/ExampleTagsInput.vue
:::

<!--@include: ../../parts/title-props.md-->

| Prop                 | Description                                | Accepted Values    | Default       |
|:---------------------|:-------------------------------------------|:-------------------|:--------------|
| `modelValue`         | The value for the element                  | `string[]`         | `[]`          |
| `placeholder`        | Placeholder for the tags input             | `String`           | `''`          |
| `allowDuplicates`    | If duplicate values should be allowed      | `Boolean`          | `false`       |
| `allowSymbols`       | If symbols should be allowed               | `Boolean`          | `false`       |
| `allowedOptions`     | Data list of the options that are allowed  | `string[]`         | `[]`          |
| `clearOnInvalid`     | If input should be cleared if invalid      | `Boolean`          | `true`        |
| `transformValue`     | A function to transform the value on input | `Function`         | `() => value` |
| `errorTagNotAllowed` | The error message when tag is not allowed  | `String`           | `...`         |
| `errorTagDuplicated` | The error message when tag is duplicated   | `String`           | `...`         |
| `errorTagInvalid`    | The error message when tag is invalid      | `String`           | `...`         |



<!--@include: ../../parts/title-slots.md-->

By default all slots get all the props and configuration from the component.

### Slot `tag`

This slot lets you override the tag element, you can use this to add icons or other elements.

| Attribute  | Description                                      | Type               |
|:-----------|:-------------------------------------------------|:-------------------|
| `option`   | The actual option on the loop                    | `string`, `number` |
| `classes`  | List of classes to style the component           | `Object`           |
| `disabled` | List of classes to style the component           | `Boolean`          |
| `keydown`  | Callback when the button is pressed or navigated | `Function`         |
| `remove`   | Callback to remove the tag                       | `Function`         |

### Slot `tagLabel`

This slot lets you override the tag label

| Attribute  | Description                                      | Type               |
|:-----------|:-------------------------------------------------|:-------------------|
| `option`   | The actual option on the loop                    | `string`, `number` |

### Slot `tagCloseIcon`

This slot lets you override the tag close icon

| Attribute  | Description                                      | Type               |
|:-----------|:-------------------------------------------------|:-------------------|
| `option`   | The actual option on the loop                    | `string`, `number` |

### Slot  `errors`

Slot that holds the error messages when the component `errors` prop is defined.

| Attribute   | Description               | Type              |
|:------------|:--------------------------|:------------------|
| `errors`    | The errors being injected | `[String, Array]` | 
| `hasErrors` | If the field has errors   | `Boolean`         | 

### Slot `feedback`

Slot that holds the feedback messages when the component `feedback` prop is defined.
When showing errors the feedback will be hidden by default, and vice-versa.

| Attribute  | Description               | Type                         |
|:-----------|:--------------------------|:-----------------------------|
| `errors`   | The errors being injected | `[String, Array, Undefined]` | 
| `feedback` | The feedback message      | `[String, Undefined]`        | 


<!--@include: ../../parts/title-events.md-->

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
<!--@include: ../../parts/events-model-value.md-->

<!--@include: ../../parts/title-expose.md-->

### Expose `add`

Lets you add a new tag into the component

```js
this.$refs.tagsInput.add('new tag')

// or
const tagsInput = ref(null)
tagsInput.value.add('new tag')
```
### Expose `remove`

Lets you remove a new tag into the component

```js
this.$refs.tagsInput.remove('new tag')

// or
const tagsInput = ref(null)
tagsInput.value.remove('new tag')
```



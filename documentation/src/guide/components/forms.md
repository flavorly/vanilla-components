---
outline: deep
---

# Forms

Vanilla components brings together a nice set of form utilities to help you build forms in a breeze.
By default, some components already include a Feedback and Label prop, so you dont need to use those
But in case you want to use them standalone, you can do so.
Including: Labels, Feedback, errors, sections, groups & much more! Lets dive a bit into it.

## Form Section

The form section is intended to be used to wrap a group `InputGroup` or simply inputs, it can also be used as a form
to wrap the whole form, so its easier to control. You can check a full example on [Form Sections & Groups](/guide/examples-form-sections).

<ExampleFormsSection />


### Form section Props :inbox_tray:

Props available for this component extending the default variant & global props.

| Prop      | Description                         | Accepted Values | Default |
|:----------|:------------------------------------|:----------------|:--------|
| `divided` | Divide the items inside the section | `Boolean`       | `false` |
| `as`      | The tag to render this section      | `String`        | `div`   |
| `spaced`  | Space the items inside the section  | `Boolean`       | `false` |
| `filled`  | Darken the area to stand-out        | `Boolean`       | `false` |


## Form Input Group

The input group can be used to display a field with his label, and also to display multiple fields inside one label.
This components comes with 3 variants out-of-the-box: `default`, `inline` & `content`.

The `default` variant, is the label on the top and the field on the bottom on a grid style.
The `inline` variant, is the label on the left and the field on the right on a grid style, on mobile fallbacks to default.
The `content` variant, has nothing but just a content centered, left aligned or right aligned.


<ExampleFormsInputGroup />

:::details :surfer: Click to expand the code
<<< @/components/ExampleFormsInputGroup.vue
:::


### Form Input Group Props :inbox_tray:

Props available for this component extending the default variant & global props.

| Prop           | Description                         | Accepted Values | Default |
|:---------------|:------------------------------------|:----------------|:--------|
| `errors`       | Divide the items inside the section | `Boolean`       | `false` |
| `feedback`     | The tag to render this section      | `String`        | `div`   |
| `label`        | Space the items inside the section  | `Boolean`       | `false` |
| `name`         | Darken the area to stand-out        | `Boolean`       | `false` |
| `showErrors`   | Darken the area to stand-out        | `Boolean`       | `false` |
| `showFeedback` | Darken the area to stand-out        | `Boolean`       | `false` |
| `withPadding`  | Darken the area to stand-out        | `Boolean`       | `false` |
| `alignLabel`   | Darken the area to stand-out        | `Boolean`       | `false` |


## Label

A label is a simple component that can be used to label a form input.

### Label Props :inbox_tray:

Props available for this component extending the default variant & global props.

| Prop    | Description                                              | Accepted Values | Default     |
|:--------|:---------------------------------------------------------|:----------------|:------------|
| `label` | Actual label                                             | `string`        | `undefined` |
| `for`   | The for Label is used to bing the label to a named input | `String`        | `undefined` |
| `safe`  | Allow v-html or v-text                                   | `Boolean`       | `false`     |

## Feedback

A feedback to show under a field or element, to provide additional context

### Feedback Props :inbox_tray:

Props available for this component extending the default variant & global props.

| Prop   | Description                  | Accepted Values | Default     |
|:-------|:-----------------------------|:----------------|:------------|
| `text` | Actual text for the feedback | `string`        | `undefined` |
| `safe` | Allow v-html or v-text       | `Boolean`       | `false`     |


## Errors

Specially used to display errors.

### Errors Props :inbox_tray:

Props available for this component extending the default variant & global props.

| Prop     | Description                         | Accepted Values   | Default     |
|:---------|:------------------------------------|:------------------|:------------|
| `errors` | The error string or array of errors | `string`, `Array` | `undefined` |
| `safe`   | Allow v-html or v-text              | `Boolean`         | `false`     |

<!--@include: ../../parts/title-preview.md-->

<ExampleForms />

:::details :surfer: Click to expand the code
<<< @/components/ExampleForms.vue
:::

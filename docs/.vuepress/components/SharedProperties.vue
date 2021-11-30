<template>
  ## Shared Properties
  Shared Properties Inherited from Base Input

  | Prop       | Description               | Accepted Values                 | Default     |
  | :--------- | :------------------------ | :------------------------------ | :---------- |
  | `modalValue`| Array/Object of options| Any | `undefined` |
  | `label`| Label for this Input | String |`''`|
  | `name`| Unique name for this Input | String |`''`|
  | `nameSeed`| Seed for the name for Uniqueness | String |`''`|
  | `help`| Helper Text for the Input | String |`''`|
  | `errors`| Array, Object or String of Errors | Array, Object, String |`[]`|
  | `showErrors`| Helper Text for the Input | Boolean |`true`|
  | `showLeadingErrorIcon`| Show or Hide the Errors icon on the form | Boolean |`true`|
  | `layout`| A layout for this field | String: default, content, standard, naked |`default`|
  | `grouped`| If the field is grouped with another one. | String: bellow, above |`null`|
</template>

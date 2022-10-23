---
outline: deep
---

# Variants

## Using Variants

One of the main features of Vanilla Components is the usage of variants as explained on the [configuration](./configuration) section, when using variants the component will swap the classes automatically while preserving the `fixedClasses` you may use the `variant` prop to quickly toggle different variants. 

There is one special variant for errors called `error`, this variant it meant to be temporary and once you change or interact the component it will fallback the original variant provided initially ( if any ).

You may use variants as shown bellow :
```vue
<template>
    <Button variant="soft-red"/>
    <Button :variant="true ? 'soft-red' : 'soft-blue'"/>
    <!-- This will use "error" variant, and once you hit, it will fallback to soft-red -->
    <Button variant="soft-red" :errors="'There is something wrong'"/>
</template>
```

You are not limited to configure everything when booting the plugin, you may also define your `classes`, `fixedClasses` & `variants` on your component, this is useful for edge cases or specific scenarios that you want to override something specific.

:::warning A note on overrides & inline configuration
Please just keep in mind that when you do this, we will completely **ignore** the global configuration and use the classes, fixedClasses or variants provided "inline".

:::

Here is a small example: 

```vue
<template>
    <Button
        :variants="{
            dark: {
                classes: {
                    wrapper: 'pt-20'
                }
            }
        }"
        :classes="{
            wrapper: 'pt-10'
        }"
        :fixed-classes="{
            wrapper: 'pb-20'
        }"
        variant="dark"
    />
</template>
```

Given the example above we would always use the `pb-20` from the fixed classes, and `pt-20` from `dark` variant we picked up, ignoring the default `pt-10` that was the default value for the key "wrapper".

The actual HTML result would be something like the following :

```html
<button class="pb-20 pt-20"></button>
```

## Hands on!

Yes, your not limited to have a fixed color or style set in your component! But enough of talk, lets see some real example.


<ExampleVariants />

And here is the code :

<<< @/components/variants-demo.vue

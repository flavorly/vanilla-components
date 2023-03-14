---
outline: deep
---

# Configuration

The main concept of Vanilla Components is to provide a good developer expirience while still giving you the freedom to style your components the way you want. 
Before you read this section and start blowing your mind, lets keep it simple, all you need is a **object** that contains **classes** that will be applied to the component mark, that's it!

This brings a nice concept and saves ( at least for me ) all the boring process of copying over themes & components across projects.


## Styling & Preset :nail_care:

The whole point of this library is to provide you freedom to style your components the way you want, we provide a default configuration that you can use as a starting point, but you are free to change it and provide your own configuration any time!
The configuration is a simple array/json file that you can use to configure the components.

### Style your Components

The library comes out of the box configured to be used with [Tailwind](https://tailwindcss.com), you are free to change this configuration and provide your own when installing the plugin. The configuration keys can be found [here](https://github.com/flavorly/vanilla-components/blob/0c8308bcfb2be5c59d6b3dbb9488157a6a1f95d4/packages/vanilla-components/src/configuration.ts#L9), you can even include configuration for your components and ***leverage the configuration system*** for your components

Here is a small demo overriding the `Input` component:

```ts
import { createApp } from 'vue'
import { Plugin } from '@flavorly/vanilla-components' // [!code focus:1]
const app = createApp()

app.use(Plugin, {
    Input: { // [!code focus:12]
        fixedClasses: {
          input: 'm-5 shadow-xl',
        },
        classes: {
          input: 'bg-purple-100 border-pruple-100',
          wrapper: 'relative-custom',
        },
        props: {
          placeholder: 'Please write something here',
        }
  },
})
```

Please also note that when you override, you will lose the default styling for this component, which means you will have to configure this component on your own. You can find our presets on the official GitHub.

If you want to override only a certain parts or classes of a component while keeping the rest of the configuration, you can use the `defineConfiguration` function provided by the package, which will **merge the configuration** with the default one while also still let you provide your own preset if required.

```ts
import { createApp } from 'vue'
import { Plugin, defineConfiguration } from '@flavorly/vanilla-components' // [!code focus:1]
const app = createApp()

app.use(Plugin, defineConfiguration({ // [!code focus:7]
    Avatar: {
        classes: {
            wrapper: 'bg-red-600',
        },
    },
}))
```

You can also like we said earlier, provide your own preset and still override its own configuration.

```ts
import { createApp } from 'vue'
import { Plugin, defineConfiguration } from '@flavorly/vanilla-components'
import preset from './presets/talwind-funny.json' // [!code ++]

const app = createApp()

// Define some overrides
const overrides = {
    Avatar: {
        classes: {
            wrapper: 'bg-red-600',
        },
    },
};

app.use(Plugin, defineConfiguration(overrides,preset))
```



### Default Style & Configuration

You can check the default and full configuration here : [full Configuration](https://github.com/flavorly/vanilla-components/blob/master/documentation/src/presets/tailwind/all.json)
Where it also includes the configuration file separated for each component [here](https://github.com/flavorly/vanilla-components/blob/master/documentation/src/presets/tailwind)
The default configuration is using TailwindCSS, but you can use any other framework you want, just keep in mind that you will have to provide the correct classes for each component.

Here is a demo of the Input Component Configuration file:

::: code-group
<<< @/presets/tailwind/Input.json{Input}
<<< @/presets/tailwind/Button.json{Button}
<<< @/presets/tailwind/Select.json#snippet{Select}
:::

You may also import the default configuration object from the package and use it as a starting point for your own configuration.

```ts
import { defaultConfiguration } from '@flavorly/vanilla-components'
// ...
// Define some overrides
const overrides = {
    Avatar: {
        classes: {
            wrapper: 'bg-red-600',
        },
    },
};
app.use(Plugin, defineConfiguration(overrides,defaultConfiguration))
```

### Inline Style Configuration

You are not limited to setting a configuration on a file and loading it, even though we recommend doing it, you are also able to define `classes`, `fixedClasses` & `variants` directly to the component. We will cover more of this in the **variants** section.

```vue
<template>
    <Button
        :variants="{ // [!code focus:14]
            orange: {
                classes: {
                    foo: 'bar'
                }
            }
        }"
        :classes="{
            foo: 'baz'
        }"
        :fixed-classes="{
            foo: 'fixed-baz'
        }"
        variant="orange"
    />
</template>
```

### Reset Classes Modifier

If you want to reset a particular component classes, you can use the `$reset` modifier, which will remove all the classes `BEFORE` the given modifier from the component for that specific `key`, this is useful to get rid of `fixedClasses` and `classes` injected after they are resolved and all together.

```vue
<template>
    <Button
        :classes="{
            button: '$reset bg-red-600'
        }"
    />
    
    <!-- Also works for nested properties -->
    <PhoneInput
        :classes="{
            input: {
                wrapper: '$reset bg-red-600'
            },
        }"
    />
</template>
```

Given the example above, everything before the `$reset` modifier will be removed, so the final result will be:

```html
<button class="bg-red-600"> Hey!</button>
```

This modifier works for `classes` and `fixedClasses` and also for nested properties.





### Override Props Values

As mentioned before you may also override the props default values from the components using the variants & other settings, just keep in mind to always use valid types, as this could bring unwanted behaviors.

```ts
import { createApp } from 'vue'
import { Plugin } from '@flavorly/vanilla-components'
const app = createApp()

app.use(VanillaComponents, {
    Input: { 
        props: { // [!code focus:4]
          // Here we are expecting a string
          placeholder: true,
        }
    },
    Dialog: {
        props: {// [!code focus:4]
          // Here we are expecting a boolean, but we getting a string! :(
          closeOnLeaving: 'yes',
        }
    },
})
```

## Variants :arrows_clockwise:

Variants are way to quickly swap your component styles while keeping some sane styles left over. A good example of a variant usage is the `error` variant, where we only want to change the colors to red but still keep the paddings all the rest of the classes.
This is where things get interesting! :)

### Using Variants

One of the main features of Vanilla Components is the usage of variants as explained in the [configuration](./configuration) section, when using variants the component will swap the classes automatically while preserving the `fixedClasses` you may use the `variant` prop to quickly toggle different variants.

There is one special variant for errors called `error`, this variant is meant to be temporary and once you change or interact with the component it will fall back to the original variant provided initially ( if any ).

You may use variants as shown below:

```vue
<template>
    <Button variant="soft-red"/>
    <Button :variant="true ? 'soft-red' : 'soft-blue'"/>
    <!-- This will use "error" variant, and once you hit, it will fallback to soft-red -->
    <Button variant="soft-red" :errors="'There is something wrong'"/>
</template>
```

You are not limited to configuring everything when booting the plugin, you may also define your `classes`, `fixedClasses` & `variants` on your component, this is useful for edge cases or specific scenarios that you want to override something specific.

:::warning A note on overrides & inline configuration
Please just keep in mind that when you do this, we will completely **ignore** the global configuration and use the classes, fixedClasses, or variants provided "inline".
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

Given the example above we would always use the `pb-20` from the fixed classes, and `pt-20` from the `dark` variant we picked up, ignoring the default `pt-10` that was the default value for the key "wrapper".

The actual HTML result would be something like the following :

```html
<button class="pb-20 pt-20"></button>
```

### Error Variant

All components should include the `default` variant and `error` variant, the `error` variant is meant to be used when you want to show an error message to the user, this variant will be automatically applied when you provide the `errors` prop to the component.
Once you "touch" the v-model of the component the `error` variant will be removed and the component will fall back to the original variant.

This is really useful when errors are coming from the backend ( Ex: Inertia ) and you want to flash them but instantly remove them as soon as the user tries again.

Here is a small example using hybridly or inertia:

```vue
<script setup lang="ts">
const login = useForm({
	method: 'POST',
	url: route('login'),
	fields: {
		email: '',
		password: '',
		remember: false,
	},
})
</script>
<template layout="auth/layout-auth">
    <VanillaInputGroup
        :label="t('app.fields.email')"
        name="email"
    >
        <VanillaInput
            v-model="login.fields.email"
            :errors="login.errors.email" //[!code focus]
            :placeholder="t('app.placeholders.email')"
            type="email"
            required
            autofocus
        />
    </VanillaInputGroup>
</template>
```

### Hands on!

Yes, you are not limited to having a fixed color or style set in your component! But enough talk, let's see some real examples.

<DemoExampleVariant />

And here is the code :

<<< @/components/DemoExampleVariant.vue


## Options

The plugin also supports an object of configurable options, you can pass them as the third argument when installing the plugin.
You may import defineOptions, that will help find out what options are available and ensure a type-safe experience.
Here is a quick example.

```ts
import { Plugin, defineConfiguration, defineOptions } from '@flavorly/vanilla-components'

app.use(Plugin, defineConfiguration({}), defineOptions({
    swapErrorsVariantOnModelValueChanges: true,
}))
```

### swapErrorsVariantOnModelValueChanges

This option will automatically swap the `error` variant to the original variant once the v-model of the component changes.

Setting it to `true`, will assume that your `error` prop is reactive and will change once the error gets changed, it will also remove the error variant once the user changes the input.

Settings it to `false` will change the behaviour, and the error will persist even if the user changes the input, it will only go back to the original variant once `errors` prop is cleared or set to a nullish value.

In both cases, the input will go back to the normal variant once the errors prop is set to a nullish value.

## Styling Structure :dna:

Components contain three major keys that can be set: `fixedClasses`, `classes`, `variants` & `props`, Below we will explain what each of them means and what's their behavior, as they represent the core concept:

- **`fixedClasses`** - List of classes that are always persisted, even if the variant changes. This is useful in case you want to change the border color but still for example keep the same paddings & other relevant styles.
- **`classes`** - This contains the base classes for the "default" layout of the component.
- **`variants`** - This is an object with your own variant, each variant contains its own `classes` & `props`
- **`props`** - This will provide/override the default props for this component, so they are injected as you need.

With this little system, you can imagine how flexible this can be, the limit is your imagination! We will get deeper into this Below. You can see the demo of the **Input** config [here](https://github.com/flavorly/vanilla-components/blob/0c8308bcfb2be5c59d6b3dbb9488157a6a1f95d4/packages/vanilla-components/src/components/input/config.ts#L35)

:::info Shared Props on Vanilla Components
To check the full list of the available properties for all components please check the [props section](./advanced-configuration.md)
:::


## Tailwind Defaults

Note on the default Primary Color for Tailwind, the color used by default is called **primary**, which relies also on `@tailwindcss/forms` so please extend your tailwind.config.js to have the primary color as you wish.

Here is a demo tailwind configuration:

<<< @/snippets/tailwind.config.js

That's it! With this in mind, you are free to start being creative and create your own thing. If you want to style your components please have a look under [Advanced Configuration](./advanced-configuration)



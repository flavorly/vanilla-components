---
outline: deep
---

# Advanced Configuration

## Style your own components

That's all clear when you want to override our components, but what if you want to keep a single design system in place and also style your own components? That's ok! You can still include the configuration as it was a "regular" Vanilla component, like the following:

```js
import { createApp } from 'vue'
import { Plugin } from '@indigit/vanilla-components' // [!vp focus:1]
const app = createApp()

app.use(VanillaComponents, { // [!vp focus:12]
    MyOwnComponent: {
        fixedClasses: {
          input: 'border-t-md',
          anotherWeirdContainer: 'border-b-0'
        },
        classes: {
          input: 'bg-indigo-100 border-indigo-300',
          anotherWeirdContainer: 'border-t-0'
        },
  },
})
```


Here is a demo structure on how we recommend to have it structured in your project.
Where the `config.ts` is your configuration file with your Configuration and Types ( if that's the case)

```
.
├─ src
   ├─ components
      ├─ MyOwnComponent
         └─ MyOwnComponent.vue
         └─ config.ts
```

Here is a small custom Vue component example `MyOwnComponent.vue`

```vue
<script setup lang="ts">
import { useConfiguration } from '@indigit/vanilla-components'
import type { MyOwnComponentProps } from './config'
import { myOwnComponentConfig } from './config'
const { 
	configuration,
    errors,
    hasErrors 
} = useConfiguration<MyOwnComponentProps>(
    myOwnComponentConfig,
    'MyOwnComponent'
)

</script>
<template>
  <div :class="configuration.classesList.someClassYouWant">
    I will have the background you define in config
  </div>
</template>
```

And here is the configuration being imported as `config.ts` on the component

```ts
import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '@indigit/vanilla-components'

export const myOwnComponentConfig = {
    
  // Classes that will always be injected
  fixedClasses: {
    someClassYouWant: 'i-will-be-a-fixed-class',
  },

  // Default appearance
  classes: {
    someClassYouWant: 'bg-indigo-100',
  },

  // Variants
  variants: {

    // Used for Errors
    error: {
      classes: {
        someClassYouWant: 'bg-red-100',
      },
    },

    // More variants can go here
  },
}

export const myOwnComponentClassesKeys = Object.keys(myOwnComponentConfig.classes)

export declare type MyOwnComponentClassesValidKeys = keyof typeof myOwnComponentConfig.classes

export declare type MyOwnComponentProps = WithVariantPropsAndClassesList<{
  type?: string
  placeholder?: string
} & InputHTMLAttributes & Data, MyOwnComponentClassesValidKeys>
```

Finally! You might use your component as any other component like the follwing: 

```vue
<template>
    <!-- This will render the default style -->
	<MyOwnComponent />
    
    <!-- This will render the errors one -->
    <MyOwnComponent variant="error" />
</template>
```

## **useConfiguration**

The `useConfiguration` provided by the package, takes 3 arguments: 

- The first argument ( Required ) - **default** configuration of the component, this the configuration of classes & fixed classes for the given component if nothing else is provided.

- The second argument ( Required ) - **name** of your component, you can give any name of your choice, as long as it matches the name provided on the initial `app.use(VanillaComponents,{})` configuration provided to vue.

- The third argument is a `Ref` usually your model value, this will ensure that if your component is on a state error and you change the model value, it will go back into the original variant, this is optional.

It also returns the following refs for your own usage on the template

- **configuration** - Contains the component configuration with classes, props, etc.
- **errors** - Contains the errors of the component if any
- **hasErrors** - Boolean that contains if the component has / not errors

Here is a small example of using `useConfiguration`: 

```vue
<script setup>
import { useConfiguration } from '@indigit/vanilla-components'
const { 
	configuration,
    errors,
    hasErrors 
} = useConfiguration(
	{
        fixedClasses: {
          someClassYouWant: 'i-will-be-a-fixed-class',
        },

        // Default appearance
        classes: {
          someClassYouWant: 'bg-indigo-100',
        },

        // Variants
        variants: {
            // More variants can go here
        },
    },
    'MyOwnComponent'
)

</script>
<template>
  <div :class="configuration.classesList.someClassYouWant">
    I will have the background you define in config
  </div>
</template>
```

That's it! With this in mind you are free to start being creative and create your own thing.





---
outline: deep
---

# Auto Import


## Unplugin Vue Components

If you are using or you pretend to use [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) in your project, its pretty easy to get started,
simply add a custom resolver to the `unplugin-vue-components` configuration on your vite or rollup configuration file.


Here is the example :

::: code-group
```ts [vite.config.ts]
import components from 'unplugin-vue-components/vite'

export default defineConfig({
    plugins: [
        // Rest of the plugins
        components({
            dirs: [
                './resources/views/components/**/*',
                './resources/layouts',
            ],
            resolvers: [
                HeadlessUiResolver(),
                (componentName) => { // [!code focus:7]
                    if (componentName.startsWith('Vanilla')) {
                        return {
                            name: componentName, from: '@flavorly/vanilla-components',
                        }
                    }
                },
                iconsResolver({
                    customCollections: ['custom'],
                }),
            ],
            directoryAsNamespace: true,
            dts: 'resources/types/components.d.ts',
        }),
    ],
})
```

:::warning Unplugin configuration
Please keep in mind that you should still follow the standard installation instructions for unplugin import, covering the setup here would be out of scope.
:::

## Unplugin Imports

You can also import a few functions provided by the package automaticly with [unplugin-imports]()

```ts [vite.config.ts]
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
        imports: [
            {
                '@flavorly/vanilla-components': [
                    'useConfiguration',
                    'defaultConfiguration',
                    'mergeConfiguration'
                ]
            }
        ]
    }),
  ],
})
```

That's it! Now you can use the components without having to import them manually, please keep in mind this does not register them globally but imports them as needed!

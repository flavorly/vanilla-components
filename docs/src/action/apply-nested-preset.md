---
outline: deep
---

# Apply nested preset

> The `applyNestedPreset` action makes presets composable by permitting to apply another preset. There is no nesting limit.

## Usage

Call the `applyNestedPreset` options in the `handler` function:

```ts
export default definePreset({
  // ...
  handler: async () => {
    await applyNestedPreset({ preset: 'laravel:inertia' })
  }
})
```

## Options

### `preset`

Defines the preset to install. It can be anything that `preset apply` accepts: an URL, a path to a file or directory, or a GitHub shorthand.

### `args`

Defines the arguments to pass to the preset. This must be an array of string.

### `inheritsArguments`

Defines whether or not to make the nested preset inherit arguments given to the current preset. Default is `false`. 

## Examples

**Apply the `laravel-presets/inertia` preset without Pest**

```ts
await applyNestedPreset({
  preset: 'laravel:inertia',
  args: ['--no-pest']
})
```

## Interface

```ts
interface ApplyNestedPresetOptions {
  preset: string
  args?: string[]
  inheritsArguments?: boolean
}
```

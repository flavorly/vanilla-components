---
outline: deep
---

# Preset file

## Overview

In a Preset project, you must have at least what is called a "preset file". This is simply a specific script that describes the steps the preset applies on a project.

```ts
export default definePreset({
  name: 'my-preset',
  options: {
    // ...
  },
  handler: async () => {
    // ...
  }
})
```

## Changing the preset file's location

Preset files named `preset.ts` at the root or in the `src` directory of a project will be detected automatically. If you wish to place the file elsewhere, you can use the `preset` key in `package.json`:

```json
{
  "name": "my-preset",
  "preset": "config/preset.ts",
  // ...
}
```

## Constraints

Even though the preset file is a regular script, it is used in a way that makes external imports unavailable. For instance, you can't install `execa` and use it directly. 

This is by design: to improve performances, Preset do not install dependencies. The preset file is compiled through `esbuild` and its default export is retrieved. 

Local file imports and Node's built-in modules are still available.

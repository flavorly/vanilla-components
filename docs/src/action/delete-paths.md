---
outline: deep
---

# Delete paths

> The `deletePaths` action is useful to delete files or directories inside the target directory.

## Usage

Call the `deletePaths` options in the `handler` function:

```ts
export default definePreset({
  // ...
  handler: async () => {
    await deletePaths({ paths: ['webpack.mix.js', 'resources/js'] })
  }
})
```

## Options

### `paths`

Defines the files or directory to delete from the target directory.

## Examples

**Delete a file and a directory in the target directory**

```ts
await deletePaths({ paths: ['webpack.mix.js', 'resources/js'] })
```

## Interface

```ts
interface DeletePathsOptions {
  paths: string | string[]
}
```

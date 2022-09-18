---
outline: deep
---

# Group

> The `group` action allows to group a few actions under the same `title`, so multiple actions used for a single purpose can be displayed together.

## Usage

Call the `group` options in the `handler` function:

```ts
export default definePreset({
  // ...
  handler: async () => {
    await group({
      title: 'initialize repository'
      handler: async () => {
        await executeCommand({ /*...*/ })
        await executeCommand({ /*...*/ })
      }
    })
  }
})
```

## Options

### `handler`

Defines the callback that will execute the grouped actions. **The callback must be asynchronous**.

## Examples

**Initialize a repository**

```ts
await group({
  title: 'initialize repository',
  handler: async() => {
    await executeCommand({ command: 'git', arguments: ['init'] })
    await executeCommand({ command: 'git', arguments: ['add', '.'] })
    await executeCommand({ command: 'git', arguments: ['commit', '-m', 'chore: initialize project'] })
  },
})
```

## Interface

```ts
interface GroupOptions {
  handler: () => Promise<void>
}
```

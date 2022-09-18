---
outline: deep
---

# Execute command

> The `executeCommand` action makes it easy to run a shell command.

## Usage

Call the `executeCommand` options in the `handler` function:

```ts
export default definePreset({
  // ...
  handler: async () => {
    await executeCommand({ command: 'git', arguments: ['init'] })
  }
})
```

## Options

### `command`

Defines the name of the command. This can be anything that is accessible in the shell.

### `arguments`

Defines the list of arguments to pass to the command. This must be an array of strings.

### `data`

Defines a callback that will be called each time `stdout` or `stdin` prints a line.

### `ignoreExitCode`

Defines whether to ignore the exit code of the process. If `true`, failing processes won't mark the action as failed.

## Examples

**Initialize a repository**

```ts
await executeCommand({ command: 'git', arguments: ['init'] })
```

## Interface

```ts
interface ExecuteCommandOptions {
  command: string
  arguments?: string[]
  data?: (stdout: string) => void
  ignoreExitCode?: boolean
}
```

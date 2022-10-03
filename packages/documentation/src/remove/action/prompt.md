---
outline: deep
---

# Prompt (experimental)

> The `prompt` action can prompt the user for input when applying a preset.

## Usage

Call the `prompt` options in the `handler` function:

```ts
export default definePreset({
  // ...
  handler: async () => {
    await prompt({ name: 'name', text: 'What is your name?' })
  }
})
```

## Options

### `name`

Defines the property name of the `prompts` context object in which the answer to the prompt will be stored.

### `text`

Defines the text that will be displayed in the console when asking for input.

### `default`

Defines the default value for the prompt if the answer is skipped or if the terminal is not interactive.

## Examples

**Ask for a project name and use the target directory's name as the default value**

```ts
await prompt({
  title: 'prompt project name',
  name: 'name',
  text: 'What is the name of the project?',
  default: path.parse(context.applyOptions.targetDirectory).name,
})
```

## Interface

```ts
interface PromptOptions {
  name: string;
  text: string;
  default?: string;
}
```

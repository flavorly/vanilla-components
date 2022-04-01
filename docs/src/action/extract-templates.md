---
outline: deep
---

# Extract templates

> The `extractTemplates` action serves the common purpose of extracting files from the preset's template directory to the target directory.

## Usage

Call the `extractTemplates` options in the `handler` function:

```ts
export default definePreset({
  // ...
  handler: async () => {
    await extractTemplates({
      from: 'vue'
    })
  }
})
```

## Options

### `templates`

Defines the path to the templates directory inside the preset's project. The default value is `templates`.

### `from`

Defines the path to a file or a directory inside the template directory to copy. The default value is empty, so the whole template directory will be extracted.

### `to` 

Defines the path to a file or directory inside the target directory to copy to. The default value is empty, so the templates will be extracted to the root of the target directory.

### `flatten`

Defines whether to ignore the structure of the template directory. If this is `true`, the structure of the template directory will be ignored and their content will be extracted inside the directory defined by `to`. 

This option only works if `from` is a file and `to` is a directory.

### `extractDotFiles`

Defines whether to extract files starting with a dot (`.`). The default is `true`. Note that files ending with `.dotfile` will be considered as dotfiles and will be extracted.

### `whenConflict`

Defines the strategy to use when a file exists in the target directory. By default, files will be overriden (`override`) but they can be skipped with `skip`.

## Examples

**Extract the whole template directory**

```ts
await extractTemplates()
```

**Extract the `default` directory in the template directory to the target directory**

```ts
await extractTemplates({
  from: 'default'
})
```

**Extract the `default` directory in the template directory to the `config` directory inside the target directory**

```ts
await extractTemplates({
  from: 'default',
  to: 'config'
})
```

## Interface

```ts
interface ExtractTemplatesOptions {
  templates?: string
  from?: string
  to?: string
  flatten?: boolean
  extractDotFiles?: boolean
  whenConflict?: 'override' | 'skip'
}
```

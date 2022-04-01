---
outline: deep
---

# Using aliases

## Organization shorthand

Organization names that end with `-presets` have a dedicated shorthand of the format `organization:repository`. For instance, the presets in the `laravel-presets` organization can be used with `laravel:<preset-name>`. 

## Custom aliases

If you are often using the same preset, you can define a custom alias for it in a global configuration file. Preset will read the `~/.presetrc.json` file and look for the `aliases` property. This must be an object which keys are alias names and values are preset informations.

### Repository alias

A repository alias can be defined with a value that implements the following interface:

```ts
interface RepositoryPreset {
  type: 'repository'
  organization: string
  repository: string
  ssh?: boolean
  path?: string
  tag?: string
}
```

The `path` option determines the sub-directory in which the preset is stored. The `tag` is the Git tag or branch to fetch, and setting `ssh` to `false` will force the use of the web URL (using `https`) when cloning the repository.

For instance, the following configuration will make the `preset apply config` command apply the preset hosted in the `innocenzi/config` repository:

```json
{
  "aliases": {
    "config": {
      "type": "repository",
      "organization": "innocenzi",
      "repository": "config"
    }
  }
}
```

### Local aliases

An alias stored locally can be aliased using the following interface: 

```ts
interface LocalPreset {
  type: 'directory' | 'file'
  path: string
}
```

For instance, the following configuration will make the `preset apply config` command apply the preset in the `~/presets/config/preset.ts` file:

```json
{
  "aliases": {
    "config": {
      "type": "file",
      "path": "~/presets/config/preset.ts"
    }
  }
}
```

The `directory` type is the same, but you can specify the directory instead of the preset file, which will be found automatically if [configured properly](/concepts/preset-file).

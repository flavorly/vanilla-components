---
outline: deep
---

# Install packages

> The `installPackages` action can install or update Node or PHP dependencies in the target directory.

## Usage

Call the `installPackages` options in the `handler` function:

```ts
export default definePreset({
  // ...
  handler: async () => {
    await installPackages({
      for: 'node',
      packages: ['@preset/core'],
      dev: true,
    })
  }
})
```

## Options

### `packages`

Defines the packages to install. This can be anything that would be passed as an argument to the package manager. For instance, `vue@next`, `@vueuse/core` or `inertiajs/inertia-laravel`.

### `dev`

Defines whether or not the packages to install are development dependencies. Defaults to `false`.

### `for` 

Defines the ecosystem to install packages for. The only two options are `php` and `node`, the latter being the default.

### `type`

Defines whether to `install` or `update`. In either case, `packages` can be empty. The behavior depends on the package manager.

### `packageManager`

Defines the package manager that can be used. 

This option is only used for Node, for which `npm`, `yarn` and `pnpm` are available. If not specified, the package manager will be determined, by the lockfile in the target directory or the the `defaultNodeAgent` property of `~/.presetrc.json`, if specified. Otherwise, `npm` will be used.

### `additionalArgs`

Defines additional arguments that will be given to the package manager. 

## Examples

**Install a specific version of `innocenzi/laravel-vite`**

```ts
await installPackages({
  for: 'php',
  packages: 'innocenzi/laravel-vite:^0.1.20',
})
```

**Install `debug` as a development dependency**

```ts
await installPackages({
  for: 'node',
  packages: 'debug',
  dev: true
})
```

**Update PHP dependencies**

```ts
await installPackages({
  for: 'php',
  type: 'update'
})
```

## Interface

```ts
interface InstallPackagesOptions {
	packages?: string | string[]
	dev?: boolean
	for?: 'node' | 'php'
	type?: 'install' | 'update'
	packageManager?: NodePackageManager
	additionalArgs?: string[]
}
```

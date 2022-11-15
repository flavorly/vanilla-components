# Vanilla Components Contributing Guide

Hi! We are really excited that you are interested in contributing to Vanilla Components. Before submitting your contribution, please make sure to take a moment and read through the following guide:

## Repo Setup

The Vanilla Components repo is a monorepo using pnpm workspaces. The package manager used to install and link dependencies must be [pnpm](https://pnpm.io/).

We recommend installing [ni](https://github.com/antfu/ni) to help switching between repos using different package managers. `ni` also provides the handy `nr` command which running npm scripts easier:

- `ni` is equivalent to `pnpm install`
- `nr test` is equivalent to `pnpm run test`

To develop and test `vanilla-components` package:

1. Run `pnpm install` in `vanilla-components`'s root folder

2. Run `pnpm build` or `pnpm docs:dev` to build the library for the first time

3. Run `pnpm docs:dev` to run the Vitepress instance and check the documentation and toy around with the components

## Testing Vanilla Components against external packages

You may wish to test your locally-modified copy of Vanilla Components against another package that is using it. For pnpm, after building Vanilla Components, you can use [`pnpm.overrides`](https://pnpm.io/package_json#pnpmoverrides). Please note that `pnpm.overrides` must be specified in the root `package.json` and you must first list the package as a dependency in the root `package.json`:

```json
{
  "dependencies": {
    "@favlorly/vanilla-components": "*"
  },
  "pnpm": {
    "overrides": {
      "@favlorly/vanilla-components": "link:../path/to/vanilla-components/packages/vanilla-components"
    }
  }
}
```

And re-run `pnpm install` to link the package.

## Pull Request Guidelines

- Checkout a topic branch from a base branch, e.g. `master`, and merge back against that branch.

- If adding a new feature:

    - Add accompanying test case.
    - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.

- If fixing bug:

    - If you are resolving a special issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `fix: update entities encoding/decoding (fix #3899)`.
    - Provide a detailed description of the bug in the PR. Live demo preferred.
    - Add appropriate test coverage if applicable.

- It's OK to have multiple small commits as you work on the PR - GitHub can automatically squash them before merging.

- Make sure tests pass!

- Use `pnpm run lint:fix` to format files according to the project guidelines.

## Notes on Dependencies

Vanilla Components aims to be lightweight, and this includes being aware of the number of npm dependencies and their size.

### Think before adding a dependency

Most deps should be added to `devDependencies` even if they are needed at runtime. Some exceptions are:

- Type packages. Example: `@types/*`.
- Deps that cannot be properly bundled due to binary files.
- Deps that ships its own types and its type is used in Vanilla Components's own public types.

Avoid deps that has large transitive dependencies that results in bloated size compared to the functionality it provides.

If there are libraries that are needed and don't comply with our size
requirements, a fork can be tried to reduce its size while we work with them to
upstream our changes (see [tinypool](https://github.com/tinylibs/tinypool) for example)

### Think before adding yet another option

We already have many config options, and we should avoid fixing an issue by adding yet another one. Before adding an option, try to think about:

- Whether the problem is really worth addressing
- Whether the problem can be fixed with a smarter default
- Whether the problem has workaround using existing options
- Whether the problem can be addressed with a plugin instead

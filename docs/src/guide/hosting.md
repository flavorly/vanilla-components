---
outline: deep
---

# Hosting

## Overview

Presets can be hosted on your local machine or on GitHub. You can also have a mono-repository containing multiple presets and provide a `--path` argument when applying one.

## GitHub

You can apply a preset by using its GitHub URL or shorthand.

```shell
# Shorthand
preset apply your-organization/your-cool-preset

# Full URL
preset apply git@github.com:your-organization/your-cool-preset

# Without SSH
preset apply https://github.com/your-organization/your-cool-preset
```

## Community organizations

Organization using the `<community>-presets` convention can use a shorter, easier-to-remember syntax:

```shell
preset apply community:repository
``` 

For instance, you can apply the `laravel-presets/inertia` preset using `preset apply laravel:inertia`.

## Mono-repositories

If you prefer organizing your presets within a single mono-repository, you can specify a path to the preset's subdirectory with the `--path` option.

For instance, imagine the following structure:

```
<your-username/repository>
├── preset1/
└── category/
    ├── preset2/
    └── preset3/
```

You can apply a preset in a specific directory using the following commands:

```shell
# Install /preset1
preset apply your-username/repository --path preset1

# Install /category/preset1
preset apply your-username/repository --path category/preset2
```

## Private repositories

You can use private repositories if you [configured your SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account). Repositories are cloned using SSH by default, so there isn't anything special to do.

```shell
preset apply your-username/private-repository
```

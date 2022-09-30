---
outline: deep
---

# Quick start

## Installation

Preset is distributed as a Node command line tool. You can install it globally with your favorite package manager:

```bash
npm i -g @preset/cli
```

Once installed on your system, the `preset` command becomes available. Alternatively, you can use Preset with `npx` directly:

```bash
# With global installation
preset apply organization/preset

# With npx for one-off commands
npx @preset/cli apply organization/preset
```

## Usage

A preset can be applied by providing its URL, its GitHub shorthand or its path on the disk via the first argument of the `apply` command.

```bash
# GitHub shorthand
preset apply organization/preset

# GitHub URL
preset apply git@github.com:organization/preset.git

# Local path
preset apply /your/local/preset
```

For more information about commands and arguments, use `preset --help`.

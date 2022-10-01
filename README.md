# Vanilla Components

A lightweight Vue 3 component library based merging the best components around to enjoy seamless integr


# Installation

Get started by installing the peer dependencies than, move on installing the package

```bash
pnpm add @headlessui/vue@^1.5.0 @popperjs/core@^2.11.2 flatpickr@^4.6.9 libphonenumber-js@^1.9.49 
pnpm add @indigit/vanilla-components
```

## Usage

Import the components as needed with the following

```vue
import { Button } from '@vanilla-components'
```

## Local & Documentation

For preview & Local testing please run the following on the root of the project.
After the commands you should have a local vite server up & running.

```bash
pnpm install
pnpm build
pnpm docs:dev
```

## Starting Fresh

To start fresh, simply run the following commands

```bash
pnpm clean
pnpm install
pnpm build
pnpm docs:dev
```

## Lunr ( Algolia Alternative )

Lunr replaces the default Vitepress Algolia Search
To get the project index correctly do the following:

```
pnpm lunr:start
pnpm build ( optional if already built )
pnpm lunr:index
```

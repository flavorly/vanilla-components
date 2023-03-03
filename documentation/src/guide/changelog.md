---
outline: deep
---

# Changelog

## Vanilla Components

All notable changes to `@flavorly/vanilla-components` will be documented in this section

### 0.7.37
- Inputs & Select : Issues with `focus-within` & `focus outline` element when it was triggered by keyboard event
- Docs: Added more variants to select & input component

### 0.7.36
- Icons : Removing all icons from the package
- Deps: Removing `@heroicons/vue` dependency

### 0.7.35
- Alert Component : `closeAfter` prop renamed to `timeout`
- Alert Component : Icon is no longer auto-generated based on variant, you must provide it yourself as a key `success`,`error`, `warning`, `info`
- Alert Component : Transitions added for better DX
- Alert Component : Re-worked on close event to be more consistent and cleanup
- Alert Component : Added `icon` slot to override icon
- Alert Component : Added 4 new variants: `muted`, `error-muted`, `warning-muted`, `info-muted`, `success-muted`
- Rich Select: Fixed styling issue with `focus-within` on `input` element when it was triggered by keyboard event
- Rich Select: Fixed styling issue with error variant
- Input: Fixed a little issue on error variant that was giving +1px jumps on focus
- Transitionable: Added proper duration & props forwarding
- Variants names should be now `camelCase`, users are able to use any casing they want, but the variants will be converted to `snakeCase` before being applied


### 0.7.34
- Tailwind : Switched Borders with Rings where it makes sense to do so
- Docs: Adjusted documentation theming for better dark mode constrast

### 0.7.33
- Tailwind : Switched Borders with Rings where it makes sense to do so
- Docs: Adjusted documentation theming for better dark mode constrast

### 0.7.32
- Added support [Web Types](https://github.com/JetBrains/web-types/tree/master)

### 0.7.31

- General: Moved compiler to Unbuild for better performance on inertia & hybridly packages
- Docs: Refactor to documentation theme
- General: Optimized build workflow
- General: Optimized tsconfig and package.json deps
- General: Optimized pnpm workflow/workspaces
- Exporting Presets for Tailwind for both docs & dist folders
- Docs: Improved documentation
- Added: defineConfiguration & mergeConfiguration export, to allow for customizing the components while keeping the defaults / deep merge


### 0.7.30

- General: Removed Axios Dependency in favor of native Fetch
- Rich Select: Added support for pulling options from an API endpoint
- Rich Select: Added support for pre-fetching while using API Endpoint
- Rich Select: Emit `optionSelected` event when value changes with the full option(s) object
- Datatables: Rich select filters now supports multiple values
- Datatables: Rich select filters now supports pre-fetching while using API Endpoint
- Datatables: Refactor to how filters are cleaned up, supporting arrays as values for filters
- General : Bugfixes


### 0.7.27

- Nothing

### 0.7.27

- Added `Inertia` & `Hybridly` support for Datatables actions
- Docs: Removed own Kishi implementation
- Created 2 Packages for Inertia & Hybridly Integration
- Published `@flavorly/vanilla-components-inertia`
- Published `@flavorly/vanilla-components-hybridly`



## Laravel Vanilla Components

### 0.0.9

- Added Rich Select prefetch & endpoint support to match the new feature on the frontend
- Added helper method to return formatted results for Rich Select
- Added support for multiple valeus for Rich Select

### 0.0.8

- Added `Inertia` & `Hybridly` support for Datatables actions
- Support for overriding Datatables Query, Filters & Search methods
- Refactor on how the query buildere workings for Datatables




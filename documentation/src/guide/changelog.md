---
outline: deep
---

# Changelog

## Vanilla Components

All notable changes to `@flavorly/vanilla-components` will be documented in this section

### 0.7.30

- General: Removed Axios Dependency in favor of native Fetch
- Rich Select: Added support for pulling options from an API endpoint
- Rich Select: Added support for pre-fetching while using API Endpoint
- Rich Select: Emit `optionSelected` event when value changes with the full option(s) object
- Datatables: Rich select filters now supports multiple values
- Datatables: Rich select filters now supports pre-fetching while using API Endpoint
- Datatables: Refactor to how filters are cleaned up, supporting arrays as values for filters
- General : Bugfixes
- 
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




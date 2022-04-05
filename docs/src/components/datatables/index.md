---
outline: deep
---

# Datatables

One of the most valued components of Vanilla Components, Datatables to display your bulk resources, perform actions
filter results, search & many more features, everything perfectly designed with Tailwind CSS.

The datatable component includes a lot of features and we plan to include more with time without making it to complicated to keep it as much `vanilla` as possible :smile: .
feel free to explore most of them but some highlights:

- Data Fetched via Axios just provide an endpoint
- Bulk Selection with persistence
- Bulk Actions
- Actions with Hooks, totally configurable
- Filters with more than 5 different types of components to use
- Handcrafts with TailwindCSS + Dark Mode
- Settings to Hide/Show Pages
- Multi-Column sorting
- Fully Slotable
- Dynamic Slots for Rows, Filters & Actions
- Loading Skeletons
- Search
- Local Storage Persistence for Selected, Filters & Columns visibility
- Pooling & Pooling Only After Actions
- Translatable
- Laravel Adaptor ( Coming soon )
- InertiaJS Adaptor ( Coming soon )

But enough of talk, lets see it in action!

!!!include(./src/_includes/title-preview.md)!!!

<wrapper src="components/datatables/demo" />

!!!include(./src/_includes/title-snippet.md)!!!

<<< @/components/datatables/ExampleDatatable.vue

!!!include(./src/_includes/title-props.md)!!!


| Prop                       | Description                              | Accepted Values       | Default            |
|:---------------------------|:-----------------------------------------|:----------------------|:-------------------|
| `config`                   | Array of configuration to the table      | [Object]              | `{}`               |
| `uniqueName`               | Unique name for this table               | [String,Number]       | `Required`         |
| `primaryKey`               | Primary Key for the resources            | [String,Number]       | `id`               |
| `columns`                  | Array of Columns                         | [Array]               | `Required`         |
| `options`                  | Default Options for the table            | [Object]              | `Required`         |
| `actions`                  | Array of Actions                         | [Array]               | `[]`               |
| `pooling`                  | Pooling Configuration                    | [Object]              | `undefined`        |
| `filters`                  | Array of Filters                         | [Array]               | `[]`               |
| `filtersKey`               | Key string used to generate filters link | [String]              | `props.PrimaryKey` |
| `filtersBaseUrl`           | URL to use to generate filters link      | [String]              | `undefined`        |
| `perPageOptions`           | Options of how many items p/ page        | [Array]               | `[]`               |
| `translations`             | Translations key:value                   | [Object]              | `undefined`        |
| `fetchData`                | Promise / Function to fetch data         | [Function, undefined] | `undefined`        |
| `fetchEndpoint`            | Endpoint to Fetch Data from              | [Function, undefined] | `undefined`        |
| `fetchMethod`              | HTTP Method to use to fetch              | ['get','put','post']  | `post`             |
| `actionsEndpoint`          | Endpoint to send Actions to              | [Function, undefined] | `undefined`        |
| `actionsMethod`            | HTTP Method to send Actions              | ['get','put','post']  | `post`             |
| `onActionExecutedCallback` | Hook/Function after Action executed      | [Function, undefined] | `undefined`        |
| `onExceptionCallback`      | Hook/Function after Axios Exception      | [Function, undefined] | `undefined`        |


!!!include(./src/_includes/title-slots.md)!!!

Besides, the regular static slots, datatable also provides dynamic slots for rows columns & actions

:::warning Work in progress
Please keep in mind some slots override can break functionality is this is a work in progress.
:::


### Slot Dynamic `row<ColumnName>`

Following the camel case standard, you can slot each cell of your table by using the column name in camel case prefixed with `row`.
Ex: rowId, rowName, rowDate, rowCreatedAt, etc.

| Attribute   | Description                       | Type            |
|:------------|:----------------------------------|:----------------|
| `column`    | Column definition                 | `Object`        |
| `result`    | Actual item value for this column | `[String, Any]` |
| `resultRaw` | Whole row raw item from the API   | `Object`        |

### Slot Dynamic `action<actionName>`

Following the camel case standard, you can slot each action of your table by using the column name in camel case prefixed with `action`.
Ex: rowDelete, rowUpdate, rowDoSomethingCrazy, etc.

| Attribute      | Description                   | Type       |
|:---------------|:------------------------------|:-----------|
| `action`       | Action Object                 | `Object`   |
| `selectAction` | Function to Select the action | `Function` |

### Slot `headerActions`

Overrides the datatable actions.

| Attribute             | Description                        | Type       |
|:----------------------|:-----------------------------------|:-----------|
| `actions`             | Array with all the actions         | `Array`    |
| `hasActions`          | If any actions are available       | `Boolean`  |
| `hasAnyItemsSelected` | If any items are selected          | `Boolean`  |
| `onActionSelected`    | Function when a action is selected | `Function` |

### Slot `headerFilters`

Overrides the datatable filters button.

| Attribute            | Description                  | Type      |
|:---------------------|:-----------------------------|:----------|
| `filters`            | Array with all the filters   | `Array`   |
| `hasFilters`         | If any filters are available | `Boolean` |
| `isShowingFilters`   | If its showing filters       | `Boolean` |
| `filtersActiveCount` | Number of filters enabled    | `Number`  |

### Slot `headerSettings`

Overrides the datatable settings button/dropdown.

| Attribute           | Description                     | Type       |
|:--------------------|:--------------------------------|:-----------|
| `refreshable`       | If the datatable is refreshable | `Boolean`  |
| `isFetching`        | If table is fetching            | `Boolean`  |
| `isShowingSettings` | If its showing settings         | `Boolean`  |
| `userSettings`      | Settings from the user / saved  | `Object`   |
| `refresh`           | Function to refresh the table   | `Function` |

### Slot `headerSearch`

Overrides the datatable search bar

| Attribute             | Description                    | Type                  |
|:----------------------|:-------------------------------|:----------------------|
| `searchable`          | If the datatable is searchable | `Boolean`             |
| `hasAnyItemsSelected` | If any items are selected      | `Boolean`             |
| `query`               | Query String                   | `[String, Undefined]` |
| `placeholder`         | Placeholder for search bar     | `String`              |
| `onSearch`            | Function to execute on search  | `Function`            |


### Slot `headerFiltersActive`

When filters are enabled and some filter is applied, a little bar shows bellow the search bar
This slot gives you the ability to override this piece.

| Attribute            | Description                                    | Type       |
|:---------------------|:-----------------------------------------------|:-----------|
| `hasFilters`         | If any filter is applied                       | `Boolean`  |
| `filtersActiveCount` | How much filters are applied                   | `Number`   |
| `filters`            | Array of all filters available & applied       | `Array`    |
| `resetFilter`        | Function to execute to reset a specific filter | `Function` |

### Slot `selection`

When items are selected, the search bar will hide and a little bar will show up how many items are selected
and actions to select / deselect all, this slot overrides that little bar.

| Attribute          | Description                                   | Type       |
|:-------------------|:----------------------------------------------|:-----------|
| `isAllSelected`    | If "all" is selected                          | `Boolean`  |
| `countSelected`    | How much items are selected                   | `Number`   |
| `countTotal`       | Total Number of items in page                 | `Number`   |
| `deselectAll`      | Function to deselect all items                | `Function` |
| `selectMatching`   | Function to select all items available        | `Function` |
| `deselectMatching` | Function to de-select all all items available | `Function` |


### Slot `emptyWithFilters`

When filters or search are applied and no results were found, this slot lets you customize the empty state
that will be displayed.

Sub-slots are also available ( with the same props ) for a fine-tuned UI customization: 

- **emptyWithFiltersIcon** : Overrides the Icon
- **emptyWithFiltersTitle** : Overrides the Title
- **emptyWithFiltersButton** : Overrides the Button

| Attribute               | Description                            | Type       |
|:------------------------|:---------------------------------------|:-----------|
| `filters`               | Array of the filter applied            | `Array`    |
| `filtersActiveCount`    | Count of the filters applied           | `Number`   |
| `resetFiltersAndSearch` | Function to clear all filters & search | `Function` |

### Slot `emptyWithoutRecords`

When we are unable to get items for some reason or the items/data is/are actually empty
this slot will be used to show an empty state

Sub-slots are also available ( with the same props ) for a fine-tuned UI customization:

- **emptyWithoutRecordsIcon** : Overrides the Icon
- **emptyWithoutRecordsTitle** : Overrides the Title
- **emptyWithoutRecordsButton** : Overrides the Button

### Slot `header`

Table Head/Header, this slot let you override the default table head with your own

| Attribute                           | Description                         | Type       |
|:------------------------------------|:------------------------------------|:-----------|
| `datatable`                         | All configuration of the datable    | `Object`   |
| `isFetching`                        | If table is fetching                | `Boolean`  |
| `isAllItemsInPageSelected`          | If All items on page are selected   | `Boolean`  |
| `hasAnyItemsSelectedForCurrentPage` | If any item on the page is selected | `Boolean`  |
| `columns`                           | Array of columns                    | `Array`    |
| `selectAllItemsInPage`              | Function select all items in page   | `Function` |


### Slot `skeleton`

When table is loading or busy, a skeleton will be shown with the animation of loading state
this slot let you override the current skeleton.

| Attribute              | Description                             | Type      |
|:-----------------------|:----------------------------------------|:----------|
| `isFetching`           | If table is fetching                    | `Boolean` |
| `showBeInLoadingState` | If loading should be displayed          | `Boolean` |
| `columnsCount`         | Number of columns                       | `Number`  |
| `rowsCount`            | Number of rows being displayed ( fake ) | `Number`  |

### Slot `default`

The main slow for each row / record / <td> being displayed. 

| Attribute    | Description                | Type      |
|:-------------|:---------------------------|:----------|
| `result`     | API / Data result item raw | `Object`  |
| `columns`    | Array of columns available | `Array`   |
| `selectable` | If table is selectable     | `Boolean` |
| `selected`   | If the row is selected     | `Boolean` |


### Slot `pagination`

Slot to override the pagination on the card footer

| Attribute      | Description              | Type      |
|:---------------|:-------------------------|:----------|
| `isFetching`   | If table is fetching     | `Boolean` |
| `pages`        | Array of pages available | `Array`   |
| `previousPage` | Previous page            | `String`  |
| `nextPage`     | Next Page                | `String`  |
| `currentPage`  | Current Page             | `Number`  |
| `showingFrom`  | Show from X records      | `Number`  |
| `showingTo`    | Show Until Y Records     | `Number`  |
| `total`        | Of a total of            | `Number`  |

### Slot `actionsDialog`

When an action requires a confirmation, the dialog to show for the user to confirm.

| Attribute                     | Description                | Type       |
|:------------------------------|:---------------------------|:-----------|
| `isShowingActionConfirmation` | If its showing the dialog  | `Boolean`  |
| `currentAction`               | Current action selected    | `Object`   |
| `selectedItemsCount`          | Number of rows selected    | `Number`   |
| `onActionConfirmed`           | Function on Act. Confirmed | `Function` |

Sub-slots are also available for a fine-tuned customization with the following props & slots

- **actionsIcon** : Overrides the Action Icon
- **actionBody** : Overrides the Action Body/Text

Props passed to the above slots: 

| Attribute     | Description             | Type     |
|:--------------|:------------------------|:---------|
| `action`      | Current action selected | `Object` |
| `title`       | Title of the dialog     | `String` |
| `text`        | Body/Text of the dialog | `String` |
| `confirmText` | Confirm Button Label    | `String` |
| `cancelText`  | Cancel Button Label     | `String` |

### Slot `settingsDialog`

Dialog that shows the user settings to configure or customize de table

| Attribute           | Description                | Type      |
|:--------------------|:---------------------------|:----------|
| `isShowingSettings` | If its showing the dialog  | `Boolean` |
| `userSettings`      | Current user settings      | `Object`  |
| `perPageOptions`    | Array of Per Page Options  | `Array`   |
| `columns`           | Array of Columns Available | `Array`   |

### Slot `filtersDialog`

Dialog that shows the filters to apply

| Attribute          | Description                | Type      |
|:-------------------|:---------------------------|:----------|
| `isShowingFilters` | If its showing the dialog  | `Boolean` |
| `userSettings`     | Current user settings      | `Object`  |
| `filters`          | Array of Filters Available | `Array`   |


# Caveats

- When using GET on fetch..




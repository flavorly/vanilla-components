---
outline: deep
---

# Datatable

One of the most valued components of Vanilla Components, Datatables to display your bulk resources, perform actions
filter results, search & many more features, everything is perfectly designed with Tailwind CSS.

The data table component includes a lot of features and we plan to include more with time without making it too complicated to keep it as much `vanilla` as possible :smile: .
feel free to explore most of them but some highlights:

- Data Fetched via Fetch just provide an endpoint
- Bulk Selection with persistence on Local Storage
- Bulk Actions
- Actions with Hooks, totally configurable
- Filters with more than 5 different types of components to use & Persisted on Local Storage
- Copy Friendly Filters Link to share with your pals
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
- [Laravel Adapter](./../integrations-datatables.md)
- Hybridly + InertiaJS Adapter

But enough talk, let's see it in action!

<!--@include: ../../parts/title-preview.md-->


<ExampleDatatable />

:::details :surfer: Click to expand the code
<<< @/components/ExampleDatatable.vue
:::

<!--@include: ../../parts/title-props.md-->

| Prop                       | Description                         | Accepted Values       | Default            |
|:---------------------------|:------------------------------------|:----------------------|:-------------------|
| `config`                   | Array of configuration to the table | [Object]              | `{}`               |
| `fetchData`                | Promise / Function to fetch data    | [Function, undefined] | `undefined`        |
| `onActionExecutedCallback` | Hook/Function after Action executed | [Function, undefined] | `undefined`        |
| `onExceptionCallback`      | Hook/Function after Fetch Exception | [Function, undefined] | `undefined`        |


## Configuration :joystick:

Here you will find a sample of JSON configuration that you can pass on prop `config`. For a more in-depth example please check the demo available on the snippet.

:::details :surfer: Click to check the demo configuration
<<< @/json/demo-config.json
:::

## API Response & Requests :desert_island:

### Server Side Response

While we don't dictate how you should handle your data response, you are still free to override the default **fetchData** method. You are still required to follow some patterns when it comes to pagination.

While making this library my main use case was to use it along with Laravel ® + InertiaJS ®. Below, you find demo data of what your API should reply for the default fetchData, you can also find more details in the source code of the MirageJS mock server on this repository:


:::details :surfer: Click to check the demo response
<<< @/json/demo-response.json
:::


The response must include :

| Key     | Description                                        |
|:--------|:---------------------------------------------------|
| `data`  | Array of of items, representing your resources     |
| `links` | next, previous, and array of pages and their links |
| `meta`  | Total number of records, current, etc              |

### Client Side Request

All requests made by the table are using Fetch, if you want to use your own adapter you can override the default fetchData method.
Below, you will find what parameters are sent to the server-side so you can build any server-side adapters.

:::details :surfer: Click to check the demo request
<<< @/json/demo-request.json
:::

Request Params explained :

| Key           | Description                                     |
|:--------------|:------------------------------------------------|
| `search`      | Search Query when the user searches             |
| `perPage`     | How many items to show for the  page / take     |
| `selected`    | Array of the primary keys selected              |
| `selectedAll` | If all items matching the criteria are selected |
| `filters`     | Array with Key, Value of the applied filters    |
| `sorting`     | Array with sorting's applied & their direction  |
| `action`      | Action selected to perform bulk actions         |

<!--@include: ../../parts/title-events.md-->

| Event            | Description                 | Value            |
|:-----------------|:----------------------------|:-----------------|
| `fetchedSuccess` | API call finishes           | `Array<Results>` |
| `fetchError`     | API call fails              | `Exception`      |
| `actionExecuted` | Action was executed         | `Action`         |
| `sortingUpdated` | Sorting was updated         | `Column`         |
| `navigateToPage` | Navigates/switch pages      | `String<Page>`   |
| `filtersSaved`   | Filters was applied & saved | `Array<Filter>`  |
| `mounted`        | Datatable was initialized   | `Boolean`        |
| `unmounted`      | Datatable was destroyed     | `Boolean`        |
| `search`         | Search was performed        | `String`         |
| `openedFilters`  | Filters Dialog Opened       | `Boolean`        |
| `openedSettings` | Settings Dialog Opened      | `Boolean`        |



<!--@include: ../../parts/title-slots.md-->

Besides, the regular static slots, data table also provides dynamic slots for rows columns & actions

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

When filters are enabled and some filter is applied, a little bar shows Below the search bar
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

The main slow for each row / record / td being displayed. 

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



## Known issues :bug:

- When using method GET to fetch items, we are unable to send filters in a proper way, for the time being please use post
- Overriding certain slots can still cause issues, please kindly double-check has the library lacks of tests.




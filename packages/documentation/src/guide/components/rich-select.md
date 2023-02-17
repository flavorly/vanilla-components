---
outline: deep
---

# Rich Select

A full-fledged select component with support for custom options, custom values, ajax loading, options prefetching, tags, keyboard accessibility, searching & many more.

!!!include(./src/parts/title-preview.md)!!!

<ExampleRichSelect />

:::details :surfer: Click to expand the code
<<< @/components/ExampleRichSelect.vue
:::

!!!include(./src/parts/title-props.md)!!!

| Prop                       | Description                                                    | Type              | Default          |
|:---------------------------|:---------------------------------------------------------------|:------------------|:-----------------|
| `modelValue`               | The value for the element                                      | `Any`             | `undefined`      |
| `name`                     | The name for the actual underlying select                      | `String`          | `''`             |
| `options`                  | Array of options for the select                                | `Array`           | `undefined`      |
| `normalizeOptions`         | If we should normalize the options                             | `Array`           | `undefined`      |
| `multiple`                 | Allow/Deny multiple selections                                 | `Boolean`         | `false`          |
| `disabled`                 | If the selection is enable/disabled                            | `Boolean`         | `false`          |
| `tags`                     | If tags/pills should be used instead                           | `Boolean`         | `false`          |
| `placeholder`              | Placeholder for the select when nothing is selected            | `String`          | `Pleas select..` |
| `dropdownPlacement`        | Popper placement for the dropdown                              | `String`          | `undefined`      |
| `dropdownPopperOptions`    | Popper raw options                                             | `array`, `object` | `undefined`      |
| `closeOnSelect`            | Close the dropdown on selecting an option                      | `Boolean`         | `true`           |
| `selectOnClose`            | On Close select the last active option                         | `Boolean`         | `false`          |
| `clearSearchOnClose`       | Clear the search on close                                      | `Boolean`         | `true`           |
| `toggleOnFocus`            | Open the select on focus                                       | `Boolean`         | `false`          |
| `toggleOnClick`            | Open the select on click                                       | `Boolean`         | `true`           |
| `toggleOnClick`            | Open the select on click                                       | `Boolean`         | `true`           |
| `valueAttribute`           | Value Attribute key to search on options                       | `String`          | `undefined`      |
| `textAttribute`            | Label Attribute key to search on options                       | `String`          | `undefined`      |
| `hideSearchBox`            | Hides the search box                                           | `Boolean`         | `false`          |
| `searchBoxPlaceholder`     | Placeholder for the search box                                 | `String`          | `Search...`      |
| `noResultsText`            | When searches and no results are found text                    | `String`          | `No results...`  |
| `searchingText`            | Text to show while searching                                   | `String`          | `Searching...`   |
| `loadingClosedPlaceholder` | Text to show when dropdown is closed but fetching              | `String`          | `Searching...`   |
| `loadingMoreResultsText`   | Text to show while loading more results                        | `String`          | `Loading...`     |
| `clearable`                | If we should allow selected value to be unselected             | `Boolean`         | `false`          |
| `maxHeight`                | Max Height of the dropdown                                     | `Number`          | `250`            |
| `fetchOptions`             | A function/promise that returns the results                    | `Function`        | `undefined`      |
| `fetchEndpoint`             | A Url String to fetch options from                             | `String`               | `undefined`      |
| `prefetchOptions`          | Initial set of options when a fetchOptions function is defined | `Array`           | `undefined`      |
| `delay`                    | Delay between pulling new options when bottom is reached       | `Number`          | `250`            |
| `minimumInputLength`       | Number of characters required to trigger the search            | `Number`          | `2`              |
| `minimumInputLengthText`   | Text to show when minimum is not met                           | `String`          | `Please enter..` |
| `minimumResultsForSearch`  | Minimum amount of results to consider the search               | `Number`          | `undefined`      |
| `teleport`                 | If we should teleport the dropdown                             | `Boolean`         | `true`           |
| `teleportTo`               | Element / Ref to teleport into                                 | `String`          | `body`           |
| `trapFocus`                | If we should trap the focus inside the dropdown                | `Boolean`         | `true`           |


## Options - Static

When using the `options` prop you can pass an array of objects of your choice and use the `valueAttribute` and `textAttribute` props to define which keys to use for the value and text.
This will make it easier to use the component with your own data without worry about the structure.
Internally we will convert the options to what we call `normalizedOptions`, that contains a `value` and a `text`.

If you want instead, you can also pass the `normalizeOptions` prop with the array of normalized options with the following structure :

```js
[
  {
    value: 'batman',
    text: 'Batman',
    children: [
        {
            value: 'robin',
            text: 'Robin',
        },
        {
            value: 'joker',
            text: 'Joker',
            disabled: true,
        },
    ],
  },
]
```

By default, the select component will take the `value` to the `v-model`and the `text` to the display the result label.
You can also nest the options by using the `children` key, or even disable an option by using the `disabled` key.

This should be more than enough to cover the most basic usage cases, 
but if you need more control you can also use the `fetchOptions` prop to pass a function that will load your results via Fetch or any other method of your choice.

## Options - Dynamic Fetch / API

Here is an example of how to use the `fetchOptions` prop to retrieve results from an external API:

```ts
const fetchOptions = (query?: string, nextPage?: number) => {
  const url = `https://www.omdbapi.com/?apikey=xxxx&s=${query}&page=${nextPage || 1}`
  return fetch(url)
    .then(response => response.json())
    .then((data) => {
      return {
        results: data.Search as Record<string, any>[],
        hasMorePages: data.Search && data.totalResults > (data.Search.length * (nextPage || 1)) * 10,
      }
    })
}
```


The function will receive the current query and the next page number, and should return an object with the results and a boolean to indicate if there are more pages to load.

:::info :bulb: Accessing the raw option
After the option is normalized, it is than passed to the component and everything else will be ignored, but you can still access
the raw option of your data by using `option.raw` in the `option` slot.
:::

## Options - Load from endpoint

If you want to load the options from an endpoint of your backend, you may use the `fetchEndpoint` prop, the props accepts a full qualified URL and it will perform a `GET`request to your url
with a `query` parameter containing the current search query and a `page` parameter containing the current page wanted.
This also supports lazy loading of options once you reach the bottom of the dropdown, incrementing the page number.

The response must contain an array with a property called `data` containing the options and a property called `next_page_url` indicating if there are more pages to load and the url of the next page.

If you are using [Laravel](https://laravel.com/) you can use the [paginate](https://laravel.com/docs/9.x/pagination#paginating-eloquent-results) method to return the options and the next page url.

```json
{
"data": [
    {"id": 1, "name": "Option 1"},
    {"id": 2, "name": "Option 2"}
],
"next_page_url": "https://your-api.com/options?page=2"
}
```

You may also combine this with `text-attribute` and `value-attribute` to pick which properties to use for the value and text of the options.

If you are using the [Vanilla Components Laravel](https://github.com/flavorly/laravel-vanilla-components) package you may use the helper `ResolveRichSelectOptions` function that does all the heavy lifting for you,
including the pagination, selecting or filtering only via certain columns and use Laravel Scout for searching!

```php
Route::get('/users', function(Request $request){
    return ResolveRichSelectOptions::for(User::class, ['name', 'email']);
})->middleware('web')->name('api.fetch-users');
```

But that's not all! Every little detail matters! Because when you close or refresh your page sometimes you may have selected & persisted a v-model of previous selected models, but because we are not preteching any options
Your select might look empty! But don't worry, we got you covered! The `GET` performed to your server also sends a query parameter called `values` that contains the current selected value(s), so you can use that to preselect the options
anytime and return the appropriate options to be pre-fetched and always included on the component initial state. Once again if you are using the Laravel Package this is all done for you as well! :)



!!!include(./src/parts/title-slots.md)!!!

By default all slots get all the props and configuration from the component.
The slots are divided by two categories, trigger & dropdown.

## Trigger Slots

### Slot `trigger`

Override the whole trigger element.

### Slot `label`

This is usually the most used slot, if you want to override how the default option is displayed
You can take a look on the demos to check for more implementations of this slot.

### Slot `placeholder`

Override the default placeholder for the trigger

### Slot `selectorIcon`

Change or override the little selector icon usually at the right side of the trigger.

### Slot `tagCloseIcon`

Change or override the tag icon used when tags are enabled, this icon is used to remove the tag

### Slot `tagLabel`

Override the tag label, and display it differently, by default the option text is used.

## Slot `clearButton`

Button or icon to clear the results, if the dropdown is clearable

## Dropdown Slots

### Slot `option`

This slot is also widely used and it's used to override how the options are displayed.
You can have different displays for each option by overriding this slot.
Also takes a `option` prop that contains the current option normalized,
and also `option.raw` that contains the original option.

### Slot `optionLabel`

Override the option label, and display it differently, by default the option text is used.

### Slot `optionIcon`

Override the option selected icon, by default a Check icon is used.

### Slot `dropdownTop`

Section on the top of the dropdown, before the search box for additional content in case its necessary

### Slot `dropdownBottom`

Section on the bottom of the dropdown, before the search box for additional content in case its necessary

### Slot `stateFeedback`

When the dropdown is loading or fetching results, this section will be used, you can override it as well


!!!include(./src/parts/title-events.md)!!!

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
!!!include(./src/parts/events-model-value.md)!!!
| `change` | Input Value changed | `CustomEvent` |
| `input` | Input / Value changed | `CustomEvent` |
| `keydown` | KeyboardDown Pressed | `KeyboardEvent` |
| `focus` | Trigger was focused | `FocusEvent` |
| `blur` | Trigger was blur | `FocusEvent` |
| `mousedown` | MouseClick | `MouseEvent` |
| `mouseover` | MouseOver | `MouseEvent` |
| `mouseleave` | MouseLeave | `MouseEvent` |
| `touchstart` | Touch Started | `MouseEvent` |
| `shown` | Dropdown is shown | `true` |
| `hidden` | Dropdown is hidden | `true` |
| `beforeShow` | Before dropdown shown | `true` |
| `beforeHide` | Before hide dropdown | `true` |
| `fetchOptionsSuccess` | Options API fetched success | `true` |
| `fetchOptionsError` | Options API fetched failed | `true` |


## Additional Components

Because the select component can be used for a wide range of daily tasks, we also provide some additional components that can be used to extend the functionality of the select component.
Most of the additional components are used to override the option and/or the label slots.

### Option with Image 🖼️

This component is intended to be used to display profile images or images in general plus a Title and a description, it can be used as a slot for the `option` and `label` slot.

Use cases: Display a list of members, users, registered users, profiles, etc.

### Option with Indicator 🚥

This component is intended to be used to display the option with a title + description and also a 4 different indicators: `red`, `yellow`, `green` and `blue`.
It can be used as a slot for the `option` and `label` slot.

Use cases: Display orders status, Tickets Status, etc

### Option Tag with Image

Same as the option with image but when being used with tags.


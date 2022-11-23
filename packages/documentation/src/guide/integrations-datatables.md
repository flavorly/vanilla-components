---
outline: deep
---

# Laravel + Datatables

The following package provides a simple & first party integration between Laravel and the Datatable Component.
Never again will you have to write a single line of Javascript to get your tables up and running.
Please keep in mind the current implementation is intended to be simple and easy to use, if you are looking for a more advanced package please
checkout AG-Grid or similar, since we WON'T over-complicate this package.

## Current Features

- Server Side Integration for Server Side Request
- Ability to fully control & generate the datatable configuration from Fluent methods on your Laravel Application
- Ability to generate/include Filters,Actions Search, Pagination, etc... from the same Fluent methods
- Actions are dispatched to Server side, converted to their corresponding Models and/or Eloquent Queries
- Fluent Methods inspired by Filament & Laravel Nova, so you always feel at home!
- Many more to come!

## Installation

Get started by installing [Laravel Scout](https://laravel.com/docs/scout), Scout is used to perform the search
on the datatable, we did not feel like we should implement our own method to search, since scout provide a nice way already
to search through your models, and the big plus it also supports **Database**, **Algolia**, **Meilisearch** drivers out of the box.

```bash
# Install Scout for Search
# For more information please visit https://laravel.com/docs/scout
composer require laravel/scout
```

Next, install our Package:

```bash
composer require flavorly/laravel-vanilla-components

# Optional for Vendor Files & Translations
php artisan vendor:publish --tag="laravel-vanilla-components-migrations"
php artisan vendor:publish --tag="laravel-vanilla-components-config"
php artisan vendor:publish --tag="laravel-vanilla-components-translations
```

That's it! You should be ready to create your first table!

## Create your first table

Now that the package is installed, you may move on to create your first table.
The following example will show a simple skeleton on how your Datable file class should look like
( Yeah, stubs coming soon! ). We will get more into details on how to configure your table later on.


We usually recommend to set your Datatables in a `app/Datatables` folder, but you can place them wherever you want.

```
├─ app
   ├─ Datatables
      ├─ UserDatatable.php
```

Here is the skeleton:

```php
namespace App\Datatables\Users;

use Flavorly\VanillaComponents\Datatables\Datatable;
use Flavorly\VanillaComponents\Datatables\Options\General\Options;

class User extends Datatable
{

    public function fetchEndpoint(): ?string
    {
        return route('datatables.demo');
    }
    
    public function columns(): array
    {
        return [
           // Columns go here
        ];
    }

    public function filters(): array
    {
        return [
            // Filters go here
        ];
    }

    public function actions(): array
    {
        return [
            // Actions go here
        ];
    }

    public function options(): array| Options
    {
        return Options::make()->refreshable()->hideSearchBar();
    }
}
```

## Sharing your table to Vue & Setup the Endpoint

After you create your table, you should be able to share it to Vue, so you can use it in your frontend.
The following example will show you how to share your table to Vue using inertia, you are not limited to use Inertia
You could also have a dedicated endpoint that returns the datatable configuration, as long as the array arrives on the frontend you should be good to go!


From your Laravel Controller send the table to your view as an array:

```php
public function index(){
    return inertia('index', [
        'usersTable' => (new UserTable())->toArray(),
    ]);
}

// Or with Hybridly
public function index(){
    return hybridly('index', [
        'usersTable' => (new UserTable())->toArray(),
    ]);
}
```

On the frontend you can use the `Datatable` component to render your table:

```vue
<script setup lang="ts">
import { Datatable } from "@flavorly/vanilla-components";
const props = defineProps({
    usersTable: [Object, Array],
});
</script>
<template>
    <div class="p-5 sm:p-20 bg-gray-200 dark:bg-gray-900">
        <Datatable
            :config="props.usersTable"
        />
    </div>
</template>
```

You will need another endpoint or controller, this control will handle the incoming ajax requests from the table.
The controller will simply take the request and send a normal json response back to the client.

Personal recommendation is to create a dedicated controller for your tables, and place everything there :p

```php
<?php
namespace App\Http\Controllers;

use App\Datatables\Users\User as UserTable;

class DatatableController extends Controller
{
    public function usersTable()
    {
        return (new UserTable())->response();
    }
}
```


## Columns

You may create columns with the `Flavorly\VanillaComponents\Datatables\Columns\Column` class that is provided by the package.
For the time being we will keep it short, feel free to explore the fluent methods.

Make sure to return an array of columns from the `columns()` method.

- The **name** define for your column is the actual name that it will try to search for in the database, so make sure to use the correct name.
- The **label** is the actual label that will show on the table head

```php
// Import at the top level
use Flavorly\VanillaComponents\Datatables\Columns\Column;

public function columns(): array // [!vp focus:8]
{
    return [
        Column::make()->name('id')->label('ID')->sortable(),
        Column::make()->name('name')->label('Name')->raw()->sortable(),
        Column::make()->name('email')->label('Email')->sortable(),
    ];
}

```

## Actions

Actions are shown when you select one or multiple rows on your table, a list of actions will be shown in the top right corner of the table.
Use the `Flavorly\VanillaComponents\Datatables\Actions\Action`

Make sure to return an array of columns from the `actions()` method.

The actions can be created inline, or if you prefer you are also able to create them as a separate class, and then just reference them in the array,
this will work as long as your class extends the base action class and implements both a: `handle()`, `setup()` method, the **setup** method is used to boostrap your action, so you want to define anything related to it, while the **handle** method is used to actually perform the action, more on this will be explained bellow.

```php
// Import at the top level
use Flavorly\VanillaComponents\Datatables\Actions\Action;
use Flavorly\VanillaComponents\Core\Confirmation\Confirmation;

public function actions(): array
{
    return [
        Action::make()
            ->name('copy')
            ->label('Copy Orders')
            ->confirmation(
                Confirmation::make()
                    ->buttons('Ok', 'No, lets forget it')
                    ->title('Are you sure you really really really sure?')
                    ->text('Are you sure you want to copy this orders?')
                    ->danger()
                    //->info()
                    //->warning()
            )
            ->onBefore(function (RequestPayload $data) {
                ray('Im running before the action',$data);
            })
            ->onFinished(function (RequestPayload $data) {
                ray('Im running After',$data);
            })
            //->using(MyAction::class)
            ->using(function(RequestPayload $data, Collection $models){
                ray('Im running the actual action',$data, $models);
            }),
           
            
            // Other actions may go here
    ];
}
```

### Actions - Hooks & Events :metro:

Actions provide a set of hooks & events that are dispatched before, after, failed, & on finished.
The action events and hooks are dispatched with a `RequestPayload` containing relevant information & data about the action.
The hooks accept a *callback* that will be executed when the action is about to run/finish.


- **onBefore** - Dispatched before the action is executed and also emits a `Flavorly\VanillaComponents\Events\DatatableActionStarted`

- **onAfter** - Dispatched after the action is executed with `success` and also emits a `Flavorly\VanillaComponents\Events\DatatableActionExecuted`

- **onFailed** - Dispatched when the action failed to execute with `exception` and also emits a `Flavorly\VanillaComponents\Events\DatatableActionFailed`

- **onFailed** - Dispatched when the action failed to execute with `exception` and also emits a `Flavorly\VanillaComponents\Events\DatatableActionFailed`

- **onFinished** - Dispatched `always` on finish no matter if success or not and also emits a `Flavorly\VanillaComponents\Events\DatatableActionFinished`


### Actions - Confirmation :white_check_mark:

The `confirmation()` action fluent method accepts an instance of `Flavorly\VanillaComponents\Core\Confirmation\Confirmation`, this will help you create a confirmation dialog before the action is executed for destructive actions. The method allows you to choose the button labels, titles, text, style of the dialog ( warning, info, etc ) and in the future also include additional fields/data to be sent along-side with the action.


### Actions - Using & Callback :triangular_flag_on_post:

Actions are only useful if you can actually do something with them, so the `using()` method is used to define the actual action that will be executed when the action is triggered. The using method takes a `closure`or a `class`

The closure will receive one argument, `RequestPayload` that is injected and contains the relevant data about the action, we will explain the request payload in full later on. You can also `type-hint` the `Illuminate\Database\Eloquent\Collection` if you do this, we will convert all the selected ids into their corresponding models and pass them to the closure or class that you defined.

When using a class to handle the action, you must ensure that the class implement one of the methods: `__invoke` or `handle` you may also define your own method name as a second argument of the `using()` fluent method, we will attempt to find those methods and return the resolve back.

### Actions - Request Payload :incoming_envelope:

The request payload `RequestPayload` contains all the important information when a action is dispatched and its inject on most of the closures that are related to the action itself, the payload contains the following information, keep in mind that some information might not be present at all times, example the before hook contains the RequestPayload, but doesn't contain any models, since the resolving did not happen yet.

Here are the following properties that are available on the payload:

- **getFilters()** - Return a collection of the filter applied, each item on the collection is instance of a Vanilla Components `Filter` Object

- **getSorting()** - Return a collection of the sorting applied, each item on the collection is instance of a Vanilla Components `Column` Object

- **isAllSelected()** - Returns a boolean if the user selected all the rows on the table ( not just the current page ) but the whole datatset for the applied query.

- **getSelectedRowsIds()** - Returns a collection of the selected ids, this will be empty if the user selected all the rows on the table.

- **getAction()** - Return the current action being executed as a Vanilla Components `Action` Object that also contains the Table instance inside it.

- **getQuery()** - Return the current Query being executed in case you want to modify or clone. This is a Laravel Query Builder or a Scout Builder instance

- **getModels()** - Return the collection of Eloquent Database Models in case you type-hinted the models or used the function to load the models

- **getPerPage()** - Returns the number of items being paginated per page

- **getSearch()** - Returns the search query if any, if no search query it will return a empty string

### Actions - Other Methods

Actions also provide a set of other methods that you may use to customize the action, since those are pretty self-explanatory, we will not go into detail about them, but you can check the source code for more information.

- **canSee() / canExecute()** - Defines if a user is allowed to see or execute the action

- **clearFilters()** - Clears the filters after the action is executed defaults to `true`

- **clearSelectionAfterAction()** - Clears the selected items after the action is executed and finished, defaults to `true`

- **polling()** - Accepts a `Flavorly\VanillaComponents\Core\Polling\Polling` instance and can be used to start polling the server after the action is executed, useful if you expect something to change within a timeframe after the action is executed.


Thats it! You should be covered using actions in full! The rest of UI and customization is up to you using the Vue component and slots and what not.


## Filters

Filters are a way to filter the data on the table, they are very similar to the actions, but instead of executing a action, they will modify the query that is being executed to filter the data.

Filters are generic enough to take any component of your choice, they will simply forward value/default value and tell vue what component should render. 

By Default the Package ships with the default Vanilla Components that can be used as filters:

- **Text** - A simple text input that will filter the data based on the column name
- **Select** - A simple select supporting options
- **Rich Select** - An extended select that supports search, multiple, and more
- **Date** - A date picker that supports date, date range, and time
- **Toggle** - A simple toggle
- **Switch** - A simple Switch


Make sure to return an array of filters from the `filters()` method.

```php
// Import at the top level
use Flavorly\VanillaComponents\Datatables\Filters\Filter;
use Flavorly\VanillaComponents\Core\Components\Input;
use Flavorly\VanillaComponents\Core\Components\RichSelect;
use Flavorly\VanillaComponents\Core\Components\Input;
use Flavorly\VanillaComponents\Datatables\Options\General\Options;
use Flavorly\VanillaComponents\Core\Option\Option;

public function filters(): array
{
    return [
    
            // Note that here we are using the Component Select to create a filter
            Select::make()
                // Name is the actual Datatable column if no apply closure is provided
                ->name('verified')
                ->label('Verified')
                ->placeholder('Choose an option')
                ->options([
                    ['value' => false, 'text' => 'Not Verified'],
                    ['value' => true, 'text' => 'Verified'],
                ]),
                
            // Here we are using a generic implementation of a filter
            Filter::make()
                ->name('email')
                ->placeholder('Email')
                ->label('Email')
                // Use the attributes to forward any attributes to the component
                ->attributes([
                    'type' => 'email',
                ])
                // Here we instruct what compomnent to use
                ->input(),
               
            // Another filter
            RichSelect::make()
                ->name('banned')
                ->label('Banned')
                ->options([
                    // Note here we are using the Options class to generate actual options instead of a plain array
                    Option::make()
                        ->label('foooo')
                        ->value('im_some_value')
                        ->children([
                            Option::make()
                                ->label('foooo_back')
                                ->value('im_some_value_1'),
                            Option::make()
                                ->label('foooo_back2')
                                ->value('im_some_value_2'),
                        ]),
                ]),
                
            // Applying using your own closure
            Input::make()
                ->name('username')
                ->placeholder('Write your username')
                ->label('Username')
                // You can use apply using to define your query.
                ->applyUsing(function (Builder $query, $column, $value) {
                    if ($value === 'true') {
                        $query->whereNotNull('verified_at');
                    } elseif ($value === 'false') {
                        $query->whereNull('verified_at');
                    }
                })
    ];
}
```

### Filters - Modify the query

Filters can modify the query by using the `applyUsing()` method, this method accepts a closure that will be executed when the filter is applied, the closure will receive the following arguments:

- **query** - The current query that is being executed, this is a Laravel Query Builder or a Scout Builder instance
- **column** - The column name that is being filtered, this is the name that you provided on the filter
- **value** - The value that the user provided on the filter
- 
### Filters - Adding your own Components

Filters are generic enough to take any component of your choice, they will simply forward value/default value and tell vue what component should render.

You may define the `->component()` method that accepts any string, all you need to make sure is that the component is registered on the Vue instance. 

You may also use the `->attributes()` method to forward any attributes to the component. Please keep in mind that we will ignore certain attributes like `v-model`, `v-bind` and so on.








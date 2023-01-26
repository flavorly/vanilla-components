<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import { camelize, computed, onMounted, onUnmounted, provide, reactive, ref, watch } from 'vue'
import { useLocalStorage, useSessionStorage } from '@vueuse/core'

// Lodash
import each from 'lodash/each'
import filter from 'lodash/filter'
import find from 'lodash/find'
import assign from 'lodash/assign'
import omit from 'lodash/omit'
import debounce from 'lodash/debounce'

// Partials
import TableHead from './partials/head.vue'
import RowSkeleton from './partials/row-skeleton.vue'
import Search from './partials/search-bar.vue'
import SelectionBar from './partials/selection-bar.vue'
import Pagination from './partials/pagination.vue'
import Actions from './partials/actions.vue'
import DialogConfirmAction from './partials/dialog-confirm-action.vue'
import DialogSettings from './partials/dialog-settings.vue'
import DialogFilters from './partials/dialog-filters.vue'
import FilterBadge from './partials/filter-badge.vue'
import EmptyState from './partials/empty-state.vue'

import { useConfigurationBuilder, useFetchData, useValidator } from './utils'
import { datatableConfig } from './config'
import type * as Types from './config'

// Other Components
import Button from '@/components/button/button.vue'
import ArrowPathIcon from '@/components/icons/hero/outline/ArrowPathIcon.vue'
import FunnelIcon from '@/components/icons/hero/outline/FunnelIcon.vue'
import CogIcon from '@/components/icons/hero/solid/CogIcon.vue'
import SearchIcon from '@/components/icons/hero/solid/MagnifyingGlassIcon.vue'
import EllipsisVerticalIcon from '@/components/icons/hero/solid/EllipsisVerticalIcon.vue'
import DropdownOption from '@/components/dropdown/dropdown-option.vue'
import Dropdown from '@/components/dropdown/dropdown-menu.vue'
import Card from '@/components/card/card.vue'

import type { CSSClassesList, NormalizedOption } from '@/core/types'
import { useConfiguration, useDynamicSlots, useVariantProps } from '@/core/use'
import { isServer } from '@/core/helpers'

const props = defineProps({
  ...useVariantProps<Types.DatatableProps, Types.DatatableClassesValidKeys>(),
  config: {
    type: [Object] as PropType<Types.DatatableConfiguration>,
    required: false,
    default() {
      return {}
    },
  },
  fetchData: {
    type: [Function, undefined] as PropType<Types.DatatableFetchDataFunction | undefined>,
    required: false,
    default: undefined,
  },
  onActionExecutedCallback: {
    type: [Function, undefined] as PropType<Types.DatatableActionExecutedFunction | undefined>,
    required: false,
    default: undefined,
  },
  onExceptionCallback: {
    type: [Function, undefined] as PropType<Types.DatatableExceptionFunction | undefined>,
    required: false,
    default: undefined,
  },
})

const emit = defineEmits([
  'fetchedSuccess',
  'fetchError',
  'actionExecuted',
  'sortingUpdated',
  'navigateToPage',
  'filtersSaved',
  'mounted',
  'unmounted',
  'search',
  'openedFilters',
  'openedSettings',
])

// ----- Start the Variant -----  //
const { configuration } = useConfiguration<Types.DatatableProps>(datatableConfig, 'Datatable')

// ---------------------------- //
// ----- Boot Config & Validate -----  //
// ---------------------------- //
const datatable = reactive(useConfigurationBuilder(props)) as Types.DatatableConfiguration

// Validate the data
useValidator(datatable)

// ---------------------------- //
// ----- Reactive Data -----  //
// ---------------------------- //

/** Stores if table is currently fetching */
const isFetching = ref(false) as Ref<boolean>

/** Stores if it's currently showing filters */
const isShowingFilters = ref(false) as Ref<boolean>

/** Stores if it's currently showing the action confirmation */
const isShowingActionConfirmation = ref(false) as Ref<boolean>

/** Stores if it's currently showing the table settings modal */
const isShowingSettings = ref(false) as Ref<boolean>

/** Temporary value to control if a refresh can be performed or not. */
const showLoadingAnimation = ref(false) as Ref<boolean>

/** Stores if table is currently fetching */
const results = reactive({
    data: [],
    links: {
        next: null,
        previous: null,
        pages: [],
    },
    meta: {
        current_page: 0,
        from: 0,
        to: 0,
        total: 0,
    },
}) as Types.DatatableResponse

/** Stores the current action object that was selected */
const currentAction = ref(undefined) as Ref<undefined | Types.DatatableAction>

/** Stores the pooling interval */
const poolingInterval = ref(undefined) as Ref<undefined | number>

/** Showing/Hiding Searchbar */
const isShowingSearchbar = ref<boolean>(!datatable.options.isSearchHidden)

/** Default Settings */
const userSettingsDefault = {
    hiddenColumns: filter(datatable.columns, { hidden: true }).map(c => c.name),
    perPage: datatable.perPageOptions[0]?.value as number,
    useStorage: true as boolean,
    saveSelection: true as boolean,
    selectedIds: [] as string[],
    filters: {} as Types.DatatableSavedFilter,
} as Types.DatatableUserSettings

/** Stores the user given settings & local/session storage */
const userSettings = reactive({ ...userSettingsDefault }) as Types.DatatableUserSettings

/** Stores the user given settings & local/session storage */
const userStorage = useLocalStorage(camelize(datatable.name.toString()), userSettings, {})

/** Query Data being passed to the server */
const queryData = reactive({
    search: '' as string | null,
    perPage: userSettings.perPage,
    selected: [] as string[],
    selectedAll: false as boolean,
    filters: {} as Types.DatatableSavedFilter,
    sorting: [],
    action: null as string | null,
}) as Types.DatatableQueryData

/** Actual function to perform the request */
const fetchData: Types.DatatableFetchDataFunction = datatable?.fetchData || useFetchData

// ---------------------------- //
// ----- Computed Data -----  //
// ---------------------------- //

/** Current Ids being shown on hte page */
const currentPageIds = computed(() => results.data?.map(item => item.id) || []) as Ref<string[]>

/** Result Hash */
const resultsHash = computed(() => JSON.stringify(results.data)) as Ref<string>

const hasResults = computed(() => results.data !== undefined && results.data !== null && results.data.length > 0)

/** If there is currently selected items on the config */
const hasAnyItemsSelected = computed(() => queryData.selectedAll || queryData.selected.length > 0) as Ref<boolean>

/** Returns if the user configured any filters */
const hasFilters = computed(() => datatable.filters.length > 0) as Ref<boolean>

/** Returns if the user configured any actions */
const hasActions = computed(() => datatable.actions.length > 0) as Ref<boolean>

/** Returns the current count of visible columns, excluding the hidden ones and the select column */
const visibleColumnsCount = computed(() => userSettings.hiddenColumns?.length - (datatable.options.selectable ? 1 : 0)) as Ref<number>

/** Returns the number of items selected, in case all is selected, we return the total number of rows matching */
const selectedItemsCount = computed(() => queryData.selectedAll ? results?.meta?.total : queryData.selected.length) as Ref<number>

/** Formatted Count of the selected items
 * TODO : Format the actual number
 **/
// const selectedItemsCountFormatted = computed(() => selectedItemsCount.value) as Ref<string | number>

/** Checks if the user can search on the table, if its searched, not currently fetching, and no items are selected */
const canSearch = computed(() => datatable.options.searchable && !isFetching.value && !hasAnyItemsSelected.value) as Ref<boolean>

/** Boolean that returns if the check all checkbox should be checked, it means select all is selected and the current page of items is all selected  */
const isAllItemsInPageSelected = computed(() => queryData.selectedAll || currentPageIds.value.every(id => queryData.selected.includes(id))) as Ref<boolean>

/** Boolean that returns if the check all checkbox should be checked, it means select all is selected and the current page of items is all selected  */
const hasAnyItemsSelectedForCurrentPage = computed(() => queryData.selected.some(id => currentPageIds.value.includes(id))) as Ref<boolean>

/** Returns how the number of filters currently applied */
const filtersActiveCount = computed(() => Object.keys(userSettings.filters).length || Object.keys(queryData.filters).length) as Ref<number>

/** Returns if there is any filters or search applied */
const hasFiltersOrSearchApplied = computed(() => filtersActiveCount.value > 0 || queryData.search !== '') as Ref<boolean>

/** Whenever to show the loading state or not */
const showBeInLoadingState = computed(() => isFetching.value || showLoadingAnimation.value)

/** Whether to show the settings dropdown or not */
const showSettingsDropdown = computed(() => [datatable.options.isSearchHidden, datatable.options.refreshable, datatable.options.manageSettings].includes(true))

/**
 * Map the columns, so we can include if the column is visible or not
 * if it's sorted or not and so on, so we don't need to evaluate it each time we need.
 **/
const columnsComputed = computed(() => {
    return datatable.columns.map((column: Types.DatatableColumn) => {
        return {
            ...column,
            visible: !userSettings.hiddenColumns.includes(column.name),
            isSorted: queryData.sorting.some(c => c.column === column.name),
            isSortedAsc: queryData.sorting.some(c => c.column === column.name && c.direction === 'asc'),
            isSortedDesc: queryData.sorting.some(c => c.column === column.name && c.direction === 'desc'),
            slotName: useDynamicSlots('row', column.name),
        }
    })
}) as Ref<Types.DatatableColumnsComputed>

/**
 * Map the actions to add slot name
 **/
const actionsComputed = computed(() => {
    return datatable.actions.map((action: Types.DatatableAction) => {
        return {
            ...action,
            slotName: useDynamicSlots('action', action.name),
        }
    })
})

/**
 * Map the actions to add slot name
 **/
const filtersComputed = computed(() => {
    const finalFilters = [] as Types.DatatableFilters

    Object.entries(userSettings.filters).forEach(([key, value]) => {
        const filterObject = find(datatable.filters, { name: key }) as Types.DatatableFilter | undefined

        // Filter wasn't found, skip it.
        if (undefined === filterObject) {
            return
        }

        // Save the value as it is ( value on user settings )
        let finalFilterValue = value as string | undefined | null | number

        // If the filter is a select, attempt to resolve the option in a nice way
        // So we don't resolve the "raw" value but the label.
        if (filterObject?.options?.length) {
            const option = find(filterObject?.options, { value }) as NormalizedOption | undefined
            if (option !== undefined) {
                finalFilterValue = option.text
            }
        }

        // Push Again & Merge
        finalFilters.push({
            ...filterObject,
            value: finalFilterValue,
        })
    })
    return finalFilters
}) as Ref<Types.DatatableFilters>

// ---------------------------- //
// ----- Methods -----  //
// ---------------------------- //

/** Wrapper for the main call to the server, so we can perform additional stuff */
const fetchFromServer = (then = () => {}) => {
    // console.log('[REST] 🚀 Calling the server');

    isFetching.value = true

    return fetchData(datatable, queryData)

        // Resolve
        .then((response) => {
            results.data = response.data
            results.links = response?.links
            results.meta = response?.meta
            results.responses = response?.meta

            // Emit that fetch was success
            emit('fetchedSuccess', {
                results,
                success: true,
            })
        })

        // Catch Errors
        .catch((error: object) => {
            // If user provided a callback after each exception
            if (datatable?.onExceptionCallback !== undefined) {
                datatable.onExceptionCallback(error)
            }

            console.log('[REST] 🚀 Got error', error)

            // Emit  error
            emit('fetchError', {
                error,
                success: false,
            })
        })

        // Finally
        .then(() => {
          setTimeout(() => {
            isFetching.value = false
          }, 300)
        })
        .then(then)
}

/** Refresh the datatable */
const refresh = (then = () => {}) => {
    if (!isFetching.value) {
        fetchFromServer(then)
    }
}

/**
 * Function to select a single row/item
 * - Only selects if item is not yet selected
 * - If the item is selected it will deselect it
 * - Disables the select all checkbox if all items are selected
 **/
const selectItem = (item: Types.DatatableResultData, uncheckIfChecked = true) => {
    const itemKey = item[datatable.primaryKey] || null
    if (itemKey === null) {
        throw new Error('Please make sure the config "primaryKey" exists on your resource data.')
    }

    // If everything was checked, remove it.
    queryData.selectedAll = false

    // If the ID is not yet selected, select it

    if (!queryData.selected.includes(itemKey)) {
        return queryData.selected.push(itemKey)
    }

    // If we should toggle if it's already selected then do it.
    if (uncheckIfChecked) {
        const index = queryData.selected.indexOf(itemKey)
        if (index > -1) {
            return queryData.selected.splice(index, 1)
        }
    }
}

/**
 * Check if a given row is selected
 **/
const isItemSelected = (item: Types.DatatableResultData) => {
    return queryData.selectedAll || queryData.selected.includes(item[datatable.primaryKey])
}

/** Deselect all the items in the current page  */
const deselectAllItemsInPage = () => {
    each(currentPageIds.value, (item) => {
        const index = queryData.selected.indexOf(item)
        if (index > -1) {
            return queryData.selected.splice(index, 1)
        }
    })
}

/** Deselect all the items in all pages */
const deselectAllItems = () => {
    queryData.selected = []
    queryData.selectedAll = false
}

/**
 * Select all items in the current page ( visible )
 * - Deselects All if it was checked
 **/
const selectAllItemsInPage = () => {
    // Ensure we toggle back the all checked
    queryData.selectedAll = false

    if (isAllItemsInPageSelected.value) {
        deselectAllItemsInPage()
        return
    }

    // Select all items being displayed
    each(results.data, (item) => {
        selectItem(item, false)
    })
}

/** Toggles the select all matching feature on/off */
const toggleSelectAll = () => {
    queryData.selectedAll = !queryData.selectedAll
}

/**
 * Starts a table pool until a certain condition is met.
 * Configurable to :
 * - Pool every X Seconds
 * - During X Time
 * - Stop when hash of the data changed
 */
const poolUntil = (enable = false, every = 20, during = 120, stopWhenChanged = true) => {
    if (!enable) {
        return
    }

    const started = Date.now()
    const initialItemsHash = resultsHash.value

    poolingInterval.value = setInterval(() => {
        const timeExpired = Date.now() - started > (during * 1000)
        const hashChanged = initialItemsHash !== resultsHash.value
        if (timeExpired || (hashChanged && stopWhenChanged)) {
            clearInterval(poolingInterval.value)
        }
        else {
            // Refresh the results
            refresh()
        }
    }, every * 1000)
}

/** Pool but forever */
const poolForever = (enable = false, every = 20) => {
    if (!enable) {
        return
    }
    poolingInterval.value = setInterval(() => refresh(), every * 1000)
}

/** Resets the sorting  */
const resetSorting = () => {
    queryData.sorting = []
}

/** Resets the per page items  */
// const resetPerPageItems = () => {
//     queryData.perPage = datatable.perPageOptions[0]?.value as number;
// };

/** Resets the search query  */
const resetSearchQuery = (shouldRefresh = false) => {
    queryData.search = ''
    if (!shouldRefresh) {
        return
    }
    refresh()
}

/** Resets a specific filter by name  */
const resetFilter = (filterToClear: Types.DatatableFilter, shouldRefresh = true) => {
    // Already empty or does not exist in the user settings
    if (!(filterToClear.name in userSettings.filters)) {
        return
    }

    // We need to deselect
    deselectAllItems()

    userSettings.filters = { ...omit(userSettings.filters, filterToClear.name) }
    queryData.filters = { ...omit(queryData.filters, filterToClear.name) }

    // Refresh the items
    if (!shouldRefresh) {
        return
    }
    refresh()
}

/** Reset all filters  */
const resetAllFilters = (shouldRefresh = false) => {
    // Already empty
    if (!Object.keys(queryData.filters).length) {
        return
    }

    queryData.filters = {}
    userSettings.filters = {}

    // Refresh the items
    if (!shouldRefresh) {
        return
    }
    refresh()
}

/** Reset all filters & search query  */
const resetFiltersAndSearch = (shouldRefresh = true) => {
    showLoadingAnimation.value = true

    resetAllFilters(false)
    resetSearchQuery(false)
    resetUrl()

    // Refresh the items
    if (!shouldRefresh) {
        return
    }
    refresh()
    showLoadingAnimation.value = false
}

/** Resets the URL if any filters or w/e applied  */
const resetUrl = () => {
  if (isServer()) {
    return
  }

  if (datatable.originUrl !== undefined) {
    window.history.pushState({}, document.title, datatable.originUrl)
  }
  else {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    for (const [key, value] of params) {
      if (key.startsWith(datatable.name)) {
        params.delete(key)
      }
    }
    url.search = params.toString()
    window.history.replaceState({}, '', url.toString())
  }
}

/** Reset all settings  */
const resetAllSettings = () => {
    resetAllFilters()
    resetSorting()
    deselectAllItems()
    Object.assign(userSettings, userSettingsDefault)
}

/** ResetThe current action  */
const resetAction = () => {
    isShowingActionConfirmation.value = false
    currentAction.value = undefined
}

/**
 * Execute the actual action
 **/
const executeAction = (action: Types.DatatableAction) => {
    // No permission to execute the action
    if (!action?.permissions?.execute) {
        return
    }

    if (action?.before?.callback !== undefined) {
        action.before.callback(action)
    }

    // Assign to action data & send
    queryData.action = action.name

    // Stuff to execute after the action
    const afterActionCallback = () => {
        // Reset the selected items if it was defined on the action scope
        if (action?.after?.clearSelected) {
            deselectAllItems()
        }

        // Clear all the filters in case it was defined on the action scope
        if (action?.after?.resetFilters) {
            resetAllFilters()
        }

        //  Executes a given callback if its required
        if (action?.after?.callback !== undefined) {
            action.after.callback(action)
        }

        // If we need to pull data after an action has been started
        if (
            action?.after?.pooling
            && action?.after?.pooling?.enable
            && action?.after?.pooling?.during !== undefined
            && action?.after?.pooling?.during > 0
        ) {
            poolUntil(
                action?.after?.pooling?.enable,
                action?.after?.pooling?.interval,
                action?.after?.pooling?.during,
                action?.after?.pooling?.stopWhenDataChanges,
            )
        }

        // Always execute the given callback after the action is fired.
        if (datatable?.onActionExecutedCallback !== undefined) {
            datatable.onActionExecutedCallback(action)
        }

        // Reset the action
        resetAction()

        // Refresh again, because the first one is just to trigger the actual action.
        if (action?.after?.refresh || true) {
          refresh()
        }
    }

    // Emit Action
    emit('actionExecuted', {
        action,
    })

    // Execute the action
    refresh(afterActionCallback)
}

/**
 * On sorting updated, we will update the query data with the new sorting
 **/
const onSortingUpdated = (sorting: Types.DatatableSortedColumns) => {
    queryData.sorting = sorting
    emit('sortingUpdated', {
        sorting,
    })
    refresh()
}

/**
 * On action selected, we will check if it requires confirmation
 * - If it does, we will show the confirmation modal
 **/
const onActionSelected = (action: Types.DatatableAction) => {
    if (action.before?.confirm?.enable) {
        isShowingActionConfirmation.value = true
        currentAction.value = action
        return
    }
    return executeAction(action)
}

/**
 * On action selected, check if it has permissions, its confirmed, etc
 **/
const onActionConfirmed = (action: Types.DatatableAction) => {
    return executeAction(action)
}

/**
 * When the user presses a navigation item
 **/
const onPageNavigated = (link: string) => {
    if (link == null) {
        return
    }

    emit('navigateToPage', {
        link,
    })

    const fetchEndpoint = datatable.fetchEndpoint
    const actionsEndpoint = datatable.actionsEndpoint

    datatable.fetchEndpoint = link
    datatable.actionsEndpoint = link

    // Refresh the results
    // Can't use value trigger otherwise it happens later on the event bubbling
    refresh()

    datatable.fetchEndpoint = fetchEndpoint
    datatable.actionsEndpoint = actionsEndpoint
}

/**
* On filter saved
**/
const onFiltersSaved = (filters: Types.DatatableSavedFilter) => {
    // Hide
    isShowingFilters.value = false

    // Flash the new values
    userSettings.filters = filters
    queryData.filters = filters

    // Things we want to reset
    resetAction()
    deselectAllItems()
    resetSearchQuery()

    emit('filtersSaved', { filters })

    // Refresh the results
    refresh()
}

/**
 * On filters cleared
 **/
const onFiltersReset = () => {
    // Hide
    isShowingFilters.value = false

    // Flash the new values
    userSettings.filters = {}
    queryData.filters = {}

    // More to do here
    resetAction()
    deselectAllItems()
    resetSearchQuery()

    // Refresh the results
    refresh()
}

/**
* When the user search
**/
const onSearch = debounce((newQuery: string | null | undefined) => {
    // If the query is the same, do nothing
    if (newQuery === undefined) {
        newQuery = ''
    }

    // Only search if we're not tabbing into the field
    if (canSearch.value) {
        deselectAllItems()
        refresh()
        emit('search', newQuery || '')
    }
}, 700)

/**
* On click to visit/open settings
**/
const onSettingsVisit = () => {
    isShowingSettings.value = true
    emit('openedSettings', true)
}

/**
 * On click to visit/open filters
 **/
const onFiltersVisit = () => {
    isShowingFilters.value = true
    emit('openedFilters', true)
}

/**
 * On toggle the search button in case hidden
 **/

const onSearchToggle = () => {
  isShowingSearchbar.value = !isShowingSearchbar.value
  if (hasAnyItemsSelected.value && isShowingSearchbar.value) {
    deselectAllItems()
  }
}

/**
 * Converts the local storage to the local user settings on mounted
 **/
const fromUserStorageToUserSettings = () => {
    // User don't want to use storage
    if (userStorage.value?.useStorage === false) {
        return
    }

    // Ensure we remove invalid columns from the storage
    if (userStorage.value.hiddenColumns.length) {
        userStorage.value.hiddenColumns = userStorage.value.hiddenColumns.filter((column: string) => {
            return find(columnsComputed.value, { name: column })
        })
    }

    // Merge into user settings
    // We need also to ensure we merge the ones from storage into the defaults
    // Storage has priority over the default filter value.
    Object.assign(userSettings, assign(userSettingsDefault, userStorage.value))

    // Get the selected Ids
    if (userSettings.selectedIds.length) {
        queryData.selected = userSettings.selectedIds
    }

    // Filters
    if (Object.keys(userSettings.filters).length > 0) {
        queryData.filters = userSettings.filters
    }

    // Per Page
    if (userSettings.perPage) {
        queryData.perPage = userSettings.perPage
    }
}

/**
 * Takes the original filters injected and attempts to put them on local storage
 * this usefull if the server has sent a specific value for the filter initiall
 *
 **/
const fromCurrentFiltersStateToLocalStorage = () => {
  if (Object.keys(datatable.filters).length > 0) {
    // foreach object with javascript
    Object.keys(datatable.filters).forEach((key: string) => {
      const filterObject = datatable.filters[key]
      if (filterObject.value !== undefined && filterObject.value !== filterObject.defaultValue) {
        userStorage.value.filters[filterObject.name] = filterObject.value
      }
    })
  }
}

/**
 * On Mounted, execute the stack
 **/
onMounted(() => {
    // Ensure if we have filters from the URL / Inject initial we also move them to session
    fromCurrentFiltersStateToLocalStorage()

    // Mount the session
    fromUserStorageToUserSettings()

    // Fetch the first page
    if (datatable?.pooling?.enable && datatable?.pooling?.interval !== undefined) {
        refresh(() => {
            poolForever(
                datatable?.pooling?.enable,
                datatable?.pooling?.interval,
            )
        })
    }
    else {
        refresh()
    }

    emit('mounted')
})

/**
 * Watch Per page being changed
 * NOTE: Only watch AFTER mounted to avoid initial triggers from storage
 **/
onMounted(() => {
    watch(() => {
          return (queryData.perPage)
      },
      () => {
          refresh()
      },
      {
          deep: true,
      },
    )
})

/**
 * On Unmounted, clear the pooling interval
 **/
onUnmounted(() => {
    clearInterval(poolingInterval.value)
    emit('unmounted')
})

/**
 * Watch selected ids, on select update the user settings
 * with the selected ids.
 **/
watch(() => queryData.selected, () => {
    userSettings.selectedIds = queryData.selected
}, { deep: true })

/**
 * Watch selected ids, on select update the user settings
 * with the selected ids.
 **/
watch(() => queryData.search, (searchQuery) => {
    if (!isFetching.value) {
        onSearch(searchQuery)
    }
}, { deep: true })

/**
 * When the user settings per page changes, update the query data to trigger reload
 **/
watch(() => userSettings.perPage, () => {
    queryData.perPage = userSettings.perPage
}, { deep: false })

/**
 * If the user settings change, we need to update the storage
 **/
watch(userSettings, (value) => {
    userStorage.value = value
}, { deep: true })

const translations = datatable.translations
const classesList = configuration.classesList as CSSClassesList<Types.DatatableClassesValidKeys>

// ----- Provide data to sub components -----  //
provide('configuration_vanilla_datatable', configuration)

// ----- Provide Configuration -----  //
provide('datatable_configuration', datatable)

// ----- Functions to other components  -----  //
provide('datatable_reset_url_function', resetUrl)

defineOptions({
  name: 'VanillaDatatable',
  inheritAttrs: false,
})
</script>

<template>
  <div>
    <Card
      :title="datatable.translations.title"
      :subtitle="datatable.translations.subtitle"
      :variant="classesList.cardVariant"
    >
      <!-- Actions -->
      <template #actions>
        <!-- Bulk Actions -->
        <slot
          name="headerActions"
          v-bind="{
            actions: datatable.actions,
            hasActions,
            hasAnyItemsSelected,
            onActionSelected,
          }"
        >
          <Actions
            v-if="hasActions && hasAnyItemsSelected"
            :actions="actionsComputed"
            :count-selected="selectedItemsCount"
            @action-selected="onActionSelected"
          >
            <template
              v-for="(action) in actionsComputed"
              :key="action.name"
              #[action.slotName]="{ selectAction }"
            >
              <slot
                :name="action.slotName"
                :action="action"
                v-bind="{ action, selectAction }"
              />
            </template>
          </Actions>
        </slot>

        <!-- Filters -->
        <slot
          name="headerFilters"
          v-bind="{
            filters: filtersComputed,
            hasFilters,
            isShowingFilters,
            filtersActiveCount,
          }"
        >
          <div
            v-if="hasFilters"
            :class="[classesList.headerFiltersContainer]"
          >
            <Button
              @click="onFiltersVisit"
            >
              <FunnelIcon :class="[classesList.headerFiltersIcon]" />
              <span
                :class="[classesList.headerFiltersLabel]"
                v-text="translations.filters"
              />
              <span
                v-if="filtersActiveCount > 0"
                :class="[classesList.headerFiltersCount]"
              >( {{ filtersActiveCount }} )</span>
            </Button>
          </div>
        </slot>

        <!-- Table Settings -->
        <slot
          name="headerSettings"
          v-bind="{
            refreshable: datatable.options.refreshable,
            isFetching,
            isShowingSettings,
            userSettings,
            refresh,
          }"
        >
          <Dropdown
            v-if="showSettingsDropdown"
            :class="[classesList.headerSettingsContainer]"
          >
            <template #trigger>
              <Button>
                <EllipsisVerticalIcon :class="[classesList.headerSettingsIcon]" />
              </Button>
            </template>

            <!-- SearchBar Toggle -->
            <DropdownOption
              v-if="datatable.options.isSearchHidden"
              @click="onSearchToggle"
            >
              <SearchIcon :class="[classesList.headerSettingsSearchIcon]" />
              <span v-text="translations.search" />
            </DropdownOption>

            <!-- Refresh -->
            <DropdownOption
              v-if="datatable.options.refreshable"
              @click="refresh"
            >
              <ArrowPathIcon
                :class="[
                  classesList.headerSettingsRefreshIcon,
                  isFetching ? classesList.headerSettingsRefreshIconAnimation : '',
                ]"
              />
              <span v-text="translations.refresh" />
            </DropdownOption>

            <!-- Edit Settings -->
            <DropdownOption
              v-if="datatable.options.manageSettings"
              @click="onSettingsVisit"
            >
              <CogIcon :class="[classesList.headerSettingsEditIcon]" />
              <span v-text="translations.settings" />
            </DropdownOption>
          </Dropdown>
        </slot>

        <!-- Table Config -->
      </template>

      <!-- Search Bar -->
      <template v-if="(datatable.options.searchable && isShowingSearchbar) && !hasAnyItemsSelected">
        <slot
          name="headerSearch"
          v-bind="{
            searchable: datatable.options.searchable,
            hasAnyItemsSelected,
            query: queryData.search,
            placeholder: translations.searchPlaceholder,
            onSearch,
          }"
        >
          <Search
            v-model="queryData.search"
            :searchable="canSearch"
            :placeholder="translations.searchPlaceholder"
          />
        </slot>
      </template>

      <!-- Active Filters Bar -->
      <template v-if="hasFilters && filtersActiveCount > 0">
        <slot
          name="headerFiltersActive"
          v-bind="{
            hasFilters,
            filtersActiveCount,
            resetFilter,
            filters: filtersComputed,
          }"
        >
          <div :class="classesList.filtersBarContainer">
            <div :class="classesList.filtersBarInner">
              <span v-text="translations.filtersBarLabel" />
              <span>:</span>
              <div :class="classesList.filtersBarBadgesContainer">
                <FilterBadge
                  v-for="aFilter in filtersComputed"
                  :key="`${aFilter.name}${aFilter.value}`"
                  :filter="aFilter"
                  :value="aFilter.value"
                  @filter-remove="resetFilter(aFilter)"
                />
              </div>
            </div>
          </div>
        </slot>
      </template>

      <!-- Current items selected -->
      <template v-if="hasAnyItemsSelected && hasActions">
        <slot
          name="selection"
          v-bind="{
            isAllSelected: queryData.selectedAll,
            countSelected: selectedItemsCount,
            countTotal: results?.meta.total,
            deselectAll: deselectAllItems,
            selectMatching: toggleSelectAll,
            deselectMatching: toggleSelectAll,
          }"
        >
          <SelectionBar
            :is-all-selected="queryData.selectedAll"
            :count-selected="selectedItemsCount"
            :count-total="results?.meta.total"
            @deselect-all="deselectAllItems"
            @select-matching="toggleSelectAll"
            @deselect-matching="toggleSelectAll"
          />
        </slot>
      </template>

      <!-- Actual Table -->
      <div
        :class="[
          classesList.tableContainer,
          ((hasAnyItemsSelected && hasActions || filtersActiveCount > 0)) ? classesList.tableContainerBorder : '',
        ]"
      >
        <template v-if="!showBeInLoadingState && results.data.length <= 0 ">
          <EmptyState
            :has-filters-or-search="hasFiltersOrSearchApplied"
            :is-fetching="isFetching"
            @reset-filters="resetFiltersAndSearch"
          >
            <!-- Empty with Filters or Search Set -->
            <template #emptyWithFilters>
              <slot
                name="emptyWithFilters"
                v-bind="{
                  resetFiltersAndSearch,
                  filters: filtersComputed,
                  filtersActiveCount,
                }"
              />
            </template>
            <template #emptyWithFiltersIcon>
              <slot
                name="emptyWithFiltersIcon"
                v-bind="{
                  resetFiltersAndSearch,
                  filters: filtersComputed,
                  filtersActiveCount,
                }"
              />
            </template>
            <template #emptyWithFiltersTitle>
              <slot
                name="emptyWithFiltersTitle"
                v-bind="{
                  resetFiltersAndSearch,
                  filters: filtersComputed,
                  filtersActiveCount,
                }"
              />
            </template>
            <template #emptyWithFiltersButton>
              <slot
                name="emptyWithFiltersButton"
                v-bind="{
                  resetFiltersAndSearch,
                  filters: filtersComputed,
                  filtersActiveCount,
                }"
              />
            </template>
            <!-- Empty but really empty -->
            <template #emptyWithoutRecords>
              <slot name="emptyWithoutRecords" />
            </template>
            <template #emptyWithoutRecordsIcon>
              <slot name="emptyWithoutRecordsIcon" />
            </template>
            <template #emptyWithoutRecordsTitle>
              <slot name="emptyWithoutRecordsTitle" />
            </template>
            <template #emptyWithoutRecordsButton>
              <slot name="emptyWithoutRecordsButton" />
            </template>
          </EmptyState>
        </template>

        <!-- Table -->
        <table
          v-else
          :class="[classesList.tableClass]"
        >
          <!-- Table Head -->
          <slot
            name="header"
            v-bind="{
              datatable,
              isFetching,
              isAllItemsInPageSelected,
              hasAnyItemsSelectedForCurrentPage,
              columns: columnsComputed,
              selectAllItemsInPage,
            }"
          >
            <TableHead
              :columns="columnsComputed"
              :columns-with-sorting="queryData.sorting"
              :columns-with-hidden-state="[]"
              :is-fetching="isFetching"
              :selectable="datatable.options.selectable"
              :all-items-checked="isAllItemsInPageSelected && !isFetching"
              :some-items-checked="!isAllItemsInPageSelected && hasAnyItemsSelectedForCurrentPage && !isFetching"
              @checked="selectAllItemsInPage"
              @sorted="onSortingUpdated"
            />
          </slot>

          <!-- Table Skeleton when its loading -->
          <template v-if="showBeInLoadingState && !hasResults">
            <slot
              name="skeleton"
              v-bind="{
                isFetching,
                showBeInLoadingState,
                columnsCount: visibleColumnsCount,
                rowsCount: results.data.length || queryData.perPage,
              }"
            >
              <RowSkeleton
                :columns="columnsComputed"
                :number-of-rows="results.data.length || queryData.perPage"
                :is-selectable="datatable.options.selectable"
              />
            </slot>
          </template>

          <!-- Table Body -->
          <tbody
            v-else
            :class="[classesList.tableBody]"
          >
            <!-- Each record Main loop -->
            <tr
              v-for="(result) in results.data"
              :key="result.id"
              :class="[classesList.tableRow]"
            >
              <!-- Checkbox is not slottable -->
              <td
                v-if="datatable.options.selectable"
                :class="[
                  classesList.tableColumnCheckbox,
                ]"
              >
                <input
                  :checked="isItemSelected(result)"
                  :class="[
                    classesList.tableCheckbox,
                  ]"
                  type="checkbox"
                  @change="selectItem(result)"
                >
              </td>
              <!-- Rest of the columns -->
              <slot
                name="default"
                v-bind="{
                  result,
                  columns: columnsComputed,
                  selectable: datatable.options.selectable,
                  selected: isItemSelected(result),
                }"
              >
                <td
                  v-for="(column) in columnsComputed"
                  v-show="column.visible"
                  :key="column.name"
                  :class="[
                    classesList.tableColumn,
                    column.name.toLocaleLowerCase() === 'id' ? classesList.tableIdColumn : '',
                  ]"
                >
                  <!-- Slot for the row skeleton -->
                  <template v-if="showBeInLoadingState">
                    <slot
                      name="rowSkeleton"
                      v-bind="{
                        column,
                        result: result[column.name],
                        resultRaw: result,
                        isLoading: showBeInLoadingState,
                      }"
                    >
                      <div
                        :class="configuration.classesList.skeletonPlaceholder"
                      >
                        <span class="opacity-0">
                          {{ result[column.name] }}
                        </span>
                      </div>
                    </slot>
                  </template>
                  <!-- Slot for the row -->
                  <template v-if="!showBeInLoadingState">
                    <slot
                      :name="column.slotName"
                      v-bind="{
                        column,
                        result: result[column.name],
                        resultRaw: result,
                        isLoading: showBeInLoadingState,
                      }"
                    >
                      <div
                        v-if="column?.raw && !column.component"
                        v-html="result[column.name]"
                      />
                      <div v-else-if="!column?.raw">
                        {{ result[column.name] }}
                      </div>
                      <div v-else-if="column.component && column.component !== ''">
                      <!-- Components support coming soon -->
                      </div>
                    </slot>
                  </template>
                </td>
              </slot>
            </tr>
          </tbody>
        </table>
      </div>

      <slot
        name="pagination"
        v-bind="{
          isFetching,
          pages: results.links?.pages,
          previousPage: results.links?.previous,
          nextPage: results.links?.next,
          currentPage: results.meta?.current_page,
          showingFrom: results.meta?.from,
          showingTo: results.meta?.to,
          total: results.meta?.total,
        }"
      >
        <!-- Pagination -->
        <Pagination
          :is-fetching="isFetching"
          :pages="results.links?.pages"
          :next-page="results.links?.next"
          :previous-page="results.links?.previous"
          :current-page="results.meta?.current_page"
          :showing-from="results.meta?.from"
          :showing-to="results.meta?.to"
          :total="results.meta?.total"
          :show-pages="datatable.options.showPages"
          :show-number-of-items="datatable.options.showTotalItems"
          @navigate="onPageNavigated"
        />
      </slot>
    </Card>
    <!-- Action Confirmation Modal -->
    <slot
      name="actionsDialog"
      v-bind="{
        isShowingActionConfirmation,
        currentAction,
        selectedItemsCount,
        onActionConfirmed,
      }"
    >
      <DialogConfirmAction
        v-model="isShowingActionConfirmation"
        :action="currentAction"
        :count-selected="selectedItemsCount"
        @action-confirmed="onActionConfirmed"
      >
        <!-- Action Icon Slot -->
        <template
          #icon="{
            action,
            title,
            text,
            confirmText,
            cancelText,
          }"
        >
          <slot
            name="actionsIcon"
            v-bind="{
              action,
              title,
              text,
              confirmText,
              cancelText,
            }"
          />
        </template>
        <!-- Action Body/Default Slot -->
        <template
          #default="{
            action,
            title,
            text,
            confirmText,
            cancelText,
          }"
        >
          <slot
            name="actionBody"
            v-bind="{
              action,
              title,
              text,
              confirmText,
              cancelText,
            }"
          />
        </template>
      </DialogConfirmAction>
    </slot>
    <!-- Settings Modal -->
    <slot
      name="settingsDialog"
      v-bind="{
        isShowingSettings,
        userSettings,
        perPageOptions: datatable.perPageOptions,
        columns: columnsComputed,
      }"
    >
      <!-- Action Confirmation Modal -->
      <DialogSettings
        v-model="isShowingSettings"
        :user-settings="userSettings"
        :default-settings="userSettingsDefault"
        :per-page-options="datatable.perPageOptions"
        :columns="columnsComputed"
        @settings-reset="resetAllSettings"
      />
    </slot>

    <!-- Filters Modal -->
    <slot
      name="filtersDialog"
      v-bind="{
        isShowingFilters,
        userSettings,
        filters: datatable.filters,
      }"
    >
      <!-- Action Confirmation Modal -->
      <DialogFilters
        v-model="isShowingFilters"
        :user-settings="userSettings"
        :filters="datatable.filters"
        :configuration="datatable"
        @filters-reset="onFiltersReset"
        @filters-saved="onFiltersSaved"
      />
    </slot>
  </div>
</template>

<template>
  <div>
    <VanillaCard
      :title="datatable.translations.title"
      :subtitle="datatable.translations.subtitle"
    >
      <!-- Actions -->
      <template #actions>
        <!-- Bulk Actions -->
        <slot
          name="actions"
          v-bind="{actions,hasActions,hasAnyItemsSelected}"
        >
          <VanillaDatatableActions
            v-if="hasActions && hasAnyItemsSelected"
            :actions="actionsComputed"
            :text-actions="translations.actionsButton"
            :count-selected="selectedItemsCount"
            @action-selected="onActionSelected"
          >
            <template
              v-for="(action) in actionsComputed"
              :key="action.name"
              #[action.slotName]="{selectAction}"
            >
              <slot
                :name="action.slotName"
                :action="action"
                v-bind="{action, selectAction}"
              />
            </template>
          </VanillaDatatableActions>
        </slot>

        <!-- Filters-->
        <div
          v-if="hasFilters"
          class="inline-flex"
        >
          <VanillaButton
            @click="isShowingFilters = true"
          >
            <FilterIcon class="h-4 h-4 sm:mr-1" />
            <span class="hidden sm:block">{{ 'Filters' }}</span>
            <span
              v-if="filtersActiveCount > 0"
              class="ml-1 text-xxs"
            >( {{ filtersActiveCount }} )</span>
          </VanillaButton>
        </div>

        <!-- Table Settings -->
        <VanillaDropdown
          class="inline-flex"
        >
          <template #trigger>
            <VanillaButton>
              <DotsVerticalIcon class="h-4 w-4" />
            </VanillaButton>
          </template>

          <!-- Refresh -->
          <VanillaDropdownOption
            v-if="options.refreshable"
            @click="refresh"
          >
            <RefreshIcon
              class="h-4 h-4"
              :class="[isFetching ? 'animate-spin' : '']"
            />
            <span>{{ 'Refresh' }}</span>
          </VanillaDropdownOption>
          <VanillaDropdownOption @click="isShowingSettings = true">
            <CogIcon class="h-4 h-4" />
            <span>{{ 'Settings' }}</span>
          </VanillaDropdownOption>
        </VanillaDropdown>

        <!-- Table Config -->
      </template>

      <!-- Search Bar -->
      <VanillaDatatableSearch
        v-if="options.searchable && !hasAnyItemsSelected"
        v-model="queryData.search"
        :searchable="canSearch"
        :placeholder="translations.searchPlaceholder"
      />

      <!-- Current items selected -->
      <template v-if="hasAnyItemsSelected">
        <slot
          name="selection"
          v-bind="{
            isAllSelected: queryData.selectedAll,
            textSelectedRows: useReplacePlaceholders(translations.selectRows, {rows: selectedItemsCount}),
            textDeselect: useReplacePlaceholders(translations.selectedUndo),
            textOrSelectMatching: useReplacePlaceholders(translations.selectAllOr),
            textSelectMatching: useReplacePlaceholders(translations.selectAllMatching, {rows: results?.meta.total}),
            textDeselectMatching: useReplacePlaceholders(translations.selectAllMatchingUndo, {rows: results?.meta.total}),
            deselectAll: deselectAllItems,
            selectMatching: toggleSelectAll,
            deselectMatching: toggleSelectAll,
          }"
        >
          <VanillaDatatableSelectionBar
            :is-all-selected="queryData.selectedAll"
            :text-selected-rows="useReplacePlaceholders(translations.selectRows, {rows: selectedItemsCount})"
            :text-deselect="useReplacePlaceholders(translations.selectedUndo)"
            :text-or-select-matching="useReplacePlaceholders(translations.selectAllOr)"
            :text-select-matching="useReplacePlaceholders(translations.selectAllMatching, {rows: results?.meta.total})"
            :text-deselect-matching="useReplacePlaceholders(translations.selectAllMatchingUndo, {rows: results?.meta.total})"
            @deselect-all="deselectAllItems"
            @select-matching="toggleSelectAll"
            @deselect-matching="toggleSelectAll"
          />
        </slot>
      </template>

      <!-- Actual Table -->
      <div class="datatable overflow-x-auto border-t dark:border-gray-700">
        <!-- Table -->
        <table
          v-if="results.data.length > 0 || isFetching"
          class="min-w-full m-0 table-auto"
        >
          <!-- Table Head -->
          <slot
            name="header"
            v-bind="{
              datatable,
              isFetching,
              isAllItemsInPageSelected,
              hasAnyItemsSelectedForCurrentPage,
              selectAllItemsInPage,
              columns
            }"
          >
            <VanillaDatatableHead
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
          <template v-if="isFetching">
            <slot
              name="skeleton"
              v-bind="{
                isFetching,
                columnsCount: visibleColumnsCount,
                rowsCount: results.data.length || queryData.perPage
              }"
            >
              <VanillaDatatableRowSkeleton

                :number-of-columns="visibleColumnsCount"
                :number-of-rows="results.data.length || queryData.perPage"
              />
            </slot>
          </template>

          <!-- Table Body -->
          <tbody
            v-if="!isFetching && results.data.length > 0"
            class="divide-y bg-gray-50 dark:bg-gray-800"
          >
            <!-- Each record Main loop -->
            <tr
              v-for="(result) in results.data"
              :key="result.id"
            >
              <!-- Checkbox is not slotable -->
              <td
                v-if="options.selectable"
                class="px-6 py-3 text-sm w-[10px]"
              >
                <input
                  :checked="isRowSelected(result)"
                  class="block transition duration-150 ease-in-out checked:bg-indigo-600 checked:text-white dark:focus:ring-offset-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:checked:bg-indigo-600 h-4 w-4"
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
                  selected: isRowSelected(result)
                }"
              >
                <td
                  v-for="(column) in columnsComputed"
                  v-show="true"
                  :key="column.name"
                  class="whitespace-nowrap py-2 text-sm text-gray-500 dark:text-white"
                >
                  <!-- Slot for the row -->
                  <slot
                    :name="column.slotName"
                    v-bind="{
                      column: column,
                      result: result[column.name],
                      resultRaw: result,
                    }"
                  >
                    <div
                      v-if="column.raw && !column.component"
                      v-html="result[column.name]"
                    />
                    <div v-else-if="!column.raw">
                      {{ result[column.name] }}
                    </div>
                    <div v-else-if="column.component && column.component !== ''">
                      Its a component, inject v-runtime template
                    </div>
                  </slot>
                </td>
              </slot>
            </tr>
          </tbody>
        </table>
      </div>

      <slot name="pagination">
        <!-- Pagination -->
        <VanillaDatatablePagination
          :is-fetching="isFetching"
          :pages="results.links?.pages"
          :next-page="results.links?.next"
          :previous-page="results.links?.previous"
          :current-page="results.meta?.current_page"
          :showing-from="results.meta?.from"
          :showing-to="results.meta?.to"
          :total="results.meta?.total"
          :text-number-of-results="useReplacePlaceholders(translations.showingFrom,{
            from: results.meta?.from,
            to: results.meta?.to,
            total: results.meta?.total
          })"
          :text-next="translations.nextPage"
          :text-previous="translations.previousPage"
        />
      </slot>
    </VanillaCard>

    <!-- Action Confirmation Modal -->
    <slot
      name="actionsDialog"
      v-bind="{
        isShowingActionConfirmation,
        currentAction,
        selectedItemsCount,
        translations,
        onActionConfirmed
      }"
    >
      <VanillaDatatableDialogConfirmAction
        v-model="isShowingActionConfirmation"
        :action="currentAction"
        :count-selected="selectedItemsCount"
        :text-title="translations.actionConfirmTitle"
        :text-confirm-action-text="translations.actionConfirmText"
        :text-confirm-action-button="translations.actionConfirmButton"
        :text-cancel-action-button="translations.actionCancelButton"
        @action-confirmed="onActionConfirmed"
      />
    </slot>

    <!-- Settings Modal -->
    <slot
      name="settingsDialog"
      v-bind="{}"
    >
      <!-- Action Confirmation Modal -->
      <VanillaDatatableDialogSettings
        v-model="isShowingSettings"
        :action="currentAction"
        :count-selected="selectedItemsCount"
        :text-title="translations.actionConfirmTitle"
        :text-confirm-action-text="translations.actionConfirmText"
        :text-confirm-action-button="translations.actionConfirmButton"
        :text-cancel-action-button="translations.actionCancelButton"
        @action-confirmed="onActionConfirmed"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    provide,
    PropType,
    reactive,
    computed,
    onMounted,
    onUnmounted,
    watch,
    Ref,
} from 'vue';

import {
    useBootVariant,
    useVariantProps,
    useConfigurationWithClassesList,
    useDynamicSlots,
    useReplacePlaceholders,
    firstOf,
} from '@/core';

import {
    VanillaDatatableProps,
    VanillaDatatableClassesKeys,
    VanillaDatatableConfig,
} from './index';

import {
    useValidator,
    useConfigurationBuilder,
    useFetchData,
} from './Utils';

import {
    VanillaCard,
    VanillaDropdown,
    VanillaDropdownOption,
    VanillaButton,
} from '@/index';

import {
    DotsVerticalIcon,
    CogIcon,
} from '@heroicons/vue/solid';

import {
    FilterIcon,
    RefreshIcon,
} from '@heroicons/vue/outline';

import VanillaDatatableHead from './Partials/DatatableHead.vue';
import VanillaDatatableRowSkeleton from './Partials/DatatableRowSkeleton.vue';
import VanillaDatatableSearch from './Partials/DatatableSearch.vue';
import VanillaDatatableSelectionBar from './Partials/DatatableSelectionBar.vue';
import VanillaDatatablePagination from './Partials/DatatablePagination.vue';
import VanillaDatatableActions from './Partials/DatatableActions.vue';
import VanillaDatatableDialogConfirmAction from './Partials/DatatableDialogConfirmAction.vue';
import VanillaDatatableDialogSettings from './Partials/DatatableDialogSettings.vue';

import each from 'lodash/each';
import find from 'lodash/find';
import xor from 'lodash/xor';

export default defineComponent({
    name: 'VanillaDatatable',
    components: {
        VanillaDatatableHead,
        VanillaDatatableRowSkeleton,
        VanillaDatatableSearch,
        VanillaDatatableSelectionBar,
        VanillaDatatablePagination,
        VanillaDatatableActions,
        VanillaDatatableDialogConfirmAction,
        VanillaDatatableDialogSettings,
        VanillaCard,
        VanillaDropdown,
        VanillaDropdownOption,
        VanillaButton,
        FilterIcon,
        RefreshIcon,
        DotsVerticalIcon,
        CogIcon,
    },
    inheritAttrs: true,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaDatatableProps>(),
        config: {
            type: [Object] as PropType<any>,
            required: false,
            default(){
                return {};
            },
        },
        uniqueName: {
            type: [String] as PropType<string>,
            required: true,
        },
        primaryKey: {
            type: [String] as PropType<string>,
            required: false,
            default: 'id',
        },
        columns: {
            type: [Array, Object] as PropType<any>,
            required: true,
        },
        options: {
            type: [Object] as PropType<any>,
            required: true,
        },
        actions: {
            type: [Array, Object] as PropType<any>,
            default(){
                return [];
            },
        },
        filters: {
            type: [Array, Object] as PropType<any>,
            default(){
                return [];
            },
        },
        perPageOptions: {
            type: [Array, Object] as PropType<any>,
            default(){
                return [];
            },
        },
        translations: {
            type: [Object] as PropType<any>,
            required: true,
        },
        fetchData: {
            type: [Function, undefined] as PropType<any | undefined>,
            required: false,
            default: undefined,
        },
        fetchEndpoint: {
            type: [String] as PropType<string | undefined>,
            required: false,
            default: undefined,
        },
        fetchMethod: {
            type: [String] as PropType<string>,
            required: false,
            default: 'POST',
            validator(method: string){
                return ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
            },
        },
        actionsEndpoint: {
            type: [String, undefined] as PropType<string | undefined>,
            required: false,
            default: undefined,
        },
        actionsMethod: {
            type: [String] as PropType<string>,
            required: false,
            default: 'POST',
            validator(method: string){
                return ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
            },
        },
    },
    setup(props) {

        // ----- Start the Variant -----  //
        const { localVariant } = useBootVariant(props, 'errors', ref(null));
        const { configuration } = useConfigurationWithClassesList<VanillaDatatableProps>(VanillaDatatableConfig, VanillaDatatableClassesKeys, localVariant);

        // ---------------------------- //
        // ----- Boot Config & Validate -----  //
        // ---------------------------- //
        const datatable = reactive(useConfigurationBuilder(props));

        // Validate the data
        useValidator(datatable);

        //console.log('Configuration Booted', datatable);

        // ---------------------------- //
        // ----- Reactive Data -----  //
        // ---------------------------- //

        /** Stores if table is currently fetching */
        const isFetching = ref(false);

        /** Stores if it's currently showing filters */
        const isShowingFilters = ref(false);

        /** Stores if it's currently showing the action confirmation */
        const isShowingActionConfirmation = ref(false);

        /** Stores if it's currently showing the table settings modal */
        const isShowingSettings = ref(false);

        /** Stores if table is currently fetching */
        const results = reactive({
            data: [],
            links: {},
            meta: {},
            responses: {},
        });

        /** Stores the current hash of the API Response */
        const resultsHash = ref(undefined) as Ref<undefined | string>;

        /** Stores the current hidden columns
         TODO: Might not be necessary
         **/
        const columnsHidden = ref([]) as Ref<undefined | string[]>;

        /** Stores the current action object that was selected */
        const currentAction = ref(undefined) as Ref<undefined | object>;

        /** Stores the current search query */
        const searchQuery = ref(undefined) as Ref<undefined | string>;

        /** Stores the pooling interval */
        const poolingInterval = ref(undefined) as Ref<undefined | number>;

        /** Query Data being passed to the server */
        const queryData = reactive({
            search: null,
            perPage: datatable?.perPageOptions[0]?.value || 5,
            page: 1,
            selected: [],
            selectedAll: false,
            filters: [],
            sorting: [{ column: 'id', direction: 'desc' }],
            //sorting: null,
        });

        /** POST data being sent when an action is sent */
        const actionsData = reactive({
            action: null,
            ...queryData,
        });

        /** Actual function to perform the request */
        const fetchData: Promise<any> = datatable?.fetchData || useFetchData;

        // ---------------------------- //
        // ----- Computed Data -----  //
        // ---------------------------- //

        /** Current Ids being shown on hte page */
        const currentPageIds = computed(() => results.data.map(item => item.id) || []);

        /** If there is currently selected items on the config */
        const hasAnyItemsSelected = computed(() => queryData.selectedAll || queryData.selected.length > 0);

        /** Returns if the user configured any filters */
        const hasFilters = computed(() => datatable.filters.length > 0);

        /** Returns if the user configured any actions */
        const hasActions = computed(() => datatable.actions.length > 0);

        /** Returns the current count of visible columns, excluding the hidden ones and the select column */
        const visibleColumnsCount = computed(() => datatable.columns.length + (datatable.options.selectable ? 1 : 0) - (columnsHidden.value.length || 0));

        /** Returns the number of items selected, in case all is selected, we return the total number of rows matching */
        const selectedItemsCount = computed(() => queryData.selectedAll ? results?.meta.total : queryData.selected.length);

        /** Formatted Count of the selected items
         * TODO : Format the actual number
         **/
        const selectedItemsCountFormatted = computed(() => selectedItemsCount.value);

        /** Checks if the user can search on the table, if its searched, not currently fetching, and no items are selected */
        const canSearch = computed(() => datatable.options.searchable && !isFetching.value && !hasAnyItemsSelected.value);

        /** Boolean that returns if the check all checkbox should be checked, it means select all is selected and the current page of items is all selected  */
        const isSelectAllChecked = computed(() => queryData.selectedAll || xor(queryData.selected, currentPageIds.value).length <= 0);

        /** Boolean that returns if the check all checkbox should be checked, it means select all is selected and the current page of items is all selected  */
        const isAllItemsInPageSelected = computed(() => queryData.selectedAll || currentPageIds.value.every(id => queryData.selected.includes(id)));

        /** Boolean that returns if the check all checkbox should be checked, it means select all is selected and the current page of items is all selected  */
        const hasAnyItemsSelectedForCurrentPage = computed(() => queryData.selected.some(id => currentPageIds.value.indexOf(id) >= 0));

        /** Returns how the number of filters currently applied */
        const filtersActiveCount = computed(() => Object.keys(queryData.filters.length));

        /** Returns the current filters applied with default value & normalized */
        const filtersActive = computed(() => {
            // Returns the active filters on form mapped to filters object
            let activeFiltersObject = [];
            each(queryData.filters, (value, filter) => {

                // attempt to find the filter
                let filterFound = find(queryData.filters, { 'name': filter });

                if (value !== null && value !== '' && filterFound){

                    // Ensure we still set the original value
                    filterFound.value = value;

                    // Ensure we resolve the value from options
                    if (filterFound?.options && filterFound.options[value]){
                        filterFound.value_resolved = filterFound.options[value];
                    } else {
                        filterFound.value_resolved = value;
                    }
                    activeFiltersObject.push(filterFound);
                }
            });

            return activeFiltersObject;
        });

        /**
         * Map the columns, so we can include if the column is visible or not
         * if it's sorted or not and so on, so we dont need to evaluate it each time we need.
         **/
        const columnsComputed = computed(() => {
            return props.columns.map((column) => {
                return {
                    ...column,
                    visible: !columnsHidden.value.includes(column.name),
                    isSorted: queryData.sorting.some(c => c.column === column.name),
                    isSortedAsc: queryData.sorting.some(c => c.column === column.name && c.direction === 'asc'),
                    isSortedDesc: queryData.sorting.some(c => c.column === column.name && c.direction === 'desc'),
                    slotName: useDynamicSlots('row', column.name),
                };
            });
        });

        const actionsComputed = computed(() => {
            return props.actions.map((action) => {
                return {
                    ...action,
                    slotName: useDynamicSlots('action', action.name),
                };
            });
        });


        // ---------------------------- //
        // ----- Methods -----  //
        // ---------------------------- //

        /** Resets the sorting  */
        const resetSorting = () => {
            // TODO : Check this to reset link
            queryData.sorting = [];
        };

        /** Resets the per page items  */
        const resetPerPageItems = () => {
            queryData.perPage = firstOf(datatable.options.perPageOptions).value || 5;
            // TODO : Check this to reset link
        };

        /** Resets the search query  */
        const resetSearchQuery = () => {
            queryData.search = null;
        };

        /** Resets a specific filter by name  */
        const resetFilter = (filter: object) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            queryData.filters[filter.name] = null;
            //queryData.filters = omit(queryData.filters, [filter.name]);
        };

        /** Reset all filters  */
        const resetAllFilters = (refresh = true) => {
            queryData.filters = [];
            // TODO: call this only if refresh is true
        };

        /** Resets all hidden columns  */
        const resetHiddenColumns = () => {
            columnsHidden.value = [];
        };

        /** Reset all settings  */
        const resetAllSettings = () => {
            resetPerPageItems();
            resetHiddenColumns();
            // TODO: Update the storage items
        };

        /** ResetThe current action  */
        const resetAction = () => {
            isShowingActionConfirmation.value = false;
            currentAction.value = undefined;
        };

        /**
         * Function to select a single row/item
         * - Only selects if item is not yet selected
         * - If the item is selected it will deselect it
         * - Disables the select all checkbox if all items are selected
         **/
        const selectItem = (item: any, uncheckIfChecked = true) => {

            // If everything was checked, remove it.
            queryData.selectedAll = false;

            // If the ID is not yet selected, select it
            let itemKey = item[datatable.primaryKey];
            if (!queryData.selected.includes(itemKey)) {
                return queryData.selected.push(itemKey);
            }

            // If we should untoggle if its already selected then do it.
            if (uncheckIfChecked){
                const index = queryData.selected.indexOf(itemKey);
                if (index > -1) {
                    return queryData.selected.splice(index, 1);
                }
            }
        };

        /**
         * Check if a given row is selected
         **/
        const isRowSelected = (item: object) => {
            return queryData.selectedAll || queryData.selected.indexOf(item[datatable.primaryKey]) > -1;
        };

        /** Deselect all the items in the current page  */
        const deselectAllItemsInPage = () => {
            each(currentPageIds.value, item => {
                const index = queryData.selected.indexOf(item);
                if (index > -1) {
                    return queryData.selected.splice(index, 1);
                }
            });
        };

        /** Deselect all the items in all pages */
        const deselectAllItems = () => {
            queryData.selected = [];
            queryData.selectedAll = false;
        };

        /**
         * Select all items in the current page ( visible )
         * - Deselects All if it was checked
         **/
        const selectAllItemsInPage = () => {
            // Ensure we toggle back the all checked
            queryData.selectedAll = false;

            if (isAllItemsInPageSelected.value) {
                deselectAllItemsInPage();
                return;
            }

            // Select all items being displayed
            each(results.data, (item) => {
                selectItem(item, false);
            });
        };

        /** Toggles the select all matching feature on/off */
        const toggleSelectAll = () => {
            queryData.selectedAll = !queryData.selectedAll;
        };

        /** Wrapper for the main call to the server, so we can perform additional stuff */
        const fetchFromServer = () => {
            isFetching.value = true;
            return fetchData(datatable, queryData)
                // Resolve
                .then((response: object) => {
                    results.data = response?.data;
                    results.links = response?.links;
                    results.meta = response?.meta;
                    results.responses = response?.meta;
                })
                // Catch Errors
                .catch((error: object) => {
                    console.log('Error happened');
                    console.log(error);
                })
                // Finally
                .then(() => {
                    isFetching.value = false;
                    resetAction();
                });
        };

        /** Refresh the datatable */
        const refresh = () => {
            if (!isFetching.value){
                fetchFromServer();
            }
        };

        /**
         * Starts a table pool until a certain condition is met.
         * Configurable to :
         * - Pool every X Seconds
         * - During X Time
         * - Stop when hash of the data changed
         */
        const poolUntil = (enable = false, every = 20, during = 120, stopWhenChanged = true) => {

            if (!enable) {
                return;
            }

            let started = Date.now();
            let initialItemsHash = resultsHash.value;

            poolingInterval.value = setInterval(() => {
                let timeExpired = Date.now() - started > (during * 1000);
                let hashChanged = initialItemsHash !== resultsHash.value;
                if (timeExpired || (hashChanged && stopWhenChanged)) {
                    clearInterval(poolingInterval.value);
                } else {
                    refresh();
                }
            }, every * 1000);
        };

        /** Pool but forever */
        const poolForever = (enable = false, every = 20) => {
            if (!enable) {
                return;
            }
            poolingInterval.value = setInterval(() => { refresh();}, every * 1000);
        };

        /**
         * Execute the actual action
         **/
        const executeAction = (action: object) => {

            // No permission to execute the action
            if (!action.permissions.execute) {
                return;
            }

            if (action?.before?.callback !== null){
                action.before.callback(action);
            }

            // Assign to action data & send
            actionsData.action = action.name;

            // Stuff to execute after the action
            const afterActionCallback = () => {
                // Reset the selected items if it was defined on the action scope
                if (action?.after?.clearSelected){
                    deselectAllItems();
                }

                // Clear all the filters in case it was defined on the action scope
                if (action?.after?.resetFilters){
                    resetAllFilters(false);
                }

                // Clear all the filters in case it was defined on the action scope
                if (action?.after?.callback !== null) {
                    action.after.callback(action);
                }

                // If we need to pull data after an action has been started
                if (
                    action?.after?.pooling &&
                    action?.after?.pooling?.enable &&
                    action?.after?.pooling?.during > 0
                ) {
                    poolUntil(
                        action?.after?.pooling?.enable,
                        action?.after?.pooling?.interval,
                        action?.after?.pooling?.during,
                        action?.after?.pooling?.stopWhenDataChanges,
                    );
                }
            };

            // Execute the action
            fetchFromServer().then(afterActionCallback);
        };

        /** Sanitize the Primary key and convert from string to integer  */
        const sanitizePrimaryKey = (str: string) => {
            return parseInt(str.toString().replace(/\D/g, ''));
        };

        /**
         * On sorting updated, we will update the query data with the new sorting
         **/
        const onSortingUpdated = (sorting: never) => {
            queryData.sorting = sorting;
        };

        /**
         * On action selected, we will check if requires confirmation
         * - If it does, we will show the confirmation modal
         **/
        const onActionSelected = (action: object) => {
            if (action.before.confirm.enable) {
                isShowingActionConfirmation.value = true;
                currentAction.value = action;
                return;
            }
            return executeAction(action);
        };

        /**
         * On action selected, check if has permissions, its confirmed, etc
         **/
        const onActionConfirmed = (action: object) => {
            return executeAction(action);
        };

        /**
         * On Mounted, execute the stack
         **/
        onMounted(() => {
            // Fetch the first page
            if (props?.pooling?.enable && props?.pooling?.interval > 0) {
                fetchFromServer()
                    .then(() => {
                        poolForever(
                            props?.pooling?.enable,
                            props?.pooling?.interval,
                        );
                    });
            } else {
                fetchFromServer();
            }
        });

        /**
         * On Unmounted, clear the pooling interval
         **/
        onUnmounted(() => {
            clearInterval(poolingInterval.value);
        });

        watch(queryData, (value) => {
            console.log('Changed Query Data', value);
            //fetchFromServer();
        });

        // ----- Actual props to share -----  //
        const sharing =  {
            // Configuration
            configuration,
            localVariant,
            props,
            datatable,

            // Reactive / Refs
            isFetching,
            isShowingFilters,
            isShowingSettings,
            isShowingActionConfirmation,
            queryData,
            currentAction,

            // Computed
            hasAnyItemsSelected,
            hasActions,
            hasFilters,
            filtersActiveCount,
            canSearch,
            visibleColumnsCount,
            isAllItemsInPageSelected,
            hasAnyItemsSelectedForCurrentPage,
            columnsComputed,
            actionsComputed,
            selectedItemsCount,
            selectedItemsCountFormatted,

            // Functions & Helpers
            selectAllItemsInPage,
            isRowSelected,
            selectItem,
            onSortingUpdated,
            onActionSelected,
            onActionConfirmed,
            deselectAllItems,
            toggleSelectAll,
            useReplacePlaceholders,
            useDynamicSlots,
            refresh,
        };


        // ----- Provide data to sub components -----  //
        provide('configuration_vanilla', configuration);

        // ----- Provide data to sub components -----  //
        provide('datatable_configuration', sharing);

        return {
            ...sharing,
            // Data from API
            results,
        };
    },
});
</script>

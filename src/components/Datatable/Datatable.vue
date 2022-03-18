<template>
  <div>
    <VanillaCard
      :title="datatable.translations.title"
      :subtitle="datatable.translations.subtitle"
    >
      <div class="datatable overflow-x-auto border-t dark:border-gray-700">
        <!-- Table -->
        <table
          v-if="results.data.length > 0 || isFetching"
          class="min-w-full m-0 table-auto"
        >
          <!-- Table Head -->
          <thead>
            <tr>
              <!-- Toggle All/None Checked -->
              <th
                v-if="datatable.options.selectable"
                class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap dark:bg-gray-700"
              >
                <input
                  :checked="isAllItemsInPageSelected && !isFetching"
                  :disabled="isFetching"
                  :indeterminate="!isAllItemsInPageSelected && hasAnyItemsSelectedForCurrentPage && !isFetching"
                  class="block transition duration-150 ease-in-out checked:bg-indigo-600 checked:text-white dark:focus:ring-offset-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:checked:bg-indigo-600 h-4 w-4"
                  type="checkbox"
                  @change="selectAllItemsInPage"
                >
              </th>
              <!-- Header Column Render -->
              <th
                v-for="(column) in datatable.columns"
                v-show="true"
                :key="column.name"
                class="bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap dark:bg-gray-700 dark:text-white"
              >
                <!-- Is Sortable -->
                {{ column.label }}
              </th>
            </tr>
          </thead>


          <!-- Table Body -->
          <tbody
            v-if="!isFetching && results.data.length > 0"
            class="divide-y bg-gray-50 dark:bg-gray-800"
          >
            <tr
              v-for="(item) in results.data"
              :key="item.id"
            >
              <!-- Row Checkbox -->
              <td
                v-if="options.selectable"
                class="px-6 py-4 whitespace-nowrap text-sm leading-5 font-medium text-gray-900 w-[10px]"
              >
                <input
                  :checked="isRowSelected(item)"
                  class="block transition duration-150 ease-in-out checked:bg-indigo-600 checked:text-white dark:focus:ring-offset-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:checked:bg-indigo-600 h-4 w-4"
                  type="checkbox"
                  @change="selectItem(item)"
                >
              </td>

              <!-- Row Loop -->
              <td
                v-for="(column) in columns"
                v-show="true"
                :key="column.name"
                class="whitespace-nowrap text-sm leading-5 text-gray-500 dark:text-white"
              >
                <div
                  v-if="column.raw && !column.component"
                  v-html="item[column.name]"
                />
                <div v-else-if="!column.raw">
                  {{ item[column.name] }}
                </div>
                <div v-else-if="column.component && column.component !== ''">
                  Its a component
                </div>
              </td>
              <!-- End Row Loop -->
            </tr>
          </tbody>
        </table>
      </div>
    </vanillacard>
  </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    provide,
    PropType,
    reactive,
    computed, onMounted, watch,
} from 'vue';

import {
    useBootVariant,
    useVariantProps,
    useConfigurationWithClassesList,
    firstOf,
} from '@/core';

import {
    VanillaDatatableProps,
    VanillaDatatableClassesKeys,
    VanillaDatatableConfig,
    VanillaDatatableActions,
    VanillaDatatableColumns,
} from './index';

import {
    useValidator,
    useConfigurationBuilder,
    useFetchData,
} from './Utils';

import {
    VanillaCard,
    VanillaButton,
    VanillaDropdown,
    VanillaDropdownOption,
} from '@/index';

import { ChevronDownIcon } from '@heroicons/vue/solid';

import each from 'lodash/each';
import find from 'lodash/find';
import xor from 'lodash/xor';
import omit from 'lodash/omit';

export default defineComponent({
    name: 'VanillaDatatable',
    components: {
        VanillaButton,
        VanillaCard,
        VanillaDropdown,
        ChevronDownIcon,
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
            default: 'GET',
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
        useValidator(datatable);

        console.log('Configuration Booted', datatable);

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
        const resultsHash = ref(null);

        /** Stores the current hidden columns
         TODO: Might not be necessary
         **/
        const columnsHidden = ref([]);

        /** Stores the current action object that was selected */
        const currentAction = ref(null);

        /** Stores the current search query */
        const searchQuery = ref(null);

        /** Stores the pooling interval */
        const poolingInterval = ref(null);

        /** Query Data being passed to the server */
        const queryData = reactive({
            search: null,
            perPage: datatable?.perPageOptions[0]?.value || 5,
            page: 1,
            selected: [],
            selectedAll: false,
            filters: [],
            sorting: [],
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
            currentAction.value = null;
        };

        /** Sanitize the Primary key and convert from string to integer  */
        const sanitizePrimaryKey = (str: string) => {
            return parseInt(str.toString().replace(/\D/g, ''));
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

        onMounted(() => {
            fetchFromServer();
        });

        watch(queryData, (value) => {
            console.log('Changed Query Data', value);
        });


        // ----- Provide data to sub components -----  //
        provide('configuration_vanilla', configuration);

        return {
            // Configuration
            configuration,
            localVariant,
            props,
            datatable,
            // Data from API
            results,

            // Reactive / Refs
            isFetching,

            // Computed
            isAllItemsInPageSelected,
            hasAnyItemsSelectedForCurrentPage,

            // Functions & Helpers
            selectAllItemsInPage,
            isRowSelected,
            selectItem,
        };
    },
});
</script>

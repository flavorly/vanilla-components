<template>
  <div>
    <x-card
      :subtitle="labels.subtitle"
      :title="labels.title"
    >
      <!-- Card / Table Actions -->
      <template #actions>
        <!-- Actions-->
        <div
          v-if="hasActions && hasItemsSelected"
          class="mr-1 inline-flex"
        >
          <x-dropdown
            align="left"
            class="relative"
          >
            <template #trigger>
              <button-primary type="button">
                {{ $t('datatables.actions-button') }}
                <span class="ml-1 text-xxs text-white xxs:hidden">( {{ countSelectedRows }} )</span>
                <icon name="chevron-down" />
              </button-primary>
            </template>

            <div
              class="dropdown-label"
              v-html="$t('datatables.items-selected',{count: countSelectedRows})"
            />
            <div
              v-for="(action) in actions"
              :key="action.name"
            >
              <a
                v-if="action.type !== 'divider' || action.permissions.see"
                :class="{
                  'cursor-pointer': !loading,
                  'cursor-not-allowed': loading || !action.permissions.execute
                }"
                class="dropdown-item"
                role="menuitem"
                @click.prevent="performAction(action)"
                v-html="action.label"
              />
              <!-- Divider -->
              <div
                v-else
                class="border-t border-gray-100 dark:border-gray-700"
              />
            </div>
          </x-dropdown>
        </div>

        <!-- Filters -->
        <div
          v-if="hasFilters"
          class="mr-1 inline-flex"
        >
          <button-secondary
            type="button"
            @click="showFilters = true"
          >
            <i class="fal fa-filter mr-1" />
            <span class="hidden md:block">{{ $t('datatables.filter') }}</span>
            <span
              v-if="countActiveFilters > 0"
              class="ml-1 text-xxs"
            >( {{ countActiveFilters }} )</span>
          </button-secondary>
        </div>

        <!-- Refresh -->
        <div
          v-if="options.refreshable"
          class="mr-1 inline-flex"
        >
          <button-secondary
            type="button"
            @click="performRefresh"
          >
            <i
              :class="{'animate-spin': loading}"
              class="fal fa-sync"
            />
          </button-secondary>
        </div>

        <!-- Settings-->
        <div
          v-if="options.showSettings"
          class="inline-flex"
        >
          <button-secondary
            type="button"
            @click="showingTableSettings = true"
          >
            <i class="fal fa-cog" />
          </button-secondary>
        </div>
      </template>

      <!-- Search Bar -->
      <div
        v-if="options.searchable && !hasItemsSelected"
        class="px-5 mt-3 mb-3"
      >
        <div>
          <label class="sr-only">{{ $t('generic.search') }}</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <icon name="search" />
            </div>
            <x-input-text
              ref="search"
              v-model="searchQuery"
              name="search"
              :class="{'cursor-not-allowed': !canSearch}"
              :disabled="!canSearch"
              :placeholder="$t('datatables.search-placeholder')"
              class="search"
              type="search"
              layout="naked"
            />
          </div>
        </div>
      </div>

      <!-- Items selected Information -->
      <div
        v-if="hasItemsSelected"
        class="bg-indigo-100 dark:bg-indigo-500"
      >
        <div class="px-4 sm:px-8 py-3 flex items-center">
          <div class="flex items-center">
            <div class="flex">
              <div class="text-center text-sm text-indigo-900 dark:text-white space-x-1 space-y-1 sm:space-y-0">
                <span v-html="$t('datatables.select-all-text',{count: countSelectedRowsFormatted})" />
                <a
                  class="table-selected-action"
                  tabindex="0"
                  @click="resetSelected"
                  v-html="$t('datatables.select-deselect-all')"
                />
                <span
                  class="hidden sm:inline mx-1"
                  v-html="$t('datatables.select-all-or')"
                />
                <a
                  v-if="!form.allChecked"
                  class="table-selected-action"
                  tabindex="0"
                  @click="toggleSelectAllMatching"
                  v-html="$t('datatables.select-select-all-matching',{count: countTotalItemsFormatted})"
                />
                <a
                  v-if="form.allChecked"
                  class="table-selected-action"
                  tabindex="0"
                  @click="toggleSelectAllMatching"
                  v-html="$t('datatables.select-select-all-matching-undo',{count: countTotalItemsFormatted})"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Filters Bar -->
      <div
        v-if="hasFilters && countActiveFilters > 0"
        class="mt-2 px-5 mt-3 mb-3"
      >
        <div class="flex items-center space-x-1">
          <span class="text-xs">Filters: </span>
          <div class="flex items-center space-x-1">
            <x-datatable-filter-item
              v-for="filter in activeFilters"
              :key="filter.name+''+filter.value"
              :filter="filter"
              :value="filter.value"
              @click="resetFilter(filter)"
            />
          </div>
        </div>
      </div>

      <!-- Table Begin -->
      <div class="datatable overflow-x-auto border-t dark:border-gray-700">
        <!-- Table Empty / No results -->
        <div v-if="!loading && items.length <= 0">
          <div class="flex items-center justify-center text-center bg-gray-50 px-6 py-8 dark:bg-gray-800">
            <!-- Empty due to searching or filtering -->
            <slot
              v-if="form.search !== null || Object.keys(form.filters).length > 0"
              v-bind="{resetFilters,resetSearch,resetFiltersAndSearch}"
              name="no-results"
            >
              <div class="text-sm w-full">
                <i class="fal fa-ufo fa-7x card-empty-icon" />
                <h3 class="text-small mb-3 mt-3">
                  {{ $t('datatables.empty-with-filters') }}
                </h3>
                <button-primary @click="resetFiltersAndSearch">
                  <i class="fal fa-undo-alt mr-1" />
                  {{ $t('generic.reset') }}
                </button-primary>
              </div>
            </slot>

            <!-- Empty due to no items at all -->
            <slot
              v-else
              v-bind="{ resetFilters, resetSearch, resetFiltersAndSearch, form }"
              name="empty"
            >
              <div class="text-sm w-full">
                <i class="fal fa-radar fa-7x card-empty-icon" />
                <h3 class="text-small mb-3 mt-3">
                  {{ $t('datatables.empty-records') }}
                </h3>
              </div>
            </slot>
          </div>
        </div>

        <!-- Table -->
        <table
          v-if="items.length > 0 || loading"
          :class="{ 'divide-gray-200': !$dark,'divide-gray-750': $dark}"
          class="min-w-full divide-y"
        >
          <!-- Table Head -->
          <thead>
            <tr>
              <!-- Toggle All/None Checked -->
              <th
                v-if="options.selectable"
                class="table-header-checkbox"
              >
                <input
                  :checked="isCurrentPageChecked && !loading"
                  :disabled="loading"
                  :indeterminate="!isCurrentPageChecked && isSomeItemCheckedOnPage && !loading"
                  class="form-checkbox table-row-checkbox-input"
                  type="checkbox"
                  @change="toggleItemsInPage"
                >
              </th>
              <!-- Header Column Render -->
              <th
                v-for="(column) in columns"
                v-show="!hiddenColumns.includes(column.name)"
                :key="column.name"
                :class="[styleCompact,column.classes.head]"
                class="table-header-column"
              >
                <!-- Is Sortable -->
                <x-datatable-sorting
                  v-if="column.sortable"
                  :column="column"
                  :direction="form.orderByDirection"
                  :field="form.orderByField"
                  :loading="loading"
                  :name="column.name"
                  @sort="onOrderByChanged"
                  @sortReset="resetOrderBy(form.orderByField)"
                >
                  {{ column.label }}
                </x-datatable-sorting>

                <!-- Is NOT Sortable -->
                <span v-else>
                  {{ column.label }}
                </span>
              </th>
            </tr>
          </thead>

          <!-- Table Body Loading -->
          <x-datatable-skeleton
            v-if="loading"
            :columns="countColumns"
            :loading="loading"
            :rows="items.length || form.perPage"
            :selectable="options.selectable"
          />

          <!-- Table Body -->
          <tbody
            v-if="!loading && items.length > 0"
            :class="{'divide-gray-200': !$dark,'divide-gray-750': $dark}"
            class="divide-y bg-gray-50 dark:bg-gray-800"
          >
            <tr
              v-for="(item) in items"
              :key="item.id"
              :class="styleCompact"
            >
              <!-- Row Checkbox -->
              <td
                v-if="options.selectable"
                class="table-row-checkbox"
              >
                <input
                  :checked="isRowSelected(item.id)"
                  class="form-checkbox table-row-checkbox-input"
                  type="checkbox"
                  @change="select(item)"
                >
              </td>

              <!-- Row Loop -->
              <td
                v-for="(column) in columns"
                v-show="!hiddenColumns.includes(column.name)"
                :key="column.name"
                :class="[styleCompact,column.classes.row]"
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
                  <v-runtime-template :template="item[column.name]" />
                </div>
              </td>
            <!-- End Row Loop -->
            </tr>
          </tbody>
        </table>
      </div>
      <!-- End Table -->

      <!-- Pagination -->
      <x-datatable-pagination
        :links="links"
        :loading="loading"
        :meta="meta"
        :show-number-of-items="options.showNumberOfItems"
        :show-pages="false"
        @navigate="navigateToPage"
      />
    </x-card>

    <!-- Actions -->
    <x-datatable-confirm-action
      v-if="actionSelected !== null"
      v-model="showActionConfirm"
      :action="actionSelected"
      :count="countSelectedRows"
      @actionConfirmed="onActionConfirmed"
      @actionDeclined="resetAction"
    />

    <!-- Filters -->
    <x-datatable-filter
      v-if="hasFilters"
      v-model="showFilters"
      :filters-applied="form.filters"
      :filters-available="filters"
      :table-name="name"
      @filtersSaved="onFiltersSaved"
      @reset="resetFilters"
    />

    <!-- Settings -->
    <x-datatable-settings
      v-if="options.showSettings"
      v-model="showingTableSettings"
      :columns="columns"
      :current-per-page="form.perPage"
      :hidden-columns="hiddenColumns"
      :per-page="perPageOptions"
      :use-local-storage="isStorageEnable()"
      @update:use-local-storage="onUpdateStorageSettings"
      @update:per-page="onUpdateItemsPerPage"
      @update:column-toggle="onColumnsUpdated"
      @reset="resetSettings"
    />
  </div>
</template>

<script>
import ButtonSecondary from '@/Components/Buttons/ButtonSecondary';
import ButtonPrimary from '@/Components/Buttons/ButtonPrimary';
import Icon from '@/Components/Shared/Icon';
import XInputText from '@/Components/Inputs/Text';
import VRuntimeTemplate from 'vue3-runtime-template';
import LaravelEcho from '@/Core/Plugins/LaravelEcho';
import has from 'lodash/has';
import each from 'lodash/each';
import debounce from 'lodash/debounce';
import xor from 'lodash/xor';
import omit from 'lodash/omit';
import find from 'lodash/find';
import { queryReset, firstOf, formatNumber, isSSR } from '@/Core/Utils';
import XDatatableConfirmAction from '@/Components/Datatable/ConfirmAction';
import XDatatableFilter from '@/Components/Datatable/Filters';
import XDatatableSkeleton from '@/Components/Datatable/Skeleton';
import XDatatableSettings from '@/Components/Datatable/Settings';
import XDatatableSorting from '@/Components/Datatable/Sorting';
import XDatatablePagination from '@/Components/Datatable/Pagination';
import XDropdown from '@/Components/Menus/Dropdown';
import XCard from '@/Components/Cards/Card';
import XDatatableFilterItem from '@/Components/Datatable/FilterItem';

export default {
    name: 'XDatatable',

    components: {
        XDatatableFilterItem,
        XCard,
        XDropdown,
        XDatatablePagination,
        XDatatableSorting,
        XDatatableSettings,
        XDatatableSkeleton,
        XDatatableFilter,
        XDatatableConfirmAction,
        XInputText,
        Icon,
        ButtonPrimary,
        ButtonSecondary,
        VRuntimeTemplate,
    },

    inject: ['useNotifications'],

    props: {
        config: {
            type: [Object, Array],
            required: true,
        },
    },

    data() {
        return {
            name: '',
            columns: [],
            endpoint: '',
            filters: [],
            actions: [],
            perPageOptions: () => {
                return [
                    { value: 5, text: this.$t('datatables.per-page', { x: 5 }) },
                    { value: 10, text: this.$t('datatables.per-page', { x: 10 }) },
                    { value: 20, text: this.$t('datatables.per-page', { x: 20 }) },
                    { value: 50, text: this.$t('datatables.per-page', { x: 50 }) },
                    { value: 100, text: this.$t('datatables.per-page', { x: 100 }) },
                ];
            },
            pooling: () => {
                return {
                    enable: false,
                    interval: 5,
                    during: 60,
                    stopWhenDataChanges: true,
                };
            },
            options: () => {
                return {
                    selectable: true,
                    searchable: true,
                    showSettings: true,
                    showNumberOfItems: true,
                    striped: false,
                    compact: true,
                    refreshable: true,
                };
            },
            labels: () => {
                return {
                    title: this.$t('datatables.generic-title'),
                    subtitle: this.$t('datatables.generic-subtitle'),
                    resource: this.$t('datatables.generic-resource'),
                    resources: this.$t('datatables.generic-resources'),
                };
            },

            loading: true,
            items: [], // Stores the items
            itemsHash: null, // Stores the data hash for quick cheksums
            links: [], // Stores Table Links
            meta: [], // Other meta data

            hiddenColumns: [], // Store the hidden columns if any
            link: this.config.endpoint,
            actionSelected: null, // Store the current action object
            searchQuery: null,
            poolingInterval: null, // Controls the pooling intreval

            // Show Hide Toggles
            showingTableSettings: false,
            showActionConfirm: false,
            showFilters: false,

            // Data that is posted
            form: {
                search: null,
                perPage: this.$props.config.perPageOptions[0].value,
                ids: [],
                allChecked: false,
                filters: [],
                orderByField: null,
                orderByDirection: 'desc',
                action: null,
            },
        };
    },

    computed: {

        /**
         * Returns the number of columns showing on the table
         * We take teh columns showing
         * If the table is selectable there is an additional leading column
         * We will then subtract the ones being hidden
         *
         * @returns {number}
         */
        countColumns() {
            return this.columns.length + (this.options.selectable ? 1 : 0) - (this.hiddenColumns.length || 0);
        },

        /**
         * Number of the selected rows
         * In case allChecked is true, we will return the meta.total
         * otherwise returns the count of the selected.
         *
         * @returns {number|*}
         */
        countSelectedRows() {
            if (this.form.allChecked){
                return this.meta.total;
            }
            return this.form.ids.length;
        },

        countSelectedRowsFormatted(){
            return formatNumber(this.countSelectedRows);
        },

        countTotalItemsFormatted(){
            return formatNumber(this.meta?.total || 0);
        },

        /**
         * Number of the active filters
         *
         * @returns {number}
         */
        countActiveFilters() {
            return Object.keys(this.form.filters).length;
        },

        /**
         * Returns the current active filters ( saved )
         * But returns the full object of the filter itself for the active filters
         * Because we only store the filters active as key => value pairs
         * this computed is useful for showing the labels
         *
         * @returns {*[]}
         */
        activeFilters(){
            // Returns the active filters on form mapped to filters object
            let activeFiltersObject = [];
            each(this.form.filters, (value, filter) => {

                // attempt to find the filter
                let filterFound = find(this.filters, { 'name': filter });

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
        },

        /**
         * Checks if the user can search
         * Datatable can not be loading and no items can be selected
         *
         * @returns {boolean}
         */
        canSearch() {
            return !this.hasItemsSelected && !this.loading;
        },

        /**
         * Checks if select all is checked
         * It checks if all is checked and then
         * ensures the different of the current page Ids Versus the selected ones
         *
         * @returns {boolean}
         */
        isSelectAllChecked() {
            return this.form.allChecked || xor(
                this.form.ids,
                this.currentPageIds,
            ).length <= 0;
        },

        /**
         * Checks if all items on the current page are checked
         * This is used to toggle the main checkbox to on when all is checked
         * Used also to perform other checks on the project
         *
         * @returns {boolean}
         */
        isCurrentPageChecked(){
            return this.form.allChecked || this.currentPageIds.every(v => this.form.ids.includes(v));
        },

        /**
         * Checks if some item on the page is checked
         * This is used for intermediate status checkbox
         *
         * @returns {boolean}
         */
        isSomeItemCheckedOnPage(){
            return this.form.ids.some(r=> this.currentPageIds.indexOf(r) >= 0);
        },

        /**
         * Get all the IDs on the current page
         *
         * @returns {*[]}
         */
        currentPageIds(){
            return this.items?.map(item => item.id) || [];
        },

        /**
         * Returns the default local storage settings
         *
         * @returns {{hiddenColumns: *[], selectedIds: *[], useLocalStorage: boolean, filters: *[]}}
         */
        defaultStorageSettings() {
            return {
                useLocalStorage: true,
                hiddenColumns: [],
                selectedIds: [],
                filters: [],
            };
        },

        /**
         * Get the classes when style is compact
         *
         * @returns {string}
         */
        styleCompact() {
            if (this.options.compact) {
                return 'px-2 py-2';
            }
            return 'px-6 py-4';
        },

        /**
         * Checks if any items are selected
         *
         * @returns {boolean}
         */
        hasItemsSelected() {
            return this.form.allChecked || this.form.ids.length > 0;
        },

        /**
         * Checks if Datatable has filters
         *
         * @returns {boolean}
         */
        hasFilters() {
            return this.filters.length > 0;
        },

        /**
         * Checks if datatable has actions
         * @returns {boolean}
         */
        hasActions() {
            return this.actions.length > 0;
        },
    },

    watch: {
        'searchQuery': {
            immediate: false,
            handler(value) {
                this.performSearch(value);
            },
        },
        'form.filters': {
            handler(filters) {
                if (this.isStorageEnable()){
                    this.storageSet('filters', filters || []);
                }
            },
        },
        'form.ids': {
            deep: true,
            handler(ids) {
                if (this.isStorageEnable()){
                    this.storageSet('selectedIds', ids || []);
                }
            },
        },
    },

    created() {
        // Converts the config
        this.setupPipeline();

        // Watch for multiple changes and inject
        this.$watch(() => {
                        return (
                            this.form.search +
                            this.form.orderByField +
                            this.form.orderByDirection +
                            this.form.perPage
                        );
                    },
                    // Call this function
                    () => {
                        this.call();
                    },
                    // Track deep/options
                    {
                        deep: true,
                    },
        );
    },

    mounted() {
        // If Pooling is enabled start the pooling "forever"
        if (this.pooling.enable && this.pooling.interval > 0) {
            this.call();
            this.poolingForever(
                this.pooling.enable,
                this.pooling.interval,
            );
        } else {
            this.call();
        }

        // Register Echo for this
        LaravelEcho
            .private(this.$page.props.broadcast.private.parsed)
            .listen('.datatable-' + this.name + '-refresh', (action) => {
                this.call();
            });
    },

    unmounted() {
        // Clear any pending pooling timeouts
        clearInterval(this.poolingInterval);

        // Leave Echo channel
        LaravelEcho.private(this.$page.props.broadcast.private.parsed)
            .stopListening('.datatable-' + this.name + '-refresh');
    },

    methods: {

        /**
         * Set the datatable with configs from storage, columns and so on.
         */
        setupPipeline() {
            // Merge the config from props to data
            this.setupConfig();

            // If store is active then flash the variables
            if (this.isStorageEnable()) {
                this.form.perPage = this.storageGet('perPage', firstOf(this.perPageOptions).value);
                this.form.filters = this.storageGet('filters', []);
                this.hiddenColumns = this.storageGet('hiddenColumns', []);
                this.form.ids = this.storageGet('selectedIds', []);
            }

            // Apply the Columns visibility
            each(this.columns, (column) => {
                if (column.hidden) {
                    if (!this.hiddenColumns.includes(column.name)) {
                        this.hiddenColumns.push(column.name);
                        this.storageSet('hiddenColumns', this.hiddenColumns);
                    }
                }
            });

            // Apply the filters with default values from backend
            let filters = {};
            each(this.filters, (filter) => {
                if (
                    filter.value !== null &&
                    filter.value !== '' &&
                    filter.value !== filter.defaultValue
                ) {
                    filters[filter.name] = filter.value.toString();
                }
            });

            if (Object.keys(filters).length > 0) {
                this.form.filters = filters;
            }
        },

        /**
         * Setup the config, this basically takes the config from the props
         * and converts into the actual datatable settings
         */
        setupConfig() {
            this.name = this.config.name;
            this.columns = this.config.columns;
            this.link = this.config.endpoint;
            this.filters = this.config.filters;
            this.actions = this.config.actions;

            if (this.config.perPageOptions) {
                this.perPageOptions = this.config.perPageOptions;
            }

            if (this.config.pooling) {
                this.pooling = this.config.pooling;
            }

            if (this.config.options) {
                this.options = this.config.options;
            }

            if (this.config.labels) {
                this.labels = this.config.labels;
            }
        },

        /**
         * Clears up the ID and converts to integer always and also remove any trash around it
         *
         * @param str
         * @returns {number}
         */
        clearID(str) {
            return parseInt(str.toString().replace(/\D/g, ''));
        },

        /**
         * Select a item on the page
         * This runs when the user clicks the checkbox of the item.
         *
         * @param item
         * @param unToggleIfSelected
         * @returns {*[]|number}
         */
        select(item, unToggleIfSelected = true) {

            // Ensure we will remove the all check if stuff was changed manually
            this.form.allChecked = false;

            // If the ID is not yet selected, select it
            if (!this.form.ids.includes(this.clearID(item.id))) {
                return this.form.ids.push(this.clearID(item.id));
            }

            // If we should untoggle if its already selected then do it.
            if (unToggleIfSelected){
                const index = this.form.ids.indexOf(this.clearID(item.id));
                if (index > -1) {
                    return this.form.ids.splice(index, 1);
                }
            }
        },

        /**
         * Toggle and select all items on the current page ( being displayed )
         */
        toggleItemsInPage() {
            // Ensure we toggle back the all checked
            this.form.allChecked = false;
            // Continue the logic
            if (this.isCurrentPageChecked) {
                this.resetSelectedInCurrentPage();
            } else {
                // Select all items being displayed
                each(this.items, (item) => {
                    this.select(item, false);
                });
            }
        },

        /**
         * Toggles the Select all matching the given query/filter
         * This will make ALL rows selected and tell server-side by sending
         * the variable "allChecked", server side is then responsible to take all
         * IDs from the current applied query
         *
         * @returns {boolean}
         */
        toggleSelectAllMatching() {
            // Toggle the boolean
            this.form.allChecked = !this.form.allChecked;
            // Ensure we reset the ids because we dont need them anymore
            this.form.ids = [];
            return true;
        },

        /**
         * Reset the order by Field
         */
        resetOrderBy() {
            this.form.orderByDirection = 'desc';
            this.form.orderByField = null;
        },

        /**
         * Reset Pagination and Per Page options
         */
        resetPaginationAndPerPage() {
            this.form.perPage = firstOf(this.perPageOptions).value || 5;
            this.resetLink();
        },

        /**
         * Reset the link back to the default
         */
        resetLink() {
            this.link = this.config.endpoint;
        },

        /**
         * Reset the search query
         */
        resetSearch() {
            this.form.search = null;
            this.searchQuery = null;
        },

        /**
         * Resets a single filter
         * @param filterToRemove
         */
        resetFilter(filterToRemove){
            this.form.filters = omit(this.form.filters, [filterToRemove.name]);
            this.onFiltersSaved(this.form.filters);
        },

        /**
         * Reset the filters and provides a callback
         * When reseting filters we also want a full wipe to
         * all selected items, pages, order by, etc
         *
         * @param call
         */
        resetFilters(call = true) {
            this.form.filters = [];
            // Call
            if (call) {
                this.call(() => {
                    this.resetPaginationAndPerPage();
                    this.resetOrderBy();
                    this.resetSearch();
                    this.resetSelected();
                    this.resetAction();
                });
            }
        },

        /**
         * Reset the Filters and Search Query
         */
        resetFiltersAndSearch() {
            this.resetFilters();
        },

        /**
         * Reset all the settings from the settings page
         */
        resetSettings() {
            this.resetPaginationAndPerPage();
            this.hiddenColumns = [];
            if (this.isStorageEnable()) {
                this.storageSet('hiddenColumns', []);
            }
        },

        /**
         * Reset & Clears the selected items for the current page
         */
        resetSelectedInCurrentPage() {
            each(this.currentPageIds, item => {
                const index = this.form.ids.indexOf(this.clearID(item));
                if (index > -1) {
                    return this.form.ids.splice(index, 1);
                }
            });
        },

        /**
         * Reset & clears the items selected
         * If all checked/matching is toggle it will also remove it
         *
         */
        resetSelected() {
            if (this.form.allChecked){
                this.form.allChecked = false;
            }
            this.form.ids = [];
        },

        /**
         * Reset and clear the current action
         * Pending or processing and also hides the dialog
         */
        resetAction() {
            this.showActionConfirm = false;
            this.actionSelected = null;
            this.form.action = null;
        },

        /**
         * Navigate between pages using the links provided on meta
         *
         * @param link
         */
        navigateToPage(link) {
            this.link = link;
            this.call(() => {
                //this.resetSelected();
                //this.resetAction();
            });
        },

        /**
         * When the action is confirmed by the user
         * we will then call the perform action
         *
         * @param action
         */
        onActionConfirmed(action) {
            this.performAction(action, true);
        },

        /**
         * When filters are saved we will call this function
         * this will clear the current action if any selected
         * will also remove any query strings
         * Reset the pagination, orderBy, search and so on
         * Because when a filter is saved we want to perform a
         * full cleanup
         *
         * @param filters
         */
        onFiltersSaved(filters) {
            this.resetSelected();
            this.resetAction();
            this.showFilters = false;
            this.form.filters = filters || {};

            // Remove the query strings since its applying a new set of filters
            queryReset();

            // Call
            this.call(() => {
                this.resetPaginationAndPerPage();
                this.resetOrderBy();
                this.resetSearch();
                this.resetSelected();
                this.resetAction();
            });
        },

        /**
         * On Update the items per page we should do the following calls
         *
         * @param count
         */
        onUpdateItemsPerPage(count) {
            if (parseInt(this.form.perPage) !== parseInt(count)) {
                this.form.perPage = parseInt(count);
                this.showingTableSettings = false;
                this.resetLink();
                if (this.isStorageEnable()) {
                    this.storageSet('perPage', this.form.perPage);
                }
            }
        },

        /**
         * When the user opt-in or opt-out for use storage
         * @param value
         */
        onUpdateStorageSettings(value) {
            this.storageSet('useLocalStorage', value);
        },

        /**
         * When the user toggles a column
         * it will ensure to save it to the storage if enable
         * and it will also instantly hide it.
         *
         * @param columns
         */
        onColumnsUpdated(columns) {
            this.hiddenColumns = columns;
            if (this.isStorageEnable()) {
                this.storageSet('hiddenColumns', this.hiddenColumns);
            }
        },

        /**
         * Called when the order by of a column is changed
         *
         * @param field
         */
        onOrderByChanged(field) {
            this.form.orderByDirection = this.form.orderByDirection === 'asc' ? 'desc' : 'asc';
            this.form.orderByField = field.key;
            this.resetSelected();
        },

        /**
         * Set/Saves a item to local storage
         * Like we explained on the get method this will ensure prefixed cache items
         *
         * @param key
         * @param value
         */
        storageSet(key, value) {

            if (isSSR()){
                return;
            }

            if (has(this.defaultStorageSettings, key)) {

                let currentStorage = this.$localStorage.get(
                    'table' + this.name,
                    this.defaultStorageSettings,
                );

                currentStorage[key] = value;
                this.$localStorage.set('table' + this.name, currentStorage);
            }
        },

        /**
         * Get a variable from the storage or return a default
         * This method is specific because it will ensure a datatable
         * prefix on the storage, so we could have multiple datatables on same
         * page with different settings saved
         *
         * @param key
         * @param defaultValue
         * @returns {*}
         */
        storageGet(key, defaultValue = null) {

            if (isSSR()){
                return defaultValue;
            }

            if (has(this.defaultStorageSettings, key)) {

                let currentStorage = this.$localStorage.get(
                    'table' + this.name,
                    this.defaultStorageSettings,
                );

                if (has(currentStorage, key)) {
                    return currentStorage[key];
                }
                // If no default value is provided or null return the default
                return defaultValue || this.defaultStorageSettings[key];
            }
        },

        /**
         * Check if local storage is enable by the user consent
         *
         * @returns Boolean
         */
        isStorageEnable() {
            return this.storageGet('useLocalStorage', false);
        },

        /**
         * Checks if a given row with unique ID is selected on the form ID
         *
         * @param id
         * @returns {boolean}
         */
        isRowSelected(id) {
            return this.form.allChecked || this.form.ids.indexOf(this.clearID(id)) > -1;
        },

        /**
         * Reset the storage data to the defaults
         */
        resetStorage() {
            if (isSSR()){
                return;
            }
            this.$localStorage.set('table' + this.name, this.defaultStorageSettings);
        },

        /**
         * Starts a table pool until a certain condition is met.
         * Configurable to :
         * - Pool every X Seconds
         * - During X Time
         * - Stop when hash of the data changed
         *
         * @param enable
         * @param every
         * @param during
         * @param stopWhenChanged
         */
        poolingUntil(enable, every, during = 120, stopWhenChanged = true) {

            if (!enable) {
                return;
            }

            let started = Date.now();
            let initialItemsHash = this.itemsHash;

            this.poolingInterval = setInterval(() => {
                let timeExpired = Date.now() - started > (during * 1000);
                let hashChanged = initialItemsHash !== this.itemsHash;
                if (timeExpired || (hashChanged && stopWhenChanged)) {
                    clearInterval(this.poolingInterval);
                } else {
                    this.call(() => {
                    }, true);
                }
            }, every * 1000);
        },

        /**
         * Starts a infinite pooling on the table
         *
         * @param enable
         * @param every
         */
        poolingForever(enable, every) {
            if (!enable) {
                return;
            }
            this.poolingInterval = setInterval(() => {
                this.call(() => {
                }, true);
            }, every * 1000);
        },

        /**
         * Perform a search on the given results
         *
         * @param searchQuery
         */
        performSearch: debounce(function (searchQuery){
            // Only search if we're not tabbing into the field
            if (this.canSearch) {
                this.form.search = searchQuery;
                this.resetSelected();
                this.resetLink();
            }
        }, 700),

        /**
         * Performs and fires the action from the datatable
         * Ensures also user has permission to execute the action
         * Ensures the action is confirmed if confirm is required
         * Registers the callback to call after the server response
         *
         * @param action
         * @param confirmed
         */
        performAction(action, confirmed = false) {

            if (!action.permissions.execute) {
                return;
            }

            // Confirm the aciton before trigger it
            if (action.before.confirm.enable && !confirmed) {
                this.showActionConfirm = true;
                this.actionSelected = action;
                return;
            }

            // Reset and set the pointer
            this.showActionConfirm = false;
            this.actionSelected = null;
            this.form.action = action.name;

            // Callback to perform after the action is dispatched
            let afterCall = () => {
                // If the action want us to clear after performed
                if (action.after.clearSelected) {
                    this.resetSelected();
                }

                // Call inertia if needed
                if (action.after.inertia && action.after.inertia?.enable) {
                    if (action.after.inertia.reload === true) {
                        this.$inertia.reload(action.after.inertia.options);
                    }

                    if (action.after.inertia.reload === false && typeof action.inertia?.url !== undefined) {
                        this.$inertia.visit(
                            action.inertia.url,
                            action.inertia.options,
                        );
                    }
                }

                // Notify if needed
                if (action.after.notifications && Object.keys(action.after.notifications).length) {
                    each(
                        action.after.notifications,
                        notification => this.useNotifications.add(notification),
                    );
                }

                if (
                    action.after.pooling &&
                    action.after.pooling.enable &&
                    action.after.pooling.during > 0
                ) {
                    this.poolingUntil(
                        action.after.pooling.enable,
                        action.after.pooling.interval,
                        action.after.pooling.during,
                        action.after.pooling.stopWhenDataChanges,
                    );
                }

                // Clear the action
                this.resetAction();
            };

            // Call finally with the callback
            this.call(afterCall);
        },

        /**
         * Performs a refresh by calling again
         */
        performRefresh() {
            if (!this.loading) {
                this.call();
            }
        },

        /**
         * Ensures the exceptions are treated
         * @param error
         */
        callException(error) {
            if (error.response) {
                if (error.response.data.inertia?.reload && error.response.data.inertia?.options) {
                    this.$inertia.reload(error.response.data.inertia.options);
                }
            } else if (error.request) {
            } else {
                //console.log(error.message);
            }
        },

        /**
         * Calls the API URL with all the required data
         *
         * @param then - Execute After the call
         * @param pooling - If pooling should turn on
         * @returns {Promise<unknown>}
         */
        call(then = () => {}, pooling = false) {
            this.loading = !pooling;

            return this.axios({
                method: 'post',
                url: this.link,
                data: this.form,
            })
                // Everything was fine, lets flash the data
                .then((response) => {
                    if (response.status === 200) {
                        this.items = response.data.data || [];
                        this.links = response.data.links || [];
                        this.meta = response.data.meta || [];
                        //this.itemsHash = this.digest(this.items);
                    }
                })
                // Callable
                .then(then)
                // Handles the exception
                .catch((error) => this.callException(error))
                // Always
                .finally(() => {
                    this.loading = false;
                    this.resetAction();
                });
        },
    },
};
</script>

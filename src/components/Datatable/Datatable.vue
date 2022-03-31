<template>
  <div>
    <VanillaCard
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
            actions,
            hasActions,
            hasAnyItemsSelected
          }"
        >
          <VanillaDatatableActions
            v-if="hasActions && hasAnyItemsSelected"
            :actions="actionsComputed"
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
        <slot
          name="headerFilters"
          v-bind="{hasFilters,isShowingFilters,filtersActiveCount}"
        >
          <div
            v-if="hasFilters"
            :class="[classesList.headerFiltersContainer]"
          >
            <VanillaButton
              @click="isShowingFilters = true"
            >
              <FilterIcon :class="[classesList.headerFiltersIcon]" />
              <span
                :class="[classesList.headerFiltersLabel]"
                v-text="translations.filters"
              />
              <span
                v-if="filtersActiveCount > 0"
                :class="[classesList.headerFiltersCount]"
              >( {{ filtersActiveCount }} )</span>
            </VanillaButton>
          </div>
        </slot>

        <!-- Table Settings -->
        <slot
          name="headerSettings"
          v-bind="{
            refreshable: options.refreshable,
            isFetching,
            isShowingSettings
          }"
        >
          <VanillaDropdown :class="[classesList.headerSettingsContainer]">
            <template #trigger>
              <VanillaButton>
                <DotsVerticalIcon :class="[classesList.headerSettingsIcon]" />
              </VanillaButton>
            </template>

            <!-- Refresh -->
            <VanillaDropdownOption
              v-if="options.refreshable"
              @click="refresh"
            >
              <RefreshIcon
                :class="[
                  classesList.headerSettingsRefreshIcon,
                  isFetching ? classesList.headerSettingsRefreshIconAnimation : ''
                ]"
              />
              <span v-text="translations.refresh" />
            </VanillaDropdownOption>
            <!-- Edit Settings -->
            <VanillaDropdownOption @click="isShowingSettings = true">
              <CogIcon :class="[classesList.headerSettingsEditIcon]" />
              <span v-text="translations.settings" />
            </VanillaDropdownOption>
          </VanillaDropdown>
        </slot>

        <!-- Table Config -->
      </template>

      <!-- Search Bar -->
      <template v-if="options.searchable && !hasAnyItemsSelected">
        <slot
          name="headerSearch"
          v-bind="{
            searchable: options.searchable,
            hasAnyItemsSelected,
            query: queryData.search,
            placeholder: translations.searchPlaceholder,
            onSearch
          }"
        >
          <VanillaDatatableSearch
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
                <VanillaDatatableFilterBadge
                  v-for="filter in filtersComputed"
                  :key="filter.name+''+filter.value"
                  :filter="filter"
                  :value="filter.value"
                  @filter-remove="resetFilter(filter)"
                />
              </div>
            </div>
          </div>
        </slot>
      </template>

      <!-- Current items selected -->
      <template v-if="hasAnyItemsSelected">
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
          <VanillaDatatableSelectionBar
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
      <div :class="classesList.tableContainer">
        <template v-if="!showBeInLoadingState && results.data.length <= 0 ">
          <VanillaDatatableEmptyState
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
          </VanillaDatatableEmptyState>
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
          <template v-if="showBeInLoadingState">
            <slot
              name="skeleton"
              v-bind="{
                isFetching,
                showBeInLoadingState,
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
                v-if="options.selectable"
                :class="[
                  classesList.tableColumnCheckbox
                ]"
              >
                <input
                  :checked="isItemSelected(result)"
                  :class="[
                    classesList.tableCheckbox
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
                  selected: isItemSelected(result)
                }"
              >
                <td
                  v-for="(column) in columnsComputed"
                  v-show="userSettings.visibleColumns.includes(column.name)"
                  :key="column.name"
                  :class="classesList.tableColumn"
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
                      <!-- Components support coming soon-->
                    </div>
                  </slot>
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
        <VanillaDatatablePagination
          :is-fetching="isFetching"
          :pages="results.links?.pages"
          :next-page="results.links?.next"
          :previous-page="results.links?.previous"
          :current-page="results.meta?.current_page"
          :showing-from="results.meta?.from"
          :showing-to="results.meta?.to"
          :total="results.meta?.total"
          @navigate="onPageNavigated"
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
        onActionConfirmed
      }"
    >
      <VanillaDatatableDialogConfirmAction
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
            cancelText
          }"
        >
          <slot
            name="actionsIcon"
            v-bind="{
              action,
              title,
              text,
              confirmText,
              cancelText
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
            cancelText
          }"
        >
          <slot
            name="actionBody"
            v-bind="{
              action,
              title,
              text,
              confirmText,
              cancelText
            }"
          />
        </template>
      </VanillaDatatableDialogConfirmAction>
    </slot>
    <!-- Settings Modal -->
    <slot
      name="settingsDialog"
      v-bind="{
        isShowingSettings,
        userSettings,
        perPageOptions,
        columnsComputed
      }"
    >
      <!-- Action Confirmation Modal -->
      <VanillaDatatableDialogSettings
        v-model="isShowingSettings"
        :user-settings="userSettings"
        :default-settings="userSettingsDefault"
        :per-page-options="perPageOptions"
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
        filters
      }"
    >
      <!-- Action Confirmation Modal -->
      <VanillaDatatableDialogFilters
        v-model="isShowingFilters"
        :user-settings="userSettings"
        :filters="filters"
        @filters-reset="onFiltersReset"
        @filters-saved="onFiltersSaved"
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
    camelize,
} from 'vue';

import {
    useBootVariant,
    useVariantProps,
    useConfigurationWithClassesList,
    useDynamicSlots,
    useReplacePlaceholders,
} from '@/core';

// Datatable Utilities
import {
    useValidator,
    useConfigurationBuilder,
    useFetchData,
} from './Utils';

// Types & Config
import {
    VanillaDatatableProps,
    VanillaDatatableClassesKeys,
    VanillaDatatableConfig,
    VanillaDatatableColumn,
    VanillaDatatableColumns,
    VanillaDatatableConfiguration,
    VanillaDatatableAction as VanillaDatatableActionType,
    VanillaDatatableActions as VanillaDatatableActionsType,
    VanillaDatatableQueryData,
    VanillaDatatableOptions,
    VanillaDatatableFilters,
    VanillaDatatablePageOptions,
    VanillaDatatableTranslations,
    VanillaDatatableResponse,
    VanillaDatatableSortedColumns,
    VanillaDatatableResultData,
    VanillaDatatableColumnsComputed,
    VanillaDatatableFetchDataFunction,
    VanillaDatatablePooling,
    VanillaDatatableAction,
    VanillaDatatableUserSettings,
    VanillaDatatableFilter,
    VanillaDatatableSavedFilter,
    VanillaDatatableActionExecutedFunction,
    VanillaDatatableExceptionFunction, VanillaDatatableClassesValidKeys,
} from './index';

// Vanilla Components
import VanillaCard from '@/components/Card/Card.vue';
import VanillaDropdown from '@/components/Dropdown/Dropdown.vue';
import VanillaDropdownOption from '@/components/Dropdown/DropdownOption/DropdownOption.vue';
import VanillaButton from '@/components/Button/Button.vue';

// Partial Components
import VanillaDatatableHead from './Partials/DatatableHead.vue';
import VanillaDatatableRowSkeleton from './Partials/DatatableRowSkeleton.vue';
import VanillaDatatableSearch from './Partials/DatatableSearch.vue';
import VanillaDatatableSelectionBar from './Partials/DatatableSelectionBar.vue';
import VanillaDatatablePagination from './Partials/DatatablePagination.vue';
import VanillaDatatableActions from './Partials/DatatableActions.vue';
import VanillaDatatableDialogConfirmAction from './Partials/DatatableDialogConfirmAction.vue';
import VanillaDatatableDialogSettings from './Partials/DatatableDialogSettings.vue';
import VanillaDatatableDialogFilters from './Partials/DatatableDialogFilters.vue';
import VanillaDatatableFilterBadge from './Partials/DatatableFilterBadge.vue';
import VanillaDatatableEmptyState from './Partials/DatatableEmptyState.vue';

// Icons
import { DotsVerticalIcon, CogIcon } from '@heroicons/vue/solid';
import { FilterIcon, RefreshIcon } from '@heroicons/vue/outline';

// Other 3rd Party Packages
import { useSessionStorage } from '@vueuse/core';
import { NormalizedOption } from '@/core/types';
import each from 'lodash/each';
import filter from 'lodash/filter';
import find from 'lodash/find';
import assign from 'lodash/assign';
import md5 from 'crypto-js/md5';
import omit from 'lodash/omit';
import debounce from 'lodash/debounce';

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
        VanillaDatatableDialogFilters,
        VanillaDatatableFilterBadge,
        VanillaDatatableEmptyState,
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
            type: [Object] as PropType<VanillaDatatableConfiguration>,
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
            type: [Array] as PropType<VanillaDatatableColumns>,
            required: true,
        },
        options: {
            type: [Object] as PropType<VanillaDatatableOptions>,
            required: true,
        },
        actions: {
            type: [Array] as PropType<VanillaDatatableActionsType>,
            default(){
                return [];
            },
        },
        pooling: {
            type: [Object] as PropType<VanillaDatatablePooling | undefined>,
            default: undefined,
        },
        filters: {
            type: [Array] as PropType<VanillaDatatableFilters>,
            default(){
                return [];
            },
        },
        filtersKey: {
            type: [String] as PropType<string | number>,
            required: false,
            default(rawProps: { primaryKey: string | number; }){
                return rawProps.primaryKey;
            },
        },
        filtersBaseUrl: {
            type: [String] as PropType<string | undefined>,
            required: false,
            default: undefined,
        },
        perPageOptions: {
            type: [Array] as PropType<VanillaDatatablePageOptions>,
            default(){
                return [];
            },
        },
        translations: {
            type: [Object] as PropType<VanillaDatatableTranslations>,
            required: true,
        },
        fetchData: {
            type: [Function, undefined] as PropType<VanillaDatatableFetchDataFunction | undefined>,
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
        onActionExecutedCallback: {
            type: [Function, undefined] as PropType<VanillaDatatableActionExecutedFunction | undefined>,
            required: false,
            default: undefined,
        },
        onExceptionCallback: {
            type: [Function, undefined] as PropType<VanillaDatatableExceptionFunction | undefined>,
            required: false,
            default: undefined,
        },
    },
    emits: [
        'fetchedSuccess',
        'fetchError',
        'actionExecuted',
        'sortingUpdated',
        'navigateToPage',
        'filtersSaved',
        'mounted',
        'unmounted',
        'search',
    ],
    setup(props, { emit }) {

        // ----- Start the Variant -----  //
        const { localVariant } = useBootVariant(props, 'errors', ref(null));
        const { configuration } = useConfigurationWithClassesList<VanillaDatatableProps>(
            VanillaDatatableConfig,
            VanillaDatatableClassesKeys,
            localVariant,
        );

        // ---------------------------- //
        // ----- Boot Config & Validate -----  //
        // ---------------------------- //
        const datatable = reactive(useConfigurationBuilder(props)) as VanillaDatatableConfiguration;

        // Validate the data
        useValidator(datatable);

        // ---------------------------- //
        // ----- Reactive Data -----  //
        // ---------------------------- //

        /** Stores if table is currently fetching */
        const isFetching = ref(false) as Ref<boolean>;

        /** Stores if it's currently showing filters */
        const isShowingFilters = ref(false) as Ref<boolean>;

        /** Stores if it's currently showing the action confirmation */
        const isShowingActionConfirmation = ref(false) as Ref<boolean>;

        /** Stores if it's currently showing the table settings modal */
        const isShowingSettings = ref(false) as Ref<boolean>;

        /** Temporary value to control if a refresh can be performed or not. */
        const showLoadingAnimation = ref(false) as Ref<boolean>;

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
        }) as VanillaDatatableResponse;

        /** Stores the current action object that was selected */
        const currentAction = ref(undefined) as Ref<undefined | VanillaDatatableAction>;

        /** Stores the pooling interval */
        const poolingInterval = ref(undefined) as Ref<undefined | number>;

        /** Default Settings */
        const userSettingsDefault = {
            visibleColumns: filter(datatable.columns, { hidden: false }).map(c => c.name) as string[],
            perPage: datatable.perPageOptions[0]?.value as number,
            useStorage: true as boolean,
            saveSelection: true as boolean,
            selectedIds: [] as string[],
            filters: {} as VanillaDatatableSavedFilter,
        } as VanillaDatatableUserSettings;

        /** Stores the user given settings & local/session storage */
        const userSettings = reactive({ ...userSettingsDefault }) as VanillaDatatableUserSettings;

        /** Stores the user given settings & local/session storage */
        const userStorage = useSessionStorage(camelize(datatable.name.toString()), userSettings, {});

        /** Query Data being passed to the server */
        const queryData = reactive({
            search: '' as string | null,
            perPage: userSettings.perPage,
            selected: [] as string[],
            selectedAll: false as boolean,
            filters: {} as VanillaDatatableSavedFilter,
            sorting: [],
            action: null as string | null,
        }) as VanillaDatatableQueryData;

        /** Actual function to perform the request */
        const fetchData: VanillaDatatableFetchDataFunction = datatable?.fetchData || useFetchData;

        // ---------------------------- //
        // ----- Computed Data -----  //
        // ---------------------------- //

        /** Current Ids being shown on hte page */
        const currentPageIds = computed(() => results.data.map(item => item.id) || []) as Ref<string[]>;

        const resultsHash = computed(() => md5(JSON.stringify(results.data)).toString()) as Ref<string>;

        /** If there is currently selected items on the config */
        const hasAnyItemsSelected = computed(() => queryData.selectedAll || queryData.selected.length > 0) as Ref<boolean>;

        /** Returns if the user configured any filters */
        const hasFilters = computed(() => datatable.filters.length > 0) as Ref<boolean>;

        /** Returns if the user configured any actions */
        const hasActions = computed(() => datatable.actions.length > 0) as Ref<boolean>;

        /** Returns the current count of visible columns, excluding the hidden ones and the select column */
        const visibleColumnsCount = computed(() => userSettings.visibleColumns?.length + (datatable.options.selectable ? 1 : 0)) as Ref<number>;

        /** Returns the number of items selected, in case all is selected, we return the total number of rows matching */
        const selectedItemsCount = computed(() => queryData.selectedAll ? results?.meta?.total : queryData.selected.length) as Ref<number>;

        /** Formatted Count of the selected items
         * TODO : Format the actual number
         **/
        const selectedItemsCountFormatted = computed(() => selectedItemsCount.value)  as Ref<string | number>;

        /** Checks if the user can search on the table, if its searched, not currently fetching, and no items are selected */
        const canSearch = computed(() => datatable.options.searchable && !isFetching.value && !hasAnyItemsSelected.value)  as Ref<boolean>;

        /** Boolean that returns if the check all checkbox should be checked, it means select all is selected and the current page of items is all selected  */
        const isAllItemsInPageSelected = computed(() => queryData.selectedAll || currentPageIds.value.every(id => queryData.selected.includes(id))) as Ref<boolean>;

        /** Boolean that returns if the check all checkbox should be checked, it means select all is selected and the current page of items is all selected  */
        const hasAnyItemsSelectedForCurrentPage = computed(() => queryData.selected.some(id => currentPageIds.value.indexOf(id) >= 0)) as Ref<boolean>;

        /** Returns how the number of filters currently applied */
        const filtersActiveCount = computed(() => Object.keys(userSettings.filters).length || Object.keys(queryData.filters).length) as Ref<number>;

        /** Returns if there is any filters or search applied */
        const hasFiltersOrSearchApplied = computed(() => filtersActiveCount.value > 0 || queryData.search !== '') as Ref<boolean>;

        /** Whenever to show the loading state or not */
        const showBeInLoadingState = computed(() => isFetching.value || showLoadingAnimation.value);

        /**
         * Map the columns, so we can include if the column is visible or not
         * if it's sorted or not and so on, so we don't need to evaluate it each time we need.
         **/
        const columnsComputed = computed(() => {
            return datatable.columns.map((column: VanillaDatatableColumn) => {
                return {
                    ...column,
                    visible: userSettings.visibleColumns.includes(column.name),
                    isSorted: queryData.sorting.some(c => c.column === column.name),
                    isSortedAsc: queryData.sorting.some(c => c.column === column.name && c.direction === 'asc'),
                    isSortedDesc: queryData.sorting.some(c => c.column === column.name && c.direction === 'desc'),
                    slotName: useDynamicSlots('row', column.name),
                };
            });
        }) as Ref<VanillaDatatableColumnsComputed>;

        /**
         * Map the actions to add slot name
         **/
        const actionsComputed = computed(() => {
            return datatable.actions.map((action: VanillaDatatableActionType) => {
                return {
                    ...action,
                    slotName: useDynamicSlots('action', action.name),
                };
            });
        }) as Ref<VanillaDatatableActionsType>;

        /**
         * Map the actions to add slot name
         **/
        const filtersComputed = computed(() => {
            let finalFilters = [] as VanillaDatatableFilters;
            Object.entries(userSettings.filters).forEach(([key, value]) => {
                let filterObject = find(datatable.filters, { name: key }) as VanillaDatatableFilter | undefined;

                // Filter wasn't found, skip it.
                if (undefined === filterObject){
                    return;
                }

                // Save the value as it is ( value on user settings )
                let finalFilterValue = value as string | undefined | null | number;

                // If the filter is a select, attempt to resolve the option in a nice way
                // So we don't resolve the "raw" value but the label.
                if (filterObject?.options?.length || 0  > 0){
                    let option = find(filterObject?.options, { value: value }) as NormalizedOption | undefined;
                    if (option !== undefined){
                        finalFilterValue = option.text;
                    }
                }

                // Push Again & Merge
                finalFilters.push({
                    ...filterObject,
                    value: finalFilterValue,
                });
            });
            return finalFilters;
        }) as Ref<VanillaDatatableFilters>;


        // ---------------------------- //
        // ----- Methods -----  //
        // ---------------------------- //

        /** Wrapper for the main call to the server, so we can perform additional stuff */
        const fetchFromServer = (then = () => {}) => {

            //console.log('[REST] 🚀 Calling the server');

            isFetching.value = true;
            return fetchData(datatable, queryData)
                // Resolve
                .then((response) => {
                    results.data = response.data;
                    results.links = response?.links;
                    results.meta = response?.meta;
                    results.responses = response?.meta;

                    // Emit that fetch was success
                    emit('fetchedSuccess', {
                        results: results,
                        success: true,
                    });
                })
                // Catch Errors
                .catch((error: object) => {

                    // If user provided a callback after each exception
                    if (datatable?.onExceptionCallback !== undefined){
                        datatable.onExceptionCallback(error);
                    }

                    // Emit  error
                    emit('fetchError', {
                        error: error,
                        success: false,
                    });
                })
                // Finally
                .then(() => {
                    isFetching.value = false;
                })
                .then(then);
        };

        /** Refresh the datatable */
        const refresh = (then = () => {}) => {
            if (!isFetching.value){
                fetchFromServer(then);
            }
        };

        /**
         * Function to select a single row/item
         * - Only selects if item is not yet selected
         * - If the item is selected it will deselect it
         * - Disables the select all checkbox if all items are selected
         **/
        const selectItem = (item: VanillaDatatableResultData, uncheckIfChecked = true) => {

            let itemKey = item[datatable.primaryKey] || null;
            if (null === itemKey){
                throw new Error('Please make sure the config "primaryKey" exists on your resource data.');
            }

            // If everything was checked, remove it.
            queryData.selectedAll = false;

            // If the ID is not yet selected, select it

            if (!queryData.selected.includes(itemKey)) {
                return queryData.selected.push(itemKey);
            }

            // If we should toggle if it's already selected then do it.
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
        const isItemSelected = (item: VanillaDatatableResultData) => {
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
                    // Refresh the results
                    refresh();
                }
            }, every * 1000);
        };

        /** Pool but forever */
        const poolForever = (enable = false, every = 20) => {
            if (!enable) {
                return;
            }
            poolingInterval.value = setInterval(() => refresh(), every * 1000);
        };

        /** Resets the sorting  */
        const resetSorting = () => {
            // TODO : Check this to reset link
            queryData.sorting = [];
        };

        /** Resets the per page items  */
        // const resetPerPageItems = () => {
        //     queryData.perPage = datatable.perPageOptions[0]?.value as number;
        // };

        /** Resets the search query  */
        const resetSearchQuery = (shouldRefresh = false) => {
            queryData.search = '';
            if (!shouldRefresh){
                return;
            }
            refresh();
        };

        /** Resets a specific filter by name  */
        const resetFilter = (filterToClear: VanillaDatatableFilter, shouldRefresh = true) => {

            // Already empty or does not exist in the user settings
            if (!(filterToClear.name in userSettings.filters)){
                return;
            }

            userSettings.filters = { ... omit(userSettings.filters, filterToClear.name) };
            queryData.filters = { ... omit(queryData.filters, filterToClear.name) };

            // Refresh the items
            if (!shouldRefresh){
                return;
            }
            refresh();
        };

        /** Reset all filters  */
        const resetAllFilters = (shouldRefresh = false) => {

            // Already empty
            if (!Object.keys(queryData.filters).length){
                return;
            }

            queryData.filters = {};
            userSettings.filters = {};

            // Refresh the items
            if (!shouldRefresh){
                return;
            }
            refresh();
        };

        /** Reset all filters & search query  */
        const resetFiltersAndSearch = (shouldRefresh = true) => {

            showLoadingAnimation.value = true;

            resetAllFilters(false);
            resetSearchQuery(false);

            // Refresh the items
            if (!shouldRefresh){
                return;
            }
            refresh();
            showLoadingAnimation.value = false;
        };

        /** Reset all settings  */
        const resetAllSettings = () => {
            resetAllFilters();
            resetSorting();
            deselectAllItems();
            Object.assign(userSettings, userSettingsDefault);
        };

        /** ResetThe current action  */
        const resetAction = () => {
            isShowingActionConfirmation.value = false;
            currentAction.value = undefined;
        };

        /**
         * Execute the actual action
         **/
        const executeAction = (action: VanillaDatatableActionType) => {

            // No permission to execute the action
            if (!action?.permissions?.execute) {
                return;
            }

            if (action?.before?.callback !== undefined){
                action.before.callback(action);
            }

            // Assign to action data & send
            queryData.action = action.name;

            // Stuff to execute after the action
            const afterActionCallback = () => {
                // Reset the selected items if it was defined on the action scope
                if (action?.after?.clearSelected){
                    deselectAllItems();
                }

                // Clear all the filters in case it was defined on the action scope
                if (action?.after?.resetFilters){
                    resetAllFilters();
                }

                // Clear all the filters in case it was defined on the action scope
                if (action?.after?.callback !== undefined) {
                    action.after.callback(action);
                }

                // If we need to pull data after an action has been started
                if (
                    action?.after?.pooling &&
                    action?.after?.pooling?.enable &&
                    action?.after?.pooling?.during !== undefined &&
                    action?.after?.pooling?.during > 0
                ) {
                    poolUntil(
                        action?.after?.pooling?.enable,
                        action?.after?.pooling?.interval,
                        action?.after?.pooling?.during,
                        action?.after?.pooling?.stopWhenDataChanges,
                    );
                }

                // Always execute the given callback after the action is fired.
                if (datatable?.onActionExecutedCallback !== undefined){
                    datatable.onActionExecutedCallback(action);
                }

                // Reset the action
                resetAction();
            };

            // Emit Action
            emit('actionExecuted', {
                action: action,
            });

            // Execute the action
            refresh(afterActionCallback);
        };

        /**
         * On sorting updated, we will update the query data with the new sorting
         **/
        const onSortingUpdated = (sorting: VanillaDatatableSortedColumns) => {
            queryData.sorting = sorting;
            emit('sortingUpdated', {
                sorting: sorting,
            });
            refresh();
        };

        /**
         * On action selected, we will check if it requires confirmation
         * - If it does, we will show the confirmation modal
         **/
        const onActionSelected = (action: VanillaDatatableActionType) => {
            if (action.before?.confirm?.enable) {
                isShowingActionConfirmation.value = true;
                currentAction.value = action;
                return;
            }
            return executeAction(action);
        };

        /**
         * On action selected, check if it has permissions, its confirmed, etc
         **/
        const onActionConfirmed = (action: VanillaDatatableActionType) => {
            return executeAction(action);
        };

        /**
         * When the user presses a navigation item
         **/
        const onPageNavigated = (link: string) => {

            if (null == link){
                return;
            }

            emit('navigateToPage', {
                link: link,
            });

            let fetchEndpoint = datatable.fetchEndpoint;
            let actionsEndpoint = datatable.actionsEndpoint;

            datatable.fetchEndpoint = link;
            datatable.actionsEndpoint = link;

            // Refresh the results
            // Can't use value trigger otherwise it happens later on the event bubbling
            refresh();

            datatable.fetchEndpoint = fetchEndpoint;
            datatable.actionsEndpoint = actionsEndpoint;
        };

        /**
        * On filter saved
        **/
        const onFiltersSaved = (filters: VanillaDatatableSavedFilter) => {
            // Hide
            isShowingFilters.value = false;

            // Flash the new values
            userSettings.filters = filters;
            queryData.filters = filters;

            // Things we want to reset
            resetAction();
            deselectAllItems();
            resetSearchQuery();

            emit('filtersSaved', { filters: filters });

            // Refresh the results
            refresh();
        };

        /**
         * On filters cleared
         **/
        const onFiltersReset = () => {
            // Hide
            isShowingFilters.value = false;
            // Flash the new values
            userSettings.filters = {};
            queryData.filters = {};

            // More to do here
            resetAction();
            deselectAllItems();
            resetSearchQuery();

            // Refresh the results
            refresh();
        };

        /**
        * When the user search
        **/
        const onSearch = debounce((newQuery: string | null | undefined) => {
            // If the query is the same, do nothing
            if (newQuery === undefined){
                newQuery = '';
            }

            // Only search if we're not tabbing into the field
            if (canSearch.value) {
                deselectAllItems();
                refresh();
                emit('search', newQuery || '');
            }
        }, 700);

        /**
         * Converts the local storage to the local user settings on mounted
         **/
        const fromUserStorageToUserSettings = () => {
            // User don't want to use storage
            if (userStorage.value?.useStorage === false){
                return;
            }

            // Merge into user settings
            // We need also to ensure we merge the ones from storage into the defaults
            // Storage has priority over the default filter value.
            Object.assign(userSettings, assign(userSettingsDefault, userStorage.value));

            // Get the selected Ids
            if (userSettings.selectedIds.length){
                queryData.selected = userSettings.selectedIds;
            }

            // Filters
            if (Object.keys(userSettings.filters).length > 0){
                queryData.filters = userSettings.filters;
            }

            // Per Page
            if (userSettings.perPage){
                queryData.perPage = userSettings.perPage;
            }
            return;
        };

        /**
         * On Mounted, execute the stack
         **/
        onMounted(() => {

            // Mount the session
            fromUserStorageToUserSettings();

            // Fetch the first page
            if (datatable?.pooling?.enable && datatable?.pooling?.interval !== undefined) {
                refresh(() => {
                    poolForever(
                        datatable?.pooling?.enable,
                        datatable?.pooling?.interval,
                    );
                });
            } else {
                refresh();
            }

            emit('mounted');
        });

        /**
         * Watch Per page being changed
         * NOTE: Only watch AFTER mounted to avoid initial triggers from storage
         **/
        onMounted(() => {
            watch(() => {
                      return (queryData.perPage);
                  },
                  () => {
                      refresh();
                  },
                  {
                      deep: true,
                  },
            );
        });

        /**
         * On Unmounted, clear the pooling interval
         **/
        onUnmounted(() => {
            clearInterval(poolingInterval.value);
            emit('unmounted');
        });

        /**
         * Watch selected ids, on select update the user settings
         * with the selected ids.
         **/
        watch(() => queryData.selected, () => {
            userSettings.selectedIds = queryData.selected;
        }, { deep: true });

        /**
         * Watch selected ids, on select update the user settings
         * with the selected ids.
         **/
        watch(() => queryData.search, (searchQuery) => {
            if (!isFetching.value){
                onSearch(searchQuery);
            }
        }, { deep: true });

        /**
         * When the user settings per page changes, update the query data to trigger reload
         **/
        watch(() => userSettings.perPage, () => {
            queryData.perPage = userSettings.perPage;
        }, { deep: false });

        /**
         * If the user settings change, we need to update the storage
         **/
        watch(userSettings, (value) => {
            userStorage.value = value;
        }, { deep: true });

        // ----- Actual props to share -----  //
        const sharing =  {
            // Configuration
            configuration,
            localVariant,
            props,
            datatable,
            translations: datatable.translations,

            // Reactive / Refs
            isFetching,
            isShowingFilters,
            isShowingSettings,
            isShowingActionConfirmation,
            isAllItemsInPageSelected,
            userSettings,
            userSettingsDefault,
            queryData,
            currentAction,

            // Computed
            hasAnyItemsSelected,
            hasActions,
            hasFilters,
            hasFiltersOrSearchApplied,
            filtersActiveCount,
            canSearch,
            visibleColumnsCount,
            hasAnyItemsSelectedForCurrentPage,
            columnsComputed,
            actionsComputed,
            filtersComputed,
            selectedItemsCount,
            selectedItemsCountFormatted,
            showBeInLoadingState,

            // Functions & Helpers
            selectAllItemsInPage,
            isItemSelected,
            selectItem,
            deselectAllItems,
            toggleSelectAll,
            useReplacePlaceholders,
            useDynamicSlots,
            resetAllSettings,
            resetFilter,
            resetFiltersAndSearch,
            refresh,
            onSortingUpdated,
            onActionSelected,
            onActionConfirmed,
            onPageNavigated,
            onFiltersSaved,
            onFiltersReset,
            onSearch,
            classesList: configuration.classesList as VanillaDatatableClassesValidKeys,
        };

        // ----- Provide data to sub components -----  //
        provide('configuration_vanilla_datatable', configuration);

        // ----- Provide data to sub components -----  //
        provide('datatable_translations', datatable.translations);

        return {
            ...sharing,

            // Data from API
            results,
        };
    },
});
</script>

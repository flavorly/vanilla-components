<script type="ts">
import { VanillaDatatable, VanillaDropdownOption } from '@indigit/vanilla-components'
import { defineComponent } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/outline/index.js'

export default defineComponent({
    name: 'ExampleDatatables',
    components: {
        VanillaDatatable,
        VanillaDropdownOption,
        TrashIcon,
    },
    setup(props) {
        const onFetched = () => {
            // Update our little demo height.
            window.parent.postMessage('mounted', '*')
        }

        // Options
        const options = {
            selectable: true,
            searchable: true,
            refreshable: true,
            manageSettings: true,
            showTotalItems: true,
            compact: false,
            striped: false,
        }

        // Columns
        const columns = [
            {
                name: 'id',
                label: 'ID',
                sortable: true,
                native: true,
                hidden: false,
                defaultSortAs: 'desc',
                raw: false,
            },
            {
                name: 'gateway',
                label: 'Gateway',
                sortable: true,
                native: true,
                hidden: false,
                defaultSortAs: undefined,
                raw: false,
            },
            {
                name: 'amount',
                label: 'Amount',
                sortable: true,
                native: true,
                hidden: false,
                defaultSortAs: undefined,
                raw: false,
            },
            {
                name: 'status',
                label: 'Status',
                sortable: true,
                native: true,
                hidden: false,
                defaultSortAs: undefined,
                raw: false,
            },
        ]

        // Actions
        const actions = [
            {
                name: 'delete-items',
                label: 'Deleted Items',
                permissions: {
                    execute: true,
                    view: true,
                },
                before: {
                    confirm: {
                        enable: true,
                        title: 'Delete Payments?',
                        subtitle: 'Something',
                        text: 'Are you sure you want to :name all the :itemsSelected selected payments? Please confirm.',
                        icon: undefined,
                        confirmButton: 'Yes, go on',
                        cancelButton: 'No, take me back.',
                        safe: true,
                        classes: {
                            title: '',
                            text: '',
                            icon: '',
                        },
                    },
                    callback: (action) => {
                        console.log('Im being executed before on the action', action)
                    },
                },
                after: {
                    clearSelected: true,
                    resetFilters: false,
                    pooling: {
                        enable: false,
                        interval: 5,
                        during: 120,
                        stopWhenDataChanges: false,
                    },
                    callback: (action) => {
                        console.log('Im being executed after')
                    },
                },
            },
        ]

        const filters = [
            {
                name: 'id',
                label: 'Filter by ID',
                component: 'VanillaInput',
                placeholder: 'Ex: 1,2,3',
                value: 5,
                defaultValue: 5,
                options: [],
            },
            {
                name: 'amount',
                label: 'Filter by Amount',
                component: 'VanillaInput',
                placeholder: 'Amount',
                value: undefined,
                defaultValue: undefined,
                options: [],
            },
            {
                name: 'gateway',
                label: 'Gateway',
                component: 'VanillaSelect',
                placeholder: 'Payment Gateway',
                value: undefined,
                defaultValue: undefined,
                options: [
                    { value: 'Paypal', text: 'Paypal' },
                    { value: 'Bitcoin', text: 'Bitcoin' },
                    { value: 'Ethereum', text: 'Ethereum' },
                ],
            },
        ]

        // Translations
        const translations = {
            title: 'Payments',
            subtitle: 'Check your latest payments here',
            resource: 'Payment',
            resources: 'Payments',

            actionsButton: 'Actions',
            actionsSelectedRows: 'With :rows selected',

            actionConfirmTitle: 'Confirm your action',
            actionConfirmText: 'Are you sure you want to :name on the :itemsSelected item(s) selected? Please confirm',
            actionConfirmButton: 'Yes, I\'v Confirmed',
            actionCancelButton: 'Nah, Cancel',

            search: 'Search',
            searchPlaceholder: 'Search your latest Payments',

            selectRows: 'You currently have :rows payments selected ',
            selectedUndo: 'Deselect',
            selectAllOr: ' or ',
            selectAllMatching: 'Select :rows matching',
            selectAllMatchingUndo: 'Undo select all :rows',

            filters: 'Filters',
            filtersWithEmptyData: 'Oops, seems like there is no records after filtering',
            filtersReset: 'Reset Filters',

            recordsEmpty: 'Seems like its quiet here! No Records were found',
            settingsPerPage: ':count Items per page',

            showingFrom: 'Showing :from to :to of :total results',
            nextPage: 'Next',
            previousPage: 'Previous',
        }

        // Per Page Options
        const perPageItemsOptions = [
            { value: 5, text: '5 Items per page' },
            { value: 10, text: '10 Items per page' },
            { value: 50, text: '50 Items per page' },
            { value: 100, text: '100 Items per page' },
            { value: 300, text: '300 Items per page' },
        ]

        const poolingOptions = {
            enable: false,
            interval: 5,
            during: 60,
            stopWhenDataChanges: true,
        }

        const config = {
            name: 'ExampleDatatable',
            primaryKey: 'id',
            columns,
            actions,
            filters,
            options,
            translations,
            perPageOptions: perPageItemsOptions,
            pooling: poolingOptions,
        }

        return {
            columns,
            options,
            translations,
            actions,
            filters,
            perPageItemsOptions,
            poolingOptions,
            config,
            onFetched,
        }
    },
})
</script>

<template>
  <PreviewWrapper>
    <div>
      <VanillaDatatable
        :config="config"
        unique-name="payments"
        :columns="columns"
        :options="options"
        :translations="translations"
        :actions="actions"
        :per-page-options="perPageItemsOptions"
        :filters="filters"
        fetch-endpoint="/datatables"
        actions-endpoint="/datatables"
        @fetchedSuccess="onFetched"
        @fetchError="onFetched"
        @openedSettings="onFetched"
        @openedFilters="onFetched"
      >
        <template #rowId="{ result, resultRaw }">
          <span><u>{{ result }}</u></span>
        </template>

        <template #actionDeleteItems="{ action }">
          <TrashIcon class="h-4 w-4" /><span>{{ action.label }}</span>
        </template>
      </VanillaDatatable>
    </div>
  </PreviewWrapper>
</template>

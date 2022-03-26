import merge from 'lodash/merge';
import {
  VanillaDatatableConfiguration,
  VanillaDatatableOptions,
  VanillaDatatablePooling,
  VanillaDatatableTranslations,
  VanillaDatatablePageOptions,
} from '@/components/Datatable';
import { Data } from '@/core/types';

export default function useConfigurationBuilder<Props extends VanillaDatatableConfiguration | Data>(props: Props): VanillaDatatableConfiguration{
  const defaultPooling = {
    enable: false,
    interval: 5,
    during: 60,
    stopWhenDataChanges: true,
  } as VanillaDatatablePooling;

  const defaultOptions = {
    selectable: true,
    searchable: true,
    showSettings: true,
    showNumberOfItems: true,
    striped: false,
    compact: true,
    refreshable: true,
  } as VanillaDatatableOptions;

  const defaultTranslations = {
    title: 'Items',
    subtitle: 'Here you can check your latest items',
    resource: 'Item',
    resources: 'Items',

    actionsButton: 'Actions',
    actionsSelectedRows: 'With :rows selected',

    actionConfirmTitle: 'Confirm your action',
    actionConfirmText: 'Are you sure you want to :action on the :itemsSelected item(s) selected? Please confirm',
    actionConfirmButton: 'Yes, I\'v Confirmed',
    actionCancelButton: 'Nah, Cancel',

    search: 'Search',
    searchPlaceholder: 'Search your latest Payments',

    selectRows: 'You currently have :rows payments selected',
    selectedUndo: 'Deselect',
    selectAllOr: 'Select current page or',
    selectAllMatching: 'Select all records matching filter',
    selectAllMatchingUndo: 'Select only current page',

    filters: 'Filters',
    filtersWithEmptyData: 'Oops, seems like there is no records after filtering',
    filtersReset: 'Reset Filters',

    recordsEmpty: 'Seems like its quiet here! No Records were found',
    settingsPerPage: ':count Items per page',

    showingFrom: 'Showing :from to :to of :total results',
    nextPage: 'Next',
    previousPage: 'Previous',
  } as VanillaDatatableTranslations;

  const defaultPerPageOptions = [
      { value: 5, text: '5 Items per page' },
      { value: 10, text: '10 Items per page' },
      { value: 50, text: '50 Items per page' },
      { value: 100, text: '100 Items per page' },
      { value: 300, text: '300 Items per page' },
  ] as VanillaDatatablePageOptions;

  return {
    name: props?.uniqueName || props.config?.name,
    primaryKey: props?.primaryKey || props.config?.primaryKey,
    filtersKey: props?.primaryKey || props.config?.primaryKey || props?.primaryKey || props.config?.primaryKey,
    columns: merge(props?.columns, props.config?.columns),
    actions: merge(props?.actions, props.config?.actions),
    filters: merge(props?.filters, props.config?.filters),

    options: merge(
      defaultOptions,
      props?.options,
      props.config?.options,
    ),

    translations: merge(
      defaultTranslations,
      props?.translations,
      props.config?.translations,
    ),

    perPageOptions: merge(
      defaultPerPageOptions,
      props?.perPageOptions,
      props.config?.perPageOptions,
    ),

    pooling: merge(
      defaultPooling,
      props?.pooling,
      props.config?.pooling,
    ),

    fetchData: props?.fetchData || props.config?.fetchData || undefined,
    fetchEndpoint: props?.fetchEndpoint || props?.config?.fetchEndpoint || undefined,
    fetchMethod: props?.fetchMethod || props?.config?.fetchMethod || 'POST',

    actionsEndpoint: props?.actionsEndpoint || props.config?.actionsEndpoint?.method || undefined,
    actionsMethod: props?.actionsMethod || props.config?.actionsMethod?.method || 'POST',
  };

}

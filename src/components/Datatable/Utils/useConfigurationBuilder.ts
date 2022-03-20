import { Data } from '@/core/types';
import merge from 'lodash/merge';

export default function useConfigurationBuilder<Props extends Data>(props: Props){

  const defaultPooling = {
    enable: false,
    interval: 5,
    during: 60,
    stopWhenDataChanges: true,
  };

  const defaultOptions = {
    selectable: true,
    searchable: true,
    showSettings: true,
    showNumberOfItems: true,
    striped: false,
    compact: true,
    refreshable: true,
  };

  const defaultTranslations = {
    title: 'Items',
    subtitle: 'Here you can check your latest items',
    resource: 'Item',
    resources: 'Items',

    actionsButton: 'Actions',
    actionsSelectedRows: 'With :rows selected',

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
  };

  const defaultPerPageOptions = [
      { value: 5, label: '5 Items per page' },
      { value: 10, label: '10 Items per page' },
      { value: 50, label: '50 Items per page' },
      { value: 100, label: '100 Items per page' },
      { value: 300, label: '300 Items per page' },
  ];

  return {
    name: props?.uniqueName || props.config?.name,
    primaryKey: props?.primaryKey || props.config?.primaryKey,
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

    actionsEndpoint: props?.actionsEndpoint || props?.actionsEndpoint?.method || undefined,
    actionsMethod: props?.actionsMethod || props?.actionsMethod?.method || 'POST',
  };

}

<template>
  <div>
    <VanillaCard
      :subtitle="'Card'"
      :title="'Card Subtitle'"
    >
      <!-- Card / Table Actions -->
      <template #actions />
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
} from 'vue';

import {
    useBootVariant,
    useVariantProps,
    useConfigurationWithClassesList,
} from '@/core';

import {
    VanillaDatatableProps,
    VanillaDatatableClassesKeys,
    VanillaDatatableConfig,
    VanillaDatatableActions,
    VanillaDatatableColumns,
} from './index';

import {
    VanillaCard,
    VanillaButton,
    VanillaDropdown,
    VanillaDropdownOption,
} from '@/index';

import { ChevronDownIcon } from '@heroicons/vue/solid';

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

        const { localVariant } = useBootVariant(props, 'errors', ref(null));
        const { configuration } = useConfigurationWithClassesList<VanillaDatatableProps>(
            VanillaDatatableConfig,
            VanillaDatatableClassesKeys,
            localVariant,
        );

        const config = reactive({
            name: props?.uniqueName || props.config?.name,
            columns: props?.columns || props.config?.columns,
            options: props?.options || props.config?.options,
            actions: props?.actions || props.config?.actions,
            filters: props?.filters || props.config?.filters,

            perPageOptions: props?.perPageOptions || props.config?.perPageOptions,
            translations: props?.translations || props.config?.translations,

            fetchData: props?.fetchData || props.config?.fetchData,
            fetchEndpoint: props?.fetchEndpoint || props?.config?.fetchEndpoint,
            fetchMethod: props?.fetchMethod || props?.config?.fetchMethod,

            actionsEndpoint: props?.actionsEndpoint || props?.actionsEndpoint?.method,
            actionsMethod: props?.actionsMethod || props?.actionsMethod?.method,
        });

        console.log('Got Configuration', config);

        /**
         * Provided data
         */
        provide('configuration_vanilla', configuration);

        return {
            configuration,
            localVariant,
            props,
        };
    },
});
</script>

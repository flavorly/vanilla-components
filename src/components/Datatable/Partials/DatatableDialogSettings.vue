<template>
  <VanillaDialog
    v-model="isOpen"
    title="Settings"
  >
    <VanillaInputGroup
      label="Per Page"
      name="perPage"
      layout="inline"
      class="space-y-2"
    >
      <VanillaSelect
        v-model="perPage"
        name="perPage"
        :options="perPageOptions"
        @update:model-value="updatePerPage"
      />
    </VanillaInputGroup>

    <VanillaInputGroup
      label="Visibility"
      class="mt-4 space-y-4"
      name="hiddenColumns"
      layout="inline"
    >
      <div
        v-for="(column,index) in columns"
        :key="index"
        :class="{'mt-4': index > 0}"
      >
        <div class="relative flex items-start">
          <div class="flex items-center h-5">
            <VanillaCheckbox
              :name="column.name"
              :value="column.name"
              :checked="!hiddenColumns.includes(column.name)"
              @update:model-value="updateColumnsHidden($event, column)"
            />
          </div>
          <div class="ml-3 text-sm leading-5">
            <VanillaFormLabel
              :for="column.label"
              :label=" column.label"
            />
          </div>
        </div>
      </div>
    </VanillaInputGroup>
  </VanillaDialog>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, watch } from 'vue';
import VanillaDialog from '@/components/Dialog/Dialog.vue';
import VanillaSelect from '@/components/Select/Select.vue';
import VanillaCheckbox from '@/components/Checkbox/Checkbox.vue';
import VanillaInputGroup from '@/components/InputGroup/InputGroup.vue';
import VanillaFormLabel from '@/components/FormLabel/FormLabel.vue';
import { VanillaDatatableColumnComputed, VanillaDatatableColumnsComputed, VanillaDatatablePageOptions } from '../index';
import find from 'lodash/find';

export default defineComponent({
    name: 'VanillaDatatableDialogSettings',
    components: {
        VanillaDialog,
        VanillaSelect,
        VanillaCheckbox,
        VanillaInputGroup,
        VanillaFormLabel,
    },
    props: {
        perPageOptions: {
            type: [Object] as PropType<VanillaDatatablePageOptions>,
            required: true,
        },
        currentPerPage: {
            type: [Number] as PropType<number | string>,
            required: true,
        },
        columns: {
            type: [Array] as PropType<VanillaDatatableColumnsComputed>,
            required: true,
        },
    },
    emits: [
        'update:modelValue',
        'update:perPage',
        'update:columnsHidden',
    ],
    setup(props, { emit }){

        const isOpen = ref(false);
        const perPage = ref(props.currentPerPage);
        const useStorage = ref(true);
        const hiddenColumns = ref(find(props.columns, { visible: false }) || []) as Ref<string[]>;

        //console.log(props.columns, hiddenColumns);

        const updatePerPage = (value: number) => {
            emit('update:perPage', value);
        };

        const updateColumnsHidden = (status: boolean, column : VanillaDatatableColumnComputed) => {
            console.log(status, column);

            if (!status && !hiddenColumns.value.includes(column.name)) {
                hiddenColumns.value.push(column.name);
            }

            if (status) {
                const index = hiddenColumns.value.indexOf(column.name);
                if (index > -1) {
                    hiddenColumns.value.splice(index, 1);
                }
            }

            console.log(hiddenColumns.value);

            emit('update:columnsHidden', hiddenColumns.value);
        };

        watch(isOpen, (val: boolean) => {
            emit('update:modelValue', val);
        });

        return {
            isOpen,
            perPage,
            hiddenColumns,
            useStorage,
            updatePerPage,
            updateColumnsHidden,
        };
    },
});
</script>

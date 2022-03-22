<template>
  <VanillaDialog v-model="isOpen">
    <VanillaInputGroup
      label="Per Page"
      name="perPage"
      class="space-y-2"
    >
      <VanillaSelect
        v-model="perPage"
        name="perPage"
        :options="[
          {value: 5, text: '5 Items per Page'},
          {value: 10, text: '10 Items per Page'}
        ]"
      />
    </VanillaInputGroup>
  </VanillaDialog>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, ref, watch } from 'vue';
import { ExclamationIcon } from '@heroicons/vue/outline';
import VanillaDialog from '@/components/Dialog/Dialog.vue';
import VanillaSelect from '@/components/Select/Select.vue';
import VanillaCheckbox from '@/components/Checkbox/Checkbox.vue';
import VanillaInputGroup from '@/components/InputGroup/InputGroup.vue';

export default defineComponent({
    name: 'VanillaDatatableDialogSettings',
    components: {
        VanillaDialog,
        VanillaSelect,
        VanillaCheckbox,
        VanillaInputGroup,
        ExclamationIcon,
    },
    props: {
        action: {
            type: [Object, undefined] as PropType<object | undefined>,
            required: false,
            default: undefined,
        },
        countSelected: {
            type: [Number, String] as PropType<number | string>,
            required: true,
        },
        textTitle: {
            type: [String] as PropType<string>,
            required: true,
        },
        textConfirmActionText: {
            type: [String] as PropType<string>,
            required: true,
            default: 'Are you sure you want to perform this action?',
        },
        textConfirmActionButton: {
            type: [String] as PropType<string>,
            required: true,
            default: 'Yes, I\'v Confirmed',
        },
        textCancelActionButton: {
            type: [String] as PropType<string>,
            required: true,
            default: 'Nah, Cancel',
        },
    },
    emits: [
        'update:modelValue',
        'actionCanceled',
        'actionConfirmed',
    ],
    setup(props, { emit }){

        const isOpen = ref(false);
        const perPage = ref(5);
        const hiddenColumns = ref([]);
        const useStorage = ref(true);

        return {
            isOpen,
            perPage,
            hiddenColumns,
            useStorage,
        };
    },
});
</script>

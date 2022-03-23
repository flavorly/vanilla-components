<template>
  <optgroup
    v-if="hasChildren"
    :data-value="option.value !== undefined ? String(option.value) : undefined"
    :label="option.text !== undefined ? String(option.text) : undefined"
    :disabled="!! option.disabled"
    :class="classesList.optgroupLabel"
  >
    <VanillaSelectOption
      v-for="(childrenOption, index) in option.children"
      :key="`${childrenOption.value}-${childrenOption.text}-${index}`"
      :option="childrenOption"
      :class="classesList.optGroup"
    />
  </optgroup>
  <option
    v-else
    :value="option.value === null ? undefined : option.value"
    :disabled="!! option.disabled"
    :class="classesList.optGroup"
    v-text="option.text"
  />
</template>

<script lang="ts">
import { NormalizedOption } from '@/core/types';
import { computed, defineComponent, PropType } from 'vue';
import { useInjectsClassesList } from '@/core';

export default defineComponent({
    name: 'VanillaSelectOption',
    compatConfig: {
        MODE: 3,
    },
    props: {
        option: {
            type: [Object] as PropType<NormalizedOption>,
            required: true,
        },
        safe: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
    },
    setup(props){
        const classesList = useInjectsClassesList()!;
        const hasChildren = computed(() => props.option.children !== undefined && props.option.children.length > 0);

        return {
            classesList,
            hasChildren,
        };
    },
});
</script>

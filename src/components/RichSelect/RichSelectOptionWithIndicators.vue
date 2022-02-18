<template>
  <div
    class="relative"
    :class="parentClasses"
  >
    <div class="relative">
      <div
        :class="[selected ? 'font-semibold' : 'font-normal','block']"
        class="flex items-center space-x-2 text-sm"
      >
        <span
          class="flex-shrink-0 inline-block h-2 w-2 rounded-full"
          :class="indicatorClass"
          aria-hidden="true"
        />
        <span
          class="block whitespace-nowrap truncate"
          v-html="name"
        />
      </div>
    </div>
    <div
      v-if="description"
      class="w-100 text-xs text-left mt-1"
      :class="[selected ? 'font-normal opacity-60' : 'opacity-60']"
      v-html="description"
    />
    <span
      v-if="selected"
      class="absolute inset-y-0 right-0 flex items-center pl-3 pr-3 text-amber-600"
    >
      <slot name="selectedIcon">
        <CheckIcon
          aria-hidden="true"
          class="w-5 h-5"
        />
      </slot>
    </span>
  </div>
</template>
<script lang="ts">
import { CheckIcon } from '@heroicons/vue/solid';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'VanillaRichSelectOptionWithIndicators',
    components: {
        CheckIcon,
    },
    props: {
        name: {
            type: String,
            default: undefined,
        },
        status: {
            type: String,
            required: true,
        },
        selected: {
            type: Boolean,
            default: false,
        },
        description: {
            type: [String] as PropType<string | undefined>,
            default: undefined,
        },
        hasErrors: {
            type: Boolean,
            default: false,
        },
        parentClasses: {
            type: [String, Array] as PropType<string | string[]>,
            default: '',
        },
    },
    setup(props) {

        const indicatorClass = {
            'green' : 'bg-green-400',
            'gray': 'bg-gray-200',
            'red' : 'bg-red-400',
            'yellow': 'bg-yellow-400',
            'blue': 'bg-blue-400',
        }[props.status];

        return {
            props,
            indicatorClass,
        };
    },
});
</script>


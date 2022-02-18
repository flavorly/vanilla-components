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
        <div
          class="flex-shrink-0 w-6 h-6 bg-gray-500 dark:bg-gray-800 bg-center bg-cover rounded-full border border-gray-300 dark:border-gray-500 shadow"
          :style="{ backgroundImage: `url(${image})` }"
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
    name: 'VanillaRichSelectOptionWithImage',
    components: {
        CheckIcon,
    },
    props: {
        name: {
            type: String,
            default: undefined,
        },
        image: {
            type: String,
            default: undefined,
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
        return {
            props,
        };
    },
});
</script>


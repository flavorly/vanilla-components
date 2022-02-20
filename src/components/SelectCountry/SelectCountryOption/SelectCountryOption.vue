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
        <suspense>
          <vanilla-flag-icon
            class="flex-shrink-0 w-6 h-6"
            :country="country"
          />
          <template #fallback>
            <div class="flex-shrink-0 w-[24px] h-[16px] bg-gray-300 animate-pulse rounded-sm" />
          </template>
        </suspense>
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
import { defineComponent, PropType } from 'vue';
import VanillaFlagIcon from '@/components/Icons/FlagIcon/Index.vue';
import { CheckIcon } from '@heroicons/vue/solid';

export default defineComponent({
    name: 'VanillaSelectCountryOption',
    components: {
        VanillaFlagIcon,
        CheckIcon,
    },
    props: {
        name: {
            type: String,
            default: undefined,
        },
        country: {
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
        return {
            props,
        };
    },
});
</script>


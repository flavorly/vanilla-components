<template>
  <!-- Normal -->
  <div
    v-if="layout === 'default'"
    class="form-row-default"
  >
    <div
      v-if="$slots['label']"
      class="form-row-default-label"
    >
      <slot name="label" />
    </div>
    <div class="form-row-default-input">
      <slot />
    </div>
  </div>

  <!-- Content Line -->
  <div
    v-else-if="layout === 'content'"
    class="form-row-content"
  >
    <span v-if="$slots['label']">
      <slot name="label" />
    </span>
    <slot />
  </div>
  <!-- Naked -->
  <div
    v-else-if="layout === 'naked'"
  >
    <div v-if="$slots['label']">
      <slot name="label" />
    </div>
    <slot />
  </div>

  <!-- Standard -->
  <div
    v-else
    class="form-row-standard"
  >
    <span
      v-if="$slots['label']"
      class="label"
    >
      <slot name="label" />
    </span>
    <slot />
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue/dist/vue';
import { Errors } from '@/core/types';

export default {
    name: 'VanillaInputLayout',
    props: {
        layout: {
            type: [String],
            default: 'naked',
            required: false,
            validate: (rowStyle: string) => {
                return ['default', 'content', 'standard', 'naked'].includes(rowStyle);
            },
        },
        errors: {
            type: [String, Array, Object] as PropType<Errors>,
            default: undefined,
        },
    },
};
</script>

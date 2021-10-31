<template>
  <component
    :is="as"
    :class="{
      'btn-primary': variant === 'primary',
      'btn-danger': variant === 'danger',
      'btn': variant === 'secondary',
      'opacity-100': loading && !invalid,
      'opacity-50': invalid,
      'cursor-not-allowed': invalid || loading,
    }"
    @click="$emit('click',$event)"
  >
    <span class="flex items-center space-x-1">
      <span v-show="loading">
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </span>
      <span
        v-show="!loading && $slots.icon"
        class="mr-1"
      >
        <slot name="icon" />
      </span>
      <slot />
    </span>
  </component>
</template>
<script>

export default {
  name: 'XButton',
  props: {
    variant: {
      type: String,
      required: false,
      default: 'primary',
    },
    as: {
      type: String,
      required: false,
      default: 'button',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
}
</script>

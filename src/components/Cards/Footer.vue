<template>
  <!-- Simple aligned left/right or just none -->
  <div
    v-if="type === 'simple'"
    :class="{
      'justify-end text-right px-4 py-3 flex items-center text-right sm:px-6': align === 'right',
      'justify-start text-left px-4 py-3 flex items-center text-right sm:px-6': align === 'left',
      'justify-center text-center px-4 py-3 flex items-center text-right sm:px-6': align === 'center',
      'p-4 sm:p-6': align === 'none',
      'border-t border-gray-200 dark:border-gray-700': border
    }"
  >
    <slot />
  </div>

  <!-- Grided with columns -->
  <div
    v-else-if="type === 'grid'"
    :class="{
      'sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense': parseInt(columns) === 1,
      'sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense': parseInt(columns) === 2,
      'sm:grid sm:grid-cols-3 sm:gap-3 sm:grid-flow-row-dense': parseInt(columns) === 3,
      'border-t border-gray-200 dark:border-gray-700': border
    }"
    class="p-4 sm:p-6"
  >
    <slot />
  </div>

  <!--Gride'd card footer with section on left and right that on mobile will turn responsive -->
  <div
    v-else-if="type === 'split'"
    :class="{'border-t border-gray-200 dark:border-gray-700': border}"
    class="sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense px-4 py-4 sm:px-6"
  >
    <div class="flex mt-0 ml-0 items-center justify-center sm:justify-start mb-2 sm:mb-0">
      <slot name="left" />
    </div>

    <div class="flex mt-0 sm:mt-0 items-center justify-center sm:justify-end">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
    name: 'VanillaCardFooter',
    props: {
        columns: {
            type: [Number, String],
            default: 1,
            required: false
        },
        type: {
            type: String,
            default: 'simple',
            required: false
        },
        align: {
            type: String,
            default: 'right',
            required: false
        },
        border: {
            type: [Boolean, String],
            default: true,
            required: false
        }
    }
}
</script>

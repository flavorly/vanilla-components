<template>
  <!-- Normal -->
  <div
    v-if="layout === 'default'"
    class="form-row-default"
  >
    <div class="form-row-default-label">
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
    <span v-if="$slots['label']">
      <slot name="label" />
    </span>
    <slot />
  </div>
</template>

<script>
export default {
    name: "VanillaInputLayout",
    props: {
        layout: {
            type: [String],
            default: 'naked',
            required: false,
            validate: (rowStyle) => {
                return ['default', 'content', 'standard', 'naked'].includes(rowStyle)
            },
        },
    },
}
</script>

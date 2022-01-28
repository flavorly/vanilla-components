<template>
  <div
    v-if="error"
    class="text-red-400 mt-1 text-xs"
  >
    <span
      v-if="safe"
      v-html="error"
    />
    <span v-else>{{ error }}</span>
  </div>
</template>

<script>
export default {
    name: 'VanillaFormErrors',
    props: {
        error: {
            type: [String, Array],
            default: null,
            required: false
        },
        safe: {
            type: Boolean,
            default: true,
            required: false
        },
    }
}
</script>

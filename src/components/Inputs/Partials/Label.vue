<template>
  <label
    :for="labelFor"
    class="block font-medium text-sm text-gray-700 dark:text-white mb-2"
  >
    <span v-if="value">{{ value }}</span>
    <span v-else><slot /></span>
  </label>
</template>

<script>
export default {
    name: 'VanillaFormLabel',
    props: {
        value: {
            type: [String],
            default: '',
            required: false
        },
        labelFor: {
            type: [String],
            default: '',
            required: false
        },
    }
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@indigit/vanilla-components'

// The current variant
const variant = ref('superCool')

// A List of our own variants
const variants = {
  cool: {
    classes: {
      button: 'rounded-md sm:text-sm text-base font-medium leading-6 whitespace-nowrap focus:outline-none focus:ring-2 dark:focus:ring-offset-gray-900 focus:ring-primary-600 text-gray-700 focus:text-gray-600 dark:text-white dark:hover:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 dark:focus:border-primary-600',
    },
  },
  superCool: {
    classes: {
      button: 'inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-primary-100 border border-primary-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-pink-500 via-primary-500 to-primary-500',
    },
  },
}

const clickHandler = () => variant.value = variant.value === 'cool' ? 'superCool' : 'cool'
</script>

<template>
  <Button
    label="👉 Click me to change!"
    :variant="variant"
    :variants="variants"
    @click="clickHandler"
  />
</template>

<script setup lang="ts">
import { Toggle } from '@flavorly/vanilla-components'
import { ref } from 'vue'

const value = ref('accepted')
const value2 = ref(true)
const valueMultiple = ref([])
</script>

<template>
  <PreviewWrapper>
    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <!-- Regular -->
      <Toggle
        v-model="value"
        value="accepted"
        checked-value="accepted"
        unchecked-value="notAccepted"
        feedback="Im useful helper out here, choose wisely"
        align="center-center"
      />
    </div>

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre class="text-xs">{{ JSON.stringify(value) }}</pre>
    </div>

    <div class="h-1 my-5" />

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <!-- Disabled -->
      <Toggle
        v-model="value"
        :disabled="true"
        value="accepted"
        checked-value="accepted"
        unchecked-value="notAccepted"
        feedback="Im disabled and you shouldnt be able to toggle me"
        align="center-center"
      />
    </div>

    <div class="h-1 my-5" />

    <div class="flex items-center justify-center space-x-2">
      <!-- Multiple -->
      <Toggle
        v-model="valueMultiple"
        value="accepted"
        checked-value="accepted"
        unchecked-value="notAccepted"
        class="inline-flex"
      />

      <Toggle
        v-model="valueMultiple"
        value="accepted2"
        checked-value="accepted2"
        unchecked-value="notAccepted2"
        class="inline-flex"
      />
    </div>

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre class="text-xs">{{ JSON.stringify(valueMultiple) }}</pre>
    </div>

    <div class="h-1 my-5" />

    <!-- Errors -->
    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <Toggle
        v-model="value2"
        errors="Sorry for this name is already taken"
        feedback="I only show when i dont have errors"
        align="center-center"
      />
    </div>

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre class="text-xs">{{ JSON.stringify(value2) }}</pre>
    </div>
  </PreviewWrapper>
</template>

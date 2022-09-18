<script setup type="ts">
import { VanillaPhoneNumber } from '@indigit/vanilla-components'
import { defineComponent, onMounted, ref } from 'vue'

defineComponent({ name: 'ExamplePhoneNumber' })
onMounted(() => window.parent.postMessage('mounted', '*'))

const value = ref('+35191523813')
const valueCountry = 'PT'

const value2 = ref('915279172')
const value2Country = 'PT'
</script>

<template>
  <PreviewWrapper>
    <div class="h-[500px]">
      <VanillaPhoneNumber
        v-model="value"
        :country-code="valueCountry"
        feedback="Im useful helper out here, choose wisely"
        :favorite-countries="['PT', 'ES', 'US']"
        country-placeholder="Pick your phone country"
        phone-placeholder="National Number"
      />

      <div class="flex items-center justify-center mx-auto text-center mt-2">
        <pre>{{ JSON.stringify(value) }}</pre>
      </div>

      <div class="h-1 my-5" />

      <!-- Regular -->
      <VanillaPhoneNumber
        v-model="value2"
        :country-code="value2Country"
        feedback="Im useful helper out here, choose wisely"
        errors="Sorry but your phone number looks to be invalid."
        country-placeholder="Pick your phone country"
        phone-placeholder="National Number"
      />

      <div class="flex items-center justify-center mx-auto text-center mt-2">
        <pre>{{ JSON.stringify(value2) }}</pre>
      </div>
    </div>
  </PreviewWrapper>
</template>

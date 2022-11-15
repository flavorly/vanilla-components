<script setup lang="ts">
import { CountryInput } from '@favlorly/vanilla-components'
import { ref } from 'vue'

const value = ref('PT')
const valueErrors = ref('US')
</script>

<template>
  <PreviewWrapper>
    <div class="grid space-y-2">
      <!-- Regular -->
      <CountryInput
        v-model="value"
        placeholder="Simple with icon"
        feedback="You can add SVGs as addons before & After"
      />
      <!-- Errors -->
      <CountryInput
        v-model="valueErrors"
        placeholder="Elon Musk"
        feedback="Im showing only because you cleared errors"
        errors="We have a problem Musk, Abort! Write to clear"
      />
    </div>
  </PreviewWrapper>
</template>

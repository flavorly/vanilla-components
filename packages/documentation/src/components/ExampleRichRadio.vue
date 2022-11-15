<script setup lang="ts">
import { RichRadio } from '@favlorly/vanilla-components'
import { ref } from 'vue'
const value = ref('vps1')
const value2 = ref('vps1')

const options = [
    { value: 'vps1', text: 'VPS X €99', description: 'You can add more information here' },
    { value: 'vps2', text: 'VPS T €39', description: 'You can add more information here' },
    { value: 'vps3', text: 'VPS L €29', description: 'Currently out of stock folks.', disabled: true },
]

const options2 = [
  { value: 'vps1', text: 'Dedicated J €99', description: 'You can add more information here' },
  { value: 'vps2', text: 'Dedicated T €39', description: 'You can add more information here' },
  { value: 'vps3', text: 'Dedicated L €29', description: 'Currently out of stock folks.', disabled: true },
]
</script>

<template>
  <PreviewWrapper>
    <div class="space-y-2">
      <!-- Regular -->
      <div class="w-full">
        <RichRadio
          v-model="value"
          :options="options"
          feedback="Im useful helper out here, choose wisely"
        />
      </div>

      <!-- With Errors -->
      <div class="w-full">
        <RichRadio
          v-model="value2"
          :options="options2"
          errors="Sorry but you cannot purchase this at this time."
        />
      </div>
    </div>
  </PreviewWrapper>
</template>

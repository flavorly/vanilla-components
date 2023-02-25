<script setup lang="ts">
import { RichRadio } from '@flavorly/vanilla-components'
import { ref } from 'vue'
const value = ref('vps1')
const value2 = ref('vps1')
const value3 = ref('vps1')

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

const options3 = [
  { value: 'vps1', text: 'Dedicated J €99', description: 'You can add more information here', image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { value: 'vps2', text: 'Dedicated T €39', description: 'You can add more information here', image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { value: 'vps3', text: 'Dedicated L €29', description: 'Currently out of stock folks.', disabled: true, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
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

      <!-- With Slots -->
      <div class="w-full">
        <RichRadio
          v-model="value3"
          :options="options3"
        >
          <template #labelText="{ option }">
            <div class="inline-flex space-x-2">
              <img
                :src="option?.raw?.image"
                class="rounded-full h-5 w-5 shadow"
              >
              <span>{{ option?.text }}</span>
            </div>
          </template>
        </RichRadio>
      </div>
    </div>
  </PreviewWrapper>
</template>

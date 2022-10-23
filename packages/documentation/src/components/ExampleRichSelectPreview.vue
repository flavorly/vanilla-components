<script setup lang="ts">
import { FormLabel, RichSelect } from '@indigit/vanilla-components'
import { ref } from 'vue'
const value = ref('Option 1')
const value2 = ref(['Option 1', 'Option 2'])
const options = [
    { value: 'Option 1', text: 'One Option' },
    { value: 'Option 2', text: 'Two Options' },
    { value: [{ anotherObject: true, nested: 'deep' }], text: 'Complex Object' },
]
</script>

<template>
  <PreviewWrapper>
    <div class="space-y-2">
      <!-- Regular -->
      <div class="w-full">
        <RichSelect
          v-model="value"
          :options="options"
          :clearable="true"
          feedback="Im useful helper out here, choose wisely"
          placeholder="Please select an option"
          multiple
        />
      </div>
      <!-- With Multiple Options -->
      <div class="w-full">
        <RichSelect
          v-model="value2"
          :options="options"
          :clearable="true"
          feedback="Im useful helper out here, choose wisely"
          placeholder="Please select an option"
          multiple
          tags
        />
      </div>
    </div>
  </PreviewWrapper>
</template>

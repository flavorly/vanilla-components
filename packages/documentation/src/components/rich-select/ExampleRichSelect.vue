<script setup type="ts">
import { RichSelect } from '@indigit/vanilla-components'
import { ref } from 'vue'
const value = ref('Option 1')
const options = [
    { value: 'Option 1', text: 'One Option' },
    { value: 'Option 2', text: 'Two Options' },
    {
        value: [
            {
                anotherObject: true,
                nested: 'deep',
            },
        ],
        text: 'Complex Object',
    },
]
</script>

<template>
  <PreviewWrapper>
    <!-- Regular -->
    <div class="w-full">
      <RichSelect
        v-model="value"
        :options="options"
        :clearable="true"
        feedback="Im useful helper out here, choose wisely"
        placeholder="Please select an option"
        multiple
        tags
      />
      <p>{{ value }}</p>
    </div>
  </PreviewWrapper>
</template>

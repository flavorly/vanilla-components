<script setup type="ts">
import { VanillaDropdown, VanillaDropdownOption } from '@indigit/vanilla-components'
import { defineComponent, ref } from 'vue'
import { CheckCircleIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/solid/index.js'

defineComponent({ name: 'ExampleDropdown' })

const value = ref(true)
</script>

<template>
  <PreviewWrapper>
    <div class="h-[200px]">
      <div class="flex items-center justify-center mx-auto">
        <!-- Regular -->
        <VanillaDropdown
          v-model="value"
          text="Options"
        >
          <!-- Option -->
          <VanillaDropdownOption>
            <DocumentDuplicateIcon class="w-5 h-5 mr-2" />
            <span>Copy Stuff</span>
          </VanillaDropdownOption>
          <!-- Option -->
          <VanillaDropdownOption>
            <CheckCircleIcon class="w-5 h-5 mr-2" />
            <span>Mark as Done</span>
          </VanillaDropdownOption>
        </VanillaDropdown>
      </div>

      <div class="flex items-center justify-center mx-auto text-center mt-2">
        <pre>{{ JSON.stringify(value) }}</pre>
      </div>
    </div>
  </PreviewWrapper>
</template>

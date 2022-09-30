<script setup type="ts">
import { Dropdown, DropdownOption, DropdownSimple } from '@indigit/vanilla-components'
import { defineComponent, ref } from 'vue'
import { CheckCircleIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/solid/index.js'

defineComponent({ name: 'ExampleDropdown' })

const value = ref(true)
</script>

<template>
  <PreviewWrapper>
    <div class="h-[200px]">
      <div class="flex items-center justify-center mx-auto">
        <Dropdown
          v-model="value"
          text="Options"
        >
          <!-- Option -->
          <DropdownOption>
            <DocumentDuplicateIcon class="w-5 h-5 mr-2" />
            <span>Copy Stuff</span>
          </DropdownOption>
          <!-- Option -->
          <DropdownOption>
            <CheckCircleIcon class="w-5 h-5 mr-2" />
            <span>Mark as Done</span>
          </DropdownOption>
        </Dropdown>
      </div>

      <div class="flex items-center justify-center mx-auto text-center mt-2">
        <pre>{{ JSON.stringify(value) }}</pre>
      </div>

      <div class="mt-10">
        <DropdownSimple text="demo">
          <p>content</p>
        </DropdownSimple>
      </div>
    </div>
  </PreviewWrapper>
</template>

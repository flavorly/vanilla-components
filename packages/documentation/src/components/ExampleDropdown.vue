<script setup lang="ts">
import { Button, Dropdown, DropdownMenu, DropdownOption } from '@flavorly/vanilla-components'
import { ref } from 'vue'
import { CheckCircleIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/solid/index.js'

const value = ref(false)
const value2 = ref(false)
</script>

<template>
  <PreviewWrapper>
    <div class="h-[200px]">
      <div class="flex items-center justify-center mx-auto">
        <DropdownMenu
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
        </DropdownMenu>
      </div>

      <div class="flex items-center justify-center mx-auto">
        <DropdownMenu
          v-model="value2"
          overlay
          text="Dropdown with Overlay"
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
        </DropdownMenu>
      </div>

      <div class="mt-10 flex items-center justify-center mx-auto">
        <Dropdown :teleport="true">
          <template #trigger>
            <Button class="btn">
              Click here
            </Button>
          </template>
          <div class="py-2 px-2 grid grid-cols-1 gap-2">
            <Button>Im a button inside this</Button>
            <Button>Im a button inside this</Button>
          </div>
        </Dropdown>
      </div>
    </div>
  </PreviewWrapper>
</template>

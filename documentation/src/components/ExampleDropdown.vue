<script setup lang="ts">
import { Button, Dropdown, DropdownMenu, DropdownOption } from '@flavorly/vanilla-components'
import { ref } from 'vue'
import CheckCircleIcon from '~icons/heroicons/check-circle-solid'
import DocumentDuplicateIcon from '~icons/heroicons/document-duplicate-solid'

const value = ref(false)
const valueDisabled = ref(false)
const value2 = ref(false)
</script>

<template>
  <PreviewWrapper>
    <div class="h-[200px]">
      <div class="flex flex-col items-center justify-center mx-auto space-y-3 ">
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

        <DropdownMenu
          v-model="value"
          :disabled="true"
          text="Disabled"
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
    </div>
  </PreviewWrapper>
</template>

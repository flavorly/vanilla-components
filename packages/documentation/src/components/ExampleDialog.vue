<script setup lang="ts">
import { Button, Dialog } from '@indigit/vanilla-components'
import { CheckIcon } from '@heroicons/vue/24/solid/index.js'
import { ref } from 'vue'
const open = ref(false)
const open2 = ref(false)
</script>

<template>
  <PreviewWrapper>
    <div class="flex space-x-2">
      <Button
        label="Open Dialog"
        @click="open = !open"
      />

      <Button
        label="Open another Dialog"
        @click="open2 = !open2"
      />
    </div>

    <Dialog
      v-model="open"
      :divided="false"
      :padding-on-modal="true"
    >
      <div>
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckIcon
            class="h-6 w-6 text-green-600"
            aria-hidden="true"
          />
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            🎉 Thank you for testing Vanilla!
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6">
        <Button
          type="button"
          class="w-full"
          variant="primary"
          @click="open = false"
        >
          Yeah, now close me.
        </Button>
      </div>
    </Dialog>

    <Dialog
      v-model="open2"
      :divided="true"
      :padding-on-modal="false"
      :body-with-padding="true"
      title="Another Dialog"
    >
      <div class="mt-3 text-center sm:mt-5">
        <p class="text-sm text-gray-500">
          This is just another modal, divided, and with padded body
          and also two action buttons.
        </p>
      </div>
      <template #footer>
        <Button
          type="button"
          variant="primary"
          @click="open2 = false"
        >
          Yeah, now close me.
        </Button>
        <Button
          type="button"
          variant="secondary"
          @click="open2 = false"
        >
          No wait.
        </Button>
      </template>
    </Dialog>
  </PreviewWrapper>
</template>

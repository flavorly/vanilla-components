<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from '@flavorly/vanilla-components'
import { TransitionRoot } from '@headlessui/vue'

const title = ref('You just got paid!')
const show = ref(true)
const showInfo = ref(true)
const showSuccess = ref(true)
const close = () => {
  show.value = false
  setTimeout(() => {
    title.value = 'You just got paid again!'
    show.value = true
  }, 2000)
}
const closeInfo = () => {
  showInfo.value = false
  setTimeout(() => (showInfo.value = true), 2000)
}
const closeSuccess = () => {
  showSuccess.value = false
  setTimeout(() => (showSuccess.value = true), 2000)
}
</script>

<template>
  <PreviewWrapper>
    <div class="flex flex-col gap-y-2">
      <TransitionRoot
        :show="show"
        enter="ease-out duration-300"
        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leave-from="opacity-100 translate-y-0 sm:scale-100"
        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <Alert
          :title="title"
          :close-after="3000"
          @close="close"
        />
      </TransitionRoot>

      <TransitionRoot
        :show="showSuccess"
        enter="ease-out duration-300"
        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leave-from="opacity-100 translate-y-0 sm:scale-100"
        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <Alert
          variant="success"
          title="Order completed"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam."
        >
          <template #actions>
            <button
              type="button"
              class="rounded-md bg-green-50 dark:bg-green-200 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 dark:focus:ring-offset-green-200"
            >
              View status
            </button>

            <button
              type="button"
              class="ml-3 rounded-md bg-green-50 dark:bg-green-200 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 dark:focus:ring-offset-green-200"
              @click="closeSuccess"
            >
              Dismiss
            </button>
          </template>
        </Alert>
      </TransitionRoot>

      <Alert
        variant="warning"
        title="Attention needed"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam quo totam eius aperiam dolorum."
      />

      <Alert
        variant="error"
        title="There were 2 errors with your submission"
      >
        <template #subtitle>
          <ul
            role="list"
            class="list-disc space-y-1 pl-5"
          >
            <li>Your password must be at least 8 characters</li>
            <li>Your password must include at least one pro wrestling finishing move</li>
          </ul>
        </template>
      </Alert>

      <TransitionRoot
        :show="showInfo"
        enter="ease-out duration-300"
        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leave-from="opacity-100 translate-y-0 sm:scale-100"
        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <Alert
          variant="info"
          title="A new software update is available. See what’s new in version 2.0.4."
          closable
          @close="closeInfo"
        />
      </TransitionRoot>
    </div>
  </PreviewWrapper>
</template>

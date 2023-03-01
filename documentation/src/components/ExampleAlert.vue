<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Alert } from '@flavorly/vanilla-components'

const title = ref('You just got paid!')
const show = ref(true)
const showInfo = ref(true)
const showSuccess = ref(true)
const showWithVModel = ref(true)
const showWithVModel2 = ref(true)

const counter = ref(0)

const close = () => {
    setTimeout(() => {
      counter.value += 1
      title.value = `You just got paid again! Times: ${counter.value}`
      showWithVModel2.value = true
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

onMounted(() => {
  setInterval(() => (showWithVModel.value = true), 5000)
})
</script>

<template>
  <PreviewWrapper>
    <div class="flex flex-col space-y-2">
      <h3>Solid Colors</h3>
      <Alert
        v-model="showWithVModel2"
        :title="title"
        :timeout="3000"
        closable
        @close="close"
      />

      <Alert
        variant="success"
        title="Order completed"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam."
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

      <Alert
        variant="warning"
        title="Attention needed"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam quo totam eius aperiam dolorum."
      />

      <Alert
        variant="error"
        title="There were 2 errors with your submission"
      >
        <template #text>
          <ul
            role="list"
            class="list-disc space-y-1 pl-5"
          >
            <li>Your password must be at least 8 characters</li>
            <li>Your password must include at least one pro wrestling finishing move</li>
          </ul>
        </template>
      </Alert>

      <Alert
        variant="info"
        title="A new software update is available. See what’s new in version 2.0.4."
        closable
        @close="closeInfo"
      />

      <Alert
        variant="info"
        icon="info"
        title="Hey, i can also use icons here if needed!"
        closable
        @close="closeInfo"
      />
      <Alert
        variant="warning"
        icon="warning"
        title="There is also a slot to change the icon"
      >
        <template #icon>
          🥶
        </template>
      </Alert>

      <h3>Muted Colors</h3>

      <Alert
        v-model="showWithVModel"
        variant="muted"
        closable
        subtitle="Something can go here as well"
        title="This is called a `warning-muted` variant with a nice touch with the primary color"
      />

      <Alert
        variant="warning-muted"
        title="Attention needed"
        text="This is called a `warning-muted` variant in a nice green text"
        closable
      />

      <Alert
        variant="error-muted"
        title="Attention needed"
        text="This is called a `error-muted` variant in a nice red text"
        closable
      />

      <Alert
        variant="info-muted"
        title="Attention needed"
        text="This is called a `info-muted` variant in a nice blue text"
        closable
      />

      <Alert
        variant="success-muted"
        title="Attention needed"
        text="This is called a `success-muted` variant in a nice green text"
        closable
      />
    </div>
  </PreviewWrapper>
</template>

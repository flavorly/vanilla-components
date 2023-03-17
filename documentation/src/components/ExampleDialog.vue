<script setup lang="ts">
import { Button, Dialog, RichSelect } from '@flavorly/vanilla-components'
import { ref } from 'vue'
import CheckIcon from '~icons/heroicons/check-solid'
const open = ref(false)
const open2 = ref(false)
const valueFromSelect = ref()
const shouldDivide = ref(false)
const position = ref('center')

const openDivided = () => {
  open2.value = !open2.value
  shouldDivide.value = true
}

const openPlain = () => {
  open2.value = !open2.value
  shouldDivide.value = false
}

const openAligned = (align = 'center') => {
  open2.value = !open2.value
  position.value = align
  shouldDivide.value = false
}
</script>

<template>
  <PreviewWrapper>
    <div class="flex flex-col items-center justify-center mx-auto space-y-3 ">
      <Button
        label="Open Dialog"
        @click="open = !open"
      />

      <Button
        label="Open another Dialog"
        @click="openPlain"
      />

      <Button
        label="Open Divided Dialog"
        @click="openDivided"
      />

      <Button
        label="Centered Dialog"
        @click="openAligned('center')"
      />

      <Button
        label="Bottom Dialog"
        @click="openAligned('bottom')"
      />

      <Button
        label="Bottom Dialog"
        @click="openAligned('top')"
      />
    </div>

    <Dialog v-model="open">
      <div>
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckIcon
            class="h-6 w-6 text-green-600"
            aria-hidden="true"
          />
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            🎉 Thank you for testing Vanilla!
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
            </p>
          </div>

          <div class="my-2">
            <RichSelect
              v-model="valueFromSelect"
              :options="[
                { value: 'Option 1', text: 'One Option' },
                { value: 'Option 2', text: 'Two Options' },
              ]"
              :teleport="true"
              :clearable="true"
              :hide-search-box="true"
              feedback="Im useful helper out here, choose wisely"
              placeholder="Please select an option"
            />
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
      :divided="shouldDivide"
      :position="position"
      title="Another Dialog"
    >
      <div class="text-center">
        <p class="text-sm text-gray-500 dark:text-gray-200">
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

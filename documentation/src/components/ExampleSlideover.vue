<script setup lang="ts">
import { Button, Slideover } from '@flavorly/vanilla-components'
import { ref } from 'vue'
const openRight = ref(false)
const openLeft = ref(false)
const openTop = ref(false)
const openBottom = ref(false)
</script>

<template>
  <PreviewWrapper>
    <div class="flex flex-col items-center justify-center mx-auto space-y-3 ">
      <Button
        label="Open from Right"
        @click="openRight = !openRight"
      />

      <Button
        label="Open from Left"
        @click="openLeft = !openLeft"
      />
      <Button
        label="Open from Top"
        @click="openTop = !openTop"
      />

      <Button
        label="Open from Bottom"
        @click="openBottom = !openBottom"
      />
    </div>

    <Slideover
      v-model="openLeft"
      :teleport="false"
      position="left"
      title="Payments"
      subtitle="Want to create new payments? Worry not, this a demo payment slideover"
    >
      <div class="absolute inset-0 px-4 sm:px-6">
        <div
          class="h-full border-2 border-dashed border-gray-200 dark:border-gray-600"
        />
      </div>
    </Slideover>

    <Slideover
      v-model="openRight"
      :teleport="false"
      position="right"
      title="Payments"
      subtitle="Want to create new payments? Worry not, this a demo payment slideover"
    >
      <div class="absolute inset-0 px-4 sm:px-6">
        <div
          class="h-full border-2 border-dashed border-gray-200 dark:border-gray-600"
        />
      </div>
    </Slideover>

    <Slideover
      v-model="openTop"
      position="top"
      size="full"
      :teleport="false"
      title="Payments"
      subtitle="Want to create new payments? Worry not, this a demo payment slideover"
    >
      <div>
        <div
          class="h-full border-2 border-dashed border-gray-200 dark:border-gray-600"
        >
          Im a content here
        </div>
      </div>
    </Slideover>

    <Slideover
      v-model="openBottom"
      position="bottom"
      size="full"
      :teleport="false"
      title="Payments"
      subtitle="Want to create new payments? Worry not, this a demo payment slideover"
    >
      <div>
        <div
          class="h-full border-2 border-dashed border-gray-200 dark:border-gray-600"
        >
          Im a content here
        </div>
      </div>
    </Slideover>
  </PreviewWrapper>
</template>

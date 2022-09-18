<script setup type="ts">
import { VanillaAvatar } from '@indigit/vanilla-components'
import { defineComponent, ref } from 'vue'

defineComponent({ name: 'ExampleAvatar' })

const value = ref(null)
const value2 = ref(null)
</script>

<template>
  <PreviewWrapper>
    <!-- Regular -->
    <div class="text-center">
      <VanillaAvatar
        v-model="value"
        class="inline-flex"
        feedback="Im useful helper out here, choose wisely"
        placeholder="Elon Musk"
      />
    </div>

    <div class="text-center">
      <VanillaAvatar
        v-model="value2"
        placeholder="Type to clear errors"
        errors="Sorry for this name is already taken"
        feedback="I only show when i dont have errors"
      />
    </div>
  </PreviewWrapper>
</template>

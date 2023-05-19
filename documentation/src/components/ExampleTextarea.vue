<script setup lang="ts">
import { Textarea as VanillaTextArea } from '@flavorly/vanilla-components'
import { ref } from 'vue'
const value = ref(null)
const valueDisabled = ref(null)
const valueErrors = ref(null)
</script>

<template>
  <PreviewWrapper>
    <div class="grid space-y-2">
      <!-- Regular -->
      <VanillaTextArea
        v-model="value"
        placeholder="You can write something long here"
        feedback="You can add SVGs as addons before & After"
      />
      <!-- Errors -->
      <VanillaTextArea
        v-model="valueErrors"
        placeholder="You can also have a long story about Elon Musk memes on Twitter"
        feedback="Im showing only because you cleared errors"
        errors="We have a problem Musk, Abort! Write to clear"
      />
      <!-- Disabled -->
      <VanillaTextArea
        v-model="valueDisabled"
        :disabled="true"
        placeholder="Hey! Im disabled and you should be able to touch me :p"
        feedback="Im disabled and shouldnt be changed"
      />
    </div>
  </PreviewWrapper>
</template>

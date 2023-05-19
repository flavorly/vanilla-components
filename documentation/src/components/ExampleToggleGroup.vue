<script setup lang="ts">
import { ToggleGroup } from '@flavorly/vanilla-components'
import { ref } from 'vue'
const value = ref([])
const value2 = ref([])
</script>

<template>
  <PreviewWrapper>
    <ToggleGroup
      v-model="value"
      name="skills"
      :options="[
        { text: 'Vue', value: 'vue', description: 'Is Vue your stack?' },
        { text: 'React', value: 'react', description: 'React just sucks right?' },
        { text: 'Angular', value: 'angular', description: 'Lets not talk about angular' },
        { text: 'Svelte', value: 'svelte', description: 'Maybe we can try some day' },
        { text: 'Ember', value: 'ember', description: 'Good stuff, but... vue' },
      ]"
    />
    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre class="text-xs">{{ JSON.stringify(value) }}</pre>
    </div>

    <div class="h-1 my-5" />

    <div class="mb-5">
      Disabled Group
    </div>

    <ToggleGroup
      v-model="value2"
      name="disabled"
      :disabled="true"
      :options="[
        { text: 'Vue', value: 'vue2', description: 'Is Vue your stack?' },
        { text: 'React', value: 'react2', description: 'React just sucks right?' },
        { text: 'Angular', value: 'angular2', description: 'Lets not talk about angular' },
        { text: 'Svelte', value: 'svelte2', description: 'Maybe we can try some day' },
        { text: 'Ember', value: 'ember2', description: 'Good stuff, but... vue' },
      ]"
    />
    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre class="text-xs">{{ JSON.stringify(value) }}</pre>
    </div>
  </PreviewWrapper>
</template>

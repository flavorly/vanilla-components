<script setup lang="ts">
import { ToggleGroup } from '@indigit/vanilla-components'
import { ref } from 'vue'
const value = ref([])
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
  </PreviewWrapper>
</template>

<script setup lang="ts">
import { CheckboxGroup } from '@flavorly/vanilla-components'
import { ref } from 'vue'
const value = ref([])
const value2 = ref([])
</script>

<template>
  <PreviewWrapper>
    <div>
      <CheckboxGroup
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
    </div>
    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre class="text-xs">{{ JSON.stringify(value) }}</pre>
    </div>

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      Everything disabled
    </div>

    <div>
      <CheckboxGroup
        v-model="value2"
        :disabled="true"
        name="skills"
        :options="[
          { text: 'Cant', value: 'cat', description: 'Try it?' },
          { text: 'Touch', value: 'touch', description: 'Try it again?' },
          { text: 'This', value: 'this', description: 'You shouldnt be allowed' },
          { text: 'tun', value: 'tun', description: 'Hum, not now' },
          { text: 'tunnene', value: 'tunnene', description: 'Ok, this is awkeredddd' },
          { text: 'yeah', value: 'yeah', description: 'Ok', disabled: true },
        ]"
      />
    </div>

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      Only certain options disabled
    </div>

    <div>
      <CheckboxGroup
        v-model="value2"
        name="skills"
        :options="[
          { text: 'Im allowed', value: 'allowed1' },
          { text: 'Im also allowed', value: 'allowed2' },
          { text: 'Im Forbidden', value: 'forbidden1', disabled: true },
          { text: 'Im allowed again', value: 'allowed3' },
          { text: 'Im Forbidden again', value: 'forbidden2', disabled: true },
        ]"
      />
    </div>
  </PreviewWrapper>
</template>

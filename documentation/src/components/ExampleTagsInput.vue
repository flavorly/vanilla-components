<script setup lang="ts">
import { TagsInput } from '@flavorly/vanilla-components'
import { ref } from 'vue'
const value = ref(['Apple', 'Windows', 'Linux'])
const value2 = ref([])
const value3 = ref([])
const value4 = ref(['Vue', 'Or Vue', 'Or Svelt'])
const value5 = ref(['Vue Reactivity System', 'React Reactivity System', 'Svelt Reactivity System'])
const value6 = ref([])
const allowedList = ref(['Bananas', 'Apples', 'Oranges', 'Pears'])
</script>

<template>
  <PreviewWrapper>
    <div class="grid space-y-2">
      <TagsInput
        v-model="value"
        placeholder="Write new tags here"
        feedback="Plain & Simple Example"
      />
      <TagsInput
        v-model="value2"
        placeholder="Write new tags here"
        feedback="You can add SVGs as addons before & After"
        :allow-symbols="false"
        :transform-value="(givenValue: string) => givenValue.toLowerCase()"
        errors="You can also provide your own errors"
      />
      <TagsInput
        v-model="value3"
        placeholder="Write new tags here"
        :feedback="`This field should only allow the following: ${allowedList.join(', ')}`"
        :allowed-options="allowedList"
      />
      <TagsInput
        v-model="value4"
        placeholder="Write new tags here"
        feedback="This should be disabled"
        :disabled="true"
      />
      <TagsInput
        v-model="value6"
        placeholder="Write new tags here"
        feedback="On this example all variables for the v-model will be transformed to upper-case and a emoji will be added at the end"
        :transform-value="(givenValue: string) => `${givenValue.toUpperCase()}👻`"
      />
    </div>
  </PreviewWrapper>
</template>

<script setup lang="ts">
import { useConfiguration } from '@favlorly/vanilla-components'
import type { MyOwnComponentProps } from './config'
import { myOwnComponentConfig } from './config'
const { configuration, errors, hasErrors } = useConfiguration<MyOwnComponentProps>(myOwnComponentConfig, 'MyOwnComponent')
</script>

<template>
  <div :class="configuration.classesList.someClassYouWant">
    I will have the background you define in config
  </div>
</template>

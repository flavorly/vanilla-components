<script setup lang="ts">
import type { MyOwnComponentProps } from './DemoComponentConfig'
import { myOwnComponentConfig } from './DemoComponentConfig'
import { useConfiguration } from '@flavorly/vanilla-components'
const { configuration, errors, hasErrors } = useConfiguration<MyOwnComponentProps>(myOwnComponentConfig, 'MyOwnComponent')
</script>

<template>
  <div :class="configuration.classesList.someClassYouWant">
    I will have the background you define in config
  </div>
</template>

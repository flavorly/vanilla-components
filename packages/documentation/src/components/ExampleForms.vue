<script setup lang="ts">
import { FormErrors, FormFeedback, FormLabel, Input as VanillaInput } from '@flavorly/vanilla-components'
</script>

<template>
  <PreviewWrapper>
    <div>
      <FormLabel
        label="Email"
        for="email"
      />
      <VanillaInput
        type="email"
        name="email"
      />
      <FormFeedback text="Im a nice feedback here" />
      <FormErrors errors="Im the errors! lol" />
    </div>
  </PreviewWrapper>
</template>

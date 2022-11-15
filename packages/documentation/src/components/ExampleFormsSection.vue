<script setup lang="ts">
import { FormSection, Input as VanillaInput } from '@favlorly/vanilla-components'
</script>

<template>
  <PreviewWrapper>
    <FormSection
      divided
    >
      <VanillaInput
        type="email"
        name="email1"
        class="my-2"
        placeholder="Email"
      />
      <VanillaInput
        class="my-2"
        name="email2"
        type="email"
        placeholder="Email Again pls"
      />
      <VanillaInput
        class="my-2"
        name="email3"
        type="email"
        placeholder="Another e-mail please"
      />
    </FormSection>
  </PreviewWrapper>
</template>

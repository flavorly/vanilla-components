<script setup lang="ts">
import { Avatar } from '@favlorly/vanilla-components'
import { ref } from 'vue'
const value = ref(null)
const value2 = ref(null)
</script>

<template>
  <PreviewWrapper>
    <!-- Regular -->
    <div class="text-center">
      <Avatar
        v-model="value"
        feedback="Im useful helper out here, choose wisely"
        placeholder="Elon Musk"
      />
    </div>

    <div class="text-center">
      <Avatar
        v-model="value2"
        placeholder="Type to clear errors"
        errors="Sorry for this name is already taken"
        feedback="I only show when i dont have errors"
      />
    </div>
  </PreviewWrapper>
</template>

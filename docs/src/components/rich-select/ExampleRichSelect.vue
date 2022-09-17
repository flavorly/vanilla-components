<template>
  <PreviewWrapper>
    <!-- Regular -->
    <VanillaRichSelect
      v-model="value"
      :options="options"
      :feedback="'Im useful helper out here, choose wisely'"
      placeholder="Please select an option"
      :errors="'Your Seleection cannot be more than 10 stuff'"
    />
    {{ value }}
  </PreviewWrapper>
</template>


<script setup type="ts">
import { VanillaRichSelect } from '@indigit/vanilla-components';
import { ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleRichSelect' });

const value = ref(null);
const options = [
    { value: 'Option 1', text: 'One Option' },
    { value: 'Option 2', text: 'Two Options' },
    { value: [
          {
              anotherObject: true,
              nested: 'deep',
          },
      ],
      text: 'Complex Object',
    },
];
</script>

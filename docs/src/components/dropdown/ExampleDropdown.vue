<template>
  <div class="h-[200px]">
    <div class="flex items-center justify-center mx-auto">
      <!-- Regular -->
      <VanillaDropdown
        v-model="value"
        text="Options"
      >
        <!-- Option -->
        <VanillaDropdownOption>
          <DuplicateIcon class="w-5 h-5 mr-2" />
          <span>Copy Stuff</span>
        </VanillaDropdownOption>
        <!-- Option -->
        <VanillaDropdownOption>
          <CheckCircleIcon class="w-5 h-5 mr-2" />
          <span>Mark as Done</span>
        </VanillaDropdownOption>
      </VanillaDropdown>
    </div>

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(value) }}</pre>
    </div>
  </div>
</template>


<script setup type="ts">
import { VanillaDropdown, VanillaDropdownOption } from '@indigit/vanilla-components';
import { ref, defineComponent } from 'vue';
import { DuplicateIcon, CheckCircleIcon } from '@heroicons/vue/solid';

defineComponent({ name: 'ExampleDropdown' });

const value = ref(true);
</script>

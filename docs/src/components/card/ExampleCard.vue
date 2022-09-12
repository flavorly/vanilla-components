<template>
  <PreviewWrapper>
    <!-- Regular -->
    <div class="h-[220px]">
      <VanillaCard
        title="Payment Methods"
        subtitle="Here you can have your favorite payments methods"
      >
        <template #actions>
          <VanillaDropdown text="Options">
            <VanillaDropdownOption>
              <span>Copy Stuff</span>
            </VanillaDropdownOption>
            <VanillaDropdownOption>
              <span>Mark as Done</span>
            </VanillaDropdownOption>
          </VanillaDropdown>
        </template>

        <div class="p-5 text-sm">
          <span>Some content on the card</span>
        </div>

        <template #footerActions>
          <VanillaButton label="Resets" />
          <VanillaButton
            label="Submit"
            variant="primary"
          />
        </template>
      </VanillaCard>
    </div>
  </PreviewWrapper>
</template>


<script setup type="ts">
import {
    VanillaCard,
    VanillaDropdown,
    VanillaDropdownOption,
    VanillaButton,
} from '@indigit/vanilla-components';
import { defineComponent } from 'vue';

defineComponent({ name: 'ExampleCard' });
</script>

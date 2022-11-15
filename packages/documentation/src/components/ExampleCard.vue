<script setup lang="ts">
import { Button, Card, DropdownMenu, DropdownOption } from '@favlorly/vanilla-components'
</script>

<template>
  <PreviewWrapper>
    <!-- Regular -->
    <div class="h-[220px]">
      <Card
        title="Payment Methods"
        subtitle="Here you can have your favorite payments methods"
      >
        <template #actions>
          <DropdownMenu text="Options">
            <DropdownOption>
              <span>Copy Stuff</span>
            </DropdownOption>
            <DropdownOption>
              <span>Mark as Done</span>
            </DropdownOption>
          </DropdownMenu>
        </template>

        <div class="p-5 text-sm">
          <span>Some content on the card</span>
        </div>

        <template #footerActions>
          <Button label="Resets" />
          <Button
            label="Submit"
            variant="primary"
          />
        </template>
      </Card>
    </div>
  </PreviewWrapper>
</template>

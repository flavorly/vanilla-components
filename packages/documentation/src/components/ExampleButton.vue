<script setup lang="ts">
import { Button } from '@favlorly/vanilla-components'
</script>

<template>
  <PreviewWrapper>
    <div class="flex flex-col items-center justify-center mx-auto space-y-3 ">
      <!-- Regular -->
      <Button label="Complete Order" />

      <!-- Primary -->
      <Button
        label="All Good!"
        variant="primary"
      />

      <!-- Errors -->
      <Button
        variant="error"
        label="Cancel Order"
      />

      <!-- Errors Soft -->
      <Button
        variant="errorSoft"
        label="Are you sure?"
      />

      <!-- Success -->
      <Button
        variant="success"
        label="Confirmed"
      />

      <!-- With Indicator -->
      <span class="relative inline-flex">
        <Button
          label="New Orders"
          class="focus:ring-0 focus:ring-offset-0 focus:border-primary-600"
        />
        <span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1 z-10">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
          <span class="relative inline-flex rounded-full h-3 w-3 bg-primary-500" />
        </span>
      </span>

      <!-- Primary & Loading -->
      <Button
        label="Processing"
        variant="primary"
        :loading="true"
      />

      <!-- Primary & Loading -->
      <Button
        label="Processing"
        :loading="true"
      />

      <!-- Loading & Disabled -->
      <Button
        label="Processing & Disabled"
        :loading="true"
        :disabled="true"
      />

      <!-- Loading & Disabled -->
      <Button
        label="Disabled"
        :disabled="true"
      />

      <!-- Transparent -->
      <Button
        label="Transparent"
        variant="transparent"
      />
    </div>
  </PreviewWrapper>
</template>

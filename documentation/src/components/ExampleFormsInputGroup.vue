<script setup lang="ts">
import {
  CheckboxGroup,
  CountryInput,
  FormSection,
  InputGroup,
  Input as VanillaInput,
  Select as VanillaSelect,
} from '@flavorly/vanilla-components'
</script>

<template>
  <PreviewWrapper>
    <FormSection>
      <InputGroup
        label="E-mail"
        name="email"
        variant="inline"
      >
        <VanillaInput
          name="email"
          placeholder="Enter your personal email here"
        />

        <VanillaSelect
          name="email_provider"
          placeholder="Whats your e-mail provider?"
          :options="[
            { text: 'Gmail', value: 'gmail' },
            { text: 'Yahoo', value: 'yahoo' },
            { text: 'Hey', value: 'hey' },
          ]"
        />
      </InputGroup>

      <InputGroup
        label="Full name"
        name="first_name"
      >
        <VanillaInput
          name="first_name"
          placeholder="Your first name"
        />
        <VanillaInput
          name="last_name"
          placeholder="Your Last name"
        />
      </InputGroup>

      <InputGroup
        label="Address"
        name="address"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-2">
          <VanillaInput
            name="address"
            placeholder="Ex: Something Road"
          />
          <VanillaInput
            name="door"
            placeholder="N31"
          />
        </div>
        <div class="grid grid-cols-1">
          <VanillaInput
            name="city"
            placeholder="City. Ex: Porto"
          />
        </div>
        <div class="grid grid-cols-1">
          <CountryInput
            name="country"
            placeholder="Select your home country"
          />
        </div>
      </InputGroup>

      <InputGroup
        label="Skills"
        name="skills"
      >
        <CheckboxGroup
          name="skills"
          :options="[
            { text: 'Vue', value: 'vue', description: 'Is Vue your stack?' },
            { text: 'React', value: 'react', description: 'React just sucks right?' },
            { text: 'Angular', value: 'angular', description: 'Lets not talk about angular' },
            { text: 'Svelte', value: 'svelte', description: 'Maybe we can try some day' },
            { text: 'Ember', value: 'ember', description: 'Good stuff, but... vue' },
          ]"
        />
      </InputGroup>

      <InputGroup
        label="Im a content"
        variant="content"
        align-label="center-center"
      >
        <span class="text-center text-xs text-gray-500 dark:text-gray-400">You can also include content here with the Input group as "content" variant, this is a great
          place to include additional context in-between the forms.
        </span>
      </InputGroup>
    </FormSection>
  </PreviewWrapper>
</template>

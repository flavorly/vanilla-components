<script setup lang="ts">
import { ref } from 'vue'
import {
  Card,
  CheckboxGroup,
  FormSection,
  InputGroup,
  Input as VanillaInput,
} from '@indigit/vanilla-components'
</script>

<template>
  <PreviewWrapper class="my-10">
    <Card class="card">
      <FormSection
        divided
      >
        <InputGroup
          label="E-mail"
          name="email"
          variant="inline"
        >
          <VanillaInput
            name="email"
            placeholder="Enter your personal email here"
          />
        </InputGroup>

        <InputGroup
          label="Password"
          name="password"
          feedback="Your first and last name are required"
        >
          <VanillaInput
            name="password"
            type="password"
            placeholder="A secure password to test"
          />
          <VanillaInput
            name="password_confirmation"
            type="password"
            placeholder="Repeat your password"
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
        </inputgroup>
      </FormSection>
    </Card>
  </PreviewWrapper>
</template>

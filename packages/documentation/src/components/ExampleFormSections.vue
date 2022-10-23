<script setup lang="ts">
import { ref } from 'vue'
import {
  Card,
  Checkbox,
  CheckboxGroup,
  CountryInput,
  FormSection,
  InputGroup,
  PhoneInput,
  Input as VanillaInput,
  Select as VanillaSelect,
} from '@indigit/vanilla-components'
import VueJsonPretty from 'vue-json-pretty'

const form = ref({
  name: '',
  email_provider: undefined,
  email: '',
  phone: '',
  address: {
    road: '',
    number: '',
    city: '',
    country: '',
  },
  phoneCountry: 'PT',
  password: '',
  password_confirmation: '',
  terms: false,
  skills: [],
  lead_source: null,
})
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
            v-model="form.email"
            name="email"
            placeholder="Enter your personal email here"
          />

          <VanillaSelect
            v-model="form.email_provider"
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
          label="Password"
          name="password"
          feedback="Your first and last name are required"
        >
          <VanillaInput
            v-model="form.password"
            name="password"
            type="password"
            placeholder="A secure password to test"
          />
          <VanillaInput
            v-model="form.password_confirmation"
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
              v-model="form.address.road"
              name="address"
              placeholder="Ex: Something Road"
            />
            <VanillaInput
              v-model="form.address.number"
              name="door"
              placeholder="N31"
            />
          </div>
          <div class="grid grid-cols-1">
            <VanillaInput
              v-model="form.address.city"
              name="city"
              placeholder="City. Ex: Porto"
            />
          </div>
          <div class="grid grid-cols-1">
            <CountryInput
              v-model="form.address.country"
              name="country"
              placeholder="Selec your home country"
            />
          </div>
        </InputGroup>

        <InputGroup
          label="Phone Number"
          name="phone"
        >
          <PhoneInput
            v-model="form.phone"
            v-model:countryCode="form.phoneCountry"
            name="phone"
          />
        </InputGroup>

        <InputGroup
          label="Skills"
          name="skills"
        >
          <CheckboxGroup
            v-model="form.skills"
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
          label="Where you found us?"
          name="lead_source"
          variant="inline"
        >
          <VanillaInput
            v-model="form.lead_source"
            name="lead_source"
          />
        </InputGroup>

        <InputGroup
          label="Terms and Conditions"
          name="terms"
        >
          <Checkbox
            v-model="form.terms"
            name="skills"
          >
            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">Accepting the terms of service is required to continue, by accepting you agree that we will mine all your data, password and do whatever we want, for what it matters this is just to test</span>
          </Checkbox>
        </InputGroup>

        <InputGroup
          label="👋 One last thing"
          variant="content"
          align-label="center-center"
        >
          <span class="text-center text-xs text-gray-500 dark:text-gray-400">You can also include content here with the Input group as "content" variant, this is a great
            place to include additional context in-between the forms.
          </span>
        </InputGroup>
      </FormSection>
    </Card>

    <div class="flex items-center justify-center mx-auto text-center mt-5">
      <VueJsonPretty
        show-icon
        :data="form"
      />
    </div>
  </PreviewWrapper>
</template>

<script setup lang="ts">
import { FormLabel, RichSelect } from '@indigit/vanilla-components'
import { ref } from 'vue'
const value = ref('Option 1')
const value2 = ref(['Option 1', 'Option 2'])
const options = [
    { value: 'Option 1', text: 'One Option' },
    { value: 'Option 2', text: 'Two Options' },
    { value: [{ anotherObject: true, nested: 'deep' }], text: 'Complex Object' },
    {
      value: 'seprator',
      text: 'A sperator can be usefull',
      children: [
        { value: 'Option 4', text: '4th Option' },
        { value: 'Option 5', text: '5th Option' },
      ],
    },
]

const optionsPersons = [
  {
    value: 'jon-doe',
    text: 'Jon Doe',
    description: 'This an additional text for your select',
    image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    value: 'robert-boes',
    text: 'Robert Boes',
    description: 'This an additional text for your select',
    image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    disabled: true,
  },
  {
    value: 'armando-sharlaton',
    text: 'Amandon Sharlaton',
    description: 'This an additional text for your select',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

const optionsOrders = [
  {
    value: '1',
    text: 'Order #1 - Pending',
    description: 'Order is waiting for the partner',
    status: 'blue',
  },
  {
    value: '2',
    text: 'Order #2 - Completed',
    description: 'This order is completed',
    status: 'green',
    disabled: true,
  },
  {
    value: '3',
    text: 'Order #3 - Refunded',
    description: 'This order was refunded with payment provider',
    status: 'red',
  },
  {
    value: '4',
    text: 'Order #4 - Waiting Approval',
    description: 'This order is waiting payment approval',
    status: 'yellow',
  },
]

const fetchOptions = (query: string, nextPage?: number) => {
  const url = `https://www.omdbapi.com/?apikey=e1b3617e&s=${query}&page=${nextPage || 1}`
  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      results: data.Search as Record<string, any>[],
      hasMorePages: data.Search && data.totalResults > (data.Search.length * (nextPage || 1)) * 10,
    }))
}
</script>

<template>
  <PreviewWrapper>
    <div class="space-y-2">
      <!-- Regular -->
      <div class="w-full">
        <RichSelect
          v-model="value"
          :options="options"
          :clearable="true"
          feedback="Im useful helper out here, choose wisely"
          placeholder="Please select an option"
          multiple
        />
      </div>
      <!-- Multiple -->
      <div class="w-full">
        <RichSelect
          v-model="value2"
          :options="options"
          :clearable="true"
          feedback="Im useful helper out here, choose wisely"
          placeholder="Please select an option"
          multiple
          tags
        />
      </div>

      <!-- Persons -->
      <div class="w-full">
        <RichSelect
          v-model="value2"
          :options="options"
          :clearable="true"
          feedback="Im useful helper out here, choose wisely"
          placeholder="Please select an option"
          multiple
          tags
        />
      </div>
    </div>
  </PreviewWrapper>
</template>

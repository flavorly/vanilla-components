<script setup lang="ts">
import { FormLabel, RichSelect, RichSelectOptionImage, RichSelectOptionIndicator, VanillaInputGroup } from '@flavorly/vanilla-components'
import { ref } from 'vue'
const value = ref('Option 1')
const valueErrors = ref('Option 1')
const value2 = ref(['Option 1', 'Option 2'])
const value3 = ref(null)
const value4 = ref([])
const value5 = ref(null)
const value6 = ref(null)
const value7 = ref(null)

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
  {
    value: 'armando-sharlaton2',
    text: 'Another person here',
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

const fetchOptions = (query?: string, nextPage?: number) => {
  const url = `https://www.omdbapi.com/?apikey=dac6304b&s=${query}&page=${nextPage || 1}`
  return fetch(url)
    .then(response => response.json())
    .then((data) => {
      return {
        results: data.Search as Record<string, any>[],
        hasMorePages: data.Search && data.totalResults > (data.Search.length * (nextPage || 1)) * 10,
      }
    })
}
</script>

<template>
  <PreviewWrapper>
    <div class="space-y-2">
      <!-- Regular -->
      <div class="w-full">
        <RichSelect
          v-model="value"
          name="test"
          :options="options"
          :clearable="true"
          feedback="Im useful helper out here, choose wisely"
          placeholder="Please select an option"
        />
      </div>
      <!-- Regular with errors -->
      <div class="w-full">
        <RichSelect
          v-model="valueErrors"
          :options="options"
          :clearable="true"
          feedback="Im useful helper out here, choose wisely"
          placeholder="Please select an option"
          errors="Something is wrong here"
        />
      </div>
      <!-- Multiple -->
      <div class="w-full">
        <RichSelect
          v-model="value2"
          :options="options"
          :clearable="true"
          feedback="Multiple select is also possible"
          placeholder="Please select an option"
          multiple
          tags
        />
      </div>

      <!-- Persons -->
      <div class="w-full">
        <RichSelect
          v-model="value3"
          feedback="A select with a list of persons"
          :options="optionsPersons"
          :clearable="false"
          placeholder="Please select a person"
        >
          <template #label="{ option: { raw: person }, className, isSelected, hasErrors }">
            <RichSelectOptionImage
              :name="person?.text"
              :image="person?.image"
              :selected="isSelected"
              :disabled="person?.disabled"
              :parent-classes="className"
              :has-errors="hasErrors"
            />
          </template>
          <template #option="{ option: { raw: person }, className, isSelected, hasErrors }">
            <RichSelectOptionImage
              class="px-3 py-2"
              :name="person?.text"
              :image="person?.image"
              :description="person?.description"
              :selected="isSelected"
              :disabled="person?.disabled"
              :parent-classes="className"
              :has-errors="hasErrors"
            />
          </template>
        </RichSelect>
      </div>

      <!-- Persons + Tags -->
      <div class="w-full">
        <RichSelect
          v-model="value4"
          feedback="Persons + Multiple + Tags"
          :options="optionsPersons"
          :tags="true"
          :multiple="true"
          :clearable="true"
          placeholder="Please select a person"
        >
          <template #tagLabel="{ option: { raw: person }, className, isSelected, hasErrors }">
            <RichSelectOptionImage
              :name="person?.text"
              :image="person?.image"
              :selected="isSelected"
              :disabled="person?.disabled"
              :parent-classes="className"
              :has-errors="hasErrors"
            />
          </template>
          <template #option="{ option: { raw: person }, className, isSelected, hasErrors }">
            <RichSelectOptionImage
              class="px-3 py-2"
              :name="person?.text"
              :image="person?.image"
              :description="person?.description"
              :selected="isSelected"
              :disabled="person?.disabled"
              :parent-classes="className"
              :has-errors="hasErrors"
            />
          </template>
        </RichSelect>
      </div>

      <!-- Indicators -->
      <div class="w-full">
        <RichSelect
          v-model="value5"
          feedback="Example with indicators"
          :options="optionsOrders"
          placeholder="Please select a order status"
          clearable
        >
          <template #label="{ option: { raw: order }, className, isSelected }">
            <RichSelectOptionIndicator
              :name="order.text"
              :status="order.status"
              :description="order.description"
              :selected="isSelected"
              :disabled="order.disabled"
              :parent-classes="className"
            />
          </template>
          <template #option="{ option: { raw: order }, className, isSelected }">
            <RichSelectOptionIndicator
              class="px-3 py-2"
              :name="order?.text"
              :status="order?.status"
              :description="order?.description"
              :selected="isSelected"
              :disabled="order?.disabled"
              :parent-classes="className"
            />
          </template>
        </RichSelect>
      </div>

      <!-- Fetching -->
      <div class="w-full">
        <RichSelect
          v-model="value6"
          feedback="Type a movie name to search"
          placeholder="Ex: Search for the Matrix or Pokemon"
          :fetch-options="fetchOptions"
          :minimum-input-length="3"
          value-attribute="imdbID"
          text-attribute="Title"
        >
          <template #option="{ option: { raw: movie }, className, isSelected }">
            <div
              class="px-3 py-2"
              :class="className"
            >
              <div class="relative">
                <div
                  :class="[isSelected ? 'font-medium' : 'font-normal']"
                  class="flex items-center space-x-2 text-sm block"
                >
                  <div
                    class="flex-shrink-0 w-10 h-10 bg-gray-500 bg-center bg-cover rounded-lg"
                    :style="{ backgroundImage: `url(${movie?.Poster})` }"
                  />
                  <span
                    class="block whitespace-nowrap truncate"
                    v-html="`${movie?.imdbID} - ${movie?.Title}`"
                  />
                </div>
              </div>
              <div
                v-if="movie?.Year"
                class="w-100 text-xs text-left mt-1"
                :class="[isSelected ? 'font-normal opacity-60' : 'opacity-60']"
                v-html="`This movie was released in the year of ${movie?.Year}`"
              />
            </div>
          </template>
        </RichSelect>
      </div>

      <!-- Fetching with Endpoint -->
      <div class="w-full">
        <RichSelect
          v-model="value7"
          feedback="Type a movie name to search"
          placeholder="Ex: Search for the Matrix or Pokemon"
          fetch-endpoint="/datatables"
          :minimum-input-length="3"
          value-attribute="id"
          text-attribute="gateway"
        >
          <template #option="{ option: { raw: payment }, className, isSelected }">
            <div
              class="px-3 py-2"
              :class="className"
            >
              <div class="relative">
                <div
                  :class="[isSelected ? 'font-medium' : 'font-normal']"
                  class="flex items-center space-x-2 text-sm block"
                >
                  <span
                    class="block whitespace-nowrap truncate"
                    v-html="`${payment?.gateway} - ${payment?.id}`"
                  />
                </div>
              </div>
            </div>
          </template>
        </RichSelect>
      </div>
    </div>
  </PreviewWrapper>
</template>

<template>
  <div class="h-[1000px]">
    <!-- Regular -->
    <VanillaRichSelect
      v-model="value"
      :feedback="'Im useful helper out here, choose wisely'"
      :options="optionsNested"
      placeholder="Elon Musk"
    />

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(value) }}</pre>
    </div>

    <div class="h-1 my-5" />

    <!-- Regular With Errors -->
    <VanillaRichSelect
      v-model="valueWithErrors"
      :feedback="'Only shown because you changed the value'"
      :options="options"
      :errors="'The option you selected is invalid'"
      placeholder="Elon Musk"
    />

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(valueWithErrors) }}</pre>
    </div>

    <div class="h-1 my-5" />

    <!-- Tags -->
    <VanillaRichSelect
      v-model="valueTags"
      :feedback="'In an select with tags'"
      :options="options"
      :tags="true"
      :multiple="true"
      placeholder="Elon Musk"
    />

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(valueTags) }}</pre>
    </div>

    <div class="h-1 my-5" />

    <!-- Tags with Image -->
    <VanillaRichSelect
      v-model="valueTags"
      :feedback="'In an select with tags and avatars on Tags'"
      :options="persons"
      :tags="true"
      :multiple="true"
      placeholder="Elon Musk"
    >
      <template #tagLabel="{ option: { raw: person }, className, isSelected, hasErrors}">
        <VanillaRichSelectTagWithImage
          :name="person?.text"
          :image="person?.image"
          :selected="isSelected"
          :parent-classes="className"
          :has-errors="hasErrors"
        />
      </template>
      <template #option="{ option: { raw: person }, className, isSelected, hasErrors}">
        <VanillaRichSelectOptionWithImage
          class="px-3 py-2"
          :name="person?.text"
          :image="person?.image"
          :description="person?.description"
          :selected="isSelected"
          :parent-classes="className"
          :has-errors="hasErrors"
        />
      </template>
    </VanillaRichSelect>
    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(valueTags) }}</pre>
    </div>

    <div class="h-1 my-5" />

    <!-- Persons -->
    <VanillaRichSelect
      v-model="valuePersons"
      :options="persons"
      placeholder="Pick your favorite person"
    >
      <template #label="{ option: { raw: person }, className, isSelected, hasErrors }">
        <VanillaRichSelectOptionWithImage
          :name="person?.text"
          :image="person?.image"
          :description="person?.description"
          :selected="isSelected"
          :parent-classes="className"
          :has-errors="hasErrors"
        />
      </template>
      <template #option="{ option: { raw: person }, className, isSelected, hasErrors}">
        <VanillaRichSelectOptionWithImage
          class="px-3 py-2"
          :name="person?.text"
          :image="person?.image"
          :description="person?.description"
          :selected="isSelected"
          :parent-classes="className"
          :has-errors="hasErrors"
        />
      </template>
    </VanillaRichSelect>

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(valuePersons) }}</pre>
    </div>

    <div class="h-1 my-5" />

    <!-- Indicators -->
    <VanillaRichSelect
      v-model="valueIndicators"
      :options="orders"
      placeholder="Toggle to select your order"
    >
      <template #label="{ option: { raw: order }, className, isSelected }">
        <VanillaRichSelectOptionWithIndicators
          :name="order?.text"
          :status="order?.status"
          :description="order?.description"
          :selected="isSelected"
          :parent-classes="className"
        />
      </template>
      <template #option="{ option: { raw: order }, className, isSelected }">
        <VanillaRichSelectOptionWithIndicators
          class="px-3 py-2"
          :name="order?.text"
          :status="order?.status"
          :description="order?.description"
          :selected="isSelected"
          :parent-classes="className"
        />
      </template>
    </VanillaRichSelect>

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(valueIndicators) }}</pre>
    </div>

    <div class="h-1 my-5" />


    <!-- Movies -->
    <VanillaRichSelect
      v-model="valueMovie"
      :feedback="'Type a movie name to search'"
      placeholder="Ex: Search for the Matrix or Pokemon"
      :fetch-options="fetchOptions"
      :minimum-input-length="3"
      :value-attribute="'imdbID'"
      :text-attribute="'Title'"
    >
      <template #option="{ option: { raw: movie }, className, isSelected }">
        <div
          class="px-3 py-2"
          :class="className"
        >
          <div class="relative">
            <div
              :class="[isSelected ? 'font-medium' : 'font-normal','block']"
              class="flex items-center space-x-2 text-sm"
            >
              <div
                class="flex-shrink-0 w-10 h-10 bg-gray-500 bg-center bg-cover rounded-lg"
                :style="{ backgroundImage: `url(${movie?.Poster})` }"
              />
              <span
                class="block whitespace-nowrap truncate"
                v-html="movie?.imdbID+' - '+movie?.Title"
              />
            </div>
          </div>
          <div
            v-if="movie?.Year"
            class="w-100 text-xs text-left mt-1"
            :class="[isSelected ? 'font-normal opacity-60' : 'opacity-60']"
            v-html="'This movie was released in the year of '+movie?.Year"
          />
        </div>
      </template>
    </VanillaRichSelect>

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(valueMovie) }}</pre>
    </div>
  </div>
</template>


<script setup lang="ts">
import { VanillaRichSelect } from '@/index';
import { onMounted, ref, defineComponent } from 'vue';
import VanillaRichSelectOptionWithImage from '@/components/RichSelect/RichSelectOptionWithImage/RichSelectOptionWithImage.vue';
import VanillaRichSelectOptionWithIndicators from '@/components/RichSelect/RichSelectOptionWithIndicators/RichSelectOptionWithIndicators.vue';
import VanillaRichSelectTagWithImage from '@/components/RichSelect/RichSelectTagWithImage/RichSelectTagWithImage.vue';

defineComponent({ name: 'ExampleRichSelect' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const value = ref('Option 1');
const valueTags = ref(['Option 1', 'Option 2']);
const valueWithErrors = ref('Option 2');
const valueMovie = ref(null);
const valuePersons = ref('jon-doe');
const valueIndicators = ref('2');

const optionsNested = [
    { value: 'Option 1', text: 'One Option' },
    { value: 'Option 2', text: 'Two Options' },
    { value: { nested: true, type: 'nested' }, text: 'Complex Object' },
    {
        value: 'separator',
        text: 'This is a seperator',
        children: [
            { value: 'Option 4', text: 'Option 4' },
            { value: 'Option 5', text: 'Option 5' },
            {
                value: 'separator-2',
                text: 'A nested separator',
                children: [
                    { value: 'Option 6', text: 'Option 6' },
                ],
            },
        ],
    },
];

const options =  [
    { value: 'Option 1', text: 'One Option' },
    { value: 'Option 2', text: 'Two Options' },
    { value: { nested: true, type: 'nested' }, text: 'Complex Object' },
];

const persons = [
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
    },
    {
        value: 'armando-sharlaton',
        text: 'Amandon Sharlaton',
        description: 'This an additional text for your select',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];

const orders = [
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
];

const fetchOptions = (query?: string, nextPage?: number) => {
    const url = `https://www.omdbapi.com/?apikey=e1b3617e&s=${query}&page=${nextPage || 1}`;
    return fetch(url)
        .then((response) => response.json())
        .then((data) => ({
            results: data.Search as Record<string, any>[],
            hasMorePages: data.Search && data.totalResults > (data.Search.length * (nextPage || 1)) * 10,
        }));
};
</script>

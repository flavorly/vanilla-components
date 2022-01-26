<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-input-rich-select
      v-model="value"
      class="inline-flex"
      :options="options"
      layout="naked"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- With Images -->
  <div class="mt-5 space-x-2 w-full space-y-2 items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-input-rich-select
      v-model="value2"
      class="inline-flex"
      :options="optionsWithImagesAndText"
      layout="naked"
    />
  </div>
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value2) }}</pre>
  </div>

  <!-- With Indicators -->
  <div class="mt-5 space-x-2 w-full space-y-2 items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-input-rich-select
      v-model="value3"
      class="inline-flex"
      :options="optionsWithIndicators"
      layout="naked"
    />
  </div>
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value3) }}</pre>
  </div>

  <!-- Errors -->
  <div class="mt-5 space-x-2 w-full space-y-2 items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-input-rich-select
      v-model="value2"
      class="inline-flex"
      :options="options"
      layout="naked"
      :errors="'Change me to clear the error'"
    />
  </div>

  <!-- Helper -->
  <div class="mt-5 space-x-2 w-full space-y-2 items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-input-rich-select
      v-model="value"
      class="inline-flex"
      :options="options"
      layout="naked"
      :help="'Im useful helper out here, choose wisely'"
    />
  </div>
</template>

<script>
import { VanillaInputRichSelect as XInputRichSelect } from "@/index";
export default {
  name: "ExampleInputRichSelect",
  components: {
    XInputRichSelect
  },
  data(){
      return {
        value: 'Option 1',
        value2: 'Option 2',
        value3: 'Option 3',
      }
  },
  computed: {
    options(){
      return [
        {value: 'Option 1', label: 'One Option'},
        {value: 'Option 2', label: 'Two Options'},
        {value: [ { anotherObject: true, nested: 'deep'}], label: 'Complex Object'}
      ]
    },
    optionsWithImagesAndText(){
      return [
        {
          value: 'Option 1',
          label: 'Jon Doe',
          description: 'This an additional text for your select',
          image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          value: 'Option 2',
          label: 'Robert',
          description: 'This an additional text for your select',
          image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          value: 'Option 3',
          label: 'Amando',
          description: 'This an additional text for your select',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      ]
    },
    optionsWithIndicators(){
      return [
        {
          value: 'Option 1',
          label: 'Jon Doe',
          description: 'This an additional text for your select',
          indicator: 'green',
        },
        {
          value: 'Option 2',
          label: 'Robert',
          description: 'This an additional text for your select',
          indicator: 'red',
        },
        {
          value: 'Option 3',
          label: 'Amando',
          description: 'This an additional text for your select',
          indicator: 'gray',
        },
      ]
    }
  },
  mounted() {
    window.parent.postMessage('mounted', '*')
  }
}
</script>

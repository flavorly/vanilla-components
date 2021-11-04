<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 w-full items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-input-radio-group
      class="inline-flex"
      :options="options"
      layout="naked"
      v-model="value"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>
</template>

<script>
import {XInputRadioGroup} from "@/index";
export default {
  name: "ExampleInputRichSelect",
  components: {
    XInputRadioGroup
  },
  data(){
      return {
        value: null,
        value2: null,
        value3: null,
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
          subtext: 'This an additional text for your select',
          indicator: 'green',
        },
        {
          value: 'Option 2',
          label: 'Robert',
          subtext: 'This an additional text for your select',
          indicator: 'red',
        },
        {
          value: 'Option 3',
          label: 'Amando',
          subtext: 'This an additional text for your select',
          indicator: 'gray',
        },
      ]
    }
  }
}
</script>

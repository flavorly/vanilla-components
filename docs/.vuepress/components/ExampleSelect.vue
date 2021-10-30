<template>
  <!-- Regular -->
  <div class="space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-select
      class="inline-flex"
      :options="options"
      layout="naked"
      v-model="value"
    />
  </div>

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Sloted -->
  <div class="mt-5 space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-select
      class="inline-flex"
      :options="options"
      layout="naked"
      v-model="value2"
    >
      <template v-slot:option="{item,index}">
        <option :value="item.value">Im sloted {{ item.label }}</option>
      </template>
    </x-select>

  </div>
  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value2) }}</pre>
  </div>

  <!-- Errors -->
  <div class="mt-5 space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-select
      class="inline-flex"
      :options="options"
      layout="naked"
      v-model="value2"
      :errors="'Change me to clear the error'"
    />
  </div>

  <!-- Helper -->
  <div class="mt-5 space-x-2 space-y-2 flex items-center mx-auto flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
    <x-select
      class="inline-flex"
      :options="options"
      layout="naked"
      v-model="value"
      :help="'Im useful helper out here, choose wisely'"
    />
  </div>
</template>

<script>
import XSelect from "../../../src/components/Inputs/Select";
export default {
  name: "ExampleSelect",
  components: {
    XSelect
  },
  data(){
      return {
        value: null,
        value2: null,
      }
  },
  computed: {
    options(){
      return [
        {value: 'Option 1', label: 'One Option'},
        {value: 'Option 2', label: 'Two Options'},
        {value: [ { anotherObject: true, nested: 'deep'}], label: 'Complex Object'}
      ]
    }
  }
}
</script>

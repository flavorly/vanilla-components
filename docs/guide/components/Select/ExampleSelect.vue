<template>
  <div class="h-[1000px]">
    <!-- Regular -->
    <VanillaSelect
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
    <VanillaSelect
      v-model="valueWithErrors"
      :feedback="'Only shown because you changed the value'"
      :options="options"
      :errors="'The option you selected is invalid'"
      placeholder="Elon Musk"
    />

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(valueWithErrors) }}</pre>
    </div>


    <!-- Multiple -->
    <VanillaSelect
      v-model="valueMultiple"
      :feedback="'Im useful helper out here, choose wisely'"
      :options="optionsNested"
      :multiple="true"
    />

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(valueMultiple) }}</pre>
    </div>

    <div class="h-1 my-5" />

    <!-- Multiple 6 Errors -->
    <VanillaSelect
      v-model="valueMultipleErrors"
      :feedback="'Im useful helper out here, choose wisely'"
      :options="optionsNested"
      :errors="'Sorry but this is wrong'"
      :multiple="true"
    />

    <div class="flex items-center justify-center mx-auto text-center mt-2">
      <pre>{{ JSON.stringify(valueMultipleErrors) }}</pre>
    </div>

    <div class="h-1 my-5" />
  </div>
</template>


<script setup lang="ts">
import { VanillaSelect } from '@/index';
import { onMounted, ref, defineComponent } from 'vue';

defineComponent({ name: 'ExampleSelect' });
onMounted(() => window.parent.postMessage('mounted', '*'));

const value = ref('');
const valueWithErrors = ref('');
const valueMultiple = ref('');
const valueMultipleErrors = ref(['Option 1', 'Option 2']);

const optionsNested = [
    { value: '', text: 'Select an option' },
    { value: 'Option 1', text: 'One Option' },
    { value: 'Option 2', text: 'Two Options' },
    { value: 'foo', text: 'Complex Object' },
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
    { value: '', text: 'Select an option' },
    { value: 'Option 1', text: 'One Option' },
    { value: 'Option 2', text: 'Two Options' },
    { value: 'Option 3', text: 'Three Options', disabled: true },
    { value: 'foo', text: 'Complex Object' },
];
</script>

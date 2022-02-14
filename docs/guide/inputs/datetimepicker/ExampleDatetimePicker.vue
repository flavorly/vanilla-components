<template>
  <!-- Regular -->
  <VanillaDatetimePicker
    v-model="value"
  />

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value) }}</pre>
  </div>

  <!-- Regular -->
  <VanillaDatetimePicker
    v-model="value2"
    :errors="'Sorry for this name is already taken'"
  />

  <div class="flex items-center justify-center mx-auto text-center mt-2">
    <pre>{{ JSON.stringify(value2) }}</pre>
  </div>
</template>

<script>
import { VanillaDatetimePicker } from '@/index';
export default {
    name: 'ExampleInputRichSelect',
    components: {
        VanillaDatetimePicker,
    },
    data(){
        return {
            value: '2011-01-01 0:00:01',
            value2: '2011-01-02 0:00:21',
        };
    },
    mounted() {
        window.parent.postMessage('mounted', '*');
    },
};
</script>

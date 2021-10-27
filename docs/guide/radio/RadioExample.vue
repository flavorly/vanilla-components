<template>
  <div style="margin-bottom: 16px">
    <p>Selected value: {{ selectedValue }}</p>
    <Radio name="example" :items="items" v-model="selectedValue" />
  </div>
  <div style="margin-bottom: 16px">
    <p>Here is an example of a disabled radio group</p>
    <Radio
      name="disabled-example"
      :items="items"
      v-model="selectedValue"
      disabled
    />
  </div>
</template>
<script>
import { Radio } from '../../../src/index'

export default {
  name: 'RadioExample',
  components: {
    Radio,
  },
  data() {
    return {
      items: [
        {
          label: 'Label 1',
          value: 'value1',
        },
        {
          label: 'Label 2',
          value: 'value2',
        },
      ],
      selectedValue: 'value1',
    }
  },
}
</script>

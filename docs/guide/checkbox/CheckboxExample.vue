<template>
  <div style="margin-bottom: 16px">
    <p>Default</p>
    <Checkbox />
  </div>
  <div style="margin-bottom: 16px">
    <p>State: {{ state }}</p>
    <Checkbox label="Checkbox" v-model="state" />
  </div>
  <div style="margin-bottom: 16px">
    <Checkbox label="Unchecked disabled" :modelValue="false" disabled />
  </div>
  <div style="margin-bottom: 16px">
    <Checkbox label="Checked disabled" :modelValue="true" disabled />
  </div>
</template>
<script>
import { Checkbox } from '../../../src/index'

export default {
  name: 'CheckboxExample',
  components: {
    Checkbox,
  },
  data() {
    return {
      state: true,
    }
  },
}
</script>

<template>
  <div style="margin-bottom: 16px">
    <p>State: {{ state }}</p>
    <Switch label="Switch" v-model="state" />
  </div>
  <div style="margin-bottom: 16px">
    <Switch label="Unchecked disabled" :modelValue="false" disabled />
  </div>
  <div style="margin-bottom: 16px">
    <Switch label="Checked disabled" :modelValue="true" disabled />
  </div>
</template>
<script>
import { Switch } from '../../../src/index'

export default {
  name: 'SwitchExample',
  components: {
    Switch,
  },
  data() {
    return {
      state: false,
    }
  },
}
</script>

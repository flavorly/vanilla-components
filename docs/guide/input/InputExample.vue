<template>
  <div style="margin-bottom: 16px">
    <p>Default</p>
    <Input />
  </div>
  <div style="margin-bottom: 16px">
    <p>Example with label - {{ labelText }}</p>
    <Input label="Example text" v-model="labelText" />
  </div>
  <div style="margin-bottom: 16px">
    <p>Example with placeholder - {{ placeholderLabelText }}</p>
    <Input placeholder="Write something here" v-model="placeholderLabelText" />
  </div>
  <div style="margin-bottom: 16px">
    <p>Example without label - {{ noLabelText }}</p>
    <Input v-model="noLabelText" />
  </div>
  <div style="margin-bottom: 16px">
    <p>Example with required - {{ requiredText }}</p>
    <Input label="I am required" v-model="requiredText" required />
  </div>
  <div style="margin-bottom: 16px">
    <p>Disabled</p>
    <Input label="Oh :(" disabled />
  </div>
  <div style="margin-bottom: 16px">
    <p>Disabled with a label</p>
    <Input label="Oh :(" modelValue="Hello" disabled />
  </div>
</template>
<script>
import { Input } from '../../../src/index'

export default {
  name: 'InputExample',
  components: {
    Input,
  },
  data() {
    return {
      labelText: '',
      placeholderLabelText: '',
      noLabelText: '',
      requiredText: '',
    }
  },
}
</script>

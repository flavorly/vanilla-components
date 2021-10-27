<template>
  <div style="margin-bottom: 16px">
    <p>Default</p>
    <Textarea />
  </div>
  <div style="margin-bottom: 16px">
    <p>Example with label - {{ labelText }}</p>
    <Textarea label="Example text" v-model="labelText" />
  </div>
  <div style="margin-bottom: 16px">
    <p>Example with placeholder - {{ placeholderLabelText }}</p>
    <Textarea
      placeholder="Write something here"
      v-model="placeholderLabelText"
    />
  </div>
  <div style="margin-bottom: 16px">
    <p>Example without label - {{ noLabelText }}</p>
    <Textarea v-model="noLabelText" />
  </div>
  <div style="margin-bottom: 16px">
    <p>Example with required - {{ requiredText }}</p>
    <Textarea label="I am required" v-model="requiredText" required />
  </div>
  <div style="margin-bottom: 16px">
    <p>Resize Vertical</p>
    <Textarea label="Resize vertical" resize="vertical" />
  </div>
  <div style="margin-bottom: 16px">
    <p>Resize Horizontal</p>
    <Textarea label="Resize horizontal" resize="horizontal" />
  </div>
  <div style="margin-bottom: 16px">
    <p>Resize None</p>
    <Textarea label="Resize none" resize="none" />
  </div>
  <div style="margin-bottom: 16px">
    <p>Autogrow</p>
    <Textarea label="Autogrow" autogrow />
  </div>
  <div style="margin-bottom: 16px">
    <p>Autogrow no label</p>
    <Textarea autogrow />
  </div>
  <div style="margin-bottom: 16px">
    <p>Disabled</p>
    <Textarea label="Oh :(" disabled />
  </div>
  <div style="margin-bottom: 16px">
    <p>Disabled with a label</p>
    <Textarea
      label="Oh :("
      modelValue="Resize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontal"
      disabled
    />
  </div>
</template>
<script>
import { Textarea } from '../../../src/index'

export default {
  name: 'SwitchExample',
  components: {
    Textarea,
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

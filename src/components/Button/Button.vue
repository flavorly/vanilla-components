<template>
  <button
    :class="buttonClassObject"
    type="button"
    :title="title"
    :aria-label="title"
    :disabled="disabled"
    @click="onClick($event)"
  >
    <span>{{ label }}</span>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      required: false,
      default: undefined,
    },
    title: {
      type: String,
      required: false,
      default: undefined,
    },
    type: {
      type: String,
      required: false,
      default: 'default',
      validator(type) {
        return ['default', 'outlined', 'text'].includes(type)
      },
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['click'],
  computed: {
    buttonClassObject() {
      return {
        'is-default': this.type === 'default',
        'is-outlined': this.type === 'outlined',
        'is-text': this.type === 'text',
      }
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>

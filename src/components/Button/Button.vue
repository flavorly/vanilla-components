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
<style scoped>
button {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 16px;
  border-radius: 4px;
  position: relative;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 4px;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
  background-color: black;
}

button:hover::before {
  opacity: 0.1;
}

button:active::before {
  opacity: 0.2;
}

button.is-default {
  background-color: black;
  border: 1px solid black;
  color: white;
}

button.is-outlined {
  background-color: transparent;
  border: 1px solid black;
  color: black;
}

button.is-text {
  background-color: transparent;
  border: none;
  color: black;
}

span {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.25px;
}

button.is-default:disabled,
button.is-outlined:disabled,
button.is-text:disabled {
  border-color: #eeeeee;
  background-color: #eeeeee;
  cursor: not-allowed;
}

button:disabled::before {
  display: none;
}

button:disabled > span {
  color: #757575;
}
</style>

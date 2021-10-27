<template>
  <div class="c-Input" :class="inputClassObject">
    <input
      ref="input"
      class="c-Input__input"
      type="text"
      :value="text"
      :name="name"
      :required="required"
      :disabled="disabled"
      :aria-label="label"
      :placeholder="placeholder"
      @input="text = $event.target.value"
    />
    <span
      class="c-Input__label"
      :title="label"
      @mousedown.prevent="onLabelClick($event)"
    >
      {{ label }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'Input',
  props: {
    modelValue: {
      type: String,
      required: false,
      default: undefined,
    },
    label: {
      type: String,
      required: false,
      default: undefined,
    },
    placeholder: {
      type: String,
      required: false,
      default: undefined,
    },
    name: {
      type: String,
      required: false,
      default: undefined,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      text: this.modelValue,
    }
  },
  computed: {
    inputClassObject() {
      const hasText = this.text !== '' && this.text !== undefined
      const hasPlaceholder =
        this.placeholder !== '' && this.placeholder !== undefined

      return {
        'has-value': hasText || hasPlaceholder,
        'has-label': this.label !== '' && this.label !== undefined,
      }
    },
  },
  watch: {
    modelValue(newModelValue) {
      this.text = newModelValue
    },
    text(newValue) {
      this.$emit('update:modelValue', newValue)
    },
  },
  methods: {
    onLabelClick() {
      this.$refs.input.focus()
    },
  },
}
</script>
<style scoped>
.c-Input {
  position: relative;
  width: 100%;
  background: white;
}

.c-Input__input {
  height: 48px;
  width: 100%;
  outline: none;
  border: 1px solid black;
  border-radius: 4px;
  background-color: transparent;
  font-size: 16px;
  color: black;
  padding: 8px;
  cursor: pointer;
  position: relative;
  transition: border 150ms ease-in-out, box-shadow 150ms ease-in-out;
  z-index: 1;
}

.c-Input__label {
  display: block;
  font-size: 16px;
  color: black;
  cursor: pointer;
  position: absolute;
  top: 12px;
  left: 9px;
  z-index: 2;
  transition: 150ms ease-in-out;
}

.c-Input__input:focus {
  box-shadow: inset 0 0 0 1px black;
}

.c-Input__input:focus + .c-Input__label {
  top: 5px;
  font-size: 12px;
}

.c-Input.has-value .c-Input__label {
  top: 5px;
  font-size: 12px;
}

.c-Input.has-label .c-Input__input {
  padding: 20px 8px 6px 8px;
}

.c-Input__input:invalid {
  border-color: #e53935;
  color: #e53935;
}

.c-Input__input:invalid:focus {
  box-shadow: inset 0 0 0 1px #e53935;
}

.c-Input__input:invalid + .c-Input__label {
  color: #e53935;
}

.c-Input__input:disabled {
  cursor: not-allowed;
  border-color: #757575;
  color: #757575;
  background-color: #e0e0e0;
}

.c-Input__input:disabled + .c-Input__label {
  color: #757575;
}
</style>

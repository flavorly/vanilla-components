<template>
  <label
    class="c-Checkbox"
    v-bind="checkboxAttributes"
    @keydown.space.prevent
    @keyup.enter="onTrigger()"
    @keyup.space="onTrigger()"
  >
    <input
      aria-hidden="true"
      class="c-Checkbox__input"
      type="checkbox"
      :disabled="disabled"
      :checked="state"
      @change="state = $event.target.checked"
    />
    <div class="c-Checkbox__element"></div>
    <span v-if="label" class="c-Checkbox__label">
      {{ label }}
    </span>
  </label>
</template>
<script>
export default {
  name: 'Checkbox',
  props: {
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: false,
      default: undefined,
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
      state: this.modelValue,
    }
  },
  computed: {
    checkboxAttributes() {
      return {
        'aria-disabled': this.disabled,
        tabindex: this.disabled ? undefined : '0',
      }
    },
  },
  watch: {
    modelValue(newModelValue) {
      this.state = newModelValue
    },
    state(newValue) {
      this.$emit('update:modelValue', newValue)
    },
  },
  methods: {
    onTrigger() {
      this.state = !this.state
    },
  },
}
</script>
<style scoped>
.c-Checkbox {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  width: -moz-fit-content;
  width: fit-content;
}

.c-Checkbox input {
  display: none;
}

.c-Checkbox__element {
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
  border: 2px solid;
  border-radius: 4px;
  border-color: black;
  transition: 0.15s;
}

.c-Checkbox__element::after {
  content: '';
  display: block;
  position: absolute;
  left: 2px;
  top: -4px;
  width: 8px;
  height: 14px;
  border-width: 0 3px 3px 0;
  border-style: solid;
  border-color: white;
  transform-origin: bottom left;
  transform: rotate(45deg);
  opacity: 0;
}

.c-Checkbox__label {
  user-select: none;
  margin-left: 8px;
}

/* Checked */

.c-Checkbox__input:checked + .c-Checkbox__element {
  background-color: black;
}

.c-Checkbox__input:checked + .c-Checkbox__element::after {
  opacity: 1;
}

/* Disabled */

.c-Checkbox[aria-disabled='true'] {
  cursor: not-allowed;
}

.c-Checkbox[aria-disabled='true'] .c-Checkbox__element {
  border-color: #757575;
  background-color: #e0e0e0;
}

.c-Checkbox[aria-disabled='true']
  .c-Checkbox__input:checked
  + .c-Checkbox__element {
  background-color: #757575;
}

.c-Checkbox[aria-disabled='true'] .c-Checkbox__element::after {
  border-color: #757575;
}

.c-Checkbox[aria-disabled='true']
  .c-Checkbox__input:checked
  + .c-Checkbox__element::after {
  border-color: #e0e0e0;
}
</style>

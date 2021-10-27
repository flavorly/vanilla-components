<template>
  <label
    class="c-Switch"
    v-bind="switchAttributes"
    @keydown.space.prevent
    @keyup.enter="onTrigger()"
    @keyup.space="onTrigger()"
  >
    <input
      v-model="state"
      aria-hidden="true"
      class="c-Switch__input"
      type="checkbox"
      :disabled="disabled"
      @click="onTrigger()"
    />
    <div class="c-Switch__slider" />
    <span v-if="label" class="c-Switch__label">
      {{ label }}
    </span>
  </label>
</template>
<script>
export default {
  name: 'Switch',
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
    switchAttributes() {
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
.c-Switch {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  width: -moz-fit-content;
  width: fit-content;
}

.c-Switch input {
  display: none;
}

.c-Switch__slider {
  position: relative;
  display: block;
  width: 48px;
  height: 24px;
  border: 2px solid black;
  border-radius: 24px;
  background-color: white;
  transition: 0.15s;
}

.c-Switch__slider:before {
  content: '';
  border-radius: 24px;
  position: absolute;
  position: absolute;
  height: 16px;
  width: 16px;
  left: 2px;
  top: 2px;
  background-color: black;
  transition: 0.15s;
}

.c-Switch__label {
  user-select: none;
  margin-left: 8px;
}

/* Checked */

.c-Switch__input:checked + .c-Switch__slider {
  border-color: #101010;
  background-color: #101010;
}

.c-Switch__input:focus + .c-Switch__slider {
  box-shadow: 0 0 1px #101010;
}

.c-Switch__input:checked + .c-Switch__slider:before {
  background-color: white;
  transform: translate(24px);
}

/* Disabled */

.c-Switch[aria-disabled='true'] {
  cursor: not-allowed;
}

.c-Switch[aria-disabled='true'] .c-Switch__slider {
  border: 2px solid #757575;
  background-color: #e0e0e0;
}

.c-Switch[aria-disabled='true'] .c-Switch__input:checked + .c-Switch__slider {
  border: 2px solid #757575;
  background-color: #757575;
}

.c-Switch[aria-disabled='true'] .c-Switch__slider:before {
  background-color: #757575;
}

.c-Switch[aria-disabled='true']
  .c-Switch__input:checked
  + .c-Switch__slider:before {
  background-color: #e0e0e0;
  transform: translate(24px);
}
</style>

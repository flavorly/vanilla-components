<template>
  <template v-for="(item, index) in items" :key="`radio-${index}`">
    <label
      class="c-Radio"
      v-bind="radioAttributes"
      @keydown.space.prevent
      @keyup.enter="handleChange(item.value)"
      @keyup.space="handleChange(item.value)"
    >
      <input
        v-model="selectedValue"
        aria-hidden="true"
        class="c-Radio__input"
        type="radio"
        :name="name"
        :value="item.value"
        :disabled="disabled"
      />
      <div class="c-Radio__element"></div>
      <span v-if="item.label" class="c-Radio__label">
        {{ item.label }}
      </span>
    </label>
  </template>
</template>
<script>
export default {
  name: 'Radio',
  props: {
    modelValue: {
      type: String,
      required: false,
      default: undefined,
    },
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
      validator: (items) => {
        let isValid = true

        items.forEach((item) => {
          isValid = isValid && 'label' in item && 'value' in item
        })

        return isValid
      },
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
      selectedValue: this.modelValue,
    }
  },
  computed: {
    radioAttributes() {
      return {
        'aria-disabled': this.disabled,
        tabindex: this.disabled ? undefined : '0',
      }
    },
  },
  watch: {
    modelValue(newModelValue) {
      this.selectedValue = newModelValue
    },
    selectedValue(newValue) {
      this.$emit('update:modelValue', newValue)
    },
  },
  methods: {
    handleChange(value) {
      this.selectedValue = value
    },
  },
}
</script>
<style scoped>
.c-Radio {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  width: -moz-fit-content;
  width: fit-content;
}

.c-Radio + .c-Radio {
  margin-top: 8px;
}

.c-Radio input {
  display: none;
}

.c-Radio__element {
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
  border: 1px solid;
  border-radius: 24px;
  border-color: black;
}

.c-Radio__element::after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background-color: black;
  opacity: 0;
  transition: 0.15s;
}

.c-Radio__input:checked + .c-Radio__element::after {
  opacity: 1;
}

.c-Radio__label {
  user-select: none;
  margin-left: 8px;
}

/* Disabled */

.c-Radio[aria-disabled='true'] {
  cursor: not-allowed;
}

.c-Radio[aria-disabled='true'] .c-Radio__element {
  border-color: #757575;
  background-color: #e0e0e0;
}

.c-Radio[aria-disabled='true'] .c-Radio__element::after {
  background-color: #757575;
}
</style>

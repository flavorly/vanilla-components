<template>
  <a
    class="c-Link"
    v-bind="linkAttributes"
    @click="onClick()"
    @keydown.space.prevent
    @keyup.enter="onClick()"
    @keyup.space="onClick()"
  >
    <span class="c-Link__label">{{ label }}</span>
  </a>
</template>
<script>
export default {
  name: 'Link',
  props: {
    label: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
      required: false,
    },
    href: {
      type: String,
      default: null,
      required: false,
    },
    openOnNewTab: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: ['click'],
  computed: {
    linkAttributes() {
      return {
        title: this.title ? this.title : this.label,
        href: this.disabled ? undefined : this.href,
        rel: this.openOnNewTab ? 'noopener noreferrer' : undefined,
        target: this.openOnNewTab ? '_blank' : undefined,
        'aria-disabled': this.disabled,
        tabindex: this.disabled ? undefined : '0',
      }
    },
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.$emit('click')
      }
    },
  },
}
</script>
<style scoped>
.c-Link {
  display: flex;
  align-items: center;
  color: #3843d0;
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 1.5;
  white-space: nowrap;
  width: -moz-fit-content;
  width: fit-content;
  cursor: pointer;
}

.c-Link:hover {
  text-decoration: underline;
}

.c-Link:active {
  color: #1111a6;
  text-decoration: none;
}

.c-Link[aria-disabled='true'] {
  color: #8d98aa;
  cursor: not-allowed;
}

.c-Link[aria-disabled='true']:hover {
  text-decoration: none;
}

.c-Link__label {
  user-select: none;
}
</style>

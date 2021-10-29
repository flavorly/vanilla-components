<template>
  <p
    class="form-helper"
    @click="$emit('click')"
  >
    <slot>
      <span
        v-if="safe"
        v-html="text"
      />
      <span v-else>
        {{ text }}
      </span>
    </slot>
  </p>
</template>

<script>
export default {
    name: 'XFormHelper',
    props: {
        text: {
            type: String,
            default: '',
            required: false
        },
        safe: {
            type: Boolean,
            default: true,
            required: false
        },
    },
    emits: ['click'],
}
</script>

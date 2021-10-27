<template>
  <a :href="href" target="_blank" rel="noopnener noreferrer">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
  },
}
</script>

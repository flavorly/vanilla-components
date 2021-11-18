<template>
  <component :is="as">
    ###
  </component>
</template>

<script>

export default {
  name: "VCFlagIcon",
  props: {
    as: {
      type: String,
      default: 'span'
    },
    iso: {
      type: String,
      default: '',
    }
  }
}
</script>


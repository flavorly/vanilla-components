<template>
  <div
    class="c-Progress"
    role="progressbar"
    :title="`${progressPercentage}%`"
    aria-valuemin="0"
    :aria-valuemax="max"
    :aria-valuenow="value"
  >
    <div class="c-Progress__background" />
    <div class="c-Progress__fill" :style="`width: ${progressPercentage}%`" />
  </div>
</template>
<script>
export default {
  name: 'Progress',
  props: {
    value: {
      type: [Number, String],
      required: false,
      default: 0,
    },
    max: {
      type: [Number, String],
      required: false,
      default: 100,
    },
  },
  computed: {
    progressPercentage() {
      const value = Number(this.value)
      const max = Number(this.max)

      if (Number.isNaN(value) || Number.isNaN(max)) {
        return 0
      }

      return Math.round((value / max) * 100)
    },
  },
}
</script>
<style scoped>
.c-Progress {
  position: relative;
}

.c-Progress__background {
  border-radius: 16px;
  border: 1px solid black;
  height: 16px;
}

.c-Progress__fill {
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  border: 1px solid black;
  border-radius: 8px;
  height: 16px;
  min-width: 16px;
  transition: 0.2s cubic-bezier(0.4, 0, 0.6, 1);
}
</style>

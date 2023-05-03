<script setup lang="ts">
const props = defineProps({
  classesList: {
    type: Object,
    default: () => ({}),
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: [Number, String],
    default: 150,
  },
})
</script>

<script lang="ts">
export default {
  name: 'VanillaTransionable',
  inheritAttrs: true,
}
</script>

<template>
  <Transition
    :enter-active-class="classesList?.enterActiveClass"
    :enter-from-class="classesList?.enterFromClass"
    :enter-to-class="classesList?.enterToClass"
    :leave-active-class="classesList?.leaveActiveClass"
    :leave-from-class="classesList?.leaveFromClass"
    :leave-to-class="classesList?.leaveToClass"
    :css="enabled"
    :duration="duration"
  >
    <slot />
  </Transition>
</template>

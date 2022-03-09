<template>
  <transition
    :enter-active-class="classesList?.enterActiveClass"
    :enter-from-class="classesList?.enterFromClass"
    :enter-to-class="classesList?.enterToClass"
    :leave-active-class="classesList?.leaveActiveClass"
    :leave-from-class="classesList?.leaveFromClass"
    :leave-to-class="classesList?.leaveToClass"
    :css="enabled"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'VanillaTransitionable',
    compatConfig: {
        MODE: 3,
    },
    props: {
        classesList: {
            type: Object,
            default: () => ({}),
        },
        enabled: {
            type: Boolean,
            default: true,
        },
    },
});
</script>

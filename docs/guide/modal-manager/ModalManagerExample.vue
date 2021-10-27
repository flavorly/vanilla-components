<template>
  <div>
    <Button label="OPEN" @click="openModal" />
  </div>
  <ModalManager />
</template>
<script>
import LayoutExample from './LayoutExample.vue'
import { Button, EVENTS, EventBus, ModalManager } from '../../../src/index'

export default {
  name: 'ButtonExample',
  components: {
    Button,
    EventBus,
    ModalManager,
    LayoutExample,
  },
  methods: {
    openModal() {
      EventBus.emit(EVENTS.OPEN_MODAL, { component: LayoutExample })
    },
  },
}
</script>

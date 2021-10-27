<template>
  <div>
    <Button label="OPEN" @click="openSidebar" />
  </div>
  <SidebarManager />
</template>
<script>
import LayoutExample from './LayoutExample.vue'
import { Button, EVENTS, EventBus, SidebarManager } from '../../../src/index'

export default {
  name: 'ButtonExample',
  components: {
    Button,
    EventBus,
    SidebarManager,
    LayoutExample,
  },
  methods: {
    openSidebar() {
      EventBus.emit(EVENTS.OPEN_SIDEBAR, { component: LayoutExample })
    },
  },
}
</script>

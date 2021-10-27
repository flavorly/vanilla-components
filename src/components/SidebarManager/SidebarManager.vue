<template>
  <Sidebar :is-open="Boolean(component)" @close="handleClose">
    <component :is="component" v-bind="props" @close="handleClose" />
  </Sidebar>
</template>

<script>
import { markRaw } from 'vue'
import { EVENTS, EventBus, Sidebar } from '../../index'

const ESCAPE_KEY = 27

export default {
  components: { Sidebar },
  data() {
    return {
      component: null,
      props: null,
    }
  },
  created() {
    EventBus.on(EVENTS.OPEN_SIDEBAR, ({ component, props = null }) => {
      this.component = markRaw(component)
      this.props = props
    })
    EventBus.on(EVENTS.CLOSE_SIDEBAR, this.handleClose)
    document.addEventListener('keyup', this.handleKeyup)
  },
  beforeUnmount() {
    document.removeEventListener('keyup', this.handleKeyup)
  },
  methods: {
    handleClose() {
      this.component = null
    },
    handleKeyup(e) {
      if (e.keyCode === ESCAPE_KEY) {
        this.handleClose()
      }
    },
  },
}
</script>

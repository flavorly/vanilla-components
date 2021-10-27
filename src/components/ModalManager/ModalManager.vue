<template>
  <Modal :is-open="Boolean(component)" @close="handleClose">
    <component :is="component" v-bind="props" @close="handleClose" />
  </Modal>
</template>

<script>
import { markRaw } from 'vue'
import { EVENTS, EventBus, Modal } from '../../index'

const ESCAPE_KEY = 27

export default {
  components: { Modal },
  data() {
    return {
      component: null,
      props: null,
    }
  },
  created() {
    EventBus.on(EVENTS.OPEN_MODAL, ({ component, props = null }) => {
      this.component = markRaw(component)
      this.props = props
    })
    EventBus.on(EVENTS.CLOSE_MODAL, this.handleClose)
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

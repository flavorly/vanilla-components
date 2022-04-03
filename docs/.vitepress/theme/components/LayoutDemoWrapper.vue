<template>
    <div style="flex: auto; width: 100%; height: 100%; max-width: 100%; background: transparent;">
      <iframe
        v-if="mounted"
        ref="frame"
        style="background: transparent; width: 100%; height: 100%; border: none;"
        :src="'/'+src+'.html'"
        :style="{
          width: '100%',
          height: height,
          maxWidth: '100%',
          border: 0,
        }">
      </iframe>
    </div>
</template>

<script>
export default {
  name: "LayoutDemoWrapper",
  components: {
  },
  props: {
    src: {
      required: true,
      type: String,
    }
  },
  data() {
    return {
      mounted: false,
      height: '100%',
    }
  },
  mounted() {
    window.addEventListener('message', this.receiveMessage)
    this.mounted = true
  },
  beforeUnmount() {
    window.removeEventListener('message', this.receiveMessage)
  },
  methods: {
    receiveMessage(message) {
      if (['vue-devtools-proxy', 'vue-devtools-backend', 'vue-devtools-backend-injection'].includes(message.data.source)) {
        return
      }

      if (message.data === 'mounted') {
        this.height = `${this.$refs.frame.contentWindow.document.body.scrollHeight}px`
      }
    }
  }
}
</script>

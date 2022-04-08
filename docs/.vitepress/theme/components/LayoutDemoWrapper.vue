<template>
  <ClientOnly>
    <div class="demo-container">
      <iframe
        v-if="mounted"
        ref="frame"
        :src="'/'+src+'.html'"
        :style="{
          width: '100%',
          height: height,
          maxWidth: '100%',
          border: 0,
        }">
      </iframe>
    </div>
  </ClientOnly>
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
    this.mounted = true;
  },
  beforeUnmount() {
    window.removeEventListener('message', this.receiveMessage)
  },
  methods: {
    receiveMessage(message) {
      if (['vue-devtools-proxy', 'vue-devtools-backend', 'vue-devtools-backend-injection'].includes(message.data.source)) {
          return;
      }

      if (message.data === 'mounted') {

        setTimeout(() => {
          this.height = `${this.$refs.frame.contentWindow.document.body.scrollHeight}px`
        }, 500);
      }
    }
  }
}
</script>

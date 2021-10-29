<template>
    <div class="flex content-center items-center h-full w-full max-w-full">
      <iframe
        ref="frame" :src="'/guide/examples/'+src+'.html'"
        style="width: 100%; height: 100%; max-width: 100%; border: 0;"
        onload="this.style.height=(this.contentWindow.document.body.scrollHeight+20)+'px';">
      </iframe>
    </div>
</template>

<script>
import {ShadowRoot} from 'vue-shadow-dom/dist/shadow';
export default {
  name: "XWrapper",
  components: {
    ShadowRoot
  },
  props: {
    src: {
      required: true,
      type: String,
    }
  }
}
</script>

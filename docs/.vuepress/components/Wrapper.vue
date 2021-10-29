<template>
    <div style="height: 400px; width: 100%; max-width: 100%;" class="container-centered">
      <iframe
        ref="frame" src="/guide/card-plain.html"
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
}
</script>
<style scoped>
.container-centered{
  display: -webkit-flexbox;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  justify-content: center;
}
</style>

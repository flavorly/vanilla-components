<template>
  <my-component>
    <p>teste</p>
  </my-component>
</template>

<script>
import {defineComponent, createApp,h} from "vue";

const MyComponent = defineComponent({
  beforeUpdate() {
    this.VueFramedApp.children = Object.freeze(this.$slots.default)
  },
  mounted() {
    console.log(this.VueFramedApp)
  },
  methods: {
    renderChildren() {
      const children = this.$slots.default
      const body = this.$el.contentDocument.body
      const el = document.createElement('div') // we will mount or nested app to this element
      body.appendChild(el)

      const VueFramedApp = createApp({
        name: 'VueFramedApp',
        data() {
          return {
            children: Object.freeze(children)
          }
        },
        render: () => h('div', this.children)
      })
      VueFramedApp.mount(el) // mount into iframe
      this.VueFramedApp = VueFramedApp // cache instance for later updates
    }
  },

  render: (app) => h('iframe', {
    srcdoc: { load: app.renderChildren }
  })
})

export default {
  name: "WrapperTest",
  components: {
      MyComponent
  }
}
</script>

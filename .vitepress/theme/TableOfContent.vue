<template>
  <div class="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8">
    <div
      class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-16) pt-10 pb-6 top-16"
    >
      <div class="mb-8" v-if="$page.headers">
        <h5
          class="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs"
        >
          On this page
        </h5>

        <ul class="overflow-x-hidden text-gray-500 font-medium">
          <li
            v-for="section in $page.headers"
            :key="section.slug"
            :class="{ 'ml-4': section.level == 3 }"
          >
            <a
              :href="'#' + section.slug"
              class="block transform transition-colors duration-200 py-2 hover:text-gray-900"
              :class="{ 'text-gray-900': activeHash === '#' + section.slug }"
            >
              {{ section.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeHash: null,
    }
  },
  props: {
    anchors: Array,
  },
  mounted() {
    this.initActiveHash()
  },
  methods: {
    initActiveHash() {
      this.activeHash = this.$page.headers
        ? '#' + this.$page.headers[0].slug
        : null
    },
    handleScroll() {
      const y = window.pageYOffset
      const windowHeight = window.innerHeight

      if (y < 0) {
        this.activeHash = this.initActiveHash()
      } else if (y + windowHeight >= document.body.scrollHeight) {
        this.activeHash = this.$page.headers
          ? '#' + this.$page.headers[this.$page.headers.length - 1].slug
          : null
      } else {
        const middle = y + windowHeight / 2
        for (let i = 0; i < this.anchors.length; i++) {
          if (middle >= this.anchors[i].offsetTop) {
            this.activeHash = this.anchors[i].hash
          }
        }
      }
    },
  },
  watch: {
    $page() {
      // At this point, the document haven't finished re-render
      this.initActiveHash()
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

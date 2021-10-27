<template>
  <Header />

  <button
    type="button"
    @click="navOpen = !navOpen"
    class="fixed z-50 bottom-4 right-4 w-16 h-16 rounded-full bg-gray-900 text-white block lg:hidden"
  >
    <span class="sr-only">Open site navigation</span>
    <IconNavOpen
      :class="{ 'opacity-0 scale-75': !navOpen }"
      class="absolute top-1/2 left-1/2 -mt-3 -ml-3 transition duration-300 transform"
    />
    <IconNavClose
      :class="{ 'opacity-0 scale-75': navOpen }"
      class="absolute top-1/2 left-1/2 -mt-3 -ml-3 transition duration-300 transform"
    />
  </button>

  <div class="w-full mx-auto max-w-8xl lg:flex">
    <SideBar :nav-open="navOpen" @update:clostNav="navOpen = false" />
    <div
      class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible"
      :class="{ 'overflow-hidden max-h-screen fixed': navOpen }"
    >
      <div class="w-full flex">
        <ContentWrapper @contentUpdated="handleContentUpdate" />
        <TableOfContent :anchors="anchors" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import SideBar from './SideBar.vue'
import TableOfContent from './TableOfContent.vue'
import ContentWrapper from './ContentWrapper.vue'
import IconNavOpen from './icons/IconNavOpen.vue'
import IconNavClose from './icons/IconNavClose.vue'

export default {
  data() {
    return {
      anchors: null,
      navOpen: false,
    }
  },
  components: {
    Header,
    SideBar,
    TableOfContent,
    ContentWrapper,
    IconNavOpen,
    IconNavClose,
  },
  mounted() {
    this.getAnchors()
  },
  methods: {
    handleContentUpdate() {
      this.getAnchors()
    },
    getAnchors() {
      this.anchors = Array.prototype.slice
        .call(document.querySelectorAll('.header-anchor'))
        .map((item) => {
          return { hash: item.hash, offsetTop: item.offsetTop }
        })
        .filter((item) => {
          // Only need the ones exist in TOC
          return this.$page.headers.some(
            (header) => '#' + header.slug === item.hash
          )
        })
    },
  },
}
</script>

<style>
a.header-anchor {
  @apply float-left opacity-0 no-underline text-gray-400;
  margin-top: 0.125em;
  margin-left: -0.87em;
  padding-right: 0.23em;
  font-size: 0.85em;
}

h1:hover .header-anchor,
h1:focus .header-anchor,
h2:hover .header-anchor,
h2:focus .header-anchor,
h3:hover .header-anchor,
h3:focus .header-anchor,
h4:hover .header-anchor,
h4:focus .header-anchor,
h5:hover .header-anchor,
h5:focus .header-anchor,
h6:hover .header-anchor,
h6:focus .header-anchor {
  opacity: 1;
}

*,
:after,
:before {
  box-sizing: border-box;
  border: 0 solid #e5e7eb;
}
</style>

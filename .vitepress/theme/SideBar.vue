<template>
  <div
    class="fixed z-20 inset-0 lg:h-auto flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block lg:static"
    :class="{ hidden: !navOpen }"
    @click="$emit('update:clostNav')"
  >
    <div
      class="h-full overflow-y-auto lg:block lg:bg-transparent overflow-hidden lg:top-16 lg:h-auto lg:sticky bg-white mr-24 lg:mr-0"
      @click="(e) => e.stopPropagation()"
    >
      <div
        class="hidden lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white"
      />
      <nav
        class="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-14 lg:h-(screen-16)"
      >
        <ul
          v-for="(collection, category) in $themeConfig.collections"
          :key="category"
        >
          <li class="mb-8">
            <h5
              class="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs"
            >
              {{ category }}
            </h5>
            <ul v-for="fileName in collection" :key="fileName">
              <li>
                <NavItem :fileName="fileName" />
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import NavItem from './components/NavItem.vue'

export default {
  props: {
    navOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:clostNav'],
  components: { NavItem },
}
</script>

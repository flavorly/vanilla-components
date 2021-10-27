<template>
  <div class="relative bg-white shadow-lg rounded-lg sm:rounded-lg dark:bg-gray-750 dark:text-white dark:shadow-dark-xl">
    <div
      v-if="hasHeader"
      :class="[headerClasses]"
      class="px-4 py-5 border-b border-gray-200 sm:px-6 dark:border-gray-700"
    >
      <div class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
        <!--  Title and Subtitle -->
        <div class="ml-4 mt-4 flex items-center">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-800 dark:text-white">
              <slot name="title">
                <span
                  v-if="title !== ''"
                  v-html="title"
                />
              </slot>
            </h3>
            <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500 dark:text-gray-400">
              <slot name="subtitle">
                <span
                  v-if="subtitle !== ''"
                  v-html="subtitle"
                />
              </slot>
            </p>
          </div>
        </div>
        <!--  Actions -->
        <div class="ml-4 mt-4 flex-shrink flex">
          <slot name="actions" />
        </div>
        <!--  End Actions -->
      </div>
    </div>

    <div :class="[bodyClasses]">
      <slot name="default" />
    </div>

    <div
      v-if="hasFooter"
      :class="[footerClasses]"
      class="px-4 py-3 flex items-center justify-end text-right sm:px-6 border-t border-gray-200 dark:border-gray-700"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
<script>
export default {
    name: 'XCard',
    props: {
        title: {
            type: String,
            required: false,
            default: ''
        },
        subtitle: {
            type: String,
            required: false,
            default: ''
        },
        bodyClasses: {
            type: String,
            default: ''
        },
        headerClasses: {
            type: String,
            default: ''
        },
        footerClasses: {
            type: String,
            default: ''
        }
    },
    computed: {
        hasFooter() {
            return !!this.$slots.footer
        },
        hasHeader() {
            return this.$slots['title'] ||
                this.$slots['subtitle'] ||
                this.$slots['actions'] ||
                this.title !== '' ||
                this.subtitle !== ''
        }
    }
}
</script>

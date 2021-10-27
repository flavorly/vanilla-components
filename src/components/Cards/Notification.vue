<template>
  <div class="py-5 mx-auto">
    <div class="bg-white shadow-lg rounded-lg sm:rounded-lg dark:bg-gray-750 dark:text-white dark:shadow-dark-xl">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          <slot name="title">
            <span v-html="title" />
          </slot>
        </h3>
        <div class="mt-2 sm:flex sm:items-start sm:justify-between">
          <div class="max-w-xl text-sm leading-5 text-gray-500 dark:text-gray-400">
            <p>
              <slot name="content">
                <span v-html="content" />
              </slot>
            </p>
          </div>
          <div class="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
            <span class="inline-flex rounded-md">
              <button
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                type="button"
              >
                Change plan
              </button>
              <button
                class="underline ml-6 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:underline transition ease-in-out duration-150 dark:text-white"
              >
                Dismiss
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'XCardNotification',
    props: {
        title: {
            type: String,
            required: false,
            default: ''
        },
        content: {
            type: String,
            required: false,
            default: ''

        }
    }
}
</script>

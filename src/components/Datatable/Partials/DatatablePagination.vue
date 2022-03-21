<template>
  <div class="px-4 py-3 flex items-center justify-between border-gray-200 border-t sm:px-6 dark:border-gray-700">
    <div class="flex-1 flex justify-between sm:hidden">
      <VanillaButton
        variant="paginationButton"
        :class="[
          isFetching || previousPage === null ? 'cursor-not-allowed' : 'cursor-pointer',
          buttonShortClass,
        ]"
        aria-label="Previous"
        @click.prevent="goToPage(previousPage)"
      >
        <ChevronLeftIcon class="h-5 w-5" />
        <span
          class="mr-2"
          v-html="textPrevious"
        />
      </VanillaButton>
      <VanillaButton
        variant="paginationButton"
        :class="[
          isFetching || nextPage === null ? 'cursor-not-allowed' : 'cursor-pointer',
          buttonShortClass,
        ]"
        aria-label="Previous"
        @click.prevent="goToPage(nextPage)"
      >
        <span
          class="ml-2"
          v-html="textNext"
        />
        <ChevronRightIcon class="h-5 w-5" />
      </VanillaButton>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p
          v-if="showNumberOfItems"
          class="text-sm leading-5 text-gray-700 dark:text-gray-400"
        >
          <span
            v-html="textNumberOfResults"
          />
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex shadow-sm cursor-pointer">
          <VanillaButton
            variant="paginationButton"
            :class="[
              isFetching || previousPage === null ? 'cursor-not-allowed' : 'cursor-pointer',
              buttonShortClass,
            ]"
            class="rounded-l-md rounded-r-none focus:ring-0"
            aria-label="Previous"
            @click.prevent="goToPage(previousPage)"
          >
            <ChevronLeftIcon class="h-6 w-5" />
          </VanillaButton>
          <template v-if="showPages && pages.length > 0">
            <VanillaButton
              v-for="(page, key) in pages.slice(Number(currentPage),Number(showPagesMaximum))"
              :key="key"
              variant="paginationButtonPage"
              :class="{'bg-indigo-50 text-indigo-600': page.active, 'focus:bg-gray-300/10': !page.active}"
              @click.prevent="goToPage(page.url)"
            >
              {{ page.label }}
            </VanillaButton>
          </template>
          <VanillaButton
            variant="paginationButton"
            :class="[
              isFetching || nextPage === null ? 'cursor-not-allowed' : 'cursor-pointer',
              buttonShortClass,
            ]"
            class="-ml-px rounded-r-md rounded-l-none focus:ring-0"
            aria-label="Previous"
            @click.prevent="goToPage(nextPage)"
          >
            <ChevronRightIcon class="h-6 w-5" />
          </VanillaButton>
        </nav>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid';
import { VanillaButton } from '@/index';

export default defineComponent({
    name: 'VanillaDatatablePagination',
    components: {
        ChevronLeftIcon,
        ChevronRightIcon,
        VanillaButton,
    },
    props: {
        isFetching: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        pages: {
            type: [Array] as PropType<object[]>,
            required: false,
            default(){
                return [];
            },
        },
        nextPage: {
            type: [String, Number] as PropType<string | number>,
            default: null,
        },
        previousPage: {
            type: [String, Number] as PropType<string | number>,
            default: null,
        },
        currentPage: {
            type: [String, Number] as PropType<string | number>,
            default: null,
        },
        showingFrom: {
            type: [String, Number] as PropType<string | number>,
            required: false,
            default: 0,
        },
        showingTo: {
            type: [String, Number] as PropType<string | number>,
            required: false,
            default: 0,
        },
        total: {
            type: [String, Number] as PropType<string | number>,
            required: false,
            default: 0,
        },
        showPages: {
            type: Boolean as PropType<boolean>,
            required: false,
            default: true,
        },
        showPagesMaximum: {
            type: [String, Number] as PropType<string | number>,
            required: false,
            default: 5,
        },
        showNumberOfItems: {
            type: Boolean as PropType<boolean>,
            required: false,
            default: true,
        },
        textNumberOfResults: {
            type: [String] as PropType<string>,
            required: true,
        },
        textNext: {
            type: [String] as PropType<string>,
            required: false,
            default: 'Next',
        },
        textPrevious: {
            type: [String] as PropType<string>,
            required: false,
            default: 'Previous',
        },
    },
    emits: ['navigate'],
    setup(props, { emit }){

        const buttonShortClass = 'cursor-pointer relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 dark:bg-gray-800 dark:text-white dark:hover:text-white dark:border-gray-600 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-indigo-300 focus:ring-indigo-500 active:bg-gray-100 active:text-gray-500';

        const goToPage = (page: string | number) => {
            emit('navigate', page);
        };

        return {
            goToPage,
            buttonShortClass,
        };
    },
});
</script>

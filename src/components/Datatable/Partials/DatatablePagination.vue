<template>
  <div class="px-4 py-3 flex items-center justify-between border-gray-200 border-t sm:px-6 dark:border-gray-700">
    <div class="flex-1 flex justify-between sm:hidden">
      <VanillaButton
        variant="paginationButton"
        :class="[
          isFetching || previousPage === null ? 'cursor-not-allowed' : 'cursor-pointer',
        ]"
        aria-label="Previous"
        @click.prevent="goToPage(previousPage)"
      >
        <ChevronLeftIcon class="h-5 w-5" />
        <span
          class="mr-2"
          v-html="translations.previousPage"
        />
      </VanillaButton>
      <VanillaButton
        variant="paginationButton"
        :class="[
          isFetching || nextPage === null ? 'cursor-not-allowed' : 'cursor-pointer',
        ]"
        aria-label="Previous"
        @click.prevent="goToPage(nextPage)"
      >
        <span
          class="ml-2"
          v-html="translations.nextPage"
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
            v-html="useReplacePlaceholders(translations.showingFrom,{
              from: showingFrom,
              to: showingTo,
              total: total
            })"
          />
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex shadow-sm cursor-pointer">
          <VanillaButton
            variant="paginationButton"
            :class="[
              isFetching || previousPage === null ? 'cursor-not-allowed' : 'cursor-pointer',
            ]"
            class="rounded-l-md rounded-r-none focus:ring-0"
            aria-label="Previous"
            @click.prevent="goToPage(previousPage)"
          >
            <ChevronLeftIcon class="h-6 w-5" />
          </VanillaButton>
          <template v-if="showPages && pages.length > 0">
            <VanillaButton
              v-for="(page, key) in pagesLimited"

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
import { defineComponent, PropType, computed } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid';
import VanillaButton from '@/components/Button/Button.vue';
import { VanillaDatatableResponsePage } from '../index';
import { useReplacePlaceholders } from '@/core';
import { useInjectDatatableTranslations } from '../utils';

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
            type: [Array] as PropType<VanillaDatatableResponsePage[]>,
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
            default: false,
        },
        showPagesMaximum: {
            type: [String, Number] as PropType<string | number>,
            required: false,
            default: 5,
        },
        limitPages: {
            type: [Boolean] as PropType<boolean>,
            default: false,
        },
        showNumberOfItems: {
            type: Boolean as PropType<boolean>,
            required: false,
            default: true,
        },
    },
    emits: ['navigate'],
    setup(props, { emit }){

        const goToPage = (page: string | number) => {
            console.log('goToPage', page);
            emit('navigate', page);
        };

        // Provide Translations
        const translations = useInjectDatatableTranslations()!;

        const pagesLimited = computed(() => {
            if (prop.limitPages === false){
                return prop.pages;
            }
            const pages = props.pages;
            const currentPage = Number(props.currentPage) - 1;
            const showPagesMaximum = Number(props.showPagesMaximum);
            const pagesLength = pages.length;
            const pagesSliced = pages.slice(currentPage, currentPage + showPagesMaximum);
            if (pagesSliced.length < showPagesMaximum) {
                const pagesToAdd = showPagesMaximum - pagesSliced.length;
                const pagesToAddStart = pagesSliced.length;
                const pagesToAddEnd = pagesSliced.length + pagesToAdd;
                const pagesToAddStartLimited = pages.slice(0, pagesToAddStart);
                const pagesToAddEndLimited = pages.slice(pagesLength - pagesToAddEnd, pagesLength);
                return [...pagesToAddStartLimited, ...pagesSliced, ...pagesToAddEndLimited];
            }
            return pagesSliced;
        });

        return {
            goToPage,
            pagesLimited,
            translations,
            useReplacePlaceholders,
        };
    },
});
</script>

<template>
  <div :class="[classesList.paginationContainer]">
    <div :class="[classesList.paginationShortContainer]">
      <VanillaButton
        variant="paginationButton"
        :class="[
          isFetching || previousPage === null ? classesList.genericForbidden : classesList.genericPointer,
        ]"
        aria-label="Previous"
        @click.prevent="goToPage(previousPage)"
      >
        <ChevronLeftIcon :class="[classesList.paginationShortIcon]" />
        <span
          :class="classesList.paginationShortLeft"
          v-html="translations.previousPage"
        />
      </VanillaButton>
      <VanillaButton
        variant="paginationButton"
        :class="[
          isFetching || nextPage === null ? classesList.genericForbidden : classesList.genericPointer,
        ]"
        aria-label="Next"
        @click.prevent="goToPage(nextPage)"
      >
        <span
          :class="classesList.paginationShortRight"
          v-html="translations.nextPage"
        />
        <ChevronRightIcon :class="[classesList.paginationShortIcon]" />
      </VanillaButton>
    </div>

    <div :class="[classesList.paginationFullContainer]">
      <div>
        <p
          v-if="showNumberOfItems"
          :class="[classesList.paginationFullNumberOfRecords]"
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
        <nav :class="[classesList.paginationFullButtonsContainer]">
          <VanillaButton
            variant="paginationButton"
            :class="[
              classesList.paginationFullLeft,
              isFetching || previousPage === null ? classesList.genericForbidden : classesList.genericPointer,
            ]"
            aria-label="Previous"
            @click.prevent="goToPage(previousPage)"
          >
            <ChevronLeftIcon :class="[classesList.paginationFullIcon]" />
          </VanillaButton>
          <template v-if="showPages && pages.length > 0">
            <VanillaButton
              v-for="(page, key) in pagesLimited"
              :key="key"
              variant="paginationButtonPage"
              :class="[
                page.active ? classesList.paginationFullPageActive : classesList.paginationFullPage,
              ]"
              @click.prevent="goToPage(page.url)"
            >
              {{ page.label }}
            </VanillaButton>
          </template>
          <VanillaButton
            variant="paginationButton"
            :class="[
              classesList.paginationFullRight,
              isFetching || nextPage === null ? classesList.genericForbidden : classesList.genericPointer,
            ]"
            aria-label="Previous"
            @click.prevent="goToPage(nextPage)"
          >
            <ChevronRightIcon :class="[classesList.paginationFullIcon]" />
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
import { useInjectsClassesList, useReplacePlaceholders } from '@/core';
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
        const classesList = useInjectsClassesList('configuration_vanilla_datatable')!;

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
            useReplacePlaceholders,
            pagesLimited,
            translations,
            classesList,
        };
    },
});
</script>

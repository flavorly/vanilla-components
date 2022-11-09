<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import type * as Types from '../config'
import { useInjectDatatableTranslations } from '../utils'
import ChevronLeftIcon from '@/components/icons/hero/solid/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/hero/solid/ChevronRightIcon.vue'
import { useInjectsClassesList, useReplacePlaceholders } from '@/core/use'
import Button from '@/components/button/button.vue'

const props = defineProps({
  isFetching: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  pages: {
    type: [Array] as PropType<Types.DatatableResponsePage[]>,
    required: false,
    default() {
      return []
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
})

const emit = defineEmits(['navigate'])

const goToPage = (page: string | number) => emit('navigate', page)

const translations = useInjectDatatableTranslations()!
const classesList = useInjectsClassesList('configuration_vanilla_datatable')!

const pagesLimited = computed(() => {
  if (props.limitPages === false) {
    return props.pages
  }
  const pages = props.pages
  const currentPage = Number(props.currentPage) - 1
  const showPagesMaximum = Number(props.showPagesMaximum)
  const pagesLength = pages.length
  const pagesSliced = pages.slice(currentPage, currentPage + showPagesMaximum)
  if (pagesSliced.length < showPagesMaximum) {
    const pagesToAdd = showPagesMaximum - pagesSliced.length
    const pagesToAddStart = pagesSliced.length
    const pagesToAddEnd = pagesSliced.length + pagesToAdd
    const pagesToAddStartLimited = pages.slice(0, pagesToAddStart)
    const pagesToAddEndLimited = pages.slice(pagesLength - pagesToAddEnd, pagesLength)
    return [...pagesToAddStartLimited, ...pagesSliced, ...pagesToAddEndLimited]
  }
  return pagesSliced
})
</script>

<template>
  <div
    :class="[classesList.paginationContainer]"
  >
    <div :class="[classesList.paginationShortContainer]">
      <Button
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
      </Button>
      <Button
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
      </Button>
    </div>

    <div :class="[classesList.paginationFullContainer]">
      <div>
        <p
          v-if="showNumberOfItems"
          :class="[classesList.paginationFullNumberOfRecords]"
        >
          <span
            v-html="useReplacePlaceholders(translations.showingFrom, {
              from: showingFrom,
              to: showingTo,
              total,
            })"
          />
        </p>
      </div>
      <div>
        <nav :class="[classesList.paginationFullButtonsContainer]">
          <Button
            variant="paginationButton"
            :class="[
              classesList.paginationFullLeft,
              isFetching || previousPage === null ? classesList.genericForbidden : classesList.genericPointer,
            ]"
            aria-label="Previous"
            @click.prevent="goToPage(previousPage)"
          >
            <ChevronLeftIcon :class="[classesList.paginationFullIcon]" />
          </Button>
          <template v-if="showPages && pages.length > 0">
            <Button
              v-for="(page, key) in pagesLimited"
              :key="key"
              variant="paginationButtonPage"
              :class="[
                page.active ? classesList.paginationFullPageActive : classesList.paginationFullPage,
              ]"
              @click.prevent="goToPage(page.url)"
            >
              {{ page.label }}
            </Button>
          </template>
          <Button
            variant="paginationButton"
            :class="[
              classesList.paginationFullRight,
              isFetching || nextPage === null ? classesList.genericForbidden : classesList.genericPointer,
            ]"
            aria-label="Previous"
            @click.prevent="goToPage(nextPage)"
          >
            <ChevronRightIcon :class="[classesList.paginationFullIcon]" />
          </Button>
        </nav>
      </div>
    </div>
  </div>
</template>

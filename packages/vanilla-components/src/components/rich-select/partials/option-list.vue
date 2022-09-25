<script lang="ts">
import type { PropType, Ref } from 'vue'
import { computed, defineComponent, inject } from 'vue'
import type { RichSelectProps } from '../config'
import SelectOption from './option.vue'
import { useInjectsClassesList } from '@/core/use'
import { debounce, normalizeMeasure } from '@/core/helpers'
import type { NormalizedOptions } from '@/core/types'

// TODO: Refactor to script setup

export default defineComponent({
    components: {
      SelectOption,
    },
    props: {
        options: {
            type: Array as PropType<NormalizedOptions>,
            required: true,
        },
        deep: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        const configuration = inject<RichSelectProps>('configuration_vanilla')!
        const shown = inject<Ref<boolean>>('shown')
        const fetchingMoreOptions = inject<Ref<boolean>>('fetchingMoreOptions')!
        const dropdownBottomReachedHandler = inject<(() => void)>('dropdownBottomReachedHandler')!

        const maxHeight = computed(() => normalizeMeasure(configuration.maxHeight))
        const usesMaxHeight = computed((): boolean => props.deep === 0 && maxHeight.value !== undefined)
        const classesList = useInjectsClassesList()

        const bottomReachedObserver = debounce(([event]: [Event]) => {
            const element = event.target as HTMLUListElement
            const reached: boolean = Math.ceil(element.scrollHeight - element.scrollTop) === element.clientHeight

            if (reached) {
                dropdownBottomReachedHandler()
            }
        }, 200)

        return {
            maxHeight,
            usesMaxHeight,
            shown,
            bottomReachedObserver,
            fetchingMoreOptions,
            configuration,
            classesList,
        }
    },
    computed: {
        showOptions(): boolean {
            return this.options.length > 0
        },
    },
    watch: {
        async showOptions(show: boolean) {
            if (show) {
                await this.$nextTick()
                this.$el.addEventListener('scroll', this.bottomReachedObserver)
            }
            else {
                this.$el.removeEventListener('scroll', this.bottomReachedObserver)
            }
        },
        async fetchingMoreOptions(fetchingMoreOptions: boolean) {
            if (fetchingMoreOptions) {
                await this.$nextTick()
                const el = this.$refs.fetchingMoreOptionsText as HTMLLIElement

                // TODO: check this
                if (el) {
                  el.scrollIntoView({ block: 'end', behavior: 'smooth' })
                }
            }
        },
    },
    mounted() {
        if (this.showOptions) {
            this.$el.addEventListener('scroll', this.bottomReachedObserver)
        }
    },
    beforeUnmount() {
        if (this.showOptions) {
            this.$el.removeEventListener('scroll', this.bottomReachedObserver)
        }
    },
})
</script>

<template>
  <ul
    v-if="showOptions"
    :class="classesList.optionsList"
    :style="usesMaxHeight ? `max-height: ${maxHeight}; overflow-x: auto;` : undefined"
  >
    <SelectOption
      v-for="(option, index) in options"
      :key="`${deep > 0 ? `${deep}-` : ''}${JSON.stringify(option.value)}-${index}`"
      :option="option"
      :deep="deep"
    >
      <template #option="props">
        <slot
          name="option"
          v-bind="props"
        />
      </template>
      <template #optionLabel="props">
        <slot
          name="optionLabel"
          v-bind="props"
        />
      </template>
      <template #optionIcon="props">
        <slot
          name="optionIcon"
          v-bind="props"
        />
      </template>
    </SelectOption>

    <li
      v-if="fetchingMoreOptions"
      ref="fetchingMoreOptionsText"
      key="loading_more"
      :class="classesList.optionsListLoadingMore"
      v-text="configuration.loadingMoreResultsText"
    />
  </ul>
</template>

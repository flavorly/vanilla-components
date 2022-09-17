<template>
  <ul
    v-if="showOptions"
    :class="classesList.optionsList"
    :style="usesMaxHeight? `max-height: ${maxHeight}; overflow-x: auto;` : undefined"
  >
    <rich-select-option
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
    </rich-select-option>

    <li
      v-if="fetchingMoreOptions"
      ref="fetchingMoreOptionsText"
      key="loading_more"
      :class="classesList.optionsListLoadingMore"
      v-text="configuration.loadingMoreResultsText"
    />
  </ul>
</template>

<script lang="ts">
import { computed, Ref, defineComponent, inject, PropType } from 'vue';
import { debounce, useInjectsClassesList, normalizeMeasure } from '@/core';
import { NormalizedOptions } from '@/core/types';
import { VanillaRichSelectProps } from '@/components/RichSelect';
import RichSelectOption from './RichSelectOption.vue';

export default defineComponent({
    name: 'RichSelectOptionsList',
    components: {
        RichSelectOption,
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
        const configuration = inject<VanillaRichSelectProps>('configuration_vanilla')!;
        const shown = inject<Ref<boolean>>('shown');
        const fetchingMoreOptions = inject<Ref<boolean>>('fetchingMoreOptions')!;
        const dropdownBottomReachedHandler = inject<(() => void)>('dropdownBottomReachedHandler')!;

        const maxHeight = computed(() => normalizeMeasure(configuration.maxHeight));
        const usesMaxHeight = computed((): boolean => props.deep === 0 && maxHeight.value !== undefined);
        const classesList = useInjectsClassesList();

        const bottomReachedObserver = debounce(([event]: [Event]) => {
            const element = event.target as HTMLUListElement;
            const reached: boolean = Math.ceil(element.scrollHeight - element.scrollTop) === element.clientHeight;

            if (reached) {
                dropdownBottomReachedHandler();
            }
        }, 200);

        return {
            maxHeight,
            usesMaxHeight,
            shown,
            bottomReachedObserver,
            fetchingMoreOptions,
            configuration,
            classesList,
        };
    },
    computed: {
        showOptions(): boolean {
            return this.options.length > 0;
        },
    },
    watch: {
        async showOptions(show: boolean) {
            if (show) {
                await this.$nextTick();
                this.$el.addEventListener('scroll', this.bottomReachedObserver);
            } else {
                this.$el.removeEventListener('scroll', this.bottomReachedObserver);
            }
        },
        async fetchingMoreOptions(fetchingMoreOptions: boolean) {
            if (fetchingMoreOptions) {
                await this.$nextTick();
                const el = this.$refs.fetchingMoreOptionsText as HTMLLIElement;
                el.scrollIntoView({ block: 'end', behavior: 'smooth' });
            }
        },
    },
    mounted() {
        if (this.showOptions) {
            this.$el.addEventListener('scroll', this.bottomReachedObserver);
        }
    },
    beforeUnmount() {
        if (this.showOptions) {
            this.$el.removeEventListener('scroll', this.bottomReachedObserver);
        }
    },
});
</script>

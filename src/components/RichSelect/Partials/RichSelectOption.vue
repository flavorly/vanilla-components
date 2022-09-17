<template>
  <li
    v-if="hasChildren"
    role="optgroup"
    :class="classesList.optgroup"
  >
    <div :class="classesList.optgroupContent">
      <span :class="classesList.optgroupLabel">{{ option.text }}</span>

      <rich-select-options-list
        ref="childrenOptions"
        :class="classesList.optgroupOptionsList"
        :options="option.children"
        :deep="deep + 1"
      />
    </div>
  </li>
  <li
    v-else
    :class="classesList.optionWrapper"
    @mousemove="mousemoveHandler"
    @mousewheel="mousewheelHandler"
    @click="clickHandler"
  >
    <slot
      name="option"
      :class-name="optionClasses"
      :option="option"
      :is-disabled="isDisabled"
      :is-active="isActive"
      :is-selected="isSelected"
      :deep="deep"
    >
      <button
        role="option"
        :class="optionClasses"
        :aria-selected="isSelected"
        tabindex="-1"
        type="button"
        :disabled="isDisabled"
        :value="valueAttribute"
      >
        <div :class="classesList.optionContent">
          <slot
            name="optionLabel"
            :option="option"
            :is-disabled="isDisabled"
            :is-active="isActive"
            :is-selected="isSelected"
            :deep="deep"
          >
            <span :class="classesList.optionLabel">
              {{ option.text }}
            </span>
          </slot>

          <slot
            name="optionIcon"
            :class-name="optionClasses"
            :option="option"
            :is-disabled="isDisabled"
            :is-active="isActive"
            :is-selected="isSelected"
            :deep="deep"
          >
            <checkmark-icon
              v-if="isSelected"
              ref="checkIcon"
              :class="classesList.optionSelectedIcon"
            />
          </slot>
        </div>
      </button>
    </slot>
  </li>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, Ref, defineAsyncComponent } from 'vue';
import { CSSClass, NormalizedOption } from '@/core/types';
import { normalizedOptionIsDisabled } from '@/core/helpers';
import { useInjectsClassesList } from '@/core';
import CheckmarkIcon from '@/components/icons/CheckmarkIcon.vue';

export default defineComponent({
    name: 'RichSelectOption',
    components: {
        CheckmarkIcon,
    },
    props: {
        option: {
            type: [Object] as PropType<NormalizedOption>,
            required: true,
        },
        deep: {
            type: Number,
            default: 0,
        },
    },
    setup() {
        const toggleOption = inject<(option: NormalizedOption) => void>('toggleOption')!;
        const setActiveOption = inject<(option: NormalizedOption) => void>('setActiveOption')!;
        const optionIsSelected = inject<(option: NormalizedOption) => boolean>('optionIsSelected')!;
        const optionIsActive = inject<(option: NormalizedOption) => boolean>('optionIsActive')!;
        const shown = inject<Ref<boolean>>('shown');
        const classesList = useInjectsClassesList()!;

        return {
            setActiveOption,
            toggleOption,
            optionIsSelected,
            optionIsActive,
            shown,
            classesList,
        };
    },
    computed: {
        optionClasses(): CSSClass[] {
            const classes: CSSClass[] = [this.classesList!.option];

            // Selected
            if (this.isSelected) {
                if (this.isActive) {
                    classes.push(this.classesList!.selectedHighlightedOption);
                } else {
                    classes.push(this.classesList!.selectedOption);
                }
                // Not selected
            } else if (this.isActive) {
                classes.push(this.classesList!.highlightedOption);
            }

            return classes;
        },
        valueAttribute(): string {
            if (typeof this.option.value === 'object') {
                return JSON.stringify(this.option.value);
            }

            return String(this.option.value);
        },
        hasChildren(): boolean {
            return this.option.children !== undefined && this.option.children.length > 0;
        },
        isSelected(): boolean {
            return this.optionIsSelected(this.option);
        },
        isActive(): boolean {
            return this.optionIsActive(this.option);
        },
        isDisabled(): boolean {
            return normalizedOptionIsDisabled(this.option);
        },
    },
    watch: {
        shown: {
            async handler(): Promise<void> {
                await this.$nextTick();
                this.scrollIntoViewIfNeccesary();
            },
            immediate: true,
        },
        isActive(): void {
            this.scrollIntoViewIfNeccesary();
        },
    },
    beforeCreate() {
        /* istanbul ignore next */
        this.$options.components!.RichSelectOptionsList = defineAsyncComponent(() => import('./RichSelectOptionsList.vue'));
    },
    methods: {
        scrollIntoViewIfNeccesary(): void {
            if (this.shown && this.isActive) {
                const li = this.$el as HTMLLIElement;
                li.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        },
        mousemoveHandler(): void {
            if (this.isDisabled) {
                return;
            }
            this.setActiveOption(this.option);
        },
        mousewheelHandler(): void {
            if (this.isDisabled) {
                return;
            }
            this.setActiveOption(this.option);
        },
        clickHandler(): void {
            if (this.isDisabled) {
                return;
            }
            this.toggleOption(this.option);
        },
    },
});
</script>

<template>
  <thead>
    <tr>
      <!-- Toggle All/None Checked -->
      <th
        v-if="selectable"
        :class="[classesList.tableHeadColumnCheckbox]"
      >
        <input
          :checked="allItemsChecked"
          :disabled="isFetching"
          :indeterminate="someItemsChecked"
          :class="[
            classesList.tableCheckbox,
            classesList.tableHeadCheckbox,
          ]"
          type="checkbox"
          @change="onCheckAllToggled"
        >
      </th>
      <!-- Header Column Render -->
      <th
        v-for="(column) in columns"
        v-show="column.visible"
        :key="column.name"
        :class="[classesList.tableHeadColumn]"
        scope="col"
      >
        <slot
          name="column"
          v-bind="{ column }"
        >
          <div :class="[classesList.tableHeadColumnContainer]">
            <span :class="[classesList.tableHeadColumnLabel]">
              {{ column.label }}
            </span>
            <span
              v-if="column.sortable"
              :class="[
                classesList.tableHeadColumnSortContainer,
                column.isSorted ? classesList.tableHeadColumnSorted : classesList.tableHeadColumnNotSorted
              ]"
              @click="toggleSorting(column.name)"
            >
              <ChevronUpIcon
                v-if="column.isSorted && !column.isSortedDesc"
                :class="[
                  classesList.tableHeadColumnSortedIconClasses,
                  column.isSortedAsc ? '': classesList.tableHeadColumnSortedIcon,
                ]"
                aria-hidden="true"
              />
              <ChevronDownIcon
                v-if="(column.isSorted && !column.isSortedAsc) || !column.isSorted"
                :class="[
                  classesList.tableHeadColumnSortedIconClasses,
                  column.isSortedDesc ? '': classesList.tableHeadColumnSortedIcon
                ]"
                aria-hidden="true"
              />
            </span>
          </div>
        </slot>
      </th>
    </tr>
  </thead>
</template>
<script lang="ts">
import { ref, defineComponent, PropType, watch } from 'vue';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid/index.js';
import {
    VanillaDatatableColumnsComputed,
    VanillaDatatableColumnComputed,
    VanillaDatatableSortedColumns,
} from '../index';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { useInjectsClassesList } from '@/core';

export default defineComponent({
    name: 'VanillaDatatableHead',
    components: {
        ChevronDownIcon,
        ChevronUpIcon,
    },
    props: {
        columns: {
            type: [Array] as PropType<VanillaDatatableColumnsComputed>,
            required: true,
        },
        columnsWithHiddenState: {
            type: [Array] as PropType<VanillaDatatableColumnsComputed>,
            required: false,
            default() {
                return [];
            },
        },
        columnsWithSorting : {
            type: [Array] as PropType<VanillaDatatableSortedColumns>,
            required: false,
            default() {
                return [];
            },
        },
        isFetching: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        selectable: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        allItemsChecked: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        someItemsChecked: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
    },
    emits: [
        'checked',
        'sorted',
    ],
    setup(props, { emit }) {

        const onCheckAllToggled = (event: Event) => {
            emit('checked', event.target?.checked);
        };

        /** Default Sorting direction */
        const defaultSorting = 'desc';

        /**
         * Map the user initial columns with our own internal representation
         * All columns start with a sorting times set to 1
         **/
        const localSorting = ref(props.columnsWithSorting.map((column: VanillaDatatableColumnComputed) => {
            return {
                ...column,
                sortedTimes: 1,
            };
        }));

        // Once props changes, destruct the local filters value
        watch(
            () => props.columnsWithSorting,
            (newValue) => {
                localSorting.value = [...newValue];
            },
        );


        /**
         * Sorting Column by name
         * - If the column you want to toggle does not exists in the sorting array, then push it
         * - If the column was sorted more or two times, remove it from the sorting array
         * - Otherwise, we will replace the index with the new sorting object updated.
         **/
        const toggleSorting = (columnToSort: string) => {
            let finalSorting = localSorting.value;
            let index = findIndex(localSorting.value, { column: columnToSort });

            // Means it did not find the sorting register, so push it.
            if (index === -1) {
                finalSorting.push({
                    column: columnToSort,
                    direction: defaultSorting,
                    sortedTimes: 1,
                });
            } else {
                // Find the current configuration for the current sorting
                let columnSort = find(localSorting.value, { column: columnToSort });
                let timesSorted = columnSort.sortedTimes;

                // Tapped 2 times, remove it from the array
                if (timesSorted >= 2) {
                    finalSorting.splice(index, 1);
                } else {
                    // Tapped 1 time, toggle the direction
                    finalSorting.splice(index, 1, {
                        column: columnToSort,
                        direction: columnSort.direction === 'asc' ? 'desc' : 'asc',
                        sortedTimes: timesSorted + 1,
                    });
                }
            }

            // Update the original object & Emit
            localSorting.value = finalSorting;

            emit('sorted', [...localSorting.value]);
        };

        const classesList = useInjectsClassesList('configuration_vanilla_datatable')!;

        return {
            classesList,
            onCheckAllToggled,
            toggleSorting,
            localSorting,
        };
    },
});

</script>

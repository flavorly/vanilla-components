<template>
  <thead>
    <tr>
      <!-- Toggle All/None Checked -->
      <th
        v-if="selectable"
        class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap dark:bg-gray-700"
      >
        <input
          :checked="allItemsChecked"
          :disabled="isFetching"
          :indeterminate="someItemsChecked"
          class="block transition duration-150 ease-in-out checked:bg-indigo-600 checked:text-white dark:focus:ring-offset-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:checked:bg-indigo-600 h-4 w-4"
          type="checkbox"
          @change="onCheckAllToggled"
        >
      </th>
      <!-- Header Column Render -->
      <th
        v-for="(column) in columns"
        v-show="column.visible"
        :key="column.name"
        scope="col"
        class="bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap dark:bg-gray-700 dark:text-white"
      >
        <slot
          name="column"
          v-bind="{ column }"
        >
          <div class="group inline-flex">
            <span>
              {{ column.label }}
            </span>
            <span
              v-if="column.sortable"
              class="ml-2 flex-none rounded"
              :class="[
                column.isSorted ? 'bg-gray-200 text-gray-900 group-hover:bg-gray-300' : 'invisible group-focus:visible text-gray-400 group-hover:visible '
              ]"
              @click="toggleSorting(column.name)"
            >
              <ChevronUpIcon
                v-if="column.isSorted && !column.isSortedDesc"
                class=" h-4 w-4 flex-none rounded"
                :class="[
                  column.isSortedAsc ? '': 'text-gray-400 group-hover:visible group-focus:visible invisible'
                ]"
                aria-hidden="true"
              />
              <ChevronDownIcon
                v-if="(column.isSorted && !column.isSortedAsc) || !column.isSorted"
                class=" h-4 w-4 flex-none rounded"
                :class="[
                  column.isSortedDesc ? '': 'text-gray-400 group-hover:visible group-focus:visible invisible'
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
import { ref, defineComponent, PropType } from 'vue';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/solid';
import {
    VanillaDatatableColumnsComputed,
    VanillaDatatableColumnComputed,
    VanillaDatatableSortedColumns,
} from '../index';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

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
    setup(props, { emit }){

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
                if (timesSorted >= 2){
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

            emit('sorted', localSorting.value);
        };

        return {
            onCheckAllToggled,
            toggleSorting,
            localSorting,
        };
    },
});

</script>

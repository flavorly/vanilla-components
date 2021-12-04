<template>
  <vanilla-input-layout
    :layout="layout"
  >
    <template #label>
      <slot
        v-if="$slots.label || label"
        name="label"
      >
        <vanilla-form-label
          :label-for="name"
          :value="label"
          @click="toggleWithLabel"
        />
      </slot>
    </template>

    <div
      ref="holder"
      class="relative flex-1"
    >
      <Listbox
        :model-value="modelValue"
        @update:modelValue="$emit('update:modelValue',$event)"
        @keydown.esc="closeDropdown"
        @keydown.enter="openDropdown"
      >
        <div class="relative">
          <ListboxButton
            ref="select"
            :class="[
              classesForButtonIfHasErrors,
              classesForButtonHasGroupAbove,
              classesForButtonHasGroupBellow
            ]"
            class="relative w-full border bg-white dark:bg-gray-900 px-4 py-2 dark:border-gray-700 border-1 shadow-sm"
            @click="show = !show"
            @keydown.esc="closeDropdown"
          >
            <div class="relative pr-3">
              <div class="flex items-center space-x-2 text-sm">
                <slot
                  name="selected"
                  v-bind="{option}"
                >
                  <span
                    v-if="option?.indicator"
                    class="flex-shrink-0 inline-block h-2 w-2 rounded-full"
                    :class="indicatorClass(option)"
                    aria-hidden="true"
                  />
                  <img
                    v-if="option?.image"
                    :alt="option.label"
                    :src="option.image"
                    class="flex-shrink-0 h-6 w-6 rounded-full"
                  >
                  <span
                    v-if="option?.icon"
                    class="flex-shrink-0 pl-1"
                    v-html="option.icon"
                  />
                  <span
                    class="block whitespace-nowrap text-base sm:text-sm truncate"
                    v-html="option?.label"
                  />
                </slot>
              </div>
              <div
                v-if="option?.description"
                class="w-100 text-xs text-gray-500 dark:text-gray-300 text-left mt-1"
                v-html="option.description"
              />
            </div>

            <span
              class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
              <SelectorIcon
                :class="[hasErrors ? 'text-red-500' : 'text-gray-400']"
                aria-hidden="true"
                class="w-5 h-5  flex-shrink-0 mr-2"
              />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-show="show"
              class="absolute z-40 mt-1 w-full bg-white dark:bg-gray-900 shadow-lg max-h-56 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm border border-1 border-gray-300 dark:border-gray-700"
            >
              <!-- Search bar -->
              <div :key="'searchbar'">
                <vanilla-input-text
                  v-if="searchable"
                  v-model="query"
                  :layout="'naked'"
                  :placeholder="'Search your stuff here'"
                  class="py-2 px-2 w-full mx-4 my-3"
                  autocomplete="off"
                  :name="'searching'"
                  :name-seed="(Math.random() + 1).toString(36).substring(7)"
                  @keydown.enter.stop="closeDropdown"
                  @keyup.enter.stop="closeDropdown"
                />
              </div>

              <div v-if="searchable && query !== '' && selectOptions?.length <= 0">
                <div class="relative flex">
                  <div class="py-2 px-2 w-full mx-4 my-1 text-sm">
                    <slot
                      :query="query"
                      :searchable="searchable"
                      name="noResults"
                    >
                      {{ noResultsLabel.replace(':query',query) }}
                    </slot>
                  </div>
                </div>
              </div>

              <ListboxOptions
                static
                class="outline-none focus:ring-0 focus:ring-indigo-500 focus:outline-none"
              >
                <ListboxOption
                  v-for="anOption in selectOptions"
                  :key="anOption.value"
                  v-slot="{ active, selected }"
                  :value="anOption.value"
                  as="template"
                  class="py-2 pl-4 pr-4"
                >
                  <li
                    :class="[active ? 'text-indigo-900 bg-indigo-100' : 'text-gray-900 dark:text-white','select-none relative focus-visible:ring-0 cursor-pointer',]"
                  >
                    <div class="relative">
                      <div
                        :class="[selected ? 'font-medium' : 'font-normal','block truncate',]"
                        class="flex items-center space-x-2 text-sm"
                      >
                        <slot
                          name="option"
                          v-bind="{ anOption, active, selected }"
                        >
                          <span
                            v-if="anOption?.indicator"
                            class="flex-shrink-0 inline-block h-2 w-2 rounded-full"
                            :class="indicatorClass(anOption)"
                            aria-hidden="true"
                          />
                          <img
                            v-if="anOption?.image"
                            :alt="anOption.label"
                            :src="anOption.image"
                            class="flex-shrink-0 h-6 w-6 rounded-full"
                          >
                          <span
                            v-if="anOption?.icon"
                            class="flex-shrink-0 pl-1"
                            v-html="anOption.icon"
                          />
                          <span
                            class="block whitespace-nowrap truncate"
                            v-html="anOption?.label"
                          />
                        </slot>
                      </div>
                    </div>
                    <div
                      v-if="anOption?.description"
                      class="w-100 text-xs text-gray-500 text-left mt-1"
                      v-html="anOption.description"
                    />
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 right-0 flex items-center pl-3 pr-3 text-amber-600"
                    >
                      <CheckIcon
                        aria-hidden="true"
                        class="w-5 h-5"
                      />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </div>
          </transition>
        </div>
      </Listbox>
    </div>

    <vanilla-form-errors
      v-if="hasErrors && showErrors"
      :error="errors"
    />

    <vanilla-form-helper
      v-if="help"
      :text="help"
      @click="$emit('labelClick',true)"
    />
  </vanilla-input-layout>
</template>
<script>
import UseFormInputs from "@/utils/UseFormInputs";
import VanillaInputLayout from "@/components/Inputs/Partials/Layout.vue";
import VanillaFormErrors from "@/components/Inputs/Partials/Errors.vue";
import VanillaFormHelper from "@/components/Inputs/Partials/Helper.vue";
import VanillaFormLabel from "@/components/Inputs/Partials/Label.vue";
import VanillaInputText from "@/components/Inputs/Text.vue";
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/vue';
import {CheckIcon, SelectorIcon} from '@heroicons/vue/solid';
import find from 'lodash/find';
import each from 'lodash/each';
import throttle from 'lodash/throttle';
import Fuse from "fuse.js";
import { onClickOutside } from '@vueuse/core'

export default {
    name: "VanillaInputRichSelect",
    components: {
      VanillaFormLabel,
      VanillaFormHelper,
      VanillaFormErrors,
        VanillaInputText,
        VanillaInputLayout,
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        CheckIcon,
        SelectorIcon,
    },
    mixins: [UseFormInputs],
    model: {
        prop: "modelValue",
        event: "change",
    },
    props: {
        options: {
            type: [Object, Array],
            default: () => {
                return [];
            }
        },
        search: {
            type: [Boolean, Function],
            default: false
        },
        searchPlaceholder: {
            type: String,
            default: undefined,
        },
        searchable: {
            type: [Boolean],
            default: true
        },
        modelValue: {
            default: '',
            required: true,
        },
        openOnClickLabel: {
            type: Boolean,
            default: false,
        },
        noResultsLabel: {
            type: String,
            required: false,
            default: () => {
                return '😅 Sorry but there is no records matching ":query"'
            }
        }
    },
    emits: [
        'update:modelValue',
        'labelClick'
    ],
    data() {
        return {
            show: false,
            selectOptions: [],
            query: null,
            searching: false,
            option: undefined,
        }
    },
    computed: {
        // Returns the set of classes if the input has error
        classesForButtonIfHasErrors() {
            return this.hasErrors ?
                'text-red-600 border-red-300 placeholder-red-300 focus:ring-red-500 dark:focus:border-red-400' :
                'focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 border-gray-300'
        },
    },
    watch: {
        query: {
            immediate: true,
            handler: throttle(function(query) {

                if (query === '' || !query) {
                    this.selectOptions = this.options;
                    return;
                }

                // If search prop is a boolean, then search by default label resolver
                if (typeof this.search === "boolean") {
                    this.searching = true;
                    const fuse = new Fuse(this.selectOptions, {
                        includeScore: false,
                        threshold: 0.3,
                        keys: ['id', 'label']
                    });

                    let results = fuse.search(query);
                    let filtered = [];

                    each(results, (result) => {
                        filtered.push(result.item)
                    })
                    this.selectOptions = filtered;
                }

                if (typeof this.search === "function") {
                    this.selectOptions = this.search(this.selectOptions, query);
                }

                this.searching = false;
            },500)
        },
        modelValue: {
            immediate: false,
            handler(value) {
                this.query = '';
                this.show = false;
                this.option = find(this.options, {'value': value}) || this.options[0]
            }
        },
        options: {
            immediate: false,
            handler(options) {
                this.selectOptions = options;
            }
        },
        selectOptions: {
            immediate: true,
            handler(options) {
                if(options.length){
                    this.option = find(options, {'value': this.modelValue}) || options[0]
                }
            }
        },

    },
    mounted() {
        onClickOutside(this.$refs.holder,this.closeDropdownWithoutEmit)
    },
    methods: {
        toggleWithLabel() {
            this.$nextTick(() => {
                this.$refs.select.$el.focus()
                if (this.openOnClickLabel) {
                    this.$refs.select.$el.click()
                    this.show = true;
                }
            });
        },
        closeDropdown(e){
            e.preventDefault();
            this.$emit('update:modelValue',this.option.value)
            this.query = '';
            this.show = false;
        },
        closeDropdownWithoutEmit(e){
            this.query = '';
            this.show = false;
        },
        openDropdown(e){
            this.query = '';
            this.show = true;
        },
        indicatorClass(option){
          return {
            'green' : 'bg-green-400',
            'gray': 'bg-gray-200',
            'red' : 'bg-red-400',
            'yellow': 'bg-yellow-400',
          }[option?.indicator || '']
        },
    },
}
</script>

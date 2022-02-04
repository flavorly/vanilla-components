<template>
  <vanilla-input-layout :layout="layout">
    <template #label>
      <slot
        v-if="$slots.label || label"
        name="label"
      >
        <vanilla-form-label
          :label-for="name"
          :value="label"
          @click.prevent="selectNewPhoto"
        />
      </slot>
    </template>

    <input
      :id="name"
      ref="photo"
      class="hidden"
      type="file"
      @change="updatePhotoPreview"
    >

    <div class="flex items-center justify-center cursor-pointer">
      <!-- Current Profile Photo -->
      <slot
        name="photo"
        v-bind="{photo,photoAlt,hasErrors,placeholderLetters}"
      >
        <div
          v-show="! photoPreview"
          class="mt-2"
        >
          <img
            v-if="photo"
            :src="photo"
            :alt="photoAlt"
            class="rounded-full h-20 w-20 object-cover"
          >
          <span
            v-else
            class="inline-flex items-center justify-center rounded-full h-20 w-20 rounded-full bg-primary-100 p-5"
            :class="{
              'bg-primary-100 text-primary-800 dark:bg-gray-600 dark:text-white': ! hasErrors,
              'bg-red-100 text-red-500': hasErrors,
            }"
          >
            <span class="text-sm font-light leading-none ">{{ placeholderLetters }}</span>
          </span>
        </div>
      </slot>

      <!-- New Profile Photo Preview -->
      <slot
        name="preview"
        v-bind="{photoPreview}"
      >
        <div
          v-show="photoPreview"
          class="mt-2"
        >
          <span
            :style="'background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url(\'' + photoPreview + '\');'"
            class="block rounded-full w-20 h-20"
          />
        </div>
      </slot>
    </div>
    <!-- Button to Upload -->
    <div class="flex items-center justify-center">
      <slot
        name="button"
        v-bind="{selectNewPhoto, hasErrors}"
      >
        <vanilla-button
          :variant="hasErrors ? 'danger-soft' : 'secondary'"
          class="mt-2"
          type="button"
          @click="selectNewPhoto"
        >
          {{ buttonLabel }}
        </vanilla-button>
      </slot>
    </div>
    <!-- Errors & Helper -->
    <div class="flex items-center justify-center">
      <vanilla-form-errors
        v-if="hasErrors && showErrors"
        class="mt-3"
        :error="internalErrors"
      />
      <vanilla-form-helper
        v-if="help"
        :text="help"
      />
    </div>
  </vanilla-input-layout>
</template>

<script>
import UseFormInputs from "@/utils/UseFormInputs";
import VanillaInputLayout from "@/components/Inputs/Partials/Layout.vue";
import VanillaFormErrors from "@/components/Inputs/Partials/Errors.vue";
import VanillaFormHelper from "@/components/Inputs/Partials/Helper.vue";
import VanillaFormLabel from "@/components/Inputs/Partials/Label.vue";
import VanillaButton from "@/components/Buttons/Button.vue";

export default {
    name: "VanillaInputProfilePhoto",
    components: {
        VanillaFormLabel,
        VanillaFormHelper,
        VanillaFormErrors,
        VanillaButton,
        VanillaInputLayout
    },
    mixins: [UseFormInputs],
    model: {
        prop: "modelValue",
        event: "change",
    },
    props: {
        photo: {
            type: String,
            default: () => {
                return null
            }
        },
        photoAlt: {
            type: String,
            default: (props) => {
                return props.label;
            }
        },
        buttonLabel: {
            type: String,
            default: () => {
                return 'Change Profile Photo'
            }
        },
        placeholderLetters: {
            type: String,
            default: () => {
                return 'Profile Photo'
            }
        },
    },
    emits: [
        'update:modelValue'
    ],
    data() {
        return {
            photoPreview: null,
        }
    },
    methods: {
        selectNewPhoto() {
            this.$refs.photo.click();
        },
        updatePhotoPreview() {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.photoPreview = e.target.result;
            };
            this.internalValue = this.$refs.photo.files[0];
            reader.readAsDataURL(this.internalValue);
        },
    }
}
</script>

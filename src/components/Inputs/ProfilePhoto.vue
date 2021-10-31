<template>
  <x-input-layout :layout="layout">
    <template #label>
      <slot
        v-if="$slots.label || label"
        name="label"
      >
        <x-form-label
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

    <!-- Current Profile Photo -->
    <div
      v-show="! photoPreview"
      class="mt-2"
    >
      <img
        :src="$page.props.user.profile_photo_url"
        alt="Current Profile Photo"
        class="rounded-full h-20 w-20 object-cover"
      >
    </div>

    <!-- New Profile Photo Preview -->
    <div
      v-show="photoPreview"
      class="mt-2"
    >
      <span
        :style="'background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url(\'' + photoPreview + '\');'"
        class="block rounded-full w-20 h-20"
      />
    </div>

    <x-button
      variant="secondary"
      class="mt-2"
      type="button"
      @click="selectNewPhoto"
    >
      {{ $t('users.action-upload-photo') }}
    </x-button>

    <!-- Errors -->
    <x-form-errors
      v-if="hasErrors && showErrors"
      :error="errors"
    />
    <x-form-helper
      v-if="help"
      :text="help"
    />
  </x-input-layout>
</template>

<script>
import UseFormInputs from "@/utils/UseFormInputs";
import XInputLayout from "@/components/Inputs/Partials/Layout";
import XFormErrors from "@/components/Inputs/Partials/Errors";
import XFormHelper from "@/components/Inputs/Partials/Helper";
import XFormLabel from "@/components/Inputs/Partials/Label";
import XButton from "@/Components/Buttons/Button";

export default {
    name: "XProfilePhoto",
    components: {
        XFormLabel,
        XFormHelper,
        XFormErrors,
        XButton,
        XInputLayout
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
                return this.$page.props.user.profile_photo_url
            }
        }
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

            this.$emit("update:modelValue", this.$refs.photo.files[0]);

            reader.readAsDataURL(this.$refs.photo.files[0]);
        },
    }
}
</script>

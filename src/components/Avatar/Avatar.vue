<template>
  <div
    class="vanilla-input"
    :class="configuration.classesList.wrapper"
  >
    <div :class="configuration.classesList.wrapperImageAndButtons">
      <input
        :id="name"
        ref="photoInput"
        :name="name"
        style="display: none;"
        type="file"
        @change="updateAvatarPreview"
      >

      <div
        :class="configuration.classesList.imageAndPreviewContainer"
        v-bind="$attrs"
      >
        <!-- Current Profile Photo -->
        <slot
          name="photo"
          v-bind="{
            currentPhotoUrl,
            currentPhotoAltTag,
            avatarInitials,
            hasErrors,
            triggerFileUploadAction
          }"
        >
          <div
            v-show="!photoPreview"
            :class="configuration.classesList.imagePreviewContainer"
            @click="triggerFileUploadAction"
          >
            <img
              v-if="currentPhotoUrl"
              :src="currentPhotoUrl"
              :alt="currentPhotoAltTag"
              :class="configuration.classesList.currentImage"
            >
            <span
              v-else
              :class="configuration.classesList.avatarPlaceholder"
            >
              <span :class="configuration.classesList.avatarPlaceholderText">{{ avatarInitials }}</span>
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
              :class="configuration.classesList.preview"
            />
          </div>
        </slot>
      </div>
      <!-- Button to Upload -->
      <div :class="configuration.classesList.buttonsContainer">
        <slot
          name="uploadButton"
          v-bind="{triggerFileUploadAction, hasErrors, photoPreview}"
        >
          <button
            v-if="!photoPreview"
            class="mt-2 px-4 py-2"
            type="button"
            @click="triggerFileUploadAction"
          >
            {{ uploadButtonLabel }}
          </button>
        </slot>
        <slot
          name="resetButton"
          v-bind="{resetPhoto, hasErrors, photoPreview}"
        >
          <button
            v-if="photoPreview"
            class="mt-2 px-4 py-2"
            type="button"
            @click="resetPhoto"
          >
            {{ resetButtonLabel }}
          </button>
        </slot>
      </div>
    </div>
    <slot
      name="errors"
      v-bind="{hasErrors, localErrors}"
    >
      <VanillaFormErrors
        v-if="hasErrors && showErrors"
        :errors="localErrors"
      />
    </slot>
    <slot
      name="feedback"
      v-bind="{hasErrors, feedback}"
    >
      <VanillaFormFeedback
        v-if="!hasErrors && feedback !== undefined && showFeedback"
        :text="feedback"
      />
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';
import { useBootVariant, useVModel, useVariantProps, useConfigurationWithClassesList } from '@/core';
import {
    VanillaAvatarValue,
    VanillaAvatarProps,
    VanillaAvatarClassesKeys,
    VanillaAvatarConfig,
    VanillaAvatarPreview,
} from '@/components/Avatar/index';
import VanillaFormErrors from '@/components/FormErrors/FormErrors.vue';
import VanillaFormFeedback from '@/components/FormFeedback/FormFeedback.vue';

export default defineComponent({
    name: 'VanillaAvatar',
    components: {
        VanillaFormErrors,
        VanillaFormFeedback,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaAvatarProps>(),
        modelValue: {
            type: [Blob] as PropType<VanillaAvatarValue>,
            default: undefined,
        },
        currentPhotoUrl: {
            type: [String, undefined] as PropType<string | undefined>,
            default: undefined,
        },
        currentPhotoAltTag: {
            type: [String, undefined] as PropType<string | undefined>,
            default: 'avatar',
        },
        avatarInitials: {
            type: [String, undefined] as PropType<string | undefined>,
            default: 'Avatar',
        },
        uploadButtonLabel: {
            type: [String, undefined] as PropType<string | undefined>,
            default: 'Change Profile Photo',
        },
        resetButtonLabel: {
            type: [String, undefined] as PropType<string | undefined>,
            default: 'Clear Photo',
        },
    },
    setup(props) {
        const localValue: Ref<VanillaAvatarValue> = useVModel(props, 'modelValue');
        const {
            localErrors,
            localVariant,
            hasErrors,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaAvatarProps>(
            VanillaAvatarConfig,
            VanillaAvatarClassesKeys,
            localVariant,
        );

        const photoPreview: Ref<VanillaAvatarPreview> = ref(null);
        const photoInput: any = ref(null);

        const updateAvatarPreview = () => {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                photoPreview.value = event?.target?.result;
            };
            localValue.value = photoInput?.value?.files[0];
            reader.readAsDataURL(<Blob>localValue.value);
        };

        const triggerFileUploadAction = () => {
            photoInput.value.click();
        };

        const resetPhoto = () => {
            localValue.value = undefined;
            photoPreview.value = undefined;
        };

        return {
            configuration,
            localValue,
            localVariant,
            localErrors,
            hasErrors,
            photoPreview,
            photoInput,
            updateAvatarPreview,
            triggerFileUploadAction,
            resetPhoto,
        };
    },
});
</script>


<script setup lang="ts">
  import type { PropType, Ref } from 'vue'
  import { ref, watch } from 'vue'
  import type { AvatarClassesValidKeys, AvatarPreview, AvatarProps, AvatarValue } from './config'
  import { avatarConfig } from './config'
  import { useConfiguration, useVModel, useVariantProps } from '@/core/use'
  import FormErrors from '@/components/forms/form-errors.vue'
  import FormFeedback from '@/components/forms/form-feedback.vue'
  import Button from '@/components/button/button.vue'

  const props = defineProps({
    ...useVariantProps<AvatarProps, AvatarClassesValidKeys>(),
    modelValue: {
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
    uploadButtonVariant: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    resetButtonVariant: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
  })

  const localValue: Ref<AvatarValue> = useVModel(props, 'modelValue')
  const { configuration, errors, hasErrors } = useConfiguration<AvatarProps>(avatarConfig, 'Avatar', localValue)

  const photoPreview: Ref<AvatarPreview> = ref(null)
  const photoInput: any = ref(null)

  const updateAvatarPreview = () => {
    const reader = new FileReader()
    reader.onload = (event: ProgressEvent<FileReader>) => {
      photoPreview.value = event?.target?.result
    }

    localValue.value = photoInput?.value?.files[0]
    if (localValue.value) {
      reader.readAsDataURL(localValue.value)
    }
  }

  const triggerFileUploadAction = () => {
    photoInput.value.click()
  }

  const resetPhoto = () => {
    localValue.value = undefined
    photoPreview.value = null
    photoInput.value.value = null
  }

  watch(() => props.currentPhotoUrl, (newValue: string | undefined) => {
    if (newValue) {
      photoPreview.value = null
    }
  })
</script>

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
            triggerFileUploadAction,
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
          v-bind="{ photoPreview }"
        >
          <div
            v-if="photoPreview"
            class="mt-2"
          >
            <span
              :style="`background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url('${photoPreview}');`"
              :class="configuration.classesList.preview"
            />
          </div>
        </slot>
      </div>
      <!-- Button to Upload -->
      <div :class="configuration.classesList.buttonsContainer">
        <slot
          name="uploadButton"
          v-bind="{ triggerFileUploadAction, hasErrors, photoPreview }"
        >
          <Button
            v-if="!photoPreview"
            type="button"
            :variant="uploadButtonVariant"
            @click="triggerFileUploadAction"
          >
            {{ uploadButtonLabel }}
          </Button>
        </slot>
        <slot
          name="resetButton"
          v-bind="{ resetPhoto, hasErrors, photoPreview }"
        >
          <Button
            v-if="photoPreview"
            type="button"
            :variant="resetButtonVariant"
            @click="resetPhoto"
          >
            {{ resetButtonLabel }}
          </Button>
        </slot>
        <slot
          name="otherButtons"
          v-bind="{ resetPhoto, triggerFileUploadAction }"
        />
      </div>
    </div>
    <slot
      name="errors"
      v-bind="{ hasErrors, errors }"
    >
      <FormErrors
        v-if="hasErrors && props.showErrors"
        :errors="errors"
      />
    </slot>
    <slot
      name="feedback"
      v-bind="{ hasErrors, feedback: props.feedback }"
    >
      <FormFeedback
        v-if="!hasErrors && props.feedback !== undefined && props.showFeedback"
        :text="props.feedback"
      />
    </slot>
  </div>
</template>


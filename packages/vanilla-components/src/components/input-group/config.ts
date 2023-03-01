import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'
import { commonClasses } from '../../core/config'

export const inputGroupConfig = {
  fixedClasses: {
    wrapper: '',
    container: '',
    containerWithPadding: 'px-6 py-3.5 first:pt-0 last:pb-0',
    label: '',
    labelWrapperLeftTop: commonClasses.leftTop,
    labelWrapperLeftCenter: commonClasses.leftCenter,
    labelWrapperLeftBottom: commonClasses.leftBottom,
    labelWrapperRightTop: commonClasses.rightTop,
    labelWrapperRightCenter: commonClasses.rightCenter,
    labelWrapperRightBottom: commonClasses.rightBottom,
    labelWrapperCenterTop: commonClasses.centerTop,
    labelWrapperCenterCenter: commonClasses.centerCenter,
    labelWrapperCenterBottom: commonClasses.centerBottom,
    inputWrapper: '',
  },
  classes: {
    wrapper: 'grid space-y-2',
    container: 'block sm:grid space-y-2',
    containerWithPadding: '',
    label: '',
    labelWrapper: 'sm:mt-px sm:pt-0 flex',
    labelWrapperLeftTop: '',
    labelWrapperLeftCenter: '',
    labelWrapperLeftBottom: '',
    labelWrapperRightTop: '',
    labelWrapperRightCenter: '',
    labelWrapperRightBottom: '',
    labelWrapperCenterTop: '',
    labelWrapperCenterCenter: '',
    labelWrapperCenterBottom: '',
    inputWrapper: 'flex mt-0 grid space-y-2',
  },
  variants: {
    inline: {
      classes: {
        wrapper: 'sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 content-center',
        labelWrapper: 'flex items-center justify-start h-full',
        inputWrapper: 'mt-1 sm:col-span-2 sm:mt-0 flex flex-col space-y-2',
        label: '',
      },
    },
    content: {
      classes: {
        wrapper: 'sm:grid',
        label: '',
      },
    },
  },
}

export const inputGroupClassesKeys = Object.keys(inputGroupConfig.classes)

export declare type InputGroupClassesValidKeys = keyof typeof inputGroupConfig.classes
export declare type InputGroupValue = string | number | undefined
export declare type InputGroupProps = WithVariantPropsAndClassesList<{
} & InputHTMLAttributes & Data, InputGroupClassesValidKeys>

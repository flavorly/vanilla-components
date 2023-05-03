import { ref } from 'vue'
import { isObject } from '@vueuse/core'
import type {
  CSSClassesList,
  CSSRawClassesList,
  ObjectWithClassesList,
  VariantsWithClassesList,
  WithVariantProps,
  WithVariantPropsAndClassesList,
} from '../types'

import { hasProperty, mergeClasses, mergeClassesFromObject, pick, removeClassesBeforeResetDirect } from '../helpers'

const getCustomPropsFromVariant = <
  P extends ObjectWithClassesList,
  ClassesKeys extends string,
>(
    variants?: VariantsWithClassesList<P, ClassesKeys>,
    variant?: string,
  ): WithVariantPropsAndClassesList<P, ClassesKeys> | undefined => {
  if (variant !== undefined && variants) {
    return variants[variant]
  }

  return undefined
}

const getShouldClearClasses = <
  P extends ObjectWithClassesList,
  ClassesKeys extends string,
>(
  props: WithVariantPropsAndClassesList<P, ClassesKeys>,
  key: string,
  variant: string | undefined,
): boolean => {
  if (variant === undefined) {
    return hasProperty(props, key) && (props[key] === undefined || props[key] === null)
  }

  if (props.variants !== undefined && props.variants[variant] !== undefined) {
    const propsVariant = props.variants[variant] as WithVariantProps<P>

    return hasProperty(propsVariant, key) && (propsVariant[key] === undefined || propsVariant[key] === null)
  }

  return false
}

const useParseVariant = <
  P extends ObjectWithClassesList,
  ClassesKeys extends string,
>(
    props: WithVariantPropsAndClassesList<P, ClassesKeys>,
    classesListKeys: Readonly<Array<ClassesKeys>>,
    globalConfiguration?: WithVariantPropsAndClassesList<P, ClassesKeys>,
    defaultConfiguration?: WithVariantPropsAndClassesList<P, ClassesKeys>,
    givenVariant?: string | undefined,
  ): P => {
  const { variants, variant, ...mainProps } = {
    ...defaultConfiguration,
    ...globalConfiguration,
    ...props,
  }

  // TODO : Check how can we forward the variant
  // We should store here the variant as a "localVariant" to forward it and be able to maninpulate it
  // const localVariant = ref(givenVariant ?? variant);
  const localVariant = ref(givenVariant ?? variant)
  const classes: Partial<CSSRawClassesList<ClassesKeys>> = {}
  const fixedClasses: Partial<CSSRawClassesList<ClassesKeys>> = {}
  const clearClasses = getShouldClearClasses(props, 'classes', localVariant.value)
  const clearFixedClasses = getShouldClearClasses(props, 'fixedClasses', localVariant.value)

  if (clearClasses) {
    classesListKeys.forEach((classItemKey) => {
      classes[classItemKey] = undefined
    })
  }
  else {
    classesListKeys.forEach((classItemKey) => {
      if (props.classes !== undefined && hasProperty(props.classes, classItemKey)) {
        classes[classItemKey] = props.classes[classItemKey]
      }
      else if (globalConfiguration !== undefined && globalConfiguration.classes !== undefined && hasProperty(globalConfiguration.classes, classItemKey)) {
        classes[classItemKey] = globalConfiguration.classes[classItemKey]
      }
      else if (defaultConfiguration !== undefined && defaultConfiguration.classes !== undefined && hasProperty(defaultConfiguration.classes, classItemKey)) {
        classes[classItemKey] = defaultConfiguration.classes[classItemKey]
      }

      if (localVariant.value) {
        if (props.variants !== undefined && props.variants[localVariant.value] !== undefined) {
          const propsVariant = props.variants[localVariant.value] as WithVariantProps<P>

          if (propsVariant.classes && hasProperty(propsVariant.classes, classItemKey)) {
            classes[classItemKey] = propsVariant.classes[classItemKey]
          }
        }
        else if (globalConfiguration !== undefined && globalConfiguration.variants !== undefined && globalConfiguration.variants[localVariant.value] !== undefined) {
          const globalConfigurationVariant = globalConfiguration.variants[localVariant.value] as WithVariantProps<P>

          if (globalConfigurationVariant.classes && hasProperty(globalConfigurationVariant.classes, classItemKey)) {
            classes[classItemKey] = globalConfigurationVariant.classes[classItemKey]
          }
        }
        else if (defaultConfiguration !== undefined && defaultConfiguration.variants !== undefined && defaultConfiguration.variants[localVariant.value] !== undefined) {
          const defaultConfigurationVariant = defaultConfiguration.variants[localVariant.value] as WithVariantProps<P>

          if (defaultConfigurationVariant.classes && hasProperty(defaultConfigurationVariant.classes, classItemKey)) {
            classes[classItemKey] = defaultConfigurationVariant.classes[classItemKey]
          }
        }
      }

      // Needs to be here to be able to override the classes when the user wants
      if (props.classes !== undefined && hasProperty(props.classes, classItemKey)) {
        classes[classItemKey] = props.classes[classItemKey]
      }
    })
  }

  if (clearFixedClasses) {
    classesListKeys.forEach((classItemKey) => {
      fixedClasses[classItemKey] = undefined
    })
  }
  else {
    classesListKeys.forEach((classItemKey) => {
      if (props.fixedClasses !== undefined && hasProperty(props.fixedClasses, classItemKey)) {
        fixedClasses[classItemKey] = props.fixedClasses[classItemKey]
      }
      else if (globalConfiguration !== undefined && globalConfiguration.fixedClasses !== undefined && hasProperty(globalConfiguration.fixedClasses, classItemKey)) {
        fixedClasses[classItemKey] = globalConfiguration.fixedClasses[classItemKey]
      }
      else if (defaultConfiguration !== undefined && defaultConfiguration.fixedClasses !== undefined && hasProperty(defaultConfiguration.fixedClasses, classItemKey)) {
        fixedClasses[classItemKey] = defaultConfiguration.fixedClasses[classItemKey]
      }

      if (localVariant.value) {
        if (props.variants !== undefined && props.variants[localVariant.value] !== undefined) {
          const propsVariant = props.variants[localVariant.value] as WithVariantProps<P>

          if (propsVariant.fixedClasses && hasProperty(propsVariant.fixedClasses, classItemKey)) {
            fixedClasses[classItemKey] = propsVariant.fixedClasses[classItemKey]
          }
        }
        else if (globalConfiguration !== undefined && globalConfiguration.variants !== undefined && globalConfiguration.variants[localVariant.value] !== undefined) {
          const globalConfigurationVariant = globalConfiguration.variants[localVariant.value] as WithVariantProps<P>

          if (globalConfigurationVariant.fixedClasses && hasProperty(globalConfigurationVariant.fixedClasses, classItemKey)) {
            fixedClasses[classItemKey] = globalConfigurationVariant.fixedClasses[classItemKey]
          }
        }
        else if (defaultConfiguration !== undefined && defaultConfiguration.variants !== undefined && defaultConfiguration.variants[localVariant.value] !== undefined) {
          const defaultConfigurationVariant = defaultConfiguration.variants[localVariant.value] as WithVariantProps<P>

          if (defaultConfigurationVariant.fixedClasses && hasProperty(defaultConfigurationVariant.fixedClasses, classItemKey)) {
            fixedClasses[classItemKey] = defaultConfigurationVariant.fixedClasses[classItemKey]
          }
        }
      }
    })
  }

  const customProps = getCustomPropsFromVariant(variants, localVariant.value)

  const mergedProps = {
    ...mainProps,
    ...customProps,
  }

  delete mergedProps.fixedClasses

  delete mergedProps.classes

  const mergedClasses: CSSClassesList = {}

  classesListKeys.forEach((classItemKey) => {
    const classesForTheCurrentKey = classes[classItemKey]
    const fixedClassesForTheCurrentKey = fixedClasses[classItemKey]

    if (isObject(classesForTheCurrentKey)) {
      mergedClasses[classItemKey as string] = mergeClassesFromObject(
        fixedClassesForTheCurrentKey,
        classesForTheCurrentKey,
      )
    }
    else {
      mergedClasses[classItemKey as string] = mergeClasses(
        fixedClassesForTheCurrentKey,
        classesForTheCurrentKey,
      )

      if (mergedClasses[classItemKey]) {
        mergedClasses[classItemKey] = removeClassesBeforeResetDirect(mergedClasses[classItemKey as string])
      }
    }
  })

  const result = pick(mergedClasses)

  if (Object.keys(result).length > 0) {
    (mergedProps as P).classesList = result
  }

  return mergedProps as P
}

export default useParseVariant

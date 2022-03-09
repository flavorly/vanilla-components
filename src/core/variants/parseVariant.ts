import {
  ObjectWithClassName,
  Variants,
  WithVariantProps,
} from '@/core/types';

import { mergeClasses } from '@/core';

/**
 * Get the custom props from variants to a specific selected variant
 * @param variants
 * @param variant
 */
const getCustomPropsFromVariant = <P extends ObjectWithClassName>(
  variants?: Variants<P>,
  variant?: string,
): WithVariantProps<P> | undefined => {
  if (variant !== undefined && variants) {
    return variants[variant];
  }

  return undefined;
};

/**
 * Parse a variant
 * @param props
 * @param globalConfiguration
 * @param defaultConfiguration
 */
const parseVariant = <P extends ObjectWithClassName>(
  props: WithVariantProps<P>,
  globalConfiguration?: WithVariantProps<P>,
  defaultConfiguration?: WithVariantProps<P>,
): P => {
  const { variants, variant, ...mainProps } = {
    ...defaultConfiguration,
    ...globalConfiguration,
    ...props,
  };

  const customProps = getCustomPropsFromVariant(variants, variant);

  const mergedProps = {
    ...mainProps,
    ...customProps,
  };

  const {
    classes, fixedClasses, class: className, ...componentProps
  } = mergedProps;

  const mergedClasses: string = mergeClasses(className, classes, fixedClasses);

  if (mergedClasses) {
    (componentProps as P).class = mergedClasses;
  }

  return componentProps as P;
};

export default parseVariant;

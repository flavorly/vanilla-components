import { Data, WithVariantProps } from '@/core/types';
import { InputHTMLAttributes } from 'vue';

export type VanillaFormFeedbackProps = WithVariantProps<{
  text?: string | undefined,
  safe?: boolean,
} & InputHTMLAttributes & Data>;

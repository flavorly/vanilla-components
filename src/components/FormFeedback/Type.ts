import { Data, WithVariantProps } from '@/core/types';
import { InputHTMLAttributes } from 'vue';

export declare type VanillaFormFeedbackProps = WithVariantProps<{
  text?: string | undefined,
  safe?: boolean,
} & InputHTMLAttributes & Data>;

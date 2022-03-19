import { Data, WithVariantProps } from '@/core/types';
import { InputHTMLAttributes } from 'vue';

export type VanillaSkeletonBarProps = WithVariantProps<{
  count?: number,
  as?: string,
} & InputHTMLAttributes & Data>;

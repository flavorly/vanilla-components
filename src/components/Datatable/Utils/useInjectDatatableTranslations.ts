import { computed, ComputedRef, inject } from 'vue';
import { VanillaDatatableTranslations } from '../index';

export default function useInjectDatatableTranslations(): ComputedRef<VanillaDatatableTranslations> {
    const translations = inject('datatable_translations', {});
    return computed<VanillaDatatableTranslations>((): VanillaDatatableTranslations => translations || {});
}

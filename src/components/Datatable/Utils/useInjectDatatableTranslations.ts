import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'
import type { VanillaDatatableTranslations } from '../index'

export default function useInjectDatatableTranslations(): ComputedRef<VanillaDatatableTranslations> {
    const translations = inject('datatable_translations', {})
    return computed<VanillaDatatableTranslations>((): VanillaDatatableTranslations => translations || {})
}

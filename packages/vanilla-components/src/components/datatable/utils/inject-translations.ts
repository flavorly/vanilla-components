import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'
import type * as Types from '../config'

export default function injectTranslations(): ComputedRef<Types.DatatableTranslations> {
    const translations = inject('datatable_translations', {})
    return computed<Types.DatatableTranslations>((): Types.DatatableTranslations => translations || {})
}

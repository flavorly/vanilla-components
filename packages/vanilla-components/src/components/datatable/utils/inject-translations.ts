import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'
import type * as Types from '../config'

export default function injectTranslations(): ComputedRef<Types.DatatableTranslations> {
    const configuration = inject<Types.DatatableConfiguration>('datatable_configuration')
    return computed<Types.DatatableTranslations>((): Types.DatatableTranslations => configuration.translations || {})
}

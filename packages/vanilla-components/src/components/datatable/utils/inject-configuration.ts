import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'
import type * as Types from '../config'

export default function injectDatatableConfiguration(): ComputedRef<Types.DatatableConfiguration> {
    const configuration = inject<Types.DatatableConfiguration>('datatable_configuration')
    return computed<Types.DatatableConfiguration>((): Types.DatatableConfiguration => configuration)
}

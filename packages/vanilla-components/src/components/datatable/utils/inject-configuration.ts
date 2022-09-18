import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'

export default function injectConfiguration(): ComputedRef<object> {
    const configuration = inject('datatable_configuration', {})
    return computed<object>((): object => configuration || {})
}

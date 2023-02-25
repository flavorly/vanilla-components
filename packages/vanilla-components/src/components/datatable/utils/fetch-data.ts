import type * as Types from '../config'
import { useFetchData } from '../../../core/use'

const fetchData = <T extends Types.DatatableConfiguration, Data extends Types.DatatableQueryData, P extends RequestInit>(
  config: T,
  data: Data,
  options: P,
): Types.DatatableFetchDataPromise => {
  const isAction = data.action !== null
  const method = isAction ? config?.actionsMethod : config?.fetchMethod
  const url = isAction ? config?.actionsEndpoint : config?.fetchEndpoint
  const postParams = method === 'POST' ? data : {}
  const queryParams = method === 'GET' ? data : {}

  const finalOptions = {
    method,
    body: JSON.stringify(postParams),
    ...options,
  }
  return useFetchData(url, queryParams, finalOptions)
}

export default fetchData

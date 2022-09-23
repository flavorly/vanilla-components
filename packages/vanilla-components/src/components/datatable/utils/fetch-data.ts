import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import type * as Types from '../config'

const fetchData = <T extends Types.DatatableConfiguration, Data extends Types.DatatableQueryData>(
  config: T,
  data: Data,
): Types.DatatableFetchDataPromise => {
  const isAction = data.action !== null
  const method = isAction ? config?.actionsMethod : config?.fetchMethod
  const url = isAction ? config?.actionsEndpoint : config?.fetchEndpoint
  const postParams = method === 'POST' ? data : {}
  const queryParams = method === 'GET' ? data : {}

  const axiosConfig = {
    method,
    url,
    data: postParams,
    params: queryParams,
  } as AxiosRequestConfig

  return axios(axiosConfig)
    .then(response => ({
      data: response.data?.data,
      links: response.data?.links,
      meta: response.data?.meta,
      responses: response.data?.responses,
      resolved: true,
    }))
}

export default fetchData

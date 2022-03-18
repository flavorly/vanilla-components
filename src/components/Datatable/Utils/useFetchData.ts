import axios from 'axios';
import { hasProperty } from '@/core';

const useFetchData = (
  config: object,
  data: object,
) => {

  const isAction = hasProperty(data, 'action');
  const method = isAction ? config?.actionsMethod : config?.fetchMethod;
  const url = isAction ? config?.actionsEndpoint : config?.fetchEndpoint;
  const postParams = method === 'POST' ? data : {};
  const queryParams = method === 'GET' ? data : {};

  console.log(method);

  return axios({
    method: method,
    url: url,
    data: postParams,
    params: queryParams,
  })
  .then((response) => ({
    data: response.data?.data as Record<string, any>[],
    links: response.data?.links,
    meta: response.data?.meta,
    responses: response.data?.responses,
    resolved: true,
  }));
};

export default useFetchData;

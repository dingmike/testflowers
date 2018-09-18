import { request } from '../utils';
import { stringify } from 'qs'
export async function queryClassify(params) {
  // http://yangxiao.free.idcfengye.com/huahai
  return request('/front/category/query', {
    method : 'POST',
    data : stringify(params)
  })
}
// http://192.168.9.102:8080/huahai
export async function queryList(params) {
  return request(`/front/fundingProduct/list`, {
    method : 'get',
    params : params
  })
}

export async function queryDetail(params) {
  return request('/front/fundingProduct/index', {
    method : 'GET',
    params : params
  })
}

export async function buycrowd(params) {
  return request("/front/fundingProduct/investment", {
    method : 'POST',
    data : stringify(params)
  })
}
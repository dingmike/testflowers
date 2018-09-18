import { request } from '../utils'
import { stringify } from 'qs';
export async function queryBanner() {
  return request('/front/product/query',{
    method : "POST"
  })
}

export async function queryRollBanner(params){
  return request('/front/notice/query', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryScenic(params) {
  return request('/front/sightSpot/query', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryRefers(params) {
  return request('/front/garden/query', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryDetailsById(params) {
  return request('/front/sightSpot/queryById', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryReferDetailsById(params) {
  return request('/front/garden/queryById', {
    method: 'POST',
    data : stringify(params)
  })
}
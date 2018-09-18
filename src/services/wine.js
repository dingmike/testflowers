import { request } from '../utils';
import { stringify } from 'qs'
export async function queryByCategoryId(params){
  return request("/front/LiquorProduct/queryByCategoryId",{
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryWineDetail(params) {
  return request("/front/LiquorProduct/queryById", {
    method : 'POST',
    data : stringify(params)
  })
}

export async function buyWine(params) {
  return request('/front/LiquorProduct/buy', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryBuyingOrders(params) {
  return request('/front/cellarOrder/queryByStatus', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryOrderDetail(params) {
  return request('/front/cellarOrder/queryById', {
    method : 'POST',
    data :stringify(params)
  })
}

export async function orderOpen(params) {
  return request("/front/cellarOrder/open", {
    method :'POST',
    data : stringify(params)
  })
}

export async function orderTransfer(params) {
  return request('/front/cellarOrder/transference', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function orderLogistics(params) {
  return request('/front/cellarOrder/logistics', {
    method : 'POST',
    data : stringify(params)
  })
}
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


export async function queryAgreePortocol(params) {
  return request("/front/protocol/index", {
    method : 'get',
    params : params
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
// 微信支付buy
export async function wechatPayBuy(params) {
  return request('/wechat/payment', {
    method : 'post',
    data :stringify(params)
  })
}

// 支付宝支付buy
export async function aliPayBuy(params) {
  return request('/alipay/payment', {
    method : 'post',
    data :stringify(params)
  })
}

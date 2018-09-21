import { request } from '../utils';
import { stringify } from 'qs'
export async function query(params){
  return request('/front/user/query', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function realName(params) {
  return request('/front/user/realName', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryWines(params) {
  return request('/front/userWallte/queryZj', {
    method : 'POST',
    data : stringify(params)
  })
}

// 项目分红
export async function queryRechargesAndDividend(params) {
  return request("/front/bonusRecord/query", {
    method : 'POST',
    data : stringify(params)
  })
}

// 充值记录

export async function queryRecharges(params) {
  return request('/front/userRecharge/query',{
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryInOutRecord(params) {
  return request("/front/userTransfer/query", {
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryWithdrawals(params) {
  return request('/front/UserWithdraw/query', {
    method: 'POST',
    data : stringify(params)
  })
}

export async function rateCalculation(params) {
  return request("/front/UserWithdraw/calculate", {
    method : 'POST',
    data : stringify(params)
  })
}

export async function applyWithdrawals(params) {
  return request('/front/UserWithdraw/initiate', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryAccountName(params) {
  return request('/front/user/queryName', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function transferCash(params) {
  return request('/front/user/transferBalance', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function upLoadHeadImage(params) {
  return request('/admin/upload', {
    method : 'POST',
    headers : {
      'Content-Type':'multipart/form-data'
    },
    data : params
  })
}

export async function updateHeadImage(params) {
  return request('/front/user/updateHead', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function updateNickName(params) {
  return request('/front/user/updateNickName', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryIntegral(params) {
  return request('/front/fundingQuotient/queryMoney', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryInvests(params) {
  return request("/front/fundingQuotient/query", {
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryInvestments(params) {
  return request('/front/fundingQuotient/queryQuotient',{
    method : 'POST',
    data : stringify(params)
  })
}

export async function queryInvestmentsDetail(params) {
  return request('/front/fundingQuotient/queryById',{
    method : 'POST',
    data : stringify(params)
  })
}

export async function transferInvestment(parmas) {
  return request("/front/fundingQuotient/transfer", {
    method : 'POST',
    data : stringify(parmas)
  })
}

export async function queryIntegralInAndOut(params) {
  return request("/front/FundingQuotientTransference/query", {
    method : 'post',
    data : stringify(params)
  })
}

export async function cancelCrowd(params) {
  return request("/front/fundingQuotient/repeal", {
    method : 'post',
    data : stringify(params)
  })
}


export async function transferIntegral(params) {
  return request('/front/user/transferPrIntegral', {
    method : 'POST',
    data : stringify(params)
  })
}

// 余额转换分红积分
export async function transferToCounts(params) {
  return request('/front/user/balanceTIntegral', {
    method : 'POST',
    data : stringify(params)
  })
}


export async function companyInfo(params) {
  return request('/front/companyInfo/query', {
    method : 'POST',
    data : stringify(params)
  })
}

export async function updateAreaRatio(params) {
  return request('/front/user/updateAreaRatio', {
    method : 'GET',
    params : params
  })
}

// 微信支付
export async function wechatPay(params) {
  return request('/wechat/pay', {
    method : 'post',
    data :stringify(params)
  })
}

// 支付宝支付
export async function aliPay(params) {
  return request('/alipay/pay', {
    method : 'post',
    data :stringify(params)
  })
}

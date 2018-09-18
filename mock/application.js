import Mock, { Random } from 'mockjs';
import {
  phoneRandom,
  numberRandom,
  moneyRandom,
  nameRandom,
  cnameRandom,
} from './utils';
export const teams = Mock.mock({
  "data|5-10": [{
    "id|+1": 200,
    "phone": phoneRandom,
    "teamNum": numberRandom,
    "teamMoney": moneyRandom,
    "name": nameRandom,
    "consumption_money": moneyRandom
  }]
})

export const address = Mock.mock({
  "data|3-9": [{
    "id|+1": 1,
    "userName": cnameRandom,
    "phone": phoneRandom,
    "province": "四川省",
    "city": "绵阳市",
    "dist": "涪城区",
    "detailedAddress": "xxx街道xxx路xxx小区xxx单元x楼x号",
    "isDefault": function () { if (this.id === 1) { return 1; } else { return 2; } }
  }]
})


export const payDetail = Mock.mock({
  "data|6-10": [{
    "id|+1": 1,
    "money": moneyRandom,
    "cashBalance": moneyRandom,
    "inOut|1": [1, 2],
    "detail": "种酒消费金额",
    "type": 0,
    "userId": 10,
    "orderId|+101": 20180820161956425000,
    "creatTime|+45482152": 1534921385619
  }]
})

export const topUpCashPage1 = Mock.mock({
  "data": {
    "content|10": [{
      "orderId|+10": 1534237313533996807,
      "userId|+1": 17,
      "phone": phoneRandom,
      "money": moneyRandom,
      "cashBalance": moneyRandom,
      "details": "现金充值",
      "status": 1,
      "creatTime|+32465465": 1534237369000
    }],
    "last": false,
    "totalPages": 2,
    "totalElements": 18,
    "size": 10,
    "number": 0,
    "numberOfElements": 1,
    "sort": null,
    "first": true
  }
})

export const topUpCashPage2 = Mock.mock({
  "data": {
    "content|8": [{
      "orderId|+10": 1534237313513996807,
      "userId|+1": 17,
      "phone": phoneRandom,
      "money": moneyRandom,
      "cashBalance": moneyRandom,
      "details": "现金充值",
      "status": 1,
      "creatTime|+32465465": 1234237369000
    }],
    "last": true,
    "totalPages": 1,
    "totalElements": 1,
    "size": 10,
    "number": 0,
    "numberOfElements": 2,
    "sort": null,
    "first": false
  }
})

export const dividend1 = Mock.mock({
  "data": {
    "content|10": [{
      "orderId|+10": 153423313513996807,
      "userId|+1": 17,
      "phone": phoneRandom,
      "money": moneyRandom,
      "cashBalance": moneyRandom,
      "details": "分红积分",
      "status": 1,
      "creatTime|+32465465": 1234237369000
    }],
    "last": false,
    "totalPages": 1,
    "totalElements": 1,
    "size": 10,
    "number": 0,
    "numberOfElements": 1,
    "sort": null,
    "first": true
  }
})

export const dividend2 = Mock.mock({
  "data": {
    "content|8": [{
      "orderId|+10": 153423313513996807,
      "userId|+1": 17,
      "phone": phoneRandom,
      "money": moneyRandom,
      "cashBalance": moneyRandom,
      "details": "分红积分",
      "status": 1,
      "creatTime|+32465465": 1234237369000
    }],
    "last": true,
    "totalPages": 1,
    "totalElements": 1,
    "size": 10,
    "number": 0,
    "numberOfElements": 2,
    "sort": null,
    "first": false
  }
})

export const inOut1 = Mock.mock({
  "data": {
    "content|10": [{
      "orderId|+10": 153423313513996807,
      "userId|+1": 17,
      "id|+1": 1,
      "transPhone": phoneRandom,
      "money": moneyRandom,
      "cashBalance": moneyRandom,
      "inOut|1": [1, 2],
      "details": function () {
        if (this.inOut === 1) {
          return "收入"
        } else {
          return "支出"
        }
      },
      "creatTime|+32465465": 1234237369000
    }],
    "last": false,
    "totalPages": 2,
    "totalElements": 18,
    "size": 10,
    "number": 0,
    "numberOfElements": 1,
    "sort": null,
    "first": true
  }
})

export const inOut2 = Mock.mock({
  "data": {
    "content|8": [{
      "orderId|+100": 153423313513996807,
      "userId|+1": 50,
      "id|+1": 32,
      "transPhone": phoneRandom,
      "money": moneyRandom,
      "cashBalance": moneyRandom,
      "inOut|1": [1, 2],
      "details": function () {
        if (this.inOut === 1) {
          return "收入"
        } else {
          return "支出"
        }
      },
      "creatTime|+32465465": 1234237369000
    }],
    "last": true,
    "totalPages": 2,
    "totalElements": 18,
    "size": 10,
    "number": 0,
    "numberOfElements": 2,
    "sort": null,
    "first": true
  }
})

export const context = `
<h2>酒品介绍</h2>
<p>中国西南第一大高山溶洞，分布着23个各具特色的溶洞，是世界罕见的高山溶洞群。</p>
<p>这些溶洞反映了地球3.5－4亿年间变化的中国龙门山泥盆系标准地质剖面。
</p>
<p>除了别具特色的自然资源外，景区还有西羌晚会、高空滑道、滑草滑雪等娱乐项目。</p> ,
"notes" : 
<p>中国西南第一大高山溶洞，分布着23个各具特色的溶洞，是世界罕见的高山溶洞群。</p>
<p>这些溶洞反映了地球3.5－4亿年间变化的中国龙门山泥盆系标准地质剖面。
</p>
<p>除了别具特色的自然资源外，景区还有西羌晚会、高空滑道、滑草滑雪等娱乐项目。</p>
<h2>窖酒详情</h2>
<p>中国西南第一大高山溶洞，分布着23个各具特色的溶洞，是世界罕见的高山溶洞群。</p>
<p>这些溶洞反映了地球3.5－4亿年间变化的中国龙门山泥盆系标准地质剖面。
</p>
<p>除了别具特色的自然资源外，景区还有西羌晚会、高空滑道、滑草滑雪等娱乐项目。</p> ,
"notes" : 
<p>中国西南第一大高山溶洞，分布着23个各具特色的溶洞，是世界罕见的高山溶洞群。</p>
<p>这些溶洞反映了地球3.5－4亿年间变化的中国龙门山泥盆系标准地质剖面。
</p>
<p>除了别具特色的自然资源外，景区还有西羌晚会、高空滑道、滑草滑雪等娱乐项目。</p>
`

export const wineDetail = Mock.mock({
  "data": {
    "id": 1,
    "name": "高原女儿红",
    "standard": 1000,
    "liquorCategory": 1,
    "money": 2000000,
    "largessIntegral": 5000,
    "cellarNumber": 0,
    "context": context,
    "imgDescArr": [
      "https://placeimg.com/560/250/people",
      "https://placeimg.com/560/250/people",
      "https://placeimg.com/560/250/people",
      "https://placeimg.com/560/250/people"
    ],
    "type": 1
  }
})


export const withdraw1 = Mock.mock({
  "data": {
    "page": {
      "PageCount": 2,
      "pogeNo": 1,
      "pageSize": 10
    },
    "content|10": [{
        "id|+1": 1,
        "userId|+1": 17,
        "phone": phoneRandom,
        "realName": cnameRandom,
        "money|1": [100, 200,150,300,325,5000,122],
        "totalMoney": 0,
        "actualMoney": function(){
          return this.money * 0.83
        },
        "targetAccount": function(){
          return this.phone
        },
        "type|1": [1,2,3],
        "status|1": [0,1,2,3],
        "typeName": function(){
          if(this.type === 1){
            return "支付宝"
          }
          if(this.type === 2){
            return "微信"
          }
          if(this.type === 3){
            return "银行卡"
          }
        },
        "statusName": function(){
          if(this.status === 0){
            return "已申请，待审核"
          }
          if(this.status ===1){
            return "已通过审核"
          }
          if(this.status ===2){
            return "未通过审核,退款"
          }
          if(this.status ===3){
            return "异常"
          }
        },
        "remarks": null,
        "creatTime|+32465465": 1234237369000
      }]
  }
})
export const withdraw2 = Mock.mock({
  "data": {
    "page": {
      "PageCount": 2,
      "pogeNo": 2,
      "pageSize": 10
    },
    "content|10": [{
        "id|+1": 100,
        "userId|+1": 1700,
        "phone": phoneRandom,
        "realName": cnameRandom,
        "money|1": [100, 200,150,300,325,5000,122],
        "totalMoney": 0,
        "actualMoney": function(){
          return this.money * 0.83
        },
        "targetAccount": function(){
          return this.phone
        },
        "type|1": [1,2,3],
        "status|1": [0,1,2,3],
        "typeName": function(){
          if(this.type === 1){
            return "支付宝"
          }
          if(this.type === 2){
            return "微信"
          }
          if(this.type === 3){
            return "银行卡"
          }
        },
        "statusName": function(){
          if(this.status === 0){
            return "已申请，待审核"
          }
          if(this.status ===1){
            return "已通过审核"
          }
          if(this.status ===2){
            return "未通过审核,退款"
          }
          if(this.status ===3){
            return "异常"
          }
        },
        "remarks": null,
        "creatTime|+32465465": 1234237369000
      }]
  }
})

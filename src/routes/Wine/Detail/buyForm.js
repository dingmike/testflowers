import React from 'react';

import {
  Stepper,
  List,
  Button,
  InputItem,
  Modal,
  Radio,
  Toast
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { MD5 } from "crypto-js"
import GraySpace from '../../../components/GraySpace'

const Item = List.Item;
const RadioItem = Radio.RadioItem;
const prompt = Modal.prompt;
// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

function BuyForm({
  form : {
    getFieldProps,
    getFieldValue,
    validateFields,
    getFieldError
  }, payMethods,
                   choosed,
                   changePayMethod,
  money=0,
  id,
  onOk,
                   onOkAlipay,
                   onOkWechatPay
}){
  return (
    <List>
      <Item
        extra={
          <Stepper
            style={{ width: '100%', minWidth: '100px' }}
            showNumber
            min={1}
            {...getFieldProps('num',{
              initialValue : 1
            })}
          />}
      >
        购买数量
      </Item>
      <Item
        extra={ <span>{getFieldValue('num')*money}元</span> }
      >
        所需金额
      </Item>
      <GraySpace />

      {payMethods.map(i => (
        <RadioItem key={i.value} checked={choosed === i.value} onChange={() => {console.log(i.value);changePayMethod(i.value)  }}>
          {i.label}
        </RadioItem>
      ))}

 {/*     <InputItem
        type="password"
        placeholder="账户支付密码"
        autoComplete="off"
        {...getFieldProps("payPassWord",{
          rules : [
            {
              required : true,
              message : '请输入账户支付密码'
            }
          ]
        })}
      >
        支付密码
      </InputItem>*/}
      <GraySpace />
      <Button
        type="warning"
        onClick={()=>{
          validateFields((errors,values)=>{
            if(errors){
              for( let name in errors){
                let error = getFieldError(name) ?
                getFieldError(name).join(',') : null;
                Toast.fail(error,2)
                break;
              }
            }else {
              //如果是余额支付
              if(choosed===2){
                prompt(
                  '输入支付密码',
                  '',
                  [
                    { text: '取消' },
                    { text: '确认支付', onPress: password => {
                      onOk({
                      payPassWord : MD5(password).toString(),
                      money : getFieldValue('num') * money,
                      productId : id,
                      num : values.num
                    }) }},
                  ],
                  'secure-text',
                )
              }else if(choosed===0){ // 支付宝
                onOkAlipay({
                  money : getFieldValue('num') * money,
                  productId : id,
                  num : values.num
                })
              }else if(choosed===1){ // 微信支付
                onOkWechatPay({
                  money : getFieldValue('num') * money,
                  productId : id,
                  num : values.num
                })
              }

            }
          })
        }}
      >确定购买</Button>
    </List>
  )
}

export default createForm()(BuyForm);

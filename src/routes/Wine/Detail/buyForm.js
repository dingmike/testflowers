import React from 'react';

import { 
  Stepper,
  List,
  Button,
  InputItem,
  Toast
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { MD5 } from "crypto-js"
import GraySpace from '../../../components/GraySpace'

const Item = List.Item;

function BuyForm({
  form : {
    getFieldProps,
    getFieldValue,
    validateFields,
    getFieldError
  },
  money=0,
  id,
  onOk
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
      <InputItem
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
      </InputItem>
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
              onOk({
                payPassWord : MD5(values.payPassWord).toString(),
                money : getFieldValue('num') * money,
                productId : id,
                num : values.num
              })
            }
          })
        }}
      >确定购买</Button>
    </List>
  )
}

export default createForm()(BuyForm);
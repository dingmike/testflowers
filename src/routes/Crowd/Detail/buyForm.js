import React, { Fragment } from 'react';

import {
  List,
  Button,
  InputItem,
  Toast
} from 'antd-mobile';
import { createForm } from 'rc-form';
import GraySpace from '../../../components/GraySpace'
import { MD5 } from 'crypto-js';

function BuyForm({
  form : {
    getFieldProps,
    validateFields,
    getFieldError
  },
  fundingNumber,
  onOk
}){
  return (
    <Fragment>
      <p style={{
        color : "#9D0F14"
      }}>提交后无法修改，请确认投资的分红积分。</p>
      <List>
        <InputItem
          autoComplete="off"
          placeholder="投资积分须为500的倍数"
          {...getFieldProps("money",{
            rules : [{
              required : true,
              message  : "请填写你要投资的积分数"
            }]
          })}
        >
          投资积分
        </InputItem>
        <InputItem
          autoComplete="off"
          type="password"
          placeholder="账户支付密码"
          {...getFieldProps("passWord",{
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
                  ...values,
                  fundingNumber : fundingNumber,
                  passWord :  MD5(values.passWord).toString()
                })
              }
            })
          }}
        >提交</Button>
      </List>
    </Fragment>
  )
}

export default createForm()(BuyForm);

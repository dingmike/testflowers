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
import styles from './transForm.less'
function TransForm({
  form : {
    getFieldProps,
    validateFields,
    getFieldError,
    getFieldValue
  },
  id,
  onOk,
  name,
  checkeAccountName,
  accountName,
  myMoney
}){
  return (
    <Fragment>
      <h4 className={ styles.title }>{myMoney}</h4>
      <h4 className={styles.name }>{name}</h4>
      <List>
        <InputItem
          extra={accountName}
          autoComplete="off"
          placeholder="请输入对方账户"
          {...getFieldProps("transferPhone",{
            rules : [{
              required : true,
              message  : "请填写您要转入的账号"
            }]
          })}
          onBlur={()=>{
            const phone = getFieldValue("transferPhone");
            if(!!phone){
              checkeAccountName(phone)
            } 
          }}
        >
          对方账户
        </InputItem>
        <InputItem
          autoComplete="off"
          placeholder="请输入转让积分"
          type="number"
          {...getFieldProps("integral",{
            rules : [
              {
                required : true,
                message  : "请填写您要转入的账号",
              }, {
                min : 1,
                message : '转让积分至少为1积分'
              }
            ]
          })}
        >
          转让数量
        </InputItem>
        <InputItem
          autoComplete="off"
          type="password"
          placeholder="账户支付密码"
          {...getFieldProps("payPassword",{
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
        <p style={{
          color : "#9D0F14"
        }}>提交后无法修改，请仔细确认转让账号是否正确。</p>
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
                  id : id,
                  payPassword :  MD5(values.payPassword).toString()
                })
              }
            })
          }}
        >确认转让</Button>
      </List>
    </Fragment>
  )
}

export default createForm()(TransForm);
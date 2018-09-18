import React, { Fragment } from 'react';
import { 
  List,
  NavBar,
  Icon,
  Button,
  InputItem,
  WingBlank,
  WhiteSpace,
  Toast,
} from 'antd-mobile';

import GraySpace from '../../components/GraySpace';
import { createForm } from 'rc-form';
import { MD5 } from "crypto-js"
import styles from './form.less';
function TransferIntegral({
  form : {
    getFieldProps,
    getFieldError,
    getFieldValue,
    setFieldsValue,
    validateFields,
  },
  onCloseModal,
  money=0,
  accountName="",
  onCheckAccountName,
  onTransfer
}){
  return (
    <Fragment>
      <NavBar
        mode="light"
        style={{
          boxShadow : "0 1px 1px #ABABAB"
        }}
        leftContent={<Icon type="left" style={{ color : '#333'}}/>}
        onLeftClick={onCloseModal}
      >
        分红积分转出
      </NavBar>
      <GraySpace size="xs"/>
      <div className={ styles.head }>
        <p className={ styles.text }>可转分红积分</p>
        <p className={ styles.b }>{money}</p>
      </div>
      <GraySpace size="sm"/>
      <List>
        <InputItem
          type="money"
          labelNumber={7}
          placeholder="填写要转让的数量"
          autoComplete="off"
          {...getFieldProps('money',{
            rules: [
              {
                required : true,
                message  : '请输入转让的分值'
              }
            ],
            inintialValue : 0
          })}
          onBlur={()=>{
            const value = getFieldValue('money')
            const max = parseFloat(money,2)
            const cc = parseFloat(value,2)
            const v = Math.min(max,cc)
            setFieldsValue({
              money : Number.isNaN(v) ? 0 : v
            })
          }}
        >
          转出数量
        </InputItem>
        <InputItem
          extra = {accountName}
          autoComplete="off"
          {...getFieldProps("transferPhone",{
            rules : [
              {
                required : true,
                message : "对方账号不能为空"
              }
            ],
            onChange : (value) => {
              if(value.length === 11){
                onCheckAccountName(value)
              }
            }
          })}
        >
          对方账户
        </InputItem>
        <InputItem
          autoComplete="off"
          type="password"
          {...getFieldProps('payPassword', {
            rules : [{
              required : true,
              message : '请输入账户支付密码'
            }]
          })}
        >
          支付密码
        </InputItem>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Button 
            type="warning"
            onClick={()=>{
              validateFields((errors,values)=>{
                if(errors){
                  for(let name in errors ) {
                    let error = getFieldError(name) ? getFieldError(name).join(',') : null;
                    Toast.fail(error,2)
                    break;
                  }
                }else {
                  const opt = {
                    ...values,
                    payPassword : MD5(values.payPassword).toString()
                  }
                  onTransfer(opt)
                }
              })
            }}
          >确定</Button>
        </WingBlank>
      </List>
    </Fragment>
  )
}

export default createForm()(TransferIntegral)
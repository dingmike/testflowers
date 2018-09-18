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
import styles from './Form.less';
const Item = List.Item;
function Withdraw({
  form : {
    getFieldProps,
    getFieldError,
    getFieldValue,
    setFieldsValue,
    validateFields,
  },
  modalType,
  onCloseModal,
  money=0,
  accountName="",
  actual,
  tax,
  formalities,
  onRateCalculation,
  onOk,
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
        {modalType==="withdraw" ? "现金余额提现" : "现金余额转账"}
      </NavBar>
      <GraySpace size="xs"/>
      <div className={ styles.head }>
        <p className={ styles.text }>可用现金余额（元）</p>
        <p className={ styles.b }>{money}</p>
      </div>
      <GraySpace size="sm"/>
      {
        modalType === "withdraw" ? 
        <List>
          <InputItem
            type="money"
            autoComplete="off"
            labelNumber={7}
            placeholder="0.00"
            onBlur={()=>{
              const value = getFieldValue('money')
              const max = parseFloat(money,2)
              const cc = parseFloat(value,2)
              const v = Math.min(max,cc)
              setFieldsValue({
                money : Number.isNaN(v) ? 0 : v
              })
              onRateCalculation(v)
            }}
            {...getFieldProps("money", {
              rules: [
                {
                  required : true,
                  message  : '请输入要提现的金额'
                }
              ],
              inintialValue : 0
            })}
          >
            提现金额(元)
          </InputItem>
          <InputItem
            type="password"
            autoComplete="off"
            {...getFieldProps('payPassword', {
              rules: [
                {
                  required : true,
                  message  : '请输入账户支付密码'
                }
              ]
            })}
          >
            支付密码
          </InputItem>
          <Item>
            <p>实得金额：{actual}</p>
            <p>手续费：{formalities}</p>
            <p>税收：{tax}</p>
          </Item>
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
                    onOk(modalType,opt)
                  }
                })
              }}
            >确定</Button>
          </WingBlank>
        </List> :
        <List>
          <InputItem
            type="money"
            labelNumber={7}
            placeholder="0.00"
            autoComplete="off"
            {...getFieldProps('money',{
              rules: [
                {
                  required : true,
                  message  : '请输入要提现的金额'
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
            转账金额(元)
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
      }
    </Fragment>
  )
}

export default createForm()(Withdraw)
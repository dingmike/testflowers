import React from 'react';
import { createForm } from 'rc-form';
import { 
  List, 
  InputItem,
  WhiteSpace,
  WingBlank,
  Button,
  Toast,
  Icon
} from 'antd-mobile';
import { MD5 } from 'crypto-js';
import GraySpace from '../../../components/GraySpace';
import styles from './transfer.less'
export default createForm()(({
  form : {
    getFieldProps,
    getFieldError,
    validateFields,
    getFieldValue
  },
  name,
  onTransfer,
  closeModal,
  orderId
})=> 
  <div>
    <div className={ styles.close }>
      <Icon type="cross" size="lg" style={{
        color : '#333'
      }} onClick={closeModal}/>
    </div>
    <h2>转让</h2>
    <h3 className={ styles.title }>{name}</h3>
    <GraySpace size="xs"/>
    <List>
      <InputItem
        type="number"
        {
          ...getFieldProps('num',{
            rules : [
              {
                requierd : true,
                message  : '请填写转让数量'
              },{
                min : 1,
                message : '转让数量最少为1'
              }
            ]
          })
        }
        placeholder="请输入转让数量"
        labelNumber={6}
      >
        转让数量
      </InputItem>
      <InputItem
        {
          ...getFieldProps('phone',{
            rules : [
              {
                requierd : true,
                message  : '转让账户不能为空'
              }
            ]
          })
        }
        placeholder="请输入转让账号"
        labelNumber={6}
        clear
      >
        转让账号
      </InputItem>
      <InputItem
        {
          ...getFieldProps('comfirmPhone',{
            rules : [
              {
                requierd : true,
                message  : '请再次确定转让账号'
              },(rule, value, cb)=> {
                const phone = getFieldValue('phone');
                let error = []
                if(phone !== value ){
                  error.push(new Error('两次输入的账号不一致'))
                }
                cb(error)
              }
            ],
            validateTrigger : false
          })
        }
        placeholder="请再次输入转让账号"
        labelNumber={6}
        clear
      >
        确认账号
      </InputItem>
      <InputItem
        {
          ...getFieldProps('payPassword', {
            rules : [
              {
                required : true,
                message  : '请输入您的账户支付密码'
              }
            ]
          })
        }
        type="password"
        placeholder="请输入账户支付密码"
        labelNumber={6}
        clear
      >
        支付密码
      </InputItem>

    </List>
    <GraySpace size="xs"/>
    <WhiteSpace size='lg'/>
    <WingBlank>
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
              const opt = {
                ...values,
                payPassword : MD5(values.payPassword).toString(),
                orderId : orderId
              }
              onTransfer(opt)
            }
          })
        }}
      >转让</Button>
    </WingBlank>
    <WhiteSpace size='lg'/>
  </div>
) 
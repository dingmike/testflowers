import React, { Fragment } from 'react';
import { 
  List,
  InputItem,
  NavBar,
  Icon,
  Toast,
  WhiteSpace,
  Button,
  WingBlank
} from 'antd-mobile';
import { createForm } from 'rc-form/lib';
import { MD5 } from "crypto-js"
export default createForm()(({
  form : {
    getFieldProps,
    getFieldError,
    validateFields,
    getFieldValue,
  },
  modalType,
  clickModalBack,
  onOk
}) => {
  return (
    <Fragment>
      <NavBar
        mode="light"
        leftContent={<Icon type="left" style={{ color : '#333'}}/>}
        onLeftClick={()=>clickModalBack()}
      >
        {modalType === "pany" ? "修改支付密码" : "修改登录密码"}
      </NavBar>
      <List>
        <WhiteSpace />
        <InputItem
          {
            ...getFieldProps("password",{
              rules : [
                {
                  required : true,
                  message  : '旧密码不能为空'
                }
              ]
            })
          }
          error={!!getFieldError('password')}
          autoComplete="off"
          onErrorClick={() => {
            Toast.info(getFieldError('password').join('、'),3);
          }}
          placeholder="请输入旧密码"
          type="password"
        >
          旧密码
        </InputItem>
        <WhiteSpace />
        <InputItem
          {
            ...getFieldProps("nowPassword",{
              rules : [
                {
                  required : true,
                  message  : '新密码不能为空'
                }
              ]
            })
          }
          error={!!getFieldError('nowPassword')}
          autoComplete="off"
          onErrorClick={() => {
            Toast.info(getFieldError('nowPassword').join('、'),3);
          }}
          placeholder="请输入新密码"
          type="password"
        >
          新密码
        </InputItem>
        <WhiteSpace />
        <InputItem
          {
            ...getFieldProps("verifyPassword",{
              rules : [
                {
                  required : true,
                  message  : '请确认你要修改的密码'
                },
                (rule, value, cb)=> {
                  const pwd = getFieldValue('nowPassword');
                  let error = []
                  if(pwd !== value){
                    error.push(new Error('两次密码不匹配'))
                  }
                  cb(error)
                }
              ]
            })
          }
          error={!!getFieldError('verifyPassword')}
          autoComplete="off"
          onErrorClick={() => {
            Toast.info(getFieldError('verifyPassword').join('、'),3);
          }}
          placeholder="请再次输入新密码"
          type="password"
        >
          确认密码
        </InputItem>
        <WingBlank>
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
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
                  let type = modalType === "pwd" ? 1 : 2;
                  const opt = {
                    ...values,
                    type : type,
                    password : MD5(values.password).toString(),
                    nowPassword : MD5(values.nowPassword).toString(),
                    verifyPassword: MD5(values.verifyPassword).toString(),
                  }
                  onOk(opt)
                }
              })
            }}
          >确定</Button>
        </WingBlank>
      </List>
    </Fragment>
  )
})
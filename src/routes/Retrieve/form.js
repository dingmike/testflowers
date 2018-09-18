import { createForm } from 'rc-form'; 
import { List, InputItem, Button, Toast, WingBlank, WhiteSpace } from 'antd-mobile';
import { MD5 } from 'crypto-js'
import CountDown from '../../components/CountDown';
// import styles from './form.less'
// const Item = List.Item;

function RetrieveForm({
  form : {
    getFieldProps,
    getFieldError,
    validateFields,
    getFieldValue
  },
  loading,
  onOk,
  getAuthCode,
  disabled,
  toLogin,
  onTimeOver
}) {
  const handleClickAuthCode = (cb) => {
    if(disabled) return false;
    validateFields(['phone'],(errors)=>{
      if(errors){
        for( let name in errors){
          let error = getFieldError(name) ? 
          getFieldError(name).join(',') : null;
          Toast.fail(error,2)
          break;
        }
      }else {
        cb()
        const phoneNum = getFieldValue('phone')
        getAuthCode({ phone : phoneNum, type: 1 })
      }
    })
  }
  return (
    <WingBlank>
      <List>
        <WhiteSpace />
        <InputItem
          {...getFieldProps('phone', {
            rules : [
              {
                required : true,
                message : '手机号不能为空',
              }, {
                pattern : /^1[345678]\d{9}$/,
                message : '手机号码格式不正确'
              }
            ]
          })}
          placeholder="请输入手机号"
          autoComplete="off"
          error={!!getFieldError('phone')}
          onErrorClick={() => {
              Toast.info(getFieldError('phone').join('、'),3);
            }}
          type="digit"
          >
        </InputItem>
        <WhiteSpace />
        <InputItem
          {...getFieldProps('password', {
              rules : [
                {
                  required : true,
                  message : '密码不能为空'
                }
              ]
          })}
          placeholder="新的密码"
          autoComplete="off"
          error={!!getFieldError('password')}
          type="password"
          onErrorClick={() => {
              Toast.info(getFieldError('password').join('、'),3);
            }}
        >
        </InputItem>
        <WhiteSpace size="lg"/>
        <InputItem
          {...getFieldProps('verifyPassword', {
              trigger: "onChange",
              rules : [
                {
                  required : true,
                  message : '请确认要修改的密码'
                },
                (rule, value, cb)=> {
                  const pwd = getFieldValue('password');
                  let error = []
                  if(pwd !== value){
                    error.push(new Error('两次密码不匹配'))
                  }
                  cb(error)
                }
              ]
          })}
          placeholder="确认新的密码"
          error={!!getFieldError('verifyPassword')}
          type="password"
          autoComplete="off"
          onErrorClick={() => {
              Toast.info(getFieldError('verifyPassword').join('、'),3);
            }}
        >
        </InputItem>
        <WhiteSpace size="lg"/>
        <InputItem 
          {
            ...getFieldProps('code', {
            rules : [
              {
                required : true,
                message : '请填写获取到的验证码'
              }
                ]
            })}
            placeholder="请输入验证码"
            autoComplete="off"
            error={!!getFieldError('code')}
            onErrorClick={() => {
                Toast.info(getFieldError('code').join('、'),3);
              }}
          extra={<CountDown 
              onTimeOver={onTimeOver} 
              onClick={handleClickAuthCode}
              disabled={disabled}
              time={60}
              />}
        ></InputItem>
      </List>
      <div style={{
        display : 'flex',
        justifyContent: 'flex-end',
        alignItems: "center",
        height: 60,
        color : "#848381"
      }}>
        <span onClick={toLogin}>记得密码？<a style={{ color : '#9D0F14'}}>去登陆</a> </span>
      </div>
      <WhiteSpace size="lg"/>
      <WhiteSpace size="lg"/>
      <Button 
          type="warning" 
          loading={loading} 
          onClick={()=> {
            validateFields((errors, values)=>{
              if(errors){
                for(let name in errors ) {
                  let error = getFieldError(name) ? getFieldError(name).join(',') : null;
                  Toast.fail(error,2)
                  break;
                }
              }else {
                const params = {
                  ...values,
                  password : MD5(values.password).toString(),
                  verifyPassword : MD5(values.verifyPassword).toString(),
                  type : 1
                }
                onOk(params)
              }
            })
          }}
      >确定</Button>
    </WingBlank>
  )
}

export default createForm()(RetrieveForm)
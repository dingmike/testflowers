import {createForm} from 'rc-form';
import {List, InputItem, Button, Toast, WingBlank, WhiteSpace} from 'antd-mobile';
import {MD5} from "crypto-js"
// import styles from './form.less'
// const Item = List.Item;

function LoginForm({
                     form: {
                       getFieldProps,
                       getFieldError,
                       validateFields
                     },
                     loading,
                     onOk,
                     clickSignIn,
                     toRetrieve,
                     clickBackHome
                   }) {
  return (
    <WingBlank>
      <List>
        <WhiteSpace />
        <InputItem
          {...getFieldProps('phone', {
            rules: [
              {
                required: true,
                message: '手机号不能为空！'
              }
            ]
          })}
          placeholder="请输入手机号"
          autoComplete="off"
          error={!!getFieldError('phone')}
          onErrorClick={() => {
            Toast.info(getFieldError('phone').join('、'), 3);
          }}>
        </InputItem>
        <WhiteSpace />
        <InputItem
          {...getFieldProps('password', {
            rules: [
              {
                required: true,
                message: '密码不能为空！'
              }
            ]
          })}
          placeholder="请输入密码"
          autoComplete="off"
          error={!!getFieldError('password')}
          type="password"
          onErrorClick={() => {
            Toast.info(getFieldError('password').join('、'), 3);
          }}
        >
        </InputItem>
      </List>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: "center",
        height: 60,
        color: "#848381"
      }}>
        <span onClick={toRetrieve}>忘记密码?</span>
      </div>
      <WhiteSpace size="lg"/>
      <Button
        type="warning"
        loading={loading}
        onClick={() => {
          validateFields((errors, values) => {
            if (errors) {
              for (let name in errors) {
                let error = getFieldError(name) ? getFieldError(name).join(',') : null;
                Toast.fail(error, 2)
                break;
              }
            } else {
              const opt = {
                ...values,
                password: MD5(values.password).toString()
              }
              onOk(opt)
            }
          })
        }}
      >登陆</Button>
      <WhiteSpace size="lg"/>
      <WhiteSpace size="lg"/>
      <Button type="ghost" onClick={() => {
        clickSignIn()
      }}>注册</Button>
      <WhiteSpace size="lg"/>
      <Button
        type="default"
        onClick={clickBackHome}
      >返回首页</Button>
    </WingBlank>
  )
}

export default createForm()(LoginForm)

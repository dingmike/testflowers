import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, InputItem, Button, Toast, WingBlank, WhiteSpace } from 'antd-mobile';
import LoginForm from './form';
import NameImage from '../../assets/name.png'
import styles from './index.less';

function Login({ dispatch, login }) {
  const { loading } = login;
  const formProps = {
    loading,
    onOk : (opt)=>dispatch({ type : 'login/login', payload : opt }),
    clickSignIn : () => dispatch(routerRedux.replace('/signIn')),
    toRetrieve : () => dispatch(routerRedux.replace('/retrieve')),
    clickBackHome(){
      dispatch(routerRedux.replace('/home'))
    }
  }
  return (
    <div className={ styles.wrapper }>
      <div className={ styles.title }>
        <img src={NameImage} alt="诗城酒乡"/>
      </div>
      <LoginForm {...formProps}/>
    </div>
  )
}

export default connect(({ login })=> ({ login }))(Login)

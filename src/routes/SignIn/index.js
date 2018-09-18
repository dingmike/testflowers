import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { ActivityIndicator } from 'antd-mobile';
import SignInForm from './form';
import NameImage from '../../assets/name.png'
import styles from './index.less';

function SignIn({ dispatch, signIn }) {
  const { loading, loadingText, disabled, referrer } = signIn;
  const formProps = {
    loading,
    onOk : (opt)=>dispatch({ type : 'signIn/signIn', payload : opt }),
    getAuthCode : (parmas) => dispatch({ type : 'signIn/getAuthCode', payload : parmas }),
    toLogin : () => {
      dispatch(routerRedux.replace('/login'))
    },
    onTimeOver : () => dispatch({type : 'signIn/disabledUnLock'}),
    disabled,
    referrer
  }
  return (
    <div className={ styles.wrapper }>
      <div className={ styles.title }>
        <img src={NameImage} alt="诗城酒乡"/>
      </div>
      <SignInForm {...formProps}/>
      <ActivityIndicator toast animating={loading} text={loadingText}/>
    </div>
  )
}

export default connect(({ signIn })=> ({ signIn }))(SignIn)

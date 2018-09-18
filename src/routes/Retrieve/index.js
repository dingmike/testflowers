import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { ActivityIndicator } from 'antd-mobile';
import RetrieveForm from './form';
import NameImage from '../../assets/name.png'
import styles from './index.less';

function Retrieve({ dispatch, retrieve }) {
  const { loading, loadingText, disabled } = retrieve;
  const formProps = {
    loading,
    onOk : (opt)=>dispatch({ type : 'retrieve/passwordRest', payload : opt }),
    getAuthCode : (parmas) => dispatch({ type : 'retrieve/getAuthCode', payload : parmas }),
    toLogin : () => {
      dispatch(routerRedux.replace('/login'))
    },
    disabled,
    onTimeOver : () => dispatch({type : 'retrieve/disabledUnLock'})
  }
  return (
    <div className={ styles.wrapper }>
      <div className={ styles.title }>
        <img src={NameImage} alt="诗城酒乡"/>
      </div>
      <RetrieveForm {...formProps}/>
      <ActivityIndicator toast animating={loading} text={loadingText}/>
    </div>
  )
}

export default connect(({ retrieve })=> ({ retrieve }))(Retrieve)

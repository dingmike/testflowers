import React from 'react';
import { 
  ActivityIndicator, 
  NavBar, 
  Icon
} from 'antd-mobile';

import { connect } from 'dva';

import { StickyContainer, Sticky } from 'react-sticky'
import Form from './form';
// import styles from './Certification.less';
import { routerRedux } from 'dva/router';

function Certification({ certification, dispatch }) {
  const { loading, disabled } = certification
  const formProps = {
    loading,
    onOk : (opt)=>dispatch({ type : 'certification/submitInfo', payload : opt }),
    getAuthCode : (parmas) => dispatch({ type : 'certification/getAuthCode', payload : parmas }),
    onTimeOver : () => dispatch({type : 'certification/disabledUnLock'}),
    disabled
  }
  return (
    <StickyContainer>
      <Sticky>
        {
          ({
            style
          })=> (
            <NavBar
              style={{ 
                ...style, 
                zIndex: 5,
                boxShadow : "0 1px 10px #ABABAB" 
              }}
              mode="light"
              leftContent={<Icon type="left" style={{ color : '#333'}}/>}
              onLeftClick={()=>{
                dispatch(routerRedux.go(-1))
              }}
            >
              实名认证
            </NavBar>
          )
        }
      </Sticky>
      <Form {...formProps}/>
      <ActivityIndicator animating={loading} toast text="加载中..."/>
    </StickyContainer>
  )
}

export default connect(({ certification }) => ({ certification }))(Certification)



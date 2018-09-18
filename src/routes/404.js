import React, { Fragment } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles  from './404.less';
import errIcon from '../assets/err404.svg';
function Error404({dispatch, error404 }) {
  return (
    <Fragment>
      <p className={ styles.title }>攻城狮正在加紧修复该页面。请稍后尝试访问。</p>
      <div className={ styles.container }>
        
        <img src={errIcon} alt="404 not found"/>
        <p onClick={()=>dispatch(routerRedux.replace('/'))}>返回首页</p>
      </div>
    </Fragment>
  )
}

export default connect(({ error404 })=> ({ error404 }))(Error404);
import React from 'react';
import { Icon } from 'antd-mobile';
import moment from 'moment'
import styles from './depot.less';
export default ({
  closeModal,
  cellarNumber, //窖藏编号
  cellarTime, // 窖藏时间
  context
}) => 
<div>
  <div className={ styles.close }>
    <Icon type="cross" size="lg" style={{
      color : '#333'
    }} onClick={closeModal}/>
  </div>
  <h3>窖藏详情</h3>
  <div className={ styles.item }>
    <span>窖藏编号</span>
    <span className={ styles.extra }>{cellarNumber}</span>
  </div>
  <div className={ styles.item }>
    <span>窖藏时间</span>
    <span className={ styles.extra }>{moment(cellarTime).format("YYYY-MM-DD HH:mm:ss")}</span>
  </div>
  <div className={ styles.html } dangerouslySetInnerHTML = {{
    __html : context
  }}>
    
  </div>
</div>
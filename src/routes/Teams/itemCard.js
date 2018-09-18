import React from 'react';
import styles from './itemCard.less';
import { Icon } from 'antd-mobile';

export default ({ 
  phone, 
  teamNum, 
  teamMoney, 
  name,
  consumptionMoney,
  onClick
}) => {
  return (
    <div className={ styles.wrapper } onClick={teamNum === 0 ? null : onClick}>
      <div className={ styles.top }>
        <p>{phone} {name}</p>
        <p className={ styles.extra }>{teamNum}人 <Icon type='right'/></p>
      </div>
      <div className={ styles.bottom }>
        <p>消费额:{consumptionMoney}元</p>
        <p>业绩:{teamMoney}元</p>
      </div>
    </div>
  )
}
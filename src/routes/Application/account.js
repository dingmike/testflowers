import React from 'react';
import { List } from 'antd-mobile';
import CustomIcon from '../../components/CustomIcon';

import MoneyIcon from '../../assets/money.png'
import EquIcon from '../../assets/equ.png'
import ConsumeIcon from '../../assets/consume.png'
import PerformanceIcon from '../../assets/performance.png'

import styles from './account.less'
const ListItem = List.Item;

export default ({
  cashBalance=0, 
  prIntegral=0, 
  cpIntegral=0,
  id,
  checkPerformance,
  checkCashBalance,
  checkIntegral,
  teamMoney
}) => 
  <div className={ styles.wrapper }>
    <List>
      <ListItem
        onClick={()=>checkCashBalance(cashBalance)}
        arrow="horizontal"
        extra={
          <div className={ styles.extra }>
            <span className={ styles.text }>{cashBalance}</span>
          </div>}
        >
        <CustomIcon url={MoneyIcon}  text="现金余额"/>
      </ListItem>
      <ListItem
        arrow="horizontal"
        onClick={checkIntegral}
        extra={
          <div className={ styles.extra }>
            <span className={ styles.text }>{prIntegral}</span>
          </div>}
      >
        <CustomIcon url={EquIcon}  text="分红积分"/>
      </ListItem>
      <ListItem
        onClick={()=>{
          checkPerformance(id)
        }}
        arrow="horizontal"
        extra={
          <div className={ styles.extra }>
            <span className={ styles.text }>{teamMoney}</span>
          </div>}
      >
        <CustomIcon url={PerformanceIcon}  text="我的业绩"/>
      </ListItem>
      <ListItem
        arrow="empty"
        extra={
          <div className={ styles.extra }>
            <span className={ styles.text }>{cpIntegral}</span>
          </div>}
      >
        <CustomIcon url={ConsumeIcon}  text="消费积分"/>
      </ListItem>
    </List>
  </div>
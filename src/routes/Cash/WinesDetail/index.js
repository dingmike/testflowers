import React from 'react';

import { StickyContainer, Sticky } from 'react-sticky';
import {
  NavBar,
  Icon,
  ActivityIndicator
} from 'antd-mobile';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './index.less';

function WinesDetail({ dispatch, cash }){
  const {
    wines,
    loading
  } = cash;

  function typeOptions(type) {
    if(type==1){
      return '现金余额'
    }else if(type==2){
      return '微信支付'
    }else {
      return '支付宝'
    }
  }

  return (
    <StickyContainer>
      <Sticky>
        {
          ({
            style
          })=> (
            <NavBar
              mode="light"
              style={{
                ...style,
                zIndex: 5,
                boxShadow : "0 1px 1px #ABABAB"
              }}
              leftContent={<Icon type="left" style={{ color : '#333'}}/>}
              onLeftClick={()=>{
                dispatch(routerRedux.go(-1))
              }}
            >
              购买种酒明细
            </NavBar>
          )
        }
      </Sticky>
      <ActivityIndicator toast animating={loading} text="数据装填中..."/>
      {
        wines.length > 0 ? wines.map(
          (wine,index)=>
            <div
              className={styles.list}
              key={`${wine.id}-${index}`}
            >
              <div className={ styles.header }>
                <p className={ styles.headerName }>{wine.detail}</p>
                <p className={ styles.headerNumber }>{wine.inOut===1?"+": "-"}{wine.money}</p>
              </div>
              <div className={ styles.msg }>
                <p className={ styles.headerName }>支付方式</p>
                <p className={ styles.headerNumber }>{typeOptions(wine.type)}</p>
              </div>
              <div className={ styles.msg }>
                <p>订单号：{wine.orderId}</p>
                <p>{moment(wine.creatTime).format('YYYY-MM-DD HH:mm:ss')}</p>
              </div>
            </div>
        ) : <p className={ styles.noData }>没有相关数据</p>
      }

    </StickyContainer>
  )
}

export default connect(({ cash })=> ({ cash }))(WinesDetail)

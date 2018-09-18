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

function Invests({ dispatch, integral }){
  const {
    invests,
    loading
  } = integral;
  
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
              我的分红积分
            </NavBar>
          )
        }
      </Sticky>
      <ActivityIndicator toast animating={loading} text="数据装填中..."/>
      {
        invests.length === 0 ? <p className={ styles.noData}>暂无相关数据</p> : invests.map(
          (inv,index)=>
            <div 
              className={styles.list} 
              key={`${inv.id}-${index}`}
            >
              <div className={ styles.header }>
                <p className={ styles.headerName }>{inv.name}</p>
                <p className={ styles.headerNumber }>-{inv.money}</p>
              </div>
              <div className={ styles.msg }>
                <p>订单号：{inv.fundingNumber}</p>
                <p>{moment(inv.creatTime).format('YYYY-MM-DD HH:mm:ss')}</p>
              </div>
            </div>
        )
      }
      
    </StickyContainer>
  )
}

export default connect(({ integral })=> ({ integral }))(Invests)
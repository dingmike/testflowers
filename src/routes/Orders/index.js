import React from 'react';

import { 
  StickyContainer, 
  Sticky,
} from 'react-sticky';
import {
  NavBar,
  Icon,
  Tabs,
  Button,
  ActivityIndicator
} from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './index.less';

const tabsProps = {
  tabBarActiveTextColor : "#CF9257",
  tabBarTextStyle : {
    fontWeight: "bold"
  },
  tabBarUnderlineStyle: {
    border : "none"
  }
}
const DetailListItem = ({ img, name, largessIntegral, context, standard,  id, showDetail, orderId }) => {
  return (
    <div 
      className={ styles.detailItem } 
      style={{
        width : window.screen.width - 100,
        height : document.body.scrollHeight - 150
      }}
    >
      <img src={img} alt={name}/>
      <div className={ styles.dContent}>
        <h4 className={styles.h4}>{name}</h4>
        <p className={styles.dTitle}><span>酒量：{standard} KG</span><span>赠送分红积分：{largessIntegral}</span></p>
        <p className={ styles.info }>{`${context.substr(0,60)}...`}</p>
        <div className={ styles.btn }>
          <Button 
            type="warning" 
            inline 
            size="small"
            onClick={()=>showDetail(orderId)}
          >查看</Button>
        </div>
      </div>
    </div>
  )
}

const DefaultTabBar = Tabs.DefaultTabBar;
function Orders({ dispatch, orders }) {
  const { 
    all=[], 
    stay=[], 
    dispose=[], 
    out=[], 
    apply=[],
    complete=[],
    loading,
    openKey
  } = orders;
  const orderTabs = [
    {
      title : '全部订单',
      sub : 'all',
      key : 'all',
      children : all
    },{
      title : '待窖藏',
      sub : 'stay',
      key : 'stay',
      children : stay
    },{
      title : '已窖藏',
      sub : 'dispose',
      key : 'dispose',
      children : dispose
    },{
      title : '已转出',
      sub : 'out',
      key : 'out',
      children : out
    },{
      title : '申请启坛',
      sub : 'apply',
      key : 'apply',
      children : apply
    },{
      title : '已启坛',
      sub : 'complete',
      key : 'complete',
      children : complete
    },
  ]
  const showDetail = (orderId) => dispatch(routerRedux.push({
    pathname : '/application/orders/detail',
    search : `orderId=${orderId}`
  }))
  const renderContent = (tab) => {
    return (
      <div className={ styles.content }>
        {
          tab.children.length > 0 ? tab.children.map((t,index)=>
            <DetailListItem {...t} showDetail={showDetail} key={t.orderId}/>) : 
            <div className={styles.listInfo}>
              {
                loading ? <div className={ styles.searching }><Icon type="search" style={{
                  color : '#efefef'
                }}/>查询中</div> : <p className={ styles.noData }>没有相关订单</p>
              }
            </div>
        }
      </div>
    )
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
              我的窖酒
            </NavBar>
          )
        }
      </Sticky>
      <Tabs 
        tabs={orderTabs}
        {...tabsProps}
        swipeable={false}
        destroyInactiveTab
        renderTabBar = {props => {
          return <DefaultTabBar {...props} page={3.8} />
        }}
        initialPage={openKey}
        animated={false}
        onTabClick={(tab,index)=>{
          dispatch({ type : 'orders/query', payload : tab.sub })
        }}
      >
        {renderContent}
      </Tabs>
      <ActivityIndicator animating={loading} toast text="数据装填中..."/>
    </StickyContainer>
  )
}

export default connect(({ orders })=> ({ orders }))(Orders)
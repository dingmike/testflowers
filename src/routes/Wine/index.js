import React from "react";
import { connect } from "dva";
import {
  NavBar,
  // Icon,
  Tabs,
  ActivityIndicator,
  Button
} from "antd-mobile";
// import { routerRedux } from 'dva/router';
import { StickyContainer, Sticky } from 'react-sticky';
import messageIcon from '../../assets/message.png';
import styles from './index.less'
import { routerRedux } from "dva/router";

/**
 * leftContent={
    <Icon size="md" type="search" className={ styles.searchIcon }/>
  }
 */

const DefaultTabBar = Tabs.DefaultTabBar;

const tabsProps = {
  tabBarActiveTextColor : "#CF9257",
  tabBarTextStyle : {
    fontWeight: "bold"
  },
  tabBarUnderlineStyle: {
    border : "1px solid #CF9257"
  }
}
const DetailListItem = ({ img, name, largessIntegral, context,money, standard, gotoDetail, id }) => {
  return (
    <div className={ styles.detailItem } style={{
      width : window.screen.width - 100,
      height : document.body.scrollHeight - 180
    }}>
      <img src={img} alt={name}/>
      <div className={ styles.dContent}>
        <h4 className={styles.h4}>{name}</h4>
        <p className={styles.dTitle}><span>规格：{standard} KG/坛</span><span>价格：{money} 元</span></p>
        <p className={styles.dTitle}><span>赠送积分：{largessIntegral}</span></p>
        <p className={ styles.info }>{`${context.substr(0,60)}...`}</p>
        <div className={ styles.btn }>
          <Button
            type="warning"
            inline
            size="small"
            onClick={()=>gotoDetail(id)}
          >购买</Button>
        </div>
      </div>
    </div>
  )
}

function Wine({
  dispatch,
  wine
 }){
   const { classify, loading, list } = wine;
   const wineTabs = classify.map((s,i)=>({title:s.name,sub:i,pid : s.id }))
   const gotoDetail = (id) => dispatch(routerRedux.push({
     pathname : `/wine/detail`,
     search : `id=${id}`
   }))
  return (
    <StickyContainer style={{
      paddingBottom: 47
    }}>
    <Sticky>
        {
          ({
            style
          })=> (
            <div style={{
                ...style,
                zIndex: 5,
            }}>
              <NavBar
                mode="light"
                style={{
                  boxShadow : "0 1px 1px #ABABAB"
                }}
                rightContent={
                  <img src={messageIcon} alt="message" className={ styles.badgeImg } onClick={()=>dispatch(routerRedux.push('/notice'))}/>
                }
              >
                花下种酒
              </NavBar>
              <Tabs
                tabs={wineTabs}
                {...tabsProps}
                swipeable={false}
                destroyInactiveTab
                renderTabBar = {props => {
                  return <DefaultTabBar {...props} page={3.8} />
                }}
                onChange={
                  (tab,index)=>{
                    const { pid } = tab;
                    dispatch({
                      type : 'wine/queryListForId',
                      payload : pid
                    })
                  }
                }
              >
              </Tabs>
            </div>
          )
        }
      </Sticky>
      <div className={ styles.content }>
        {
          list.map(l=><DetailListItem {...l} key={l.id} gotoDetail={gotoDetail}/>)
        }
      </div>
      <ActivityIndicator toast text="加载中..." animating={loading}/>
    </StickyContainer>
  )
}

export default connect( ({ wine })=>({ wine }) )(Wine)

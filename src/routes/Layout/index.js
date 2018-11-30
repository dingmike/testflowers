import React from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter, routerRedux } from 'dva/router';
import { connect } from 'dva';
import { menus } from "../../utils";
import styles from './index.less'
import { Da } from '../../utils/index';

const TabBarItem = TabBar.Item;

function tabBarHide(pathname, menus) {
  let paths = menus.map(item=>item.path);
  return paths.includes(pathname)
}

const ms = menus.map((item,key)=> {
  return {
    ...item,
    icon : require(`../../assets/${item.icon}.png`),
    selectedIcon : require(`../../assets/${item.icon}-outline.png`)
  }
})

function Layout({ dispatch, location, children, layout }){
  const { pathname } = location;
  const { isLogin } = layout;
  if(!isLogin) { dispatch(routerRedux.push('/login')) };
  return (
    <div className={ styles.normal }>
      <div className={ styles.content }>
      {/*{
        Da() < 1567496634584 ? children : <p style={{
          textAlign : "center",
          fontSize: 16,
          color : '#9f9f9f'
        }}>{unescape("%u8BF7%u8054%u7CFB%u76F8%u5173%u4EBA%u5458%u4FEE%u590D")}</p>
      }*/}
      </div>
      <div className={ styles.tabBar }>
        <TabBar
          hidden={!tabBarHide(pathname, menus)}
          tintColor="#cf9257"
          unselectedTintColor="#636363"
          barTintColor="#fcfcfc"
        >
          {
            ms.map(
              item=>
                <TabBarItem
                  key={item.dataKey}
                  title={item.name}
                  icon={
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: `url(${item.icon}) center center /  31px 31px no-repeat` }}
                    />}
                  selectedIcon={<div style={{
                    width: '32px',
                    height: '32px',
                    background: `url(${item.selectedIcon}) center center /  31px 31px no-repeat` }}
                  />}
                  selected={item.path === pathname }
                  onPress={()=>dispatch(routerRedux.replace(item.path))}
                />
              )
            }
        </TabBar>
      </div>
    </div>
  )
}

export default withRouter(connect(({ layout })=> ({ layout }))(Layout)) ;

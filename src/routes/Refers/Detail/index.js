import React from 'react';
import { connect } from "dva";
import { routerRedux } from 'dva/router';
import { 
  NavBar, 
  Icon, 
  Carousel, 
  Tabs,
  ActivityIndicator 
} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import GraySpace from '../../../components/GraySpace';
import Image from '../../../components/Image';
import styles from './index.less';
const DefaultTabBar = Tabs.DefaultTabBar;
function ReferDetail({ refers, dispatch }) {
  const { 
    detail=[],
    detailTitle,
    loading
  } = refers;
  const tabsArray = detail.map(d=>({
    ...d,
    title : d.name,
    sub : d.id
  }))
  const tabsProps = {
    tabBarActiveTextColor : "#CF9257",
    tabBarTextStyle : {
      fontWeight: "bold"
    },
    tabBarUnderlineStyle: {
      border : "1px solid #CF9257"
    }
  }
  return (
    <StickyContainer key="refers-detail" onLoad={()=>{
        window.scrollTo({
          top : 0,
        })
      }}>
      <Sticky>
        {
          ({
            style
          })=> (
            <NavBar
              style={{ ...style, zIndex: 5}}
              mode="light"
              leftContent={<Icon type="left" style={{ color : '#333'}}/>}
              onLeftClick={()=>{
                dispatch(routerRedux.go(-1))
              }}
            >
              {detailTitle}
            </NavBar>
          )
        }
      </Sticky>
      <Tabs
        tabs={tabsArray}
        {...tabsProps}
        swipeable={false}
        destroyInactiveTab
        renderTabBar = {props => <DefaultTabBar {...props} page={3.5} />} 
        
      >
        {
          tabsArray.map((t,i)=>{
            return  (
                <div key={`${t.id}-${i}`}>
                  <GraySpace size="xs"/>
                  <Carousel
                    autoplay={!loading}
                    infinite
                    autoplayInterval={3000}
                  >
                    {
                      t.imgArry.map((img,index)=>{
                        return <div className={ styles.banner } key={`${t.id}-img-${index}`}>
                          <Image 
                            src={img} 
                            alt="景点图" 
                            scale={5/8}
                            placeholder="/images/wine.png"
                          />
                        </div>
                      })
                    }
                  </Carousel>
                  <div>
                    <h3>景点介绍</h3>
                    <div className={ styles.html } dangerouslySetInnerHTML={{__html : t.spotDetails}}>
                    </div>
                    <h3>开放时间</h3>
                    <p>{t.openTime}</p>
                    <h3>游玩须知</h3>
                    <p style={{ textIndent:'2em'}}>{t.notes}</p>
                  </div>
                </div>
              )
            }
          )
        }
      </Tabs>
      <ActivityIndicator animating={loading} toast text='数据装填中...'/>
    </StickyContainer>
  )
}

export default connect(({ refers }) => ({ refers }) )(ReferDetail)
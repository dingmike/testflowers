import React from 'react';
import { connect } from 'dva';
import { NavBar, ActivityIndicator, Tabs, Progress, Icon } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { StickyContainer, Sticky } from 'react-sticky';
import messageIcon from '../../assets/message.png';
import Image from '../../components/Image'
import styles from './index.less';

const DefaultTabBar = Tabs.DefaultTabBar;

function CrowdPage ({ dispatch, crowd }) {
  const { 
    loading,
    pr,
    sa
  } = crowd;
  const SaTabs = sa.map((s, i)=>({
      title : s.name,
      sub : s.id,
      pid : s.id,
      children : s.list
    })
  )
  const ListCard = ({name,spotId,masterImg, notes,money,accomplishMoney, accomplish}) => 
    <div className={ styles.card }>
      <Image src={masterImg} alt={name} scale={16/47}/>
      <div className={styles.cardBody}>
        <h4 className={ styles.h4 }>{name}</h4>
        <p className={styles.notes}>{notes.length > 50 ? `${notes.substr(0,50)}...` : notes }</p>
        <p className={ styles.rateText }><span>所需积分：{money}</span><span className={styles.complete}>已筹积分：{accomplishMoney}</span></p>
        <Progress 
          percent={(accomplishMoney/money*100)} 
          position="normal" 
          style={{
            background : "#EFD6BD",
            height : 12,
            borderRadius : 5
          }}
          barStyle={{
            border: "6px solid #9E0F15",
            borderRadius: 5
          }}
        />
        <p className={ styles.cardFooter }>
          <span>参与人数：{accomplish}</span>
          <span 
            style={{
              display : "flex",
              alignItems: "center"
            }}
            onClick={()=>dispatch(routerRedux.push({
              pathname : '/crowd/detail',
              search : `id=${spotId}`
            }))}
          >查看详情<Icon type="right"/></span>
        </p>
      </div>
    </div>

  const PrTabs = pr.map((s,i)=>({title:s.name,sub:i,pid : s.id }))
  const renderBContent = tab => {
    return (
      <div className={ styles.cardWrapper }>
        { tab.children.map((c,index)=><ListCard {...c} key={c.spotId}/>) }
      </div>
    )
  }
  const renderContent = tab => (
    <div>
      <Tabs 
        tabs={SaTabs}
        {...tabsProps}
        prerenderingSiblingsNumber={1}
        destroyInactiveTab
        swipeable={false}
        renderTabBar = {props=><DefaultTabBar {...props} page={3.5}/>
        }
      >
        {renderBContent}
      </Tabs>
    </div>
  )
  const tabsProps = {
    tabBarActiveTextColor : "#CF9257",
    tabBarTextStyle : {
      fontWeight: "bold"
    },
    tabBarUnderlineStyle: {
      border : "none"
    },
  }
  return (
    <StickyContainer style={{
      paddingBottom : 47
    }}>
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
              rightContent={ 
                <img src={messageIcon} alt="message" className={ styles.badgeImg } onClick={()=>dispatch(routerRedux.push('/notice'))}/>
              }
            >
              众筹项目
            </NavBar>
          )
        }
      </Sticky>
      <ActivityIndicator toast text="数据装填中..." animating={loading}/>
      <Tabs 
        tabs={PrTabs}
        {...tabsProps}
        swipeable={false}
        destroyInactiveTab
        animated={false}
        renderTabBar={
          props => 
            <Sticky>
              {
                ({
                  style
                })=> (
                  <div style={{...style, zIndex: 6, top : 45 }}>
                      <DefaultTabBar {...props} page={4}/>
                  </div>
                )
              }
            </Sticky>
        }
        onChange={
          (tab,index)=>{
            const { pid } = tab;
            dispatch({ 
              type : 'crowd/querySaTab',
              payload : {
                pid : pid
              }
            })
          }
        }
      >
        {renderContent}
      </Tabs>
    </StickyContainer>
  )
}

export default connect(({ crowd })=> ({ crowd }))(CrowdPage)
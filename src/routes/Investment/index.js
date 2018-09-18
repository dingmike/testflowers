import React from 'react';
import { connect } from 'dva';
import { StickyContainer, Sticky } from 'react-sticky';
import { routerRedux } from 'dva/router';
import { 
  NavBar,
  Icon,
  Tabs
} from 'antd-mobile';
import Image from '../../components/Image';
import styles from './index.less';

const ListCard = ({ masterImg, name, notes, fundingQuotientId, onCheck }) => {
  return <div className={ styles.card }>
    <Image src={masterImg} alt={name} scale={3/5}/>
    <div className={ styles.cardBody }>
      <h4 className={ styles.h4 }>{name}</h4>
      <p>{notes}</p>
    </div>
    <div className={ styles.operation }>
      <a className={ styles.check }
        onClick={()=>onCheck(fundingQuotientId)}
      >查看详情<Icon type="right"/></a>
    </div>
  </div>
}

function Investment({ investment, dispatch }){
  const { open=[], stay=[] } = investment;
  const  tabList = [
    {
      title : '已营业',
      status : 1,
      children : open
    }, {
      title : '未营业',
      status : 2,
      children : stay
    }
  ];
  const tabsProps = {
    tabBarActiveTextColor : "#CF9257",
    tabBarTextStyle : {
      fontWeight: "bold"
    },
    tabBarUnderlineStyle: {
      border : "none"
    },
  }
  const onCheck = (id) => dispatch(routerRedux.push({
    pathname : '/application/investment/detail',
    search : `id=${id}`
  }))
  const renderContent = (tab) => {
    return tab.children.length > 0 ? <div className={styles.cardwrapper }>
      {tab.children.map((t,index)=><ListCard {...t} onCheck={onCheck} key={`${t.fundingQuotientId}-${index}`}/>)}
    </div> : <p className={ styles.noData }>暂无相关数据</p>
  }
  return (
    <StickyContainer>
      <Sticky>
        {
          ({ style })=> (
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
              我的投资项目
            </NavBar>
          )
        }
      </Sticky>
      <Tabs
        prerenderingSiblingsNumber={1}
        destroyInactiveTab
        swipeable={false}
        tabs={tabList}
        {...tabsProps}
      >
        {renderContent}
      </Tabs>
    </StickyContainer>
  )
}

export default connect(({ investment }) => ({ investment }))(Investment)
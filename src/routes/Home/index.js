import React from 'react';
import { connect } from 'dva';
import { NavBar, ActivityIndicator,Modal } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import messageIcon from '../../assets/message.png';
import styles from './index.less';
import GraySpace from '../../components/GraySpace';

import Banner from './banner';
import Roll from './roll';
import Scenic from './scenic';
import Refer from './refer';
import { routerRedux } from 'dva/router';


function HomePage ({ dispatch, home }) {
  const {
    banner,
    loading,
    rollBanner,
    scenics,
    refers,
    showVersionModal,
    showCloseBtn,
    updateWord,
    updateUrl
  } = home;
  const gotoScenicDetail = (id, name) => {
    dispatch(routerRedux.push({
      pathname : "/home/scenics/detail",
      search : `?id=${id}&name=${name}`
    }))
  }
  const gotoScenicList = () => {
    dispatch(routerRedux.push({
      pathname : '/home/scenics'
    }))
  }
  const gotoRefersList = () => dispatch(routerRedux.push({
    pathname : '/home/refers'
  }))
  const gotoReferDetail = (id, name) => dispatch(routerRedux.push({
    pathname : '/home/refers/detail',
    search : `?id=${id}&name=${name}`
  }))
  const bannerGoto = (type, id, name) => {
    if(type === 1 || type === "1"){
      dispatch(routerRedux.push({
        pathname : '/news/detail',
        search : `id=${id}`
      }))
    }
    if(type === 2 || type === "2"){
      dispatch(routerRedux.push({
        pathname : '/wine/detail',
        search : `id=${id}`
      }))
    }
    if(type === 3 || type ==="3"){
      dispatch(routerRedux.push({
        pathname : '/home/scenics/detail',
        search : `id=${id}`
      }))
    }
    if(type ===4 || type ==="4"){
      dispatch(routerRedux.push({
        pathname : '/crowd/detail',
        search : `id=${id}`
      }))
    }
  }
  const gotoNewsDetail = (id) => {
    dispatch(routerRedux.push({
      pathname : '/news/detail',
      search : `id=${id}`
    }))
  }
  return (
    <StickyContainer style={{
      paddingBottom : 47,
      background : "#fff"
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
              诗城酒乡
            </NavBar>
          )
        }
      </Sticky>
      <ActivityIndicator toast text="加载中..." animating={loading}/>
      <Banner
        dataSource={banner}
        play={!loading}
        bannerGoto={bannerGoto}
      />
      <Roll dataSource={rollBanner} play={!loading} onClick={()=> dispatch(routerRedux.push('/news'))} gotoNewsDetail={gotoNewsDetail}/>
      <GraySpace />
      <Scenic
        dataSource={scenics}
        gotoScenicDetail={gotoScenicDetail}
        gotoScenicList={gotoScenicList}
      />
      <GraySpace />
      <Refer
        dataSource={refers}
        gotoRefersList={gotoRefersList}
        gotoReferDetail={gotoReferDetail}
      />

      <Modal
        visible={showVersionModal}
        transparent
        closable={showCloseBtn}
        maskClosable={false}
        onClose={()=>{dispatch({type:'home/hideUpdateVersionModal'})}}
        title="提示"
        footer={[{ text: '确定', onPress: () => { window.location.href=updateUrl } }]}
      >
        <div style={{ height: 'auto', overflow: 'scroll' }}>
          {updateWord}
        </div>
      </Modal>


    </StickyContainer>
  )
}

export default connect(({ home })=> ({ home }))(HomePage)

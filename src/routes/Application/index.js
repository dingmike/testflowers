import React from 'react'
import { NavBar, ActivityIndicator, Modal, Icon } from 'antd-mobile'
import { connect } from 'dva'
import { StickyContainer, Sticky } from 'react-sticky'
import GraySpace from '../../components/GraySpace'

import MessageIcon from '../../assets/message.png'
import styles from './index.less'

import Header from './head';
import Account from './account';
import Orders from './orders';
import Setings from './settings';
import { routerRedux } from 'dva/router';

const CompanyInfo = ({ 
  onClose,
  companyDetails
 }) => (
  <StickyContainer className={styles.wrapper }>
        <Sticky>
          {
            ({
              style
            })=> (
              <NavBar
                style={{ ...style, zIndex: 5,boxShadow : "0 1px 1px #ABABAB" }}
                mode="light"
                leftContent={<Icon type="left" style={{ color : '#333'}}/>}
                onLeftClick={onClose}
              >
                公司简介
              </NavBar>
            )
          }
        </Sticky>
        <div className={ styles.html } dangerouslySetInnerHTML={{
          __html : companyDetails
        }}></div>
  </StickyContainer>
)
const ConnectUs = ({ 
    onClose,
    blogCode,
    contactQq,
    wechatCode,
    wechatAccount,
    companyAddress,
    blogAccount,
    telephone,
    mailbox,
  }) => (
  <StickyContainer className={styles.wrapper }>
    <Sticky>
      {
        ({
          style
        })=> (
          <NavBar
            style={{ ...style, zIndex: 5,boxShadow : "0 1px 1px #ABABAB" }}
            mode="light"
            leftContent={<Icon type="left" style={{ color : '#333'}}/>}
            onLeftClick={onClose}
          >
            联系我们
          </NavBar>
        )
      }
    </Sticky>
    <div className={ styles.connectUsBody }>
      <div className={ styles.connectUs }>
        <div className={ styles.code }>
          <img src={wechatCode} alt="微信二维码"/>
          <p>微信扫一扫关注</p>
          <p>搜索微信号：{wechatAccount}</p>
        </div>
        <div className={ styles.code }>
          <img src={blogCode} alt="微博二维码"/>
          <p>微博扫一扫关注</p>
          <p>搜索微博号：{blogAccount}</p>
        </div>
      </div>
      <p>QQ群：{contactQq}</p>
      <p>邮箱：{mailbox}</p>
      <p>电话：{telephone}</p>
      <p>公司地址：{companyAddress}</p>
    </div>
  </StickyContainer>
)
function Application({ dispatch, application }) {
  const { 
    userInfo:{
      id,
      // name,
      headImg,
      cashBalance,
      prIntegral,
      cpIntegral,
      // pid,
      // rank,
      rankName,
      // phone,
      // teamNum,
      teamMoney,
      statusName="",
      nickName,
      status,
    },
    modalType,
    companyInfo,
    loading,
    showModal
  }  = application;
  function checkPerformance(id){
    dispatch(routerRedux.push({
      pathname : `/application/teams`,
      search : `?id=${id}`
    }))
  }
  function checkCashBalance(cash) {
    dispatch(routerRedux.push({
      pathname : '/application/cash',
      search : `?money=${cash}`
    }))
  }
  function checkIntegral() {
    dispatch(routerRedux.push({
      pathname : '/application/integral'
    }))
  }
  const HeadProps = { nickName, headImg, rankName, statusName, status };
  const AccountProps = { 
    cashBalance, 
    prIntegral, 
    cpIntegral, 
    checkPerformance,
    checkCashBalance,
    checkIntegral,
    id,
    teamMoney,
  };
  const SettingProps = {
    gotoUserSettings : () => dispatch(routerRedux.push({
      pathname : '/application/userSettings'
    })),
    gotoSafetySettings: () => dispatch(routerRedux.push({
      pathname : '/application/safety'
    })),
    gotoIntegral : () => dispatch(routerRedux.push({
      pathname : '/application/integral'
    })),
    gotoInvestment : () => dispatch(routerRedux.push({
      pathname : "/application/investment"
    })),
    showCompanyInfo : () => dispatch({
      type : "application/openModal",
      payload : 'companyInfo'
    }),
    showConnectUs : () => dispatch({
      type : 'application/openModal',
      payload : "connectUs"
    })
  }
  const OrdersProps = {
    gotoOrders : (state) => dispatch(routerRedux.push({
      pathname : '/application/orders',
      state : state
    }))
  }
  const companyInfoProps = {
    ...companyInfo,
    onClose : () => dispatch({ type : "application/closeModal" })
  }
  const connectUsProps = {
    ...companyInfo,
    onClose : () => dispatch({ type : "application/closeModal" })
  }
  return (
    <StickyContainer style={{
      paddingBottom : 47
    }} className={styles.wrapper }>
        <Sticky>
          {
            ({
              style
            })=> (
              <NavBar
                style={{ ...style, zIndex: 5,boxShadow : "0 1px 1px #ABABAB" }}
                mode="light"
                rightContent={
                  <img src={MessageIcon} alt="消息" className={ styles.icon } onClick={()=>dispatch(routerRedux.push('/notice'))}/>
                }
              >
                我的
              </NavBar>
            )
          }
        </Sticky>
        <GraySpace />
      <ActivityIndicator animating={loading} toast text="加载中..."/>
      <Header {...HeadProps}/>
      <GraySpace />
      <Account {...AccountProps}/>
      <GraySpace />
      <Orders {...OrdersProps}/>
      <GraySpace />
      <Setings {...SettingProps}/>
      <GraySpace />
      <Modal visible={showModal}>
        {
          modalType === "companyInfo" ? <CompanyInfo {...companyInfoProps}/> : <ConnectUs {...connectUsProps}/>
        }
      </Modal>
    </StickyContainer>
  )
}

export default connect(({ application }) => ({ application }))(Application)
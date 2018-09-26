import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import {
  NavBar,
  Icon,
  // List,
  Carousel,
  Button,
  ActivityIndicator,
  Modal
} from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import GraySpace from '../../../components/GraySpace'
import Image from '../../../components/Image'
import styles from './index.less';
import moment from 'moment'
import HarvestForm from './harvestForm';
import Depot from './depot';
import Transfer from './transfer';
// const Item = List.Item;

function OrderDetail({ orders, dispatch }){
  const {
    detail,
    loading,
    showModal,
    modalType,
    address,
    showAddress,
    popShow
  } = orders;
  const {
    name,
    imgDescArr=[],
    giveIntegral,
    number,
    payMoney,
    orderId,
    status,
    orderStatus,
    specs,
    creatTime,
    productId,
    cellarTime,
    cellarNumber,
    context,
    transferenceType,
    transferenceTime,
    transferenceAccount,
    mailType,
    expressNumber
  } = detail
  const depotProps = {
    cellarTime,
    cellarNumber,
    context,
  }
  const transferProps = {
    name,
    orderId,
    closeModal : () => {
      dispatch({
        type : 'orders/hideModal'
      })
    },
    onTransfer : (opt) => {
      dispatch({
        type : "orders/transferOrder",
        payload : opt
      })
    }
  }
  const closeModal = () => {
    dispatch({
      type : 'orders/hideModal'
    })
  }
  const queryAddress = () => {
    dispatch({
      type : 'orders/queryAddress'
    })
  }
  const onOpen = (opt) => {
    dispatch({
      type : 'orders/orderOpen',
      payload : opt
    })
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
      <Carousel
        autoplay={!loading}
        infinite
        autoplayInterval={3000}
      >
        {
          imgDescArr.map((b,i)=>
            <Image
              key={`图片-${i}`}
              scale={10/23}
              src={b}
              alt={`图片-${i}`}
            />
          )
        }
      </Carousel>
      <GraySpace size="xs"/>
      <div className={ styles.head }>
        <h4 className={ styles.h4 }>{detail.name}</h4>
        {orderStatus === 1 && transferenceType !== 2?
          <Button
            type="primary"
            inline
            size="small"
            onClick={()=>dispatch({
              type : 'orders/showModal',
              payload : "harvest"
            })}
          >申请启坛</Button> : null }
      </div>
      {
        transferenceType !==2 ?
        <div className={ styles.list }>
          <div className={ styles.item }>
            <span>现有数量</span>
            <span className={ styles.extra }>{number}坛</span>
          </div>
          <div className={ styles.item }>
            <span>支付金额</span>
            <span className={ styles.extra }>{payMoney}元</span>
          </div>
          <div className={ styles.item }>
            <span>规格</span>
            <span className={ styles.extra }>{specs}kg/坛</span>
          </div>
          <div className={ styles.item }>
            <span>赠送分红积分</span>
            <span className={ styles.extra }>{giveIntegral}</span>
          </div>
          <div className={ styles.item }>
            <span>订单编号</span>
            <span className={ styles.extra }>{orderId}</span>
          </div>
          <div className={ styles.item }>
            <span>付款时间</span>
            <span className={ styles.extra }>{moment(creatTime).format("YYYY-MM-DD HH:mm:ss")}</span>
          </div>
          <div className={ styles.item }>
            <span>订单状态</span>
            <span className={ styles.extra }>{status}</span>
          </div>
          {
            orderStatus === 3 ?
            <div className={ styles.item }>
              <span>提货方式</span>
              {
                mailType === 1 ?
                  <span className={ styles.extra }>自提</span> :
                  <div>
                    {
                      !!expressNumber ?
                      <span
                        className={ styles.extra }
                        onClick={()=>dispatch(routerRedux.push({
                          pathname : "/orders/logistics",
                          search : `no=${expressNumber}`
                        }))}
                      >查看物流<Icon type="right"/></span> :
                      <span className={ styles.extra }>暂无物流信息</span>
                    }
                  </div>
              }
            </div> : null
          }
          {
            orderStatus === 0 ? null : <div className={ styles.item }>
            <span>窖藏详情</span>
            <span
              className={ styles.extra }
              onClick={()=> dispatch({
                type : 'orders/showModal',
                payload : 'depot'
              })}
            >查看详情<Icon type="right"/></span>
          </div>
          }
        </div>:null
        }
        {
          (transferenceType === 2 || transferenceType ===1 ) ?
            <div className={ styles.list }>
              <div className={ styles.item }>
                <span>转出/入时间</span>
                <span className={ styles.extra }>{moment(transferenceTime).format('YYYY-MM-DD HH:mm:ss')}</span>
              </div>
              <div className={ styles.item }>
                <span>转出/入账号</span>
                <span className={ styles.extra }>{transferenceAccount}</span>
              </div>
            </div> : null
        }
      { orderStatus === 0 ?
        <div className={ styles.btn }>
          <Button type="warning" onClick={
              ()=>dispatch(routerRedux.push({
                pathname : '/wine/detail',
                search : `id=${productId}`
              }))
            }>再次购买</Button>
        </div>
         : null }
      {
        orderStatus === 1 && transferenceType !==2?
          <div className={ styles.btn} >
            <div className={ styles.inlineBox}>
              <div className={ styles.inline }>
                <Button
                  className={ styles.again }
                  onClick={()=> dispatch({
                    type : 'orders/showModal',
                    payload : 'transfer'
                  })}
                >转让</Button>
              </div>
              <div className={ styles.inline }>
                <Button type="warning"  onClick={
                ()=>dispatch(routerRedux.push({
                  pathname : '/wine/detail',
                  search : `id=${productId}`
                }))
                }>再次购买</Button>
              </div>
            </div>
          </div> :
          null
      }
      <ActivityIndicator text="数据同步中..." animating={loading} toast/>
      <Modal
        visible={showModal}
        popup={modalType!=="depot"}
        onClose={closeModal}
      >
        {
          modalType === "harvest" ?
            <HarvestForm
              detail={detail}
              closeModal={closeModal}
              address={address}
              queryAddress={queryAddress}
              showAddress={showAddress}
              showAd={()=>dispatch({type : 'orders/addressVisible' })}
              hideAd={()=>dispatch({type : 'orders/addressHide'})}
              popShow={popShow}
              showPop={()=>dispatch({type : 'orders/showPop' })}
              hidePop={()=>dispatch({type : 'orders/hidePop' })}
              onOpen={onOpen}
            /> :
              modalType === "depot" ?
              <Depot
                closeModal={closeModal}
                {...depotProps}
              />
                :
              <Transfer {...transferProps}/>
        }
      </Modal>
    </StickyContainer>
  )
}
export default connect(({ orders }) => ({ orders }))(OrderDetail)


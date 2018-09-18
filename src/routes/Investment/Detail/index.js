import React from 'react';
import GraySpace from '../../../components/GraySpace'
import { 
  Icon,
  ActivityIndicator,
  Button,
  Modal,
} from 'antd-mobile';
import { connect } from 'dva';
import Image from '../../../components/Image';
import { MD5 } from 'crypto-js';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import FList from '../../../components/FList';
import TransForm from './transForm';
const FListItem = FList.Item;

function InvestmentDetail({ dispatch, investment }) {
  const { loading, detail, showModal, accountName  } = investment;
  const {  
    money=0,
    name="",
    myMoney=0,
    status,
    masterImg="",
    fundingNumber,
    statusName="",
    spotDetails="",
    accomplish=0,
    fundingQuotientId,
    fundingProductId
  } = detail
  const checkeAccountName = (phone) => dispatch({
    type : "investment/queryAccountName",
    payload : phone
  })
  const onOk = (opt) => dispatch({
    type : "investment/transferInvest",
    payload : opt
  })
  return (
    <div className={ styles.wrapper }>
      <div className={styles.banner}>
        <div 
          className={styles.back}
          onClick={()=>dispatch(routerRedux.go(-1))}
        ><Icon type="left" size="lg" style={{color : '#fff'}}/></div>
        <Image 
          src={masterImg}
          alt={name}
          scale={3/5}
        />
      </div>
      <GraySpace size="xs"/>
      <div className={ styles.intro }>
        <h4 className={ styles.title }>￥{money}</h4>
        <h3>{name}</h3>
      </div>
      <GraySpace size="xs"/>
      <FList>
        <FListItem>
          <span>项目编号</span>
          <span>{fundingNumber}</span>
        </FListItem>
        <FListItem>
          <span>项目状态</span>
          <span>{statusName}</span>
        </FListItem>
      </FList>
      <GraySpace size="xs"/>
      <FList>
        <FListItem>
          <span>投资积分</span>
          <span>{myMoney}</span>
        </FListItem>
        <FListItem>
          <span>参与人数</span>
          <span>{accomplish}人</span>
        </FListItem>
      </FList>
      <GraySpace size="xs"/>
      <div className={styles.html } dangerouslySetInnerHTML={{ __html : spotDetails }}></div>
      <Modal 
        visible={showModal} 
        popup 
        animationType="slide-down"
        onClose={()=>dispatch({ type: 'investment/closeModal' })}
      >
        <TransForm 
          name={name}
          checkeAccountName={checkeAccountName}
          id={fundingQuotientId}
          accountName={accountName}
          myMoney={myMoney}
          onOk={onOk}
        />
      </Modal>
      <ActivityIndicator animating={loading} text="加载中..." toast/>
      {
        status === 0 ? 
          <div className={styles.btn}>
            <div className={ styles.inlineBox}>
              <div className={ styles.inline}>
                <Button 
                  type="primary"
                  onClick={()=>Modal.prompt("确认取消","请输入你的账户支付密码后确认取消",(pwd)=>dispatch({
                    type : 'investment/cancelCrowd',
                    payload : {
                      id : fundingQuotientId,
                      payPassword : MD5(pwd).toString()
                    }
                  }),"secure-text")}
                >取消众筹</Button>
              </div>
              <div className={ styles.inline}>
                <Button 
                  type="warning"
                  onClick={()=>dispatch(routerRedux.push({
                    pathname : "/crowd/detail",
                    search : `id=${fundingProductId}`
                  }))}
                >再次购买</Button>
              </div>
            </div>
          </div> : null
      }
      {
        status === 4 ? 
          <div className={ styles.btn }>
            <Button 
              className={ styles.again }
              onClick={()=>dispatch({type : "investment/openModal" })}
            >转让</Button>
          </div> : null
      }
    </div>
  )
}

export default connect(({ investment })=> ({ investment }))(InvestmentDetail)
import React, { Fragment } from 'react';
import GraySpace from '../../../components/GraySpace'
import {
  Icon,
  ActivityIndicator,
  Button,
  Modal,
} from 'antd-mobile';
import { connect } from 'dva';
import Banner from './banner';
import AgreementModal from './agreementModal';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import BuyForm from './buyForm';

function WineDetail({ dispatch, wine }) {
  const { loading, detail, showModal, showAgreeModal,agreed,agreeContent,showApprove,payMethods,choosed } = wine;
  const {
    imgDescArr=[],
    money=0,
    name="",
    standard=0,
    largessIntegral=0,
    context="",
    id,
    imgDesc
  } = detail;

  const {protocolContent,type} = agreeContent;
  const buyFormProps = {
    money,
    payMethods,
    choosed,
    id,
    onOk: (opt)=> dispatch({ type : "wine/buyWine", payload : opt }),
    changePayMethod: (value)=>dispatch({type:"wine/payMethodChange",payload: value}),
    onOkAlipay:(params)=>dispatch({type:"wine/aliPayNow",payload: params}),
    onOkWechatPay:(params)=>dispatch({type:"wine/wechatPayNow",payload: params}),
  }


  function hideAgreementModal() {
    dispatch({ type: 'wine/hideAgreeModal' })
  }
  function agreePortocol() {
    dispatch({ type: 'wine/agreePortocol' })
  }
  function hideApprove() {
    dispatch({ type: 'wine/hideApproveModal' })
  }
  function gotoCertification() {
    dispatch({ type: 'wine/hideApproveModal' })
    dispatch(routerRedux.push('/application/certification'))
  }
  return (
    <Fragment>
      <div className={styles.banner}>
        <div
          className={styles.back}
          onClick={()=>{dispatch(routerRedux.go(-1)); dispatch({type: 'wine/agreeFalse'})}}
        ><Icon type="left" size="lg" style={{color : '#fff'}}/></div>
        <Banner dataSource={imgDescArr} play={loading}/>
      </div>
      <GraySpace size="xs"/>
      <div className={ styles.intro }>
        <h4 className={ styles.title }>￥{money}</h4>
        <h3>{name}</h3>
      </div>
      <GraySpace size="xs"/>
      <div className={ styles.list }>
        <span>规格</span>
        <span>{standard}kg/坛</span>
      </div>
      <div className={ styles.list }>
        <span>价格</span>
        <span>{money} 元</span>
      </div>
      <div className={ styles.list }>
        <span>赠送分红积分</span>
        <span>{largessIntegral}</span>
      </div>
      <GraySpace size="xs"/>
      <div className={ styles.infoMessage }>
        <h3>种酒须知</h3>
        <p style={{
          whiteSpace: "normal",
          wordWrap : "break-word"
        }}>{context}</p>
      </div>
      <div className={ styles.infoMessage }>
        <h3>种酒介绍</h3>
        <div
          className={ styles.html }
          dangerouslySetInnerHTML={{__html : imgDesc }}
        ></div>
      </div>
      <div className={ styles.btn }>
        <Button
          type="warning"
          onClick={()=>{
            if(agreed){
              dispatch({type:'wine/showModal'})
            }else{
              dispatch({type:'wine/showAgreeModal'})
            }}}
        >购买</Button>
      </div>
      <Modal
        visible={showModal}
        popup
        animationType="slide-up"
        onClose={()=>dispatch({ type: 'wine/hideModal' })}
      >
        <BuyForm {...buyFormProps}/>
      </Modal>

      <Modal
        visible={showApprove}
        onClose={()=> hideApprove()}
        transparent
        maskClosable={false}
        closable={false}
        title="提示"
        footer={[{ text: '关闭', onPress: () => { console.log('ok'); hideApprove() } },{text: '实名认证', onPress:()=>{ console.log('实名认证去'); gotoCertification();}}]}
      >
        还未实名认证！
      </Modal>

      <ActivityIndicator animating={loading} text="加载中..." toast/>

      <AgreementModal showAgreement={showAgreeModal} agreed={agreed} hideAgreement={hideAgreementModal} agreePortocol={agreePortocol} agreementContent={protocolContent}/>

    </Fragment>
  )
}

export default connect(({ wine })=>({ wine }))(WineDetail)

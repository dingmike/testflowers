import React from 'react';
import { connect } from 'dva';
import {
  Carousel,
  Icon,
  List,
  Button,
  Modal,
  ActivityIndicator
} from 'antd-mobile';
import Image from '../../../components/Image'
import GraySpace from '../../../components/GraySpace'
import BuyForm from './buyForm';
import AgreementModal from './agreementModal';
import styles from './index.less'
import { routerRedux } from 'dva/router';

const Item = List.Item;
function CrowdDetail({
  crowd,
  dispatch
}){
  const {
    detail:{
      accomplish=0,
      accomplishMoney=0,
      fundingNumber="",
      masterImg="",
      name="",
      money,
      spotDetails,
      notes
    },
    showModal,
    loading,
    showAgreeModal,
    agreed,
    agreeContent,
    showApprove
  } = crowd;
  const {protocolContent,type} = agreeContent;
  const buyFormProps = {
    money,
    fundingNumber,
    onOk: (opt)=> dispatch({ type : "crowd/buycrowd", payload : opt })
  };
  const imgs = masterImg.split(',');
  function hideAgreementModal() {
    dispatch({ type: 'crowd/hideAgreeModal' })
  }
  function agreePortocol() {
    dispatch({ type: 'crowd/agreePortocol' })
  }
  function hideApprove() {
    dispatch({ type: 'crowd/hideApproveModal' })
  }
  function gotoCertification() {
    dispatch({ type: 'crowd/hideApproveModal' })
    dispatch(routerRedux.push('/application/certification'))
  }
  return(
    <div
      onLoad={()=>{
        window.scrollTo({
          top : 0,
        })
      }}
      className={ styles.wrapper }
    >
      <span
        className={ styles.back }
        onClick={()=>{dispatch(routerRedux.go(-1));dispatch({type: 'crowd/agreeFalse'})}}
      >
        <Icon
          type="left"
          size="md"
          style={{
            color : '#fff'
          }}/>
      </span>
      <div className={ styles.header }>
        <Carousel>
          { imgs.map((img,index)=><Image src={img} key={index} scale={5/9}/>)}
        </Carousel>
      </div>
      <div className={ styles.body }>
        <h4 className={styles.h4}>￥{money}</h4>
        <h5>{name}</h5>
      </div>
      <GraySpace size="xs"/>
      <List>
        <Item extra={fundingNumber}>
          项目编号
        </Item>
        <Item extra={money}>
          所需积分
        </Item>
        <Item extra={accomplishMoney}>
          已筹积分
        </Item>
        <Item extra={`${accomplish}人`}>
          参与人数
        </Item>
      </List>
      <GraySpace size="xs"/>
      <div className={ styles.body }>
        <h3>众筹介绍</h3>
        <div className={ styles.html } dangerouslySetInnerHTML={{ __html : spotDetails }}></div>
        <h3>众筹须知</h3>
        <p style={{
          textIndent : "2rem"
        }}>{notes}</p>
      </div>
      <Modal
        visible={showModal}
        popup
        animationType="slide-down"
        onClose={()=>dispatch({ type: 'crowd/hideModal' })}
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
        购买成功去实名认证！
      </Modal>



      <div className={styles.btn}>
        <Button
          type="warning"
          onClick={()=>{
            if(agreed){
              dispatch({type:'crowd/showModal'})
            }else{
              dispatch({type:'crowd/showAgreeModal'})
            }}}
        >参与</Button>
      </div>
      <ActivityIndicator toast animating={loading} text="数据装填中..."/>
      <AgreementModal showAgreement={showAgreeModal} agreed={agreed} hideAgreement={hideAgreementModal} agreePortocol={agreePortocol} agreementContent={protocolContent}/>
    </div>
  )
}

export default connect(({ crowd })=> ({ crowd }))(CrowdDetail)

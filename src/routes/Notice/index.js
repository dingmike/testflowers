import React from 'react';
import { connect } from 'dva'; 
import { StickyContainer, Sticky } from 'react-sticky';
import { 
  NavBar,
  Icon,
  Modal
} from "antd-mobile";
import { routerRedux } from 'dva/router';
import Moment from 'moment'
import styles from './index.less'
import Detail from './detail';
function Notice({ notice, dispatch }) {
  const { noticeList, showModal, detail } = notice;
  const showDetail = (detail) => dispatch({
    type : 'notice/showModal',
    payload : detail
  })
  return (
    <StickyContainer>
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
              消息中心
            </NavBar>
          )
        }
      </Sticky>
        {
          noticeList.map((news, index)=>{
            return (
              <div 
                key={news.id} 
                className={styles.itemWrapper }
                onClick={()=>showDetail(news)}
              >
                <div className={styles.title}>
                  <h4 className={ styles.h4 }>{news.title}</h4>
                  <span>{Moment(news.createTime).format('YYYY-MM-DD')}</span>
                </div>
              </div>
            )
          })
        }
      <Modal visible={showModal}>
        <Detail {...detail} onLeftClick={()=>dispatch({type : 'notice/hideModal'})}/>
      </Modal>
    </StickyContainer>
  )
}

export default connect(({ notice })=> ({ notice }))(Notice)
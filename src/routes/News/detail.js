import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { 
  NavBar,
  Icon 
} from "antd-mobile";
import { routerRedux } from 'dva/router'
import Moment from 'moment'
import styles from './index.less'
import { connect } from 'dva';

function NewsDetail({ 
  dispatch,
  news
}) {
  const { detail } = news;
  const { 
    title="",
    creteTime=0,
    content ="",
  } = detail
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
              onLeftClick={()=>dispatch(routerRedux.go(-1))}
            >
              
            </NavBar>
          )
        }
      </Sticky>
      <div className={styles.newsDetail}>
        <h3 className={ styles.newsTitle }>{title}</h3>
        <p className={ styles.detailTime }>{Moment(creteTime).format('YYYY-MM-DD')}</p>
        <div className={ styles.html } dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </StickyContainer>
  )
}

export default connect(({ news }) => ({ news }))(NewsDetail)
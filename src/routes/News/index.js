import React from 'react';
import { connect } from 'dva'; 
import { StickyContainer, Sticky } from 'react-sticky';
import { 
  NavBar,
  Icon,
} from "antd-mobile";
import { routerRedux } from 'dva/router';
import Moment from 'moment'
import styles from './index.less'
function News({ news, dispatch }) {
  const { newsList, } = news;
  const showDetail = (id) => dispatch(routerRedux.push({
    pathname : '/news/detail',
    search : `id=${id}`
  }))
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
              新闻中心
            </NavBar>
          )
        }
      </Sticky>
        {
          newsList.map((news, index)=>{
            return (
              <div 
                key={news.id} 
                className={styles.itemWrapper }
                onClick={()=>showDetail(news.id)}
              >
                <div className={styles.title}>
                  <h4 className={ styles.h4 }>{news.title}</h4>
                  <span>{Moment(news.createTime).format('YYYY-MM-DD')}</span>
                </div>
              </div>
            )
          })
        }
    </StickyContainer>
  )
}

export default connect(({ news })=> ({ news }))(News)
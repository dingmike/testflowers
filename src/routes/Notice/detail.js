import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { 
  NavBar,
  Icon 
} from "antd-mobile";
import Moment from 'moment'
import styles from './index.less'

export default function NewsDetail({ 
  onLeftClick,
  title,
  content,
  createTime,
  ...args
}) {
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
              onLeftClick={onLeftClick}
            >
              
            </NavBar>
          )
        }
      </Sticky>
      <div className={styles.newsDetail}>
        <h3 className={ styles.newsTitle }>{title}</h3>
        <p className={ styles.detailTime }>{Moment(createTime).format('YYYY-MM-DD')}</p>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </StickyContainer>
  )
}
import React from 'react';
import { connect } from "dva";
import { routerRedux } from 'dva/router';
import { 
  NavBar, 
  Icon,
  ActivityIndicator
} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky'; 
import styles from './index.less';
function Scenics({ scenics, dispatch }) {
  const {
    loading=false,
    scenicsList,
    pagination : {
      page = 0,
      pageSize = 0
    },
    countPage,
  } = scenics;
  const getMoreList = () => {
    dispatch({
      type : 'scenics/queryMoreList',
      payload : {
        nextPage : page + 1,
        pageSize : pageSize
      }
    })
  }
  const gotoScenicDetail = (id, name) => {
    dispatch(routerRedux.push({
      pathname : "/home/scenics/detail",
      search : `?id=${id}&name=${name}`
    }))
  }
  return (
    <StickyContainer>
      <Sticky topOffset={46}>
        {
          ({
            style
          })=> (
            <NavBar
              style={{ 
                ...style, 
                zIndex: 5,
                boxShadow : "0 1px 1px #ABABAB"
              }}
              mode="light"
              leftContent={<Icon type="left" style={{ color : '#333'}}/>}
              onLeftClick={()=>{
                dispatch(routerRedux.go(-1))
              }}
            >
              景点展示
            </NavBar>
          )
        }
      </Sticky>
      <div className={ styles.list }>
        {
          scenicsList.map(
            (s,index)=>
              <div 
                className={ styles.listItem }
                key={`${s.id}-${index}`}
                onClick={()=>gotoScenicDetail(s.id,s.title)}
              >
                <img src={s.img} alt={s.title}/>
                <span>{s.title}</span>
              </div>
          )
        }
      </div>
      {
        page === countPage ? 
          null : <p 
            className={ styles.page }
            onClick={getMoreList}
          >查看更多<Icon type="down"/></p>
      }
      <ActivityIndicator toast text="加载中..." animating={loading}/>
    </StickyContainer>
  )
}

export default connect(({ scenics }) => ({ scenics }) )(Scenics)
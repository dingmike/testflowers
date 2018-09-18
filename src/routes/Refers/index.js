import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { 
  NavBar,
  ActivityIndicator,
  Icon
} from 'antd-mobile';
import CustomIcon from '../../components/CustomIcon';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './index.less'
function Refers({ dispatch, refers }){
  const { 
    loading,
    refersList,
    pagination : {
      page=0,
      pageSize=0
    },
    countPage
  } = refers;
  const gotoDetail = (id, name) => dispatch(routerRedux.push({
    pathname : '/home/refers/detail',
    search : `?id=${id}&name=${name}`
  }))
  const getMoreList = () => {
    dispatch({
      type : 'refers/queryMoreList',
      payload : {
        nextPage : page + 1,
        pageSize : pageSize
      }
    })
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
              入园参考
            </NavBar>
          )
        }
      </Sticky>
      <div className={ styles.wrapper }>
      {
        refersList.length > 0 ? refersList.map((refer,index)=>
          <div 
            className={ styles.card } 
            key={`${refer.id}-${index}`}
            onClick={()=>gotoDetail(refer.id, refer.name)}
          >
            <img 
              src={refer.img} 
              alt={refer.name} 
              className={styles.image }
            />
            <div className={styles.title}>
              <h4 className={styles.h4}>{refer.name}</h4>
              <CustomIcon 
                size={24}
                url="/images/eye.png"
                text={refer.see}
                textStyle={{
                  color : "#B6B6B6",
                  fontSize: 12
                }}
              />
            </div>
            <p className={ styles.content }>{ `${refer.intro.substr(0,60)}...`  }</p>
          </div>
        ) : <p className={ styles.noData }>~~~未知的荒漠~~~</p>
      }
      {
        page === countPage ? 
          null : <p 
            className={ styles.page }
            onClick={getMoreList}
          >查看更多<Icon type="down"/></p>
      }
      </div>
      <ActivityIndicator toast text="加载中..." animating={loading}/>
    </StickyContainer>
  )
}

export default connect(({ refers }) => ({ refers }))(Refers)


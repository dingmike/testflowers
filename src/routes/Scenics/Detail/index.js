import React from 'react';
import { connect } from "dva";
import { routerRedux } from 'dva/router';
import { NavBar, Icon, Carousel } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky'; 
import styles from './index.less';
function Scenics({ scenics, dispatch }) {
  const { 
    detail:{
      imgDesc=[],
      title="",
      openTime="",
      spotDetails="",
      notes=""
    },
    loading=false
  } = scenics;
  return (
    <StickyContainer>
      <Sticky topOffset={46}>
        {
          ({
            style
          })=> (
            <NavBar
              style={{ ...style, zIndex: 5}}
              mode="light"
              leftContent={<Icon type="left" style={{ color : '#333'}}/>}
              onLeftClick={()=>{
                dispatch(routerRedux.go(-1))
              }}
            >
              {title}
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
          imgDesc.map((b,i)=>
            <div key={`${b}-${i}`} className={ styles.banner }>
              <img src={b} alt="景点展示" onLoad={()=>window.dispatchEvent(new Event('resize'))}/>
            </div>
          )
        }
      </Carousel>
      <div className={ styles.content }>
        <h2>景点介绍</h2>
        <div className={ styles.html } dangerouslySetInnerHTML={{ __html :spotDetails }}></div>
        <h2>开放时间</h2>
        <p>{ openTime }</p>
        <h2>游玩须知</h2>
        <div className={ styles.html } dangerouslySetInnerHTML={{ __html : notes }}></div>
      </div>
    </StickyContainer>
  )
}

export default connect(({ scenics }) => ({ scenics }) )(Scenics)
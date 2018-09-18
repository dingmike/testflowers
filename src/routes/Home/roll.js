import React from 'react';
import { Carousel } from 'antd-mobile';

import styles from './roll.less'; 

export default ({ dataSource=[], play=false, onClick, gotoNewsDetail }) => 
  <div className={ styles.wrapper }>
    <i className={ styles.img } onClick={onClick}>
    </i>
    <Carousel
      vertical
      dots={false}
      dragging={false}
      swiping={false}
      autoplay={play}
      infinite
      slideWidth="36px"
      autoplayInterval={5000}
      speed={1000}
    >
      {
        dataSource.map((d,i)=>
          <div 
            key={`${d.id}-${i}`} 
            className={ styles.item }
            onClick={()=>gotoNewsDetail(d.id)}
          >
            <p> {d.title.length > 15 ? `${d.title.substr(0,15)}...` : d.title} </p>
          </div>
        )
      }
    </Carousel>
  </div>
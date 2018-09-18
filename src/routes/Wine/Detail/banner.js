import React from 'react';
import { Carousel } from 'antd-mobile';

import styles from './banner.less';

export default ({ dataSource=[], play }) => 
  <Carousel
    autoplay={play}
    infinite
    autoplayInterval={3000}
  >
    {
      dataSource.map((b,i)=>
        <div key={`${b}-${i}`} className={ styles.banner }>
          <img src={b} alt="酒品展示" onLoad={()=>window.dispatchEvent(new Event('resize'))}/>
        </div>
      )
    }
  </Carousel>
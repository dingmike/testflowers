import React from 'react';
import { Carousel } from 'antd-mobile';
import Image from '../../components/Image'

export default ({ dataSource=[], play, bannerGoto }) => 
  <Carousel
    autoplay={play}
    infinite
    autoplayInterval={3000}
  >
    {
      dataSource.map((b,i)=>
        <Image  
          key={`${b.pId}-${i}`} 
          scale={6/15}
          src={b.imgUrl}
          alt={`图片-${b.pId}`}
          onClick={()=>bannerGoto(b.type,b.pId)}
        />
      )
    }
  </Carousel>
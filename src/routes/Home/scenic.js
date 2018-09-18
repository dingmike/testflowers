import React from 'react';
import styles from './scenic.less';
import CustomIcon from '../../components/CustomIcon';
import IconImg from '../../assets/right-circle-fill.png'
export default function Scenic({
  dataSource=[],
  title="景点展示",
  extraTitle="特色玩乐，一网打尽",
  gotoScenicDetail,
  gotoScenicList
}) {
  return (
    <div className={ styles.warpper }>
      <div className={ styles.title }>
        <p className={ styles.h }>{title}</p>
        <CustomIcon size={16} url={IconImg} text={extraTitle} reverse onClick={gotoScenicList}/>
      </div>
      <div className={styles.item}>
        {
          dataSource.map((data, index)=> (
            <div 
              className={ styles.card } 
              key={`${data.id}-${index}`}
              onClick={()=>gotoScenicDetail(data.id,data.title)}
            >
              <img src={data.img} alt="景区图片"/>
              <p className={ styles.cardText }>{data.title}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
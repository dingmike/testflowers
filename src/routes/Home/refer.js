import React from 'react';
import IconImg from '../../assets/right-circle-fill.png'
import EyeImg from '../../assets/eye.png';
import CustomIcon from '../../components/CustomIcon';
import styles from './refer.less';

export default function Refer ({
  dataSource=[],
  title="入园参考",
  extraTitle="经典线路，为您定做",
  gotoRefersList,
  gotoReferDetail
}) {
  return (
    <div className={ styles.warpper }>
      <div className={ styles.title }>
        <p className={ styles.h }>{title}</p>
        <CustomIcon 
          size={16} 
          url={IconImg} 
          text={extraTitle} 
          reverse
          onClick={gotoRefersList}
        />
      </div>
      <div className={ styles.item }>
        { 
          dataSource.map((data,index)=>(
            <div 
              className={ styles.card } 
              key={`${data.id}-${index}`}
              onClick={()=>gotoReferDetail(data.id,data.name)}
            >
              <img 
                src={data.img} 
                alt={data.name} 
                className={styles.image }
              />
              <div className={styles.title}>
                <h4 className={styles.h4}>{data.name}</h4>
                <CustomIcon 
                  size={24}
                  url={EyeImg}
                  text={data.see}
                  textStyle={{
                    color : "#B6B6B6",
                    fontSize: 12
                  }}
                />
              </div>
              <p className={ styles.content }>{ `${data.intro.substr(0,60)}...`  }</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
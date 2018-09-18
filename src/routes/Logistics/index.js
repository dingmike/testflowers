import  React from 'react';
import { StickyContainer, Sticky } from 'react-sticky'
import { 
  NavBar,
  Icon 
} from 'antd-mobile';
import { connect } from 'dva';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import TruchIcon from '../../assets/delivery-truck.svg'
const MyIcon = ({src}) => <img src={src} className="spe am-icon am-icon-md" alt="" />

function Logistics({ dispatch, logistics }){
  const { logis, expName } = logistics;
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
              商品物流
            </NavBar>
          )
        }
      </Sticky>
      {
        logis.length > 0 ?  
          <Timeline>
            {
              logis.map((l, index)=>
                <TimelineEvent
                  key={`${l.time}-${index}`}
                  style={{
                    width : "95%"
                  }}
                  title={expName}
                  createdAt={moment(l.time).format("YYYY-MM-DD HH:mm:ss")}
                  icon={<MyIcon src={TruchIcon}/>}
                >
                    {l.status}
                </TimelineEvent>)
            }
          </Timeline> : <p style={{
            textAlign : "center",
            color : "#9f9f9f"
          }}>暂无物流信息</p>
      }
    </StickyContainer>
  )
}

export default connect(({ logistics })=> ({ logistics }))(Logistics)
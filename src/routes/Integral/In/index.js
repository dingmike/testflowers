import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { 
  PullToRefresh,
  ActivityIndicator,
  NavBar,
  Icon
} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { StickyContainer, Sticky } from 'react-sticky';
import styles from './index.less';
import moment from 'moment';
class IntegralIn extends Component{
  componentDidMount(){
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.el).offsetTop;
    this.props.dispatch({
      type : 'integral/setHeight',
      payload : hei
    })
  }
  render(){
    const { integral , dispatch } = this.props;
    const { loading, height, inIntegral, pagination:{
      total=0,
      page=1,
      pageSize=10
    }} = integral;
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
                转入积分
              </NavBar>
            )
          }
        </Sticky>
        <ActivityIndicator toast animating={loading} text="数据装填中..."/>
        <PullToRefresh
          ref={el => this.el = el }
          style={{
            height: height,
            overflow: 'auto',
          }}
          direction="up"
          indicator={{
            deactivate : '上拉加载更多'
          }}
          distanceToRefresh={80}
          onRefresh={()=>{
            if(total === page){
              return null
            }else {
              dispatch({ type : 'integral/queryMoreOutIntegral', payload : { nextPage : page + 1, pageSize: pageSize }})
            }
          }}
        >
          { 
            inIntegral.map((re,index)=>
              <div 
                className={styles.list} 
                key={`${re.userId}-${index}`}
              >
                <div className={ styles.header }>
                  <p className={ styles.headerName }>{re.name}</p>
                  <p className={ styles.headerNumber } style={{
                    color :"#cf9257"
                  }}>转入</p>
                </div>
                <div className={ styles.header }>
                  <p className={ styles.headerName }>转入账号：{re.transferencePhone}</p>
                  <p className={ styles.headerNumber } style={{
                    color :"#cf9257"
                  }}>+{re.money}</p>
                </div>
                <div className={ styles.msg }>
                  <p>时间：{moment(re.creatTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                </div>
              </div>
            )
          }
          <p className={styles.bottomMsg }>{total === page? "到底啦！再拉也刷不出来啦~~~" : "上拉加载更多"}</p>
        </PullToRefresh>
      </StickyContainer>
    )
  }
}
export default connect(({integral})=>({integral}))(IntegralIn)
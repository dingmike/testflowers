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
class Withdrawals extends Component{
  componentDidMount(){
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.el).offsetTop;
    this.props.dispatch({
      type : 'cash/setHeight',
      payload : hei
    })
  }
  render(){
    const { cash , dispatch } = this.props;
    const { loading, height, withdrawals, pagination:{
      total=1,
      page=1,
      pageSize=10
    }} = cash;
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
                提现明细
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
              dispatch({ type : 'cash/queryMoreWithdrawals', payload : { nextPage : page + 1, pageSize: pageSize }})
            }
          }}
        >
          { 
            withdrawals.map((withd,index)=>
              <div 
                className={styles.list} 
                key={`${withd.userId}-${index}`}
              >
                <div className={ styles.header }>
                  <p className={ styles.headerName }>提现</p>
                  <p className={ styles.headerNumber } style={{
                    color : withd.inOut === 1 ? "" : "#cf9257"
                  }}>{withd.inOut===1?"+":"-"}{withd.money}</p>
                </div>
                <div className={ styles.msg }>
                  <p>状态：{withd.statusName}</p>
                  <p>{moment(withd.creatTime).format('YYYY-MM-DD HH:mm:ss')}</p>
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
export default connect(({cash})=>({cash}))(Withdrawals)